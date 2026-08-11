/**
 * Joins class names, dropping falsy values.
 * Keeps conditional Tailwind classes readable at call sites.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default cn;
