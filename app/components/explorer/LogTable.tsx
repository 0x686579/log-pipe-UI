"use client";
import {useTable, tableFeatures, ColumnDef, flexRender} from "@tanstack/react-table";
import { formatRelative } from "date-fns";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Loader2 } from "lucide-react";

const LEVEL_STYLES: Record<string, string> = {
  INFO: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  WARN: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  ERROR: "bg-red-500/10 text-red-600 dark:text-red-400",
  DEBUG: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
};

const features = tableFeatures({})
const columns:Array<ColumnDef<typeof features,any>> = [
	{
	accessorKey:"timestamp",
	header: "Time",
	cell: (info:any) => (
      		<span className="whitespace-nowrap text-xs text-slate-500">
        	{formatRelative(info.getValue(), new Date())}
      		</span>)},

  {accessorKey:"level",
    header: "Level",
    cell: (info:any) => (
      <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${LEVEL_STYLES[info.getValue()]}`}>
        {info.getValue()}
      </span>
    ),
  },
  {accessorKey:"serviceName", 
    header: "Service",
    cell: (info:any) => <span className="font-mono text-xs">{info.getValue()}</span>,
  },
  {accessorKey:"message",
    header: "Message",
    cell: (info:any) => (
      <div className="min-w-0">
        <p className="truncate text-sm">{info.getValue()}</p>
        {info.row.original.metadata && (
          <p className="truncate text-xs text-slate-500">
            {JSON.stringify(info.row.original.metadata)}
          </p>
        )}
      </div>
    ),
  },
];

export function LogTable({ data, meta, loading, onPageChange }: any) {
  const table = useTable({
    key:"log-table",
    features,
    columns,
    data,
  });

  return (
    <div className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
                    style={{ width: 20 }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {loading ? (
              <tr>
                <td colSpan={4} className="py-12 text-center">
                  <Loader2 className="mx-auto h-5 w-5 animate-spin text-slate-400" />
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-sm text-slate-500">
                  No logs found matching your filters.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  {row.getAllCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-slate-200 px-4 py-3 dark:border-slate-800">
        <div className="text-xs text-slate-500">
          Showing{" "}
          <span className="font-medium text-slate-900 dark:text-slate-50">
            {meta.total === 0 ? 0 : (meta.page - 1) * meta.limit + 1}
          </span>{" "}
          to{" "}
          <span className="font-medium text-slate-900 dark:text-slate-50">
            {Math.min(meta.page * meta.limit, meta.total)}
          </span>{" "}
          of{" "}
          <span className="font-medium text-slate-900 dark:text-slate-50">{meta.total}</span> results
        </div>
        <div className="flex items-center gap-1">
          <PaginationButton onClick={() => onPageChange(1)} disabled={meta.page <= 1 || loading}>
            <ChevronsLeft className="h-4 w-4" />
          </PaginationButton>
          <PaginationButton onClick={() => onPageChange(meta.page - 1)} disabled={meta.page <= 1 || loading}>
            <ChevronLeft className="h-4 w-4" />
          </PaginationButton>
          <span className="px-3 text-xs text-slate-500">
            Page {meta.page} of {Math.max(1, meta.totalPages)}
          </span>
          <PaginationButton onClick={() => onPageChange(meta.page + 1)} disabled={meta.page >= meta.totalPages || loading}>
            <ChevronRight className="h-4 w-4" />
          </PaginationButton>
          <PaginationButton onClick={() => onPageChange(meta.totalPages)} disabled={meta.page >= meta.totalPages || loading}>
            <ChevronsRight className="h-4 w-4" />
          </PaginationButton>
        </div>
      </div>
    </div>
  );
}

function PaginationButton({ onClick, disabled, children }: any) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="rounded-md border border-slate-200 p-1.5 text-slate-500 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:hover:bg-slate-800"
    >
      {children}
    </button>
  );
}
