export function generateId() {
  return crypto.randomUUID?.() ?? `step-${Date.now()}-${Math.random()}`;
}
