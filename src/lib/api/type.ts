export interface MeAPIResponse {
  Id: string;
  Name: string;
  Picture?: string;
  Workspaces: {
    Id: string;
    Name: string;
  }[];
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
