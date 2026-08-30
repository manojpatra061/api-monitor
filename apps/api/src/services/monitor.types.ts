export type ApiHitResult = {
  success: boolean;
  statusCode: number;
  errorMessage: string | null;
  responseTimeInMs: number;
  checkedAt: string;
};
