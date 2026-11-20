import { LogExplorer } from "../components/explorer/LogExplorer";
import {SERVICES} from "../lib/data"

export default async function ExplorerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Log Explorer</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Search, filter, and browse all ingested logs.
        </p>
      </div>
      <LogExplorer services={SERVICES.map((s) => s)} />
    </div>
  );
}
