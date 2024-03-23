import RevenueChart from '../ui/dashboard/revenue-chart';
import LatestInvoices from '../ui/dashboard/latest-invoices';
import { Card } from '../ui/dashboard/cards';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue, fetchLatestInvoices, fetchInvoiceStatsByStatus, fetchCustomerCount } from '../lib/data';

export default async function Page() {
    const revenue = await fetchRevenue();

    const latestInvoices = await fetchLatestInvoices();

    const invoiceStats = await fetchInvoiceStatsByStatus();
    var [total, pending, paid] = invoiceStats;

    const numberOfCustomers = await fetchCustomerCount();
    var totalCustomer = parseInt(numberOfCustomers[0].count);

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card title="Collected" value={paid.amount} type="collected" />
                <Card title="Pending" value={pending.amount} type="pending" />
                <Card title="Total Invoices" value={total.count} type="invoices" />
                <Card
                title="Total Customers"
                value={(totalCustomer)}
                type="customers"
                />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">  
            <RevenueChart revenue={revenue}></RevenueChart>
            <LatestInvoices latestInvoices={latestInvoices}></LatestInvoices>
            </div>
        </main>
    );
    


}