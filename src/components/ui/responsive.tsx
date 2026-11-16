import type { ReactNode } from "react";

/**
 * Renders `mobile` below the tablet breakpoint and `children` from it up.
 * Used where the mobile frames carry shorter copy than the desktop ones.
 */
export function Swap({
  mobile,
  children,
}: {
  mobile: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      <span className="md:hidden">{mobile}</span>
      <span className="max-md:hidden">{children}</span>
    </>
  );
}
