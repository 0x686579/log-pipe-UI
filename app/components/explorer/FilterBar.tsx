
"use client";
import { Search, X } from "lucide-react";
import { useState } from "react";

const LEVELS = ["INFO", "WARN", "ERROR", "DEBUG"];

export function FilterBar({
  services,
  currentSearch,
  currentLevel,
  currentService,
  onFilterChange,
}: any) {
  const [searchInput, setSearchInput] = useState(currentSearch);

  const handleSearch = () => {
    onFilterChange({ search: searchInput || undefined });
  };

  const clearAll = () => {
    setSearchInput("");
    onFilterChange({ search: undefined, level: undefined, service: undefined });
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <form onSubmit={(e) => {
				e.preventDefault()
				handleSearch}
			} className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search log messages..."
            className="w-full rounded-md border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800"
          />
        </div>
        <select
          value={currentLevel || ""}
          onChange={(e) => onFilterChange({ level: e.target.value || undefined })}
          className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800"
        >
          <option value="">All levels</option>
          {LEVELS.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>
        <select
          value={currentService || ""}
          onChange={(e) => onFilterChange({ service: e.target.value || undefined })}
          className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800"
        >
          <option value="">All services</option>
          {services.map((s:string) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {(currentSearch || currentLevel || currentService) && (
          <button
            type="button"
            onClick={clearAll}
            className="flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
          >
            <X className="h-3 w-3" /> Clear
          </button>
        )}
      </form>
    </div>
  );
}
