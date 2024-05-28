// components/RamUsageCard.tsx
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { set } from 'date-fns';

const RamUsageCard = () => {
  const [ramUsage, setRamUsage] = useState<number>(0);
const [currentram, setcurrentram] = useState<number>(0);
const [totalram, settotalram] = useState<number>(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/ram');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setRamUsage(data.usage);
        setcurrentram(data.used);
        settotalram(data.total);
      } catch (error) {
        console.error('Error fetching RAM data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">System Memory Usage</CardTitle>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <path d="M2 10h20" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{ramUsage} %</div>
        <p className="text-xs text-muted-foreground">
          {currentram} of {totalram} GB used
        </p>
        <Progress value={ramUsage} className="mt-4" />

      </CardContent>
    </Card>
  );
};

export default RamUsageCard;
