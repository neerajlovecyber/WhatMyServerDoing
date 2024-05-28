// components/DiskUsageCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { useEffect, useState } from 'react';
  const ActiveTimeCard = () => {
    const [Hours, setHours] = useState<number>(0);
    const [Days, setDays] = useState<number>(0);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8080/uptime');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setHours(data.hours);
          setDays(data.days);
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
      <CardTitle className="text-sm font-medium">Active time</CardTitle>
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-400"></span>
      </span>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{Days} Days {Hours} Hours</div>
    </CardContent>
  </Card>
  );
};

export default ActiveTimeCard;
