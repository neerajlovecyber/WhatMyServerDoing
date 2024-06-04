package main

import (
	"log"
	"math"
	"net/http"
	"sync"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/disk"
	"github.com/shirou/gopsutil/host"
	"github.com/shirou/gopsutil/mem"
)

var (
	cpuUsage  float64
	totalRAM  uint64
	usedRAM   uint64
	freeRAM   uint64
	cachedRAM uint64
	mu        sync.RWMutex
	memusage  float64
	diskUsage float64
	totalDisk uint64
	usedDisk  uint64
	uptime    time.Duration

	// Slices to store data points within a minute
	cpuDataPoints []float64
	ramDataPoints []float64

	// Historical data for the last 60 minutes
	historicalCPUUsage []float64
	historicalRAMUsage []float64
	historicalMutex    sync.RWMutex
)

func updateMetrics() {
	ticker := time.NewTicker(1 * time.Second) // Update every 1 second
	defer ticker.Stop()
	for {
		<-ticker.C
		updateCPU()
		updateRAM()
		updateUptime()

		mu.RLock()
		cpuDataPoints = append(cpuDataPoints, cpuUsage)
		ramDataPoints = append(ramDataPoints, memusage)
		mu.RUnlock()

		// Compute 1-minute average and store in historical data
		if len(cpuDataPoints) >= 60 {
			averageCPU := calculateAverage(cpuDataPoints)
			averageRAM := calculateAverage(ramDataPoints)

			historicalMutex.Lock()
			historicalCPUUsage = append(historicalCPUUsage, averageCPU)
			historicalRAMUsage = append(historicalRAMUsage, averageRAM)
			if len(historicalCPUUsage) > 60 {
				historicalCPUUsage = historicalCPUUsage[1:]
				historicalRAMUsage = historicalRAMUsage[1:]
			}
			historicalMutex.Unlock()

			cpuDataPoints = []float64{}
			ramDataPoints = []float64{}
		}
	}
}

func updateDiskMetrics() {
	ticker := time.NewTicker(2 * time.Second) // Update every 2 seconds.
	defer ticker.Stop()
	for {
		<-ticker.C
		updateDisk()
	}
}

func updateTopProcessMetrics() {
	ticker := time.NewTicker(2 * time.Second) // Update every 2 seconds.
	defer ticker.Stop()
	for {
		<-ticker.C
		// Update top processes here
	}
}

func updateUptime() {
	uptimeSeconds, _ := host.Uptime()
	mu.Lock()
	uptime = time.Duration(uptimeSeconds) * time.Second
	mu.Unlock()
}

func updateCPU() {
	percent, _ := cpu.Percent(0, false)
	mu.Lock()
	if len(percent) > 0 {
		cpuUsage = percent[0] // Access the first element of the slice.
	}
	mu.Unlock()
}

func updateRAM() {
	virtualMemory, _ := mem.VirtualMemory()
	mu.Lock()
	totalRAM = virtualMemory.Total / 1024 / 1024 / 1024   // Convert bytes to GB.
	usedRAM = virtualMemory.Used / 1024 / 1024 / 1024     // Convert bytes to GB
	freeRAM = virtualMemory.Free / 1024 / 1024 / 1024     // Convert bytes to GB
	cachedRAM = virtualMemory.Cached / 1024 / 1024 / 1024 // Convert bytes to GB
	memusage = virtualMemory.UsedPercent
	mu.Unlock()
}

func updateDisk() {
	diskStat, _ := disk.Usage("/")
	mu.Lock()
	diskUsage = math.Round(diskStat.UsedPercent*10) / 10 // Round to one decimal place
	totalDisk = diskStat.Total / 1024 / 1024 / 1024      // Convert bytes to GB
	usedDisk = diskStat.Used / 1024 / 1024 / 1024        // Convert bytes to GB
	mu.Unlock()
}

func main() {
	go updateMetrics()           // Start updating CPU and RAM metrics in the background
	go updateDiskMetrics()       // Start updating disk metrics in the background
	go updateTopProcessMetrics() // Start updating top process metrics in the background

	r := gin.Default()

	// Configure CORS middleware to allow all origins
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"} // Allow necessary methods
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept"}        // Allow necessary headers
	r.Use(cors.New(config))

	r.GET("/", func(c *gin.Context) {
		mu.RLock()
		defer mu.RUnlock()
		c.JSON(http.StatusOK, gin.H{
			"Server": "Server is running",
		})
	})

	r.GET("/cpu", func(c *gin.Context) {
		mu.RLock()
		defer mu.RUnlock()
		cpuUsageRound := round(cpuUsage, 1)
		c.JSON(http.StatusOK, gin.H{"cpu_usage": cpuUsageRound})
	})

	r.GET("/ram", func(c *gin.Context) {
		mu.RLock()
		defer mu.RUnlock()
		c.JSON(http.StatusOK, gin.H{
			"total":  totalRAM,
			"used":   usedRAM,
			"free":   freeRAM,
			"cached": cachedRAM,
			"usage":  memusage,
		})
	})

	r.GET("/disk", func(c *gin.Context) {
		mu.RLock()
		defer mu.RUnlock()
		c.JSON(http.StatusOK, gin.H{
			"total": totalDisk,
			"used":  usedDisk,
			"usage": diskUsage,
		})
	})

	r.GET("/uptime", func(c *gin.Context) {
		mu.RLock()
		defer mu.RUnlock()
		days := int(uptime.Hours() / 24)
		hours := int(uptime.Hours()) % 24
		c.JSON(http.StatusOK, gin.H{
			"days":  days,
			"hours": hours,
		})
	})

	r.GET("/system", func(c *gin.Context) {
		sysInfo, err := getSystemInfo()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve system information"})
			return
		}
		c.JSON(http.StatusOK, sysInfo)
	})

	r.GET("/history", func(c *gin.Context) {
		historicalMutex.RLock()
		defer historicalMutex.RUnlock()
		c.JSON(http.StatusOK, gin.H{
			"cpu_usage": historicalCPUUsage,
			"ram_usage": historicalRAMUsage,
		})
	})

	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}

// round rounds a float64 number to the specified number of decimal places.
func round(num float64, decimalPlaces int) float64 {
	precision := math.Pow(10, float64(decimalPlaces))
	return math.Round(num*precision) / precision
}

// getSystemInfo retrieves system information.
func getSystemInfo() (map[string]interface{}, error) {
	info, err := host.Info()
	if err != nil {
		return nil, err
	}
	return map[string]interface{}{
		"hostname":        info.Hostname,
		"os":              info.OS,
		"platform":        info.Platform,
		"platformVersion": info.PlatformVersion,
		"kernelArch":      info.KernelArch,
		"uptime":          info.Uptime,
	}, nil
}

// calculateAverage computes the average of a slice of float64 numbers.
func calculateAverage(data []float64) float64 {
	if len(data) == 0 {
		return 0
	}
	sum := 0.0
	for _, value := range data {
		sum += value
	}
	return sum / float64(len(data))
}
