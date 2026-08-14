import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PoemPage from "./PoemPage";
import { PAGES, POEM_AUTHOR, POEM_NOTE, POEM_TITLE } from "../../data/rashmirathi";
import cn from "../../utils/cn";
import "../../styles/poem.css";

/**
 * A book whose pages turn.
 *
 * The leaf being turned is rendered on top of the stack and rotated about the
 * spine — its transform-origin is the binding edge, with a perspective on the
 * container so the rotation reads as depth rather than a flat squash. Going
 * forward the right-hand leaf swings left (0 → -180°); going back it swings the
 * other way, so the motion always matches the direction of travel.
 *
 * Slower than a UI transition on purpose — paper has weight, and a fast flip
 * reads as a glitch. The easing accelerates the leaf off the spine and lets it
 * settle rather than stopping dead.
 */
const FLIP_MS = 950;
const FLIP_EASE = [0.45, 0.05, 0.25, 1];

/** Horizontal travel, in px, before a touch counts as a page swipe. */
const SWIPE_THRESHOLD = 55;
/** Beyond this much vertical travel it is a scroll, not a swipe. */
const SWIPE_MAX_DRIFT = 80;

export default function PoemBook() {
  const [index, setIndex] = useState(0);
  // The leaf currently mid-turn: { from, to, direction } or null.
  const [turning, setTurning] = useState(null);
  const timer = useRef(null);
  const touch = useRef(null);

  const total = PAGES.length;
  const canPrev = index > 0;
  const canNext = index < total - 1;

  /**
   * @param delta pages to move. The dots can jump several at once, so the
   *        animation direction is the sign of the delta, not the delta itself.
   */
  const turn = useCallback(
    (delta) => {
      if (turning || delta === 0) return; // ignore input mid-turn

      const to = index + delta;
      if (to < 0 || to >= total) return;

      setTurning({ from: index, to, direction: Math.sign(delta) });

      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        setIndex(to);
        setTurning(null);
      }, FLIP_MS);
    },
    [index, total, turning],
  );

  useEffect(() => () => clearTimeout(timer.current), []);

  // Arrow keys turn pages too — it is a book.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowRight") turn(1);
      if (event.key === "ArrowLeft") turn(-1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [turn]);

  /**
   * Touch swiping, for phones where the side buttons are hidden.
   * Swiping left (finger moves right → left) advances, matching the direction a
   * page physically travels when you turn it forward.
   */
  const onTouchStart = (event) => {
    const point = event.touches[0];
    touch.current = { x: point.clientX, y: point.clientY };
  };

  const onTouchEnd = (event) => {
    if (!touch.current) return;

    const point = event.changedTouches[0];
    const dx = point.clientX - touch.current.x;
    const dy = point.clientY - touch.current.y;
    touch.current = null;

    // A mostly-vertical gesture is the reader scrolling the page.
    if (Math.abs(dy) > SWIPE_MAX_DRIFT) return;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;

    turn(dx < 0 ? 1 : -1);
  };

  // While turning forward the page underneath is the destination; turning back,
  // the destination is revealed from the left, so the base stays put.
  const basePage = turning?.direction === 1 ? PAGES[turning.to] : PAGES[index];
  const basePageNumber = turning?.direction === 1 ? turning.to + 1 : index + 1;

  const navButton = (direction, label, Icon) => (
    <button
      type="button"
      onClick={() => turn(direction)}
      disabled={(direction === 1 ? !canNext : !canPrev) || Boolean(turning)}
      aria-label={label}
      className="poem-nav-btn"
    >
      <Icon size={22} />
    </button>
  );

  return (
    <div className="poem-shell">
      {/* Title */}
      <div className="text-center">
        <h1 className="poem-display text-2xl font-bold text-amber-900 sm:text-3xl dark:text-amber-300">
          {POEM_TITLE}
        </h1>
        <p className="poem-display text-xs text-slate-600 sm:text-sm dark:text-slate-400">
          {POEM_AUTHOR}
        </p>
      </div>

      {/* Book, flanked by its controls on wide screens. */}
      <div className="poem-stage">
        <div className="poem-side-nav">{navButton(-1, "पिछला पृष्ठ", ChevronLeft)}</div>

        <div
          className="poem-book-perspective"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="poem-book">
            {/* Spine and the stacked edges of the remaining leaves */}
            <span aria-hidden="true" className="poem-spine" />
            <span aria-hidden="true" className="poem-stack" />

            {/* Base leaf: what the reader sees settled */}
            <div className="poem-leaf">
              <PoemPage page={basePage} pageNumber={basePageNumber} totalPages={total} />
            </div>

            {/* The turning leaf */}
            <AnimatePresence>
              {turning ? (
                <motion.div
                  key={`${turning.from}-${turning.to}`}
                  className="poem-leaf poem-leaf-turning"
                  initial={{ rotateY: turning.direction === 1 ? 0 : -180 }}
                  animate={{ rotateY: turning.direction === 1 ? -180 : 0 }}
                  transition={{ duration: FLIP_MS / 1000, ease: FLIP_EASE }}
                >
                  {/* Front of the leaf — the page you are leaving. */}
                  <div className="poem-leaf-face poem-leaf-front">
                    <PoemPage
                      page={PAGES[turning.direction === 1 ? turning.from : turning.to]}
                      pageNumber={(turning.direction === 1 ? turning.from : turning.to) + 1}
                      totalPages={total}
                    />
                  </div>

                  {/* Back of the leaf — mirrored, so it reads correctly once flipped. */}
                  <div className="poem-leaf-face poem-leaf-back">
                    <PoemPage
                      page={PAGES[turning.direction === 1 ? turning.to : turning.from]}
                      pageNumber={(turning.direction === 1 ? turning.to : turning.from) + 1}
                      totalPages={total}
                    />
                  </div>

                  {/* Shadow that sweeps across as the paper lifts. */}
                  <motion.span
                    aria-hidden="true"
                    className="poem-leaf-shadow"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.45, 0.45, 0] }}
                    transition={{ duration: FLIP_MS / 1000, times: [0, 0.3, 0.7, 1] }}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <div className="poem-side-nav">{navButton(1, "अगला पृष्ठ", ChevronRight)}</div>
      </div>

      {/* Footer controls. On phones these replace the side buttons. */}
      <div className="poem-footer">
        <div className="poem-inline-nav">
          <button
            type="button"
            onClick={() => turn(-1)}
            disabled={!canPrev || Boolean(turning)}
            className="poem-btn"
          >
            <ChevronLeft size={15} />
            पिछला
          </button>

          <span className="poem-display min-w-[4.5rem] text-center text-xs text-slate-600 dark:text-slate-400">
            {index + 1} / {total}
          </span>

          <button
            type="button"
            onClick={() => turn(1)}
            disabled={!canNext || Boolean(turning)}
            className="poem-btn"
          >
            अगला
            <ChevronRight size={15} />
          </button>
        </div>

        {/* Progress dots, one per page */}
        <div className="flex flex-wrap items-center justify-center gap-1">
          {PAGES.map((page, i) => (
            <button
              key={page.id}
              type="button"
              onClick={() => turn(i - index)}
              aria-label={`पृष्ठ ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === index
                  ? "w-5 bg-amber-600 dark:bg-amber-400"
                  : "w-1.5 bg-slate-300 hover:bg-slate-400 dark:bg-slate-700",
              )}
            />
          ))}
        </div>

        <p className="poem-display text-center text-[11px] leading-snug text-slate-500 dark:text-slate-500">
          {POEM_NOTE}
        </p>

        <p className="poem-display text-center text-[11px] text-slate-400 lg:hidden">
          पन्ना पलटने के लिए बाएँ या दाएँ स्वाइप करें
        </p>
      </div>
    </div>
  );
}
