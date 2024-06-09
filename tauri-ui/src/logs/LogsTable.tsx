import React, { useEffect, useState } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useUrl } from '@/components/main/UrlContext';

interface LogsTableProps {
    searchQuery: string;
    logEndpoint: string;
}

const LogsTable: React.FC<LogsTableProps> = ({ searchQuery, logEndpoint }) => {
    const [logData, setLogData] = useState('');
    const [loading, setLoading] = useState(true);
    const { url } = useUrl();
    useEffect(() => {
        const fetchLogData = async () => {
            setLoading(true);
            try {
                console.log(`Fetching logs from ${logEndpoint}`);
                const response = await fetch(url + logEndpoint);
                if (!response.ok) {
                    throw new Error(`Error fetching logs: ${response.statusText}`);
                }
                const data = await response.text();
                console.log('Fetched log data:', data);
                setLogData(data);
            } catch (error) {
                console.error('Error fetching log data:', error);
                setLogData(`Error fetching log data: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchLogData();
    }, [logEndpoint]);

    const filteredLogData = logData.split('\n').filter(line => line.toLowerCase().includes(searchQuery.toLowerCase())).join('\n');

    return (
        <div className='flex flex-col' style={{ maxHeight: "80vh", overflowY: "auto" }}>
            <SyntaxHighlighter language="text" style={dracula}   showLineNumbers={true}>
                {loading ? 'Loading logs...' : filteredLogData || 'No logs found'}
                
            </SyntaxHighlighter>
        </div>
    );
};

export default LogsTable;
