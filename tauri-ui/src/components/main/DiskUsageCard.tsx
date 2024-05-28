// components/DiskUsageCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const DiskUsageCard = () => {
  const disk = 95;  // Static data for now
  const currentdisk = 7;
  const totalDisk = 8;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Disk Usage</CardTitle>
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
          <path d="M4 4h16v4H4z"></path>
          <path d="M4 8h16v4H4z"></path>
          <path d="M4 12h16v4H4z"></path>
          <path d="M4 16h16v4H4z"></path>
          <circle cx="8" cy="18" r="1"></circle>
          <circle cx="16" cy="18" r="1"></circle>
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{disk} %</div>
        <p className="text-xs text-muted-foreground">
          {currentdisk} of {totalDisk} GB used
        </p>
        <Progress value={disk} className="mt-4" />
      </CardContent>
    </Card>
  );
};

export default DiskUsageCard;
