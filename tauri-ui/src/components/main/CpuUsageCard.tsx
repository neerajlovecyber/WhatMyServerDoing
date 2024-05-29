// components/CpuUsageCard.tsx
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useUrl } from '@/components/main/UrlContext';
import { CpuIcon } from 'lucide-react';
const CpuUsageCard = () => {
  const [cpuUsage, setCpuUsage] = useState<number>(0);
  const { url } = useUrl();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url + "cpu");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCpuUsage(data.cpu_usage);
      } catch (error) {
        console.error('Error fetching CPU data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">CPU Utilization</CardTitle>
       <CpuIcon/>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{cpuUsage} %</div>
        <Progress value={cpuUsage} className="mt-4" />
      </CardContent>
    </Card>
  );
};

export default CpuUsageCard;
