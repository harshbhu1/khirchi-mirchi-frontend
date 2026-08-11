import { useEffect, useState } from "react";
import { animate, useMotionValue } from "framer-motion";

/** Counts up/down to `value` whenever it changes, instead of snapping. */
export default function AnimatedNumber({ value, formatter = (n) => Math.round(n).toString() }) {
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(formatter(0));

  useEffect(() => {
    const controls = animate(motionValue, value || 0, {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(formatter(latest)),
    });

    return controls.stop;
    // motionValue is a stable ref from useMotionValue; only `value` should retrigger the tween.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <span>{display}</span>;
}
