import React, { useState } from 'react';
import { Search } from '@/components/search'; // Add this import statement
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LogsTable from './LogsTable';

const LogsPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div className='flex flex-col  max-h-fit'>
            <div className='inline-flex p-3 border-b-2 w-full justify-between items-center'>
                <div className='flex items-center'>
                    <h2 className="mr-4">Select Log File :</h2>
                    <Select defaultValue='system'>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="system">System Logs</SelectItem>
                            <SelectItem value="dark">Auth Log</SelectItem>
                            <SelectItem value="ssstem">Kern Log</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div><Search onChange={handleSearchChange} /></div>
            </div>
            <div className='flex-1 overflow-y-auto'>
                <LogsTable searchQuery={searchQuery} />
            </div>
        </div>
    );
};

export default LogsPage;
