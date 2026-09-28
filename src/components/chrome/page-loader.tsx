"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Loader } from "@/components/ui/loader";

/**
 * Minimum time the loader stays visible once shown, so a fast client-side
 * nav (which this static site mostly is) doesn't flash the loader for one
 * frame — it's a deliberate beat, not a progress indicator for real latency.
 */
const MIN_VISIBLE_MS = 650;

/**
 * Full-screen loading curtain shown between route changes. Skips entirely
 * on first mount (nothing to transition from yet) and is disabled outright
 * for prefers-reduced-motion, rather than rendering a still frame that then
 * can't tell the reader anything happened.
 */
export function PageLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const isFirstRender = useRef(true);
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (reduceMotion) return;

    setVisible(true);
    clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => setVisible(false), MIN_VISIBLE_MS);

    return () => clearTimeout(hideTimeout.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (reduceMotion) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-background"
          aria-hidden="true"
        >
          <Loader />
        </motion.div>
      )}
    </AnimatePresence>
  );
}