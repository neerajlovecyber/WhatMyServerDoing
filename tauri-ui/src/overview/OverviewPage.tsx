import React from 'react';
//copmemts
import CpuUsageCard from '@/components/main/CpuUsageCard';
import RamUsageCard from '@/components/main/RamUsageCard';
import DiskUsageCard from '@/components/main/DiskUsageCard';
import ActiveTimeCard from '@/components/main/ActiveTimeCard';
import  Overview from "@/dashboard/components/overview";

const OverviewPage: React.FC= () => {
    return (
        <div>
 <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CpuUsageCard />
          <RamUsageCard />
          <DiskUsageCard />
          {/* <ActiveTimeCard /> */}
        </div>
        <div className="grid gap-4 md:grid-cols-5 lg:grid-cols-7">
  
           <Overview/>
        
          {/* <RunningProcess /> */}
        </div>
      </div>
        </div>
    );
};

export default OverviewPage;