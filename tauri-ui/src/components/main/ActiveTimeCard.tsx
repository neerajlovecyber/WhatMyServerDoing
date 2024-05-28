// components/DiskUsageCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const ActiveTimeCard = () => {
  const activeTime = 95;  // Static data for now


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
      <div className="text-2xl font-bold">{activeTime} Hours</div>
    </CardContent>
  </Card>
  );
};

export default ActiveTimeCard;
