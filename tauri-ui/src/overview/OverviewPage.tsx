import React from 'react';
//copmemts
import CpuUsageCard from '@/components/main/CpuUsageCard';
import RamUsageCard from '@/components/main/RamUsageCard';
import DiskUsageCard from '@/components/main/DiskUsageCard';
import ActiveTimeCard from '@/components/main/ActiveTimeCard';
import  Overview from "@/dashboard/components/overview";
import CpuTrend from '@/components/main/CpuTrend';
import RamTrend from '@/components/main/RamTrend';

const OverviewPage: React.FC= () => {
    return (
        <div>
 <div className="flex-4 space-y-2 p-8 pt-3">
 <Overview/>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CpuUsageCard />
          <RamUsageCard />
          <DiskUsageCard />
          {/* <ActiveTimeCard /> */}
        </div>
        <div className=" grid gap-4 md:grid-cols-2 lg:grid-cols-2" >
        <CpuTrend />
        <RamTrend />
          
           
        
          {/* <RunningProcess /> */}
        </div>
        
      </div>
        </div>
    );
};

export default OverviewPage;