// components/DiskUsageCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useUrl } from '@/components/main/UrlContext';
import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
  const ActiveTimeCard = () => {
    const [Hours, setHours] = useState<number>(0);
    const [Days, setDays] = useState<number>(0);
    const { url } = useUrl();
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url + 'uptime');
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
      <Clock  />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{Days} Days {Hours} Hours</div>
    </CardContent>
  </Card>
  );
};

export default ActiveTimeCard;
