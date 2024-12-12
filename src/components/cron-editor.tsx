"use client";
import { CronOptionInput } from "@/lib/api/type";
import { produce } from "immer";
import { Input } from "./input";
import { InputGroup } from "./input-group";
import { Label } from "./ui/label";

interface CronSettingEditorProps {
  value: CronOptionInput;
  onChange: (value: CronOptionInput) => void;
}

function parseCronExpression(expression: string) {
  if (expression.startsWith("cron(") && expression.endsWith(")")) {
    const parts = expression.slice(5, -1).split(" ");

    return [
      parts[0] ?? "0",
      parts[1] ?? "*",
      parts[2] ?? "*",
      parts[3] ?? "*",
      parts[4] ?? "?",
      parts[5] ?? "*",
    ];
  }

  return ["0", "*", "*", "*", "?", "*"];
}

export function CronSettingEditor({ value, onChange }: CronSettingEditorProps) {
  const [minute, hour, dayOfMonth, month, dayOfWeek, year] =
    parseCronExpression(value.schedule.expression);

  return (
    <div className="flex flex-col gap-4">
      <InputGroup>
        <Label>Name (*)</Label>
        <Input
          required
          minLength={3}
          value={value.name}
          placeholder="Name"
          onChange={(e) => {
            onChange(
              produce(value, (draft) => {
                draft.name = e.target.value;
              })
            );
          }}
        />
      </InputGroup>

      <InputGroup>
        <Label>Description</Label>
        <Input
          value={value.description}
          placeholder="Description"
          onChange={(e) => {
            onChange(
              produce(value, (draft) => {
                draft.description = e.target.value;
              })
            );
          }}
        />
      </InputGroup>

      <InputGroup>
        <Label>Schedule (*)</Label>
        <div className="flex gap-2">
          <Input
            required
            className="font-mono"
            placeholder="Minute"
            value={minute}
            onChange={(e) => {
              onChange(
                produce(value, (draft) => {
                  draft.schedule.expression = `cron(${e.currentTarget.value} ${hour} ${dayOfMonth} ${month} ${dayOfWeek} ${year})`;
                })
              );
            }}
          />

          <Input
            required
            className="font-mono"
            placeholder="Hour"
            value={hour}
            onChange={(e) => {
              onChange(
                produce(value, (draft) => {
                  draft.schedule.expression = `cron(${minute} ${e.currentTarget.value} ${dayOfMonth} ${month} ${dayOfWeek} ${year})`;
                })
              );
            }}
          />

          <Input
            required
            className="font-mono"
            placeholder="DayOfMonth"
            value={dayOfMonth}
            onChange={(e) => {
              onChange(
                produce(value, (draft) => {
                  draft.schedule.expression = `cron(${minute} ${hour} ${e.currentTarget.value} ${month} ${dayOfWeek} ${year})`;
                })
              );
            }}
          />

          <Input
            required
            className="font-mono"
            placeholder="Month"
            value={month}
            onChange={(e) => {
              onChange(
                produce(value, (draft) => {
                  draft.schedule.expression = `cron(${minute} ${hour} ${dayOfMonth} ${e.currentTarget.value} ${dayOfWeek} ${year})`;
                })
              );
            }}
          />

          <Input
            required
            className="font-mono"
            placeholder="DayOfWeek"
            value={dayOfWeek}
            onChange={(e) => {
              onChange(
                produce(value, (draft) => {
                  draft.schedule.expression = `cron(${minute} ${hour} ${dayOfMonth} ${month} ${e.currentTarget.value} ${year})`;
                })
              );
            }}
          />

          <Input
            required
            className="font-mono"
            placeholder="Year"
            value={year}
            onChange={(e) => {
              onChange(
                produce(value, (draft) => {
                  draft.schedule.expression = `cron(${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek} ${e.currentTarget.value})`;
                })
              );
            }}
          />
        </div>
      </InputGroup>

      <InputGroup>
        <Label>Action (*)</Label>
        <div className="flex gap-2">
          <Input
            required
            placeholder="Method"
            className="w-[150px]"
            value={value.action.method}
            onChange={(e) => {
              onChange(
                produce(value, (draft) => {
                  draft.action.method = e.target.value;
                })
              );
            }}
          />

          <Input
            required
            placeholder="URL"
            value={value.action.url}
            onChange={(e) => {
              onChange(
                produce(value, (draft) => {
                  draft.action.url = e.target.value;
                })
              );
            }}
          />
        </div>
      </InputGroup>
    </div>
  );
}
