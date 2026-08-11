import { useCallback, useRef, useState } from "react";
import { CloudUpload, FileSpreadsheet, LoaderCircle } from "lucide-react";
import { ACCEPT_ATTR, ACCEPTED_EXTENSIONS, MAX_FILE_SIZE, formatBytes } from "../../utils/excel";
import cn from "../../utils/cn";

export default function FileDropzone({ onFileSelected, isLoading, disabled }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // dragenter/dragleave fire for every child element, so count depth instead.
  const dragDepth = useRef(0);

  const openPicker = useCallback(() => {
    if (!disabled && !isLoading) inputRef.current?.click();
  }, [disabled, isLoading]);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      dragDepth.current = 0;
      setIsDragging(false);

      if (disabled || isLoading) return;

      const file = event.dataTransfer?.files?.[0];
      if (file) onFileSelected(file);
    },
    [disabled, isLoading, onFileSelected],
  );

  return (
    <div
      onDragEnter={(event) => {
        event.preventDefault();
        dragDepth.current += 1;
        setIsDragging(true);
      }}
      onDragOver={(event) => event.preventDefault()}
      onDragLeave={(event) => {
        event.preventDefault();
        dragDepth.current -= 1;
        if (dragDepth.current <= 0) setIsDragging(false);
      }}
      onDrop={handleDrop}
      className={cn(
        "group relative overflow-hidden rounded-2xl border-2 border-dashed p-8 text-center sm:p-12",
        "transition-all duration-300 ease-out",
        isDragging
          ? "scale-[1.01] border-brand-500 bg-brand-500/5 shadow-glow"
          : "border-slate-300 bg-white hover:border-brand-400 hover:bg-brand-500/[0.03] dark:border-slate-700 dark:bg-slate-900 dark:hover:border-brand-500/70",
        (disabled || isLoading) && "pointer-events-none opacity-70",
      )}
    >
      {/* Soft moving glow behind the icon */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute left-1/2 top-0 h-40 w-40 -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl transition-opacity duration-500",
          isDragging ? "opacity-100" : "opacity-0 group-hover:opacity-60",
        )}
      />

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_ATTR}
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onFileSelected(file);
          // Reset so re-picking the same file still fires onChange.
          event.target.value = "";
        }}
      />

      <div className="relative flex flex-col items-center gap-4">
        <span
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300",
            isDragging
              ? "scale-110 bg-brand-500 text-white"
              : "animate-float bg-brand-500/10 text-brand-600 group-hover:scale-105 dark:text-brand-400",
          )}
        >
          {isLoading ? (
            <LoaderCircle size={28} className="animate-spin" />
          ) : isDragging ? (
            <FileSpreadsheet size={28} strokeWidth={2} />
          ) : (
            <CloudUpload size={28} strokeWidth={2} />
          )}
        </span>

        <div>
          <p className="text-base font-semibold text-slate-800 dark:text-slate-100">
            {isLoading
              ? "Reading your spreadsheet…"
              : isDragging
                ? "Drop it right here"
                : "Drag & drop your Excel file"}
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            or{" "}
            <button
              type="button"
              onClick={openPicker}
              className="font-semibold text-brand-600 underline-offset-4 hover:underline dark:text-brand-400"
            >
              browse from your device
            </button>
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {ACCEPTED_EXTENSIONS.map((extension) => (
            <span
              key={extension}
              className="rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400"
            >
              {extension}
            </span>
          ))}
          <span className="text-[11px] text-slate-400">up to {formatBytes(MAX_FILE_SIZE)}</span>
        </div>

        {isLoading ? (
          <div className="h-1 w-48 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <span className="block h-full w-1/2 animate-progress-sweep rounded-full bg-brand-500" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
