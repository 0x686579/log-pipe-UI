import { MetricsCards } from "../app/components/dashboard/MetricsCards";
import { RecentErrors } from "../app/components/dashboard/RecentErrors";

async function getStats() {
  const [totalLogs, errorCount, warnCount, services] = [
    50,
    20,
    10,
    15,];

  return {
    totalLogs,
    errorCount,
    errorRate: totalLogs > 0 ? (errorCount / totalLogs) * 100 : 0,
    warnCount,
    activeServices: services,
  };
}


export default async function DashboardPage() {
  const [stats, timeSeries] = await Promise.all([getStats(), null]);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Overview of your system logs over the last 7 days.
        </p>
      </div>
      <MetricsCards stats={stats} />
      <RecentErrors />
    </div>
  );
}
