"use client";
import Loading from "@/components/utilities/Loading";
import { useCronGetLogDetail } from "@/lib/api/cron";
import { useParams } from "next/navigation";

export default function CronDetailPage() {
  const { cronId, workspaceId, cronLogId } = useParams<{
    cronId: string;
    cronLogId: string;
    workspaceId: string;
  }>();

  const { data } = useCronGetLogDetail(workspaceId, cronId, cronLogId);

  if (!data) return <Loading />;

  const {
    data: { cron, log },
  } = data;

  const { Content, ...rest } = log;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{cron.Name}</h1>

      <pre className="p-4 bg-secondary my-4">
        {JSON.stringify(rest, undefined, 2)}
      </pre>

      <pre className="p-4 bg-secondary my-4 whitespace-pre-wrap text-wrap break-all">
        {Content}
      </pre>
    </div>
  );
}
