"use client";
import { useCronGetLogs } from "@/lib/api/api-cron";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CronDetailPage() {
  const { cronId, workspaceId } = useParams<{
    cronId: string;
    workspaceId: string;
  }>();

  const { data } = useCronGetLogs(workspaceId, cronId);

  if (!data) return <div>Loading...</div>;

  const { data: logs, cron } = data;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{cron.Name}</h1>

      <pre className="p-4 bg-secondary my-4">
        {JSON.stringify(cron, undefined, 2)}
      </pre>

      <h1 className="my-4 text-xl font-bold">Logs</h1>

      <table className="w-full">
        <thead>
          <tr>
            <th className="px-2 p-1 border text-left">Started At</th>
            <th className="px-2 p-1 border text-left">Status</th>
            <th className="px-2 p-1 border text-left">Success</th>
            <th className="px-2 p-1 border text-right">Duration</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => {
            return (
              <tr key={log.Id}>
                <td className="px-2 p-1 border text-left">
                  <Link
                    href={`/workspace/${workspaceId}/cron/${cronId}/logs/${log.StartedAt}`}
                  >
                    {log.StartedAt}
                  </Link>
                </td>
                <td className="px-2 p-1 border text-left">{log.Status}</td>
                <td className="px-2 p-1 border text-left">
                  {log.Success ? "Yes" : "No"}
                </td>
                <td className="px-2 p-1 border text-right">
                  {Number(log.Duration | 0).toLocaleString()}ms
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
