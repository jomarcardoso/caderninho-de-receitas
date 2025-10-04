export function generateClasses(
  object: Record<string, boolean | string | undefined | null>,
): string {
  return Object.entries(object)
    .reduce((classes, [className, statement]) => {
      if (statement) {
        return `${classes} ${className}`;
      }

      return classes;
    }, '')
    .trim();
}
