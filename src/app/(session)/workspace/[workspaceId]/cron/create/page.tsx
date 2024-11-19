"use client";
import { CronSettingEditor } from "@/components/cron-editor";
import { Button } from "@/components/ui/button";
import { useCronCreate } from "@/lib/api/api-cron";
import { CronOptionInput } from "@/lib/api/type";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function CreateCronPage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const router = useRouter();

  const [setting, setSetting] = useState<CronOptionInput>({
    action: {
      method: "GET",
      url: "",
      type: "fetch",
    },
    description: "",
    schedule: {
      expression: "cron(0 * * * ? *)",
      type: "cron",
    },
    name: "",
  });

  const { trigger: createCron, isMutating } = useCronCreate(workspaceId);

  const onCreateCronClicked = useCallback(() => {
    createCron(setting).then((data) => {
      const cronId = data?.data?.Id;
      if (cronId) {
        router.push(`/workspace/${workspaceId}/cron/${cronId}`);
      }
    });
  }, [workspaceId, createCron, setting, router]);

  return (
    <div className="p-4 max-w-[700px] flex flex-col gap-4">
      <h1 className="font-bold text-xl mb-4">Create Cronjob</h1>
      <CronSettingEditor value={setting} onChange={setSetting} />

      <div>
        <Button disabled={isMutating} onClick={onCreateCronClicked}>
          Create Cron
        </Button>
      </div>
    </div>
  );
}
