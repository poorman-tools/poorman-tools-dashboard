export interface APIResponse<T = unknown> {
  data?: T;
  error?: string;
}

export interface MeRecord {
  Id: string;
  Name: string;
  Picture?: string;
  Workspaces: {
    Id: string;
    Name: string;
  }[];
}

export interface MeAPIResponse {
  data: MeRecord;
}
interface CronActionInput {
  type: "fetch";
  url: string;
  method: string;
  headers?: Record<string, string>;
  body?: string;
}

interface CronScheduleInput {
  type: "cron";
  expression: string;
}

export interface CronOptionInput {
  name: string;
  description: string;
  schedule: CronScheduleInput;
  action: CronActionInput;
}
export interface CronAPIRecord {
  Id: string;
  Name: string;
  Status: string;
  Setting: CronOptionInput;
  CreatedAt: string;
  FailedCount: number;
}

export interface CronListAPIResponse {
  data: CronAPIRecord[];
}

export interface CronDetailAPIResponse {
  data: CronAPIRecord;
}

export interface CronDetailLogRecord {
  Id: string;
  Status: string;
  Success: boolean;
  Duration: number;
  StartedAt: string;
  Content: string;
  Action?: CronActionInput;
}

export interface CronLogAPIResponse {
  data: {
    logs: CronDetailLogRecord[];
    cursor?: string;
    cron: CronAPIRecord;
  };
}

export interface CronLogDetailAPIResponse {
  data: { log: CronDetailLogRecord; cron: CronAPIRecord };
  error?: string;
}

export class ApiError extends Error {
  protected data: { error: string };

  constructor(data: { error: string }) {
    super(data.error);
    this.name = "API Error";
    this.data = data;
  }

  get message() {
    return this.data.error;
  }
}
