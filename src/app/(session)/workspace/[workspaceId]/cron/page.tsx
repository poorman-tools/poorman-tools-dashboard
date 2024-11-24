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
    <div>
      <div className="p-3 border-b border-b-accent shadow font-semibold text-white">
        <div>Cronjob</div>
      </div>

      <div className="my-4 px-4">
        <Link href={`/workspace/${workspaceId}/cron/create`}>
          <Button>New Cronjob</Button>
        </Link>
      </div>

      <div className="p-4">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="w-[250px]">Name</th>
              <th>Description</th>
              <th className="w-[150px]">Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((cron) => {
              return (
                <tr key={cron.Id}>
                  <td>
                    <Link href={`/workspace/${workspaceId}/cron/${cron.Id}`}>
                      {cron.Name}
                    </Link>
                  </td>
                  <td>{cron.Setting.schedule.expression}</td>
                  <td>{cron.Status}</td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
