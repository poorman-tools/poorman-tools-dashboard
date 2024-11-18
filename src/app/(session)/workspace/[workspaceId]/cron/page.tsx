"use client";
import { Button } from "@/components/ui/button";
import { useCronGetList } from "@/lib/api/api-cron";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CronListPage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const { data } = useCronGetList(workspaceId);

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Cronjobs</h1>

      <div className="my-4">
        <Button>New Cronjob</Button>
      </div>

      <table className="border w-full border-collapse">
        <thead>
          <tr>
            <th className="px-2 p-1 border text-left">Name</th>
            <th className="px-2 p-1 border text-left">Expression</th>
            <th className="px-2 p-1 border text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((cron) => {
            return (
              <tr key={cron.Id}>
                <td className="px-2 p-1 border">
                  <Link href={`/workspace/${workspaceId}/cron/${cron.Id}`}>
                    {cron.Name}
                  </Link>
                </td>
                <td className="px-2 p-1 border">
                  {cron.Setting.schedule.expression}
                </td>
                <td className="px-2 p-1 border">{cron.Status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
