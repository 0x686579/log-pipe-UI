"use client";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { LogTable } from "./LogTable";
import { FilterBar } from "./FilterBar";

export function LogExplorer({ services }: { services: string[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/logs?${searchParams.toString()}`);
      setData(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const updateFilters = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (!value) params.delete(key);
      else params.set(key, value);
    }
    if (updates.search !== undefined || updates.level !== undefined || updates.service !== undefined) {
      params.set("page", "1");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <FilterBar
        services={services}
        currentSearch={searchParams.get("search") || ""}
        currentLevel={searchParams.get("level") || undefined}
        currentService={searchParams.get("service") || undefined}
        onFilterChange={updateFilters}
      />
      <LogTable
        data={data?.data || []}
        meta={data?.meta || { total: 0, page: 1, limit: 20, totalPages: 0 }}
        loading={loading}
        onPageChange={(page:string) => updateFilters({ page: String(page) })}
      />
    </div>
  );
}
