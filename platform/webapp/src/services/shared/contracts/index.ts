export function validateApiResponse<T>(
  _schema: unknown,
  response: T,
): { success: true; data: T } {
  return { success: true, data: response };
}

export function formatValidationError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
