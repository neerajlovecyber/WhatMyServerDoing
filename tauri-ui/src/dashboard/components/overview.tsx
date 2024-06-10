// components/RamUsageCard.tsx
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUrl } from '@/components/main/UrlContext';
import { DesktopIcon } from '@radix-ui/react-icons';
import { fetch } from '@tauri-apps/plugin-http';

const RamUsageCard = () => {
  const [hostname, sethostname] = useState<string>("0");
const [os, setos] = useState<string>("0");
const [platform, setplatform] = useState<string>("0");
const [platformversion, setplatformversion] = useState<string>("0");
const [kenerlarch, setkernelarch] = useState<string>("0");
const [days, setuptimedays] = useState<number>(0);
const [uptimehours, setuptimehours] = useState<number>(0);
const { url } = useUrl();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await fetch(url + 'system');
        const response = await fetch(url + 'system', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        sethostname(data.hostname);
        setos(data.os);
        setplatform(data.platform);
        setplatformversion(data.platformVersion);
        setkernelarch(data.kernelArch);
        setuptimedays(Math.round(data.uptime/60/60/24));
        setuptimehours(Math.round(data.uptime/60/60*10)/10);
        
      } catch (error) {
        console.error('Error fetching Overview data:', error);
        sethostname("-");
        setos("-");
        setplatform("-");
        setplatformversion("-");
        setkernelarch("-");
        setuptimedays(0);
        setuptimehours(0)
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
  }, [url]);

  return (
    <Card>
       <CardHeader className="flex flex-row items-center justify-between  pb-2">
        <CardTitle className=" text-lg  font-bold">Basic System Info</CardTitle>
      <DesktopIcon/>
      </CardHeader>
      <CardContent className='flex flex-row  space-x-3 '>
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
