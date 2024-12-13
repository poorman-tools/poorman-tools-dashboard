"use client";
import { CronSettingEditor } from "@/components/cron-editor";
import { Button } from "@/components/ui/button";
import { useCronDetail, useCronUpdate } from "@/lib/api/cron";
import { CronOptionInput } from "@/lib/api/type";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";

function CronDetailEditPageBody({
  initialValue,
  workspaceId,
  cronId,
}: {
  initialValue: CronOptionInput;
  workspaceId: string;
  cronId: string;
}) {
  const router = useRouter();
  const { trigger: updateCron, isMutating } = useCronUpdate(
    workspaceId,
    cronId
  );
  const [value, setValue] = useState<CronOptionInput>(initialValue);

  const onSaveSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      updateCron(value).then(() => {
        router.push(`/w/${workspaceId}/cron/${cronId}`);
      });
    },
    [updateCron, value, router, cronId, workspaceId]
  );

  return (
    <form onSubmit={onSaveSubmit}>
      <div className="p-4 max-w-[700px] flex flex-col gap-4">
        <CronSettingEditor value={value} onChange={setValue} />
        <div className="flex justify-end">
          <Button disabled={isMutating}>Save</Button>
        </div>
      </div>
    </form>
  );
}

export default function CronDetailEditPage() {
  const { cronId, workspaceId } = useParams<{
    cronId: string;
    workspaceId: string;
  }>();
  const { data } = useCronDetail(workspaceId, cronId);

  if (!data) return <div>Loading</div>;

  return (
    <CronDetailEditPageBody
      initialValue={data.data.Setting}
      workspaceId={workspaceId}
      cronId={cronId}
    />
  );
}
