import { formatRelative } from "date-fns";
import { AlertCircle } from "lucide-react";

type errorType = {
	id: string
	message: string
	serviceName: string
	timestamp: string
}

export async function RecentErrors() {
  const errors: errorType[] = []
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center gap-2">
        <AlertCircle className="h-5 w-5 text-red-500" />
        <h3 className="text-lg font-semibold">Recent Errors</h3>
      </div>
      {errors.length === 0 ? (
        <p className="text-sm text-slate-500">No errors found. Your system is healthy! 🎉</p>
      ) : (
        <div className="space-y-3">
          {errors.map((error) => (
            <div
              key={error.id}
              className="rounded-md border border-red-500/20 bg-red-500/5 p-3 dark:bg-red-500/10"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{error.message}</p>
                  <p className="mt-1 text-xs text-slate-500">
                    {error.serviceName} • {formatRelative(error.timestamp, new Date())}
                  </p>
                </div>
                <span className="shrink-0 rounded bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-500">
                  ERROR
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
