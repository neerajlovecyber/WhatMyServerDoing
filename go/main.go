package main

import (
	"log"
	"sync"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/shirou/gopsutil/cpu"
	"github.com/shirou/gopsutil/mem"
)

var (
	cpuUsage  float64
	totalRAM  uint64
	usedRAM   uint64
	freeRAM   uint64
	cachedRAM uint64
	mu        sync.RWMutex
)

func updateMetrics() {
	ticker := time.NewTicker(1 * time.Second) // Update every 1 second
	defer ticker.Stop()
	for {
		<-ticker.C
		updateCPU()
		updateRAM()
	}
}

func updateCPU() {
	percent, _ := cpu.Percent(0, false)
	mu.Lock()
	if len(percent) > 0 {
		cpuUsage = percent[0] // Access the first element of the slice
	}
	mu.Unlock()
}

func updateRAM() {
	virtualMemory, _ := mem.VirtualMemory()
	mu.Lock()
	totalRAM = virtualMemory.Total
	usedRAM = virtualMemory.Used
	freeRAM = virtualMemory.Free
	cachedRAM = virtualMemory.Cached
	mu.Unlock()
}

func main() {
	go updateMetrics() // Start updating metrics in the background

	r := gin.Default()

	r.GET("/cpu", func(c *gin.Context) {
		mu.RLock()
		defer mu.RUnlock()
		c.JSON(200, gin.H{"cpu_usage": cpuUsage})
	})

	r.GET("/ram", func(c *gin.Context) {
		mu.RLock()
		defer mu.RUnlock()
		ramUsage := float64(usedRAM) / float64(totalRAM) * 100
		c.JSON(200, gin.H{
			"total":  totalRAM,
			"used":   usedRAM,
			"free":   freeRAM,
			"cached": cachedRAM,
			"usage":  ramUsage,
		})
	})

	if err := r.Run(":8080"); err != nil {
		log.Fatal(err)
	}
}
