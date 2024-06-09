import React, { useState } from 'react';
import { Search } from '@/components/search';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import LogsTable from './LogsTable';

const LogsPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLog, setSelectedLog] = useState('system');

    const handleSearchChange = (query: string) => {
        setSearchQuery(query);
    };

    const handleLogChange = (value: string) => {
        setSelectedLog(value);
    };

    const logEndpoints: { [key: string]: string } = {
        'system': 'logs/syslog',
        'auth': 'logs/auth',
        'kern': 'logs/kern',
        'mail': 'logs/mail',
    };

    return (
        <div className='flex flex-col max-h-fit'>
            <div className='inline-flex p-3 border-b-2 w-full justify-between items-center'>
                <div className='flex items-center'>
                    <h2 className="mr-4">Select Log File :</h2>
                    <Select defaultValue='system' onValueChange={handleLogChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="system">System Logs</SelectItem>
                            <SelectItem value="auth">Auth Log</SelectItem>
                            <SelectItem value="kern">Kern Log</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div><Search onChange={handleSearchChange} /></div>
            </div>
            <div className='flex-1 overflow-y-auto'>
                {/* Pass the logEndpoint prop to LogsTable */}
                <LogsTable searchQuery={searchQuery} logEndpoint={logEndpoints[selectedLog]} />
            </div>
        </div>
    );
};

export default LogsPage;
