// components/DiskUsageCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { useUrl } from '@/components/main/UrlContext';
import { Server } from 'lucide-react';
import { set } from 'date-fns';
const DiskUsageCard = () => {
  const [Total, settotal] = useState<number>(0);
  const [Usage, setusage] = useState<number>(0);
  const [USed, setused] = useState<number>(0);
  const { url } = useUrl();
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(url + 'disk');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          settotal(data.total);
          setusage(data.usage);
          setused(data.used);
        } catch (error) {
          console.error('Error fetching disk data:', error);
          settotal(0);
          setusage(0);
          setused(0);
        }
      };
  
      fetchData();
      const intervalId = setInterval(fetchData, 2000);
      return () => clearInterval(intervalId);
    }, [url]);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Disk Usage</CardTitle>
        <Server/>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{Usage} %</div>
        <p className="text-xs text-muted-foreground">
          {USed} of {Total} GB used
        </p>
        <Progress value={Usage} className="mt-4" />
      </CardContent>
    </Card>
  );
};

export default DiskUsageCard;
