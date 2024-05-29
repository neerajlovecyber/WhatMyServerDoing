// components/RamUsageCard.tsx
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useUrl } from '@/components/main/UrlContext';
import { set } from 'date-fns';
import { DesktopIcon } from '@radix-ui/react-icons';
import { uptime } from 'process';
const RamUsageCard = () => {
  const [hostname, sethostname] = useState<number>(0);
const [os, setos] = useState<number>(0);
const [platform, setplatform] = useState<number>(0);
const [platformversion, setplatformversion] = useState<number>(0);
const [kenerlarch, setkernelarch] = useState<number>(0);
const [days, setuptimedays] = useState<number>(0);
const [uptimehours, setuptimehours] = useState<number>(0);
const { url } = useUrl();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url + 'system');
        const uptime = await fetch(url + 'uptime');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const uptimeData = await uptime.json();
        sethostname(data.hostname);
        setos(data.os);
        setplatform(data.platform);
        setplatformversion(data.platformVersion);
        setkernelarch(data.kernelArch);
        setuptimedays(uptimeData.days);
        setuptimehours(uptimeData.hours);
      } catch (error) {
        console.error('Error fetching RAM data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Card className="col-span-3">
       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className=" text-lg  font-bold">Basic System Info</CardTitle>
      <DesktopIcon/>
      </CardHeader>
      <CardContent>
        <div className=""><b> Hostname</b> : {hostname}</div>
        <div className=""><b> OS</b> : {os}</div>
        <div className=""><b> Platform</b> : {platform}</div>
        <div className=""><b> Platform Version</b> : {platformversion}</div>
        <div className=""><b> Kernel Arch</b> : {kenerlarch}</div>
<div><b>Sytem Uptime</b> : {days} Days {uptimehours} Hours</div>
      </CardContent>
    </Card>
  );
};

export default RamUsageCard;
