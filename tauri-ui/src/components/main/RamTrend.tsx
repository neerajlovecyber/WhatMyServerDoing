import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, CategoryScale, Title, Tooltip, Legend, PointElement, LineElement, Filler } from 'chart.js';
import { useUrl } from '@/components/main/UrlContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fi } from 'date-fns/locale';
import { C } from '@tauri-apps/api/path-f8d71c21';
import { MemoryStickIcon } from 'lucide-react';
ChartJS.register(LinearScale, CategoryScale, Title, Tooltip, Legend, PointElement, LineElement);

const options = {
    responsive: true,legend: {
        display: false
    },
    plugins: {
        legend: {
            display: false
          }
    },
    scales: {
        x: {

            ticks: {
                color: 'white',
            },
        },
        y: {
            beginAtZero: true,
            max: 100,
            ticks: {
                color: 'white',
            },
        },
    },
};

const RamTrend = () => {
    const [ramData, setRamData] = useState([]);
    const { url } = useUrl();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url + 'history');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (Array.isArray(data.ram_usage)) {
                    setRamData(data.ram_usage);
                } else {
                    console.error('Invalid data format for Ram usage:', data.ram_usage);
                }
            } catch (error) {
                console.error('Error fetching Ram data:', error);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 1000 * 10); // Fetch data every minute
        return () => clearInterval(intervalId);
    }, [url]);

    const labels = Array.from({ length: 60 }, (_, i) => i + 1); // Generate labels for 60 minutes
    const data = {
        labels,
        datasets: [
            {
                
                color: 'white',
                data: ramData,
                borderColor: 'white', // Line color
                backgroundColor: 'white', // Fill color with opacity for better visibility
                fill: true,
                tension: 0.5,
                pointRadius: 0,
                pointHoverRadius: 0,
            
            },
        ],
    };

    return (
        <Card className='row-span row-span-1 bg-slate-600 bg-opacity-90' >
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className="text-sm font-medium text-white">RAM Usage Trend (Last Hour)</CardTitle>
                
            </CardHeader>
            <CardContent>
                <Line options={options} data={data} className='' />
            </CardContent>
        </Card>
    );
};

export default RamTrend;
