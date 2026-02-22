import { useRef, useEffect } from "react";
import { registerSection, unregisterSection } from "./particleStore";

// Stable unique IDs across hot-reloads (module-level counter)
let _counter = 0;
const uid = () => `ds-${++_counter}`;

/**
 * DisintegrationWrapper
 *
 * Registers the inner <section> (or the wrapper div itself) with particleStore
 * so that tick() can apply clip-path and generate particles when the element
 * crosses the fixed LINE_Y threshold near the top of the viewport.
 *
 * No scroll listeners here — all that logic lives in particleStore.tick().
 */
export default function DisintegrationWrapper({ children }) {
  const wrapRef = useRef(null);
  const idRef   = useRef(uid());

  useEffect(() => {
    // Prefer the inner <section> element for accurate clip geometry.
    const target =
      wrapRef.current?.querySelector("section") || wrapRef.current;
    registerSection(idRef.current, target);
    return () => unregisterSection(idRef.current);
  }, []);

  return <div ref={wrapRef}>{children}</div>;
}
