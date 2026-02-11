export const VERSION_MISMATCH_EVENT = "version-mismatch";

const VERSION_MISMATCH_PATTERNS = [
  /server action .* was not found/i,
  /failed to find server action/i,
];

function extractMessage(error: unknown): string {
  if (typeof error === "string") return error;
  if (error instanceof Error) return error.message;
  return String(error);
}

export function isVersionMismatchError(error: unknown): boolean {
  if (error == null) return false;
  const message = extractMessage(error);
  return VERSION_MISMATCH_PATTERNS.some((pattern) => pattern.test(message));
}
