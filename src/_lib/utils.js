import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * #### Handle TailwindCSS ClassNames Conflict in Components
 *
 * **usage:**
 *
 * ```jsx
 * <div className={cn(string | string[] | {string: boolean} )} />
 * ```
 *
 * ---
 *
 * **examples:**
 *
 * ```jsx
 * <div className={cn('w-full bg-white', optional_classnames)} />
 *
 * <div className={cn('w-full', 'bg-white', 'border')} />
 *
 * <div className={cn(['w-full', 'bg-white'], {
 *   'w-max': isTrue
 * })} />
 * ```
 *
 * @return {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
