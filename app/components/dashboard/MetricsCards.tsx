"use client";
import { Activity, AlertTriangle, Server, XCircle } from "lucide-react";

export function MetricsCards({ stats }: { stats: any }) {
  const cards = [
    { label: "Total Logs", value: stats.totalLogs.toLocaleString(), icon: Activity, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Error Rate", value: `${stats.errorRate.toFixed(2)}%`, icon: XCircle, color: "text-red-500", bg: "bg-red-500/10", sub: `${stats.errorCount} errors` },
    { label: "Warnings", value: stats.warnCount.toLocaleString(), icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { label: "Active Services", value: stats.activeServices.toString(), icon: Server, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.label}</p>
            <div className={`rounded-md p-2 ${card.bg}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold">{card.value}</p>
            {card.sub && <p className="mt-1 text-xs text-slate-500">{card.sub}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
