import { useEffect, useRef, useState } from "react";
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";
import { useToast } from "../ui/toast-context";
import { PLAYLIST } from "../../data/playlist";
import cn from "../../utils/cn";

const NOTES = [
  { glyph: "♪", x: 30, delay: 0, drift: "10px", color: "#fb923c" },
  { glyph: "♫", x: 55, delay: 0.6, drift: "-8px", color: "#f472b6" },
  { glyph: "♬", x: 45, delay: 1.2, drift: "14px", color: "#38bdf8" },
  { glyph: "♪", x: 65, delay: 1.8, drift: "-12px", color: "#34d399" },
];

function Speaker({ playing }) {
  return (
    <div
      className="relative h-16 w-16 shrink-0 rounded-full border-[3px] border-amber-950/60 bg-amber-950/80 shadow-inner sm:h-20 sm:w-20"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.6) 1px, transparent 1.4px)",
        backgroundSize: "6px 6px",
      }}
    >
      {playing && (
        <div className="pointer-events-none absolute inset-0 overflow-visible">
          {NOTES.map((note, index) => (
            <span
              key={index}
              className="absolute bottom-1/2 animate-note-float text-sm font-bold"
              style={{
                left: `${note.x}%`,
                color: note.color,
                animationDelay: `${note.delay}s`,
                "--drift": note.drift,
              }}
            >
              {note.glyph}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/** A hand-painted village radio — lives only on the Music page. */
export default function MusicPlayer() {
  const audioRef = useRef(null);
  const isPlayingRef = useRef(false);
  const hasWarnedRef = useRef(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const { notify } = useToast();

  const track = PLAYLIST[trackIndex];

  const goNext = () => setTrackIndex((index) => (index + 1) % PLAYLIST.length);
  const goPrev = () => setTrackIndex((index) => (index - 1 + PLAYLIST.length) % PLAYLIST.length);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setProgress(audio.currentTime);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onPlay = () => {
      setIsPlaying(true);
      isPlayingRef.current = true;
    };
    const onPause = () => {
      setIsPlaying(false);
      isPlayingRef.current = false;
    };
    const onEnded = () => {
      isPlayingRef.current = true;
      goNext();
    };
    const onError = () => {
      setIsPlaying(false);
      isPlayingRef.current = false;
      if (hasWarnedRef.current) return;
      hasWarnedRef.current = true;
      notify({
        title: "Couldn't load track",
        description: "Check that the file exists in public/audio/.",
        variant: "error",
      });
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [notify]);

  // Reload whenever the track changes, and keep playing if we already were.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setProgress(0);
    audio.load();

    if (isPlayingRef.current) {
      audio.play().catch(() => {
        notify({
          title: "Couldn't play track",
          description: "Check that the file exists in public/audio/.",
          variant: "error",
        });
      });
    }
  }, [trackIndex, notify]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      return;
    }

    audio.play().catch(() => {
      notify({
        title: "Couldn't play track",
        description: "Check that the file exists in public/audio/.",
        variant: "error",
      });
    });
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * duration;
  };

  const percent = duration ? (progress / duration) * 100 : 0;

  return (
    <div className="relative mx-auto w-full max-w-lg">
      <audio ref={audioRef} src={track.src} preload="none" />

      {/* Antenna */}
      <div
        aria-hidden="true"
        className="absolute -top-8 right-10 h-9 w-[3px] origin-bottom rotate-[18deg] rounded-full bg-slate-300 dark:bg-slate-400"
      >
        <span className="absolute -left-[3px] -top-1 h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-400" />
      </div>

      <div
        className="relative overflow-hidden rounded-[2rem] border-4 border-amber-950/50 bg-gradient-to-b
                   from-amber-600 via-amber-700 to-amber-900 p-4 shadow-2xl sm:p-5"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "repeating-linear-gradient(112deg, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 2px, transparent 2px, transparent 7px)",
          }}
        />

        <div className="relative flex items-center gap-3 sm:gap-4">
          <Speaker playing={isPlaying} />

          <div className="min-w-0 flex-1">
            <div className="rounded-lg border border-black/40 bg-slate-950/90 px-3 py-2 text-center shadow-inner">
              <p className="font-mono text-[10px] font-semibold tracking-[0.3em] text-emerald-400">
                FM 98.3
              </p>
              <p className="truncate font-mono text-xs text-amber-300 sm:text-sm">{track.title}</p>
              <p className="truncate font-mono text-[10px] text-amber-300/60">{track.artist}</p>
            </div>

            <div
              onClick={handleSeek}
              role="slider"
              aria-label="Seek"
              aria-valuenow={Math.round(percent)}
              aria-valuemin={0}
              aria-valuemax={100}
              className="mt-2.5 h-1.5 cursor-pointer rounded-full bg-black/30"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-300 transition-[width]"
                style={{ width: `${percent}%` }}
              />
            </div>

            <p className="mt-1.5 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-amber-100/80">
              Village Folk Beats
            </p>
          </div>

          <Speaker playing={isPlaying} />
        </div>

        <div className="relative mt-4 flex items-center justify-center gap-4 sm:gap-5">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute" : "Mute"}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-amber-950/50
                       bg-gradient-to-br from-amber-300 to-amber-500 text-amber-950 shadow active:scale-95"
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous track"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-amber-950/50
                       bg-gradient-to-br from-amber-300 to-amber-500 text-amber-950 shadow transition-transform hover:scale-105 active:scale-95"
          >
            <SkipBack size={15} />
          </button>

          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-emerald-900/50",
              "bg-gradient-to-br from-emerald-400 to-emerald-600 text-emerald-950 shadow-lg",
              "transition-transform hover:scale-105 active:scale-95",
            )}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} className="translate-x-0.5" />}
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next track"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-amber-950/50
                       bg-gradient-to-br from-amber-300 to-amber-500 text-amber-950 shadow transition-transform hover:scale-105 active:scale-95"
          >
            <SkipForward size={15} />
          </button>

          <span className="hidden shrink-0 text-[10px] font-bold uppercase tracking-[0.25em] text-amber-100/70 sm:inline">
            {trackIndex + 1} / {PLAYLIST.length}
          </span>
        </div>
      </div>
    </div>
  );
}
