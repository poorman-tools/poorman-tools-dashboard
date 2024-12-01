"use client";
import Loading from "@/components/utilities/Loading";
import cronstrue from "cronstrue";
import { fetchCronGetLogs } from "@/lib/api/cron";
import { useParams } from "next/navigation";
import {
  ResourceDetailItem,
  ResourceDetailSection,
  ResourceLink,
} from "@/components/resource";
import { Button } from "@/components/ui/button";
import LinkButton from "@/components/link-button";
import { useCallback, useEffect, useState } from "react";
import { CronAPIRecord, CronDetailLogRecord } from "@/lib/api/type";
import LoadMoreButton from "@/components/load-more-button";

export default function CronDetailPage() {
  const { cronId, workspaceId } = useParams<{
    cronId: string;
    workspaceId: string;
  }>();

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const [cron, setCron] = useState<CronAPIRecord>();
  const [logs, setLogs] = useState<CronDetailLogRecord[]>([]);

  useEffect(() => {
    fetchCronGetLogs(workspaceId, cronId, 20, undefined)
      .then((res) => {
        setCron(res.data.cron);
        setLogs(res.data.logs);
        setCursor(res.data.cursor);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cronId, workspaceId]);

  const onLoadMore = useCallback(() => {
    setLoadingMore(true);
    fetchCronGetLogs(workspaceId, cronId, 20, cursor)
      .then((res) => {
        setLogs((prev) => [...prev, ...res.data.logs]);
        setCursor(res.data.cursor);
      })
      .finally(() => {
        setLoadingMore(false);
      });
  }, [workspaceId, cronId, cursor]);

  if (loading) return <Loading />;
  if (!cron) return <Loading />;

  const expression = (cron.Setting.schedule.expression ?? "")
    .replace("cron(", "")
    .replace(")", "");

  const expressionReadable = cronstrue.toString(expression);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold text-white">{cron.Name}</h1>

      <div className="my-4 flex gap-2">
        <Button>Enable</Button>
        <LinkButton href={`/w/${workspaceId}/cron/${cronId}/edit`}>
          Edit
        </LinkButton>
      </div>

      <div className="grid grid-cols-2 mt-4 bg-secondary pb-4 mb-8 max-w-[800px] p-4 border-2 rounded-lg">
        <ResourceDetailSection>
          <ResourceDetailItem label="Name">{cron.Name}</ResourceDetailItem>
          <ResourceDetailItem label="Schedule">
            {expressionReadable}
          </ResourceDetailItem>
          <ResourceDetailItem label="Created At">
            {cron.CreatedAt}
          </ResourceDetailItem>
        </ResourceDetailSection>

        <ResourceDetailSection>
          <ResourceDetailItem label="Method">
            {cron.Setting.action.method}
          </ResourceDetailItem>
          <ResourceDetailItem label="URL">
            {cron.Setting.action.url}
          </ResourceDetailItem>
        </ResourceDetailSection>
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th className="w-[40px]">#</th>
            <th className="w-[220px]">Started At</th>
            <th className="w-[75px]">Status</th>
            <th className="w-[75px]">Success</th>
            <th className="w-[75px]">Duration</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, logIdx) => {
            return (
              <tr key={log.Id}>
                <td>{logIdx + 1}</td>
                <td>
                  <ResourceLink
                    href={`/w/${workspaceId}/cron/${cronId}/logs/${log.StartedAt}`}
                  >
                    {log.StartedAt}
                  </ResourceLink>
                </td>
                <td>{log.Status}</td>
                <td>{log.Success ? "Yes" : "No"}</td>
                <td>{Number(log.Duration | 0).toLocaleString()}ms</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>
              <LoadMoreButton
                text="Click here to load more logs"
                loading={loadingMore}
                onClick={onLoadMore}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
