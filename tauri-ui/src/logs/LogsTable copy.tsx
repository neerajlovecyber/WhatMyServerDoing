import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface LogsTableProps {
    searchQuery: string;
}

const LogsTable: React.FC<LogsTableProps> = ({ searchQuery }) => {
    const invoices = [
        { invoice: "INV001", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" },
        { invoice: "INV002", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal" },
        { invoice: "INV003", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
        { invoice: "INV004", paymentStatus: "Paid", totalAmount: "$450.00", paymentMethod: "Credit Card" },
        { invoice: "INV005", paymentStatus: "Paid", totalAmount: "$550.00", paymentMethod: "PayPal" },
        { invoice: "INV006", paymentStatus: "Pending", totalAmount: "$200.00", paymentMethod: "Bank Transfer" },
        { invoice: "INV007", paymentStatus: "Unpaid", totalAmount: "$300.00", paymentMethod: "Credit Card" },
        { invoice: "INV008", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" },
        { invoice: "INV009", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal" },
        { invoice: "INV010", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
        { invoice: "INV011", paymentStatus: "Paid", totalAmount: "$450.00", paymentMethod: "Credit Card" },
        { invoice: "INV012", paymentStatus: "Paid", totalAmount: "$550.00", paymentMethod: "PayPal" },
        { invoice: "INV013", paymentStatus: "Pending", totalAmount: "$200.00", paymentMethod: "Bank Transfer" },
        { invoice: "INV014", paymentStatus: "Unpaid", totalAmount: "$300.00", paymentMethod: "Credit Card" },
        { invoice: "INV015", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" },
        { invoice: "INV016", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal" },
        { invoice: "INV017", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
        { invoice: "INV018", paymentStatus: "Paid", totalAmount: "$450.00", paymentMethod: "Credit Card" },
        { invoice: "INV019", paymentStatus: "Paid", totalAmount: "$550.00", paymentMethod: "PayPal" },
        { invoice: "INV020", paymentStatus: "Pending", totalAmount: "$200.00", paymentMethod: "Bank Transfer" },
        { invoice: "INV021", paymentStatus: "Unpaid", totalAmount: "$300.00", paymentMethod: "Credit Card"},
       { invoice: "INV022", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" },    
    ];

    // Filter invoices based on search query
    const filteredInvoices = invoices.filter(invoice =>
        invoice.invoice.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.paymentStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase()) ||
        invoice.totalAmount.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;
    const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const currentItems = filteredInvoices.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className='flex flex-col ' style={{maxHeight:"80vh"}}>
            <div className='flex-1 overflow-y-auto border-2 border-t-0 mb-16'>
                <Table className='min-w-full'>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Invoice</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentItems.map((invoice) => (
                            <TableRow key={invoice.invoice}>
                                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                                <TableCell>{invoice.paymentStatus}</TableCell>
                                <TableCell>{invoice.paymentMethod}</TableCell>
                                <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                
            </div>
            <div className="flex  items-center pt-2  fixed end-4 bottom-2 bg-black m-1cd" style={{height:'40px'}}>
                <Button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</Button>
                <span className='px-4 self-center'>Page {currentPage} of {totalPages}</span>
                <Button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</Button>
            </div>
        </div>
    );
};

export default LogsTable;
