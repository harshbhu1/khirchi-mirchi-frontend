/**
 * Resolves once the number of <text> nodes inside `container` stops changing
 * across consecutive checks — used before rasterizing a chart, since some
 * Recharts label text (notably Pie's direct percent labels) commits to the
 * DOM in a later pass than the shape's own onAnimationEnd, by an amount that
 * varies too much to hardcode. Charts with no such deferred labels (their
 * text count is already stable — axis ticks render immediately) resolve on
 * the first check, so this costs nothing extra for those.
 */
export function waitForStableTextCount(
  container,
  { intervalMs = 100, stableRounds = 2, maxWaitMs = 2500 } = {},
) {
  return new Promise((resolve) => {
    const start = Date.now();
    let lastCount = -1;
    let stableStreak = 0;

    const tick = () => {
      const count = container.querySelectorAll("text").length;
      // eslint-disable-next-line no-console
      console.log("[waitForStableTextCount] tick count=", count, "elapsed=", Date.now() - start);

      if (count === lastCount) {
        stableStreak += 1;
      } else {
        stableStreak = 0;
        lastCount = count;
      }

      if (stableStreak >= stableRounds || Date.now() - start >= maxWaitMs) {
        resolve();
        return;
      }

      setTimeout(tick, intervalMs);
    };

    tick();
  });
}

export default waitForStableTextCount;
