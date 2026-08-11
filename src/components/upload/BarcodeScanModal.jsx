import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NotFoundException } from "@zxing/library";
import { BrowserMultiFormatReader } from "@zxing/browser";
import jsQR from "jsqr";
import {
  Barcode,
  Camera,
  CircleCheck,
  CircleX,
  ImagePlus,
  ListPlus,
  LoaderCircle,
  X,
} from "lucide-react";
import { useWorkbook } from "../../context/workbook-context";
import { useToast } from "../ui/toast-context";
import cn from "../../utils/cn";

const STATUS = { idle: "idle", decoding: "decoding", found: "found", error: "error" };

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Couldn't load that image."));
    image.src = url;
  });
}

function getImageData(image) {
  const canvas = document.createElement("canvas");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0);

  return context.getImageData(0, 0, canvas.width, canvas.height);
}

/**
 * zxing-js covers 1D formats (EAN/UPC/Code128) reliably, but its QR reader
 * misses codes that decode fine elsewhere — jsQR is dedicated and more
 * robust for QR specifically, so it goes first; zxing covers everything else.
 */
async function decodeBarcode(image, reader) {
  const imageData = getImageData(image);
  const qr = jsQR(imageData.data, imageData.width, imageData.height);

  if (qr) return { text: qr.data, format: "QR CODE" };

  const result = await reader.decodeFromImageElement(image);
  return { text: result.getText(), format: formatLabel(result) };
}

/** Human-friendly labels for the zxing BarcodeFormat enum values we care about. */
function formatLabel(result) {
  try {
    return String(result.getBarcodeFormat()).replace(/_/g, " ");
  } catch {
    return "Barcode";
  }
}

export default function BarcodeScanModal({ open, onClose }) {
  const { workbook, activeSheetIndex, addRow } = useWorkbook();
  const { notify } = useToast();

  const [status, setStatus] = useState(STATUS.idle);
  const [preview, setPreview] = useState(null);
  const [decoded, setDecoded] = useState(null);
  const [error, setError] = useState(null);

  const readerRef = useRef(null);
  const objectUrlRef = useRef(null);

  const getReader = () => {
    if (!readerRef.current) readerRef.current = new BrowserMultiFormatReader();
    return readerRef.current;
  };

  const reset = useCallback(() => {
    setStatus(STATUS.idle);
    setDecoded(null);
    setError(null);
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setPreview(null);
  }, []);

  useEffect(() => {
    if (!open) reset();
  }, [open, reset]);

  // Only static-image decoding is used here, so there is no stream to release on unmount.
  useEffect(() => () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
  }, []);

  const handleFile = async (file) => {
    if (!file) return;

    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;

    setPreview(url);
    setDecoded(null);
    setError(null);
    setStatus(STATUS.decoding);

    try {
      // Not decodeFromImageUrl(url): it decodes through an <img> it forces to
      // 200×200 regardless of the source size, which corrupts denser codes.
      // Loading the image ourselves keeps it at natural resolution.
      const image = await loadImage(url);
      const result = await decodeBarcode(image, getReader());
      setDecoded(result);
      setStatus(STATUS.found);
    } catch (decodeError) {
      const message =
        decodeError instanceof NotFoundException
          ? "No barcode could be found in that photo. Try a closer, well-lit shot."
          : decodeError?.message || "Couldn't decode that image.";
      setError(message);
      setStatus(STATUS.error);
    }
  };

  const activeSheet = workbook?.sheets[activeSheetIndex];

  const handleAddToTable = () => {
    if (!decoded) return;

    if (activeSheet) {
      addRow(activeSheetIndex, [decoded.text]);
      notify({
        title: "Row added",
        description: `“${decoded.text}” added to ${activeSheet.name}`,
        variant: "success",
      });
    } else {
      addRow(0, [decoded.text, decoded.format, new Date().toLocaleString()], {
        columns: ["Barcode value", "Format", "Scanned at"],
        sheetName: "Scanned barcodes",
        fileName: "Scanned barcodes.xlsx",
      });
      notify({
        title: "Table created",
        description: `New sheet started from “${decoded.text}”`,
        variant: "success",
      });
    }

    onClose();
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Scan a barcode"
            onClick={(event) => event.stopPropagation()}
            className="card w-full max-w-md overflow-hidden"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  <Barcode size={18} />
                </span>
                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                  Scan a barcode
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4 p-4">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Take or upload a photo of a barcode — it&apos;s decoded right in your browser,
                then added as a new row.
              </p>

              {preview ? (
                <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
                  <img src={preview} alt="Barcode preview" className="h-40 w-full object-cover" />

                  {status === STATUS.decoding ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
                      <LoaderCircle size={26} className="animate-spin text-white" />
                    </div>
                  ) : null}
                </div>
              ) : null}

              <AnimatePresence mode="wait">
                {status === STATUS.found ? (
                  <motion.div
                    key="found"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:border-emerald-500/30 dark:bg-emerald-500/10"
                  >
                    <CircleCheck size={18} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <div className="min-w-0">
                      <p className="break-all font-mono text-sm font-semibold text-emerald-800 dark:text-emerald-300">
                        {decoded.text}
                      </p>
                      <p className="text-xs text-emerald-600/80 dark:text-emerald-400/70">
                        {decoded.format}
                      </p>
                    </div>
                  </motion.div>
                ) : null}

                {status === STATUS.error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-3 dark:border-rose-500/30 dark:bg-rose-500/10"
                  >
                    <CircleX size={18} className="mt-0.5 shrink-0 text-rose-600 dark:text-rose-400" />
                    <p className="text-sm text-rose-700 dark:text-rose-300">{error}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <div className="grid grid-cols-2 gap-3">
                <label
                  className={cn(
                    "btn-ghost cursor-pointer",
                    status === STATUS.decoding && "pointer-events-none opacity-60",
                  )}
                >
                  <Camera size={15} />
                  Take photo
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="sr-only"
                    onChange={(event) => {
                      handleFile(event.target.files?.[0]);
                      event.target.value = "";
                    }}
                  />
                </label>

                <label
                  className={cn(
                    "btn-ghost cursor-pointer",
                    status === STATUS.decoding && "pointer-events-none opacity-60",
                  )}
                >
                  <ImagePlus size={15} />
                  Upload image
                  <input
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={(event) => {
                      handleFile(event.target.files?.[0]);
                      event.target.value = "";
                    }}
                  />
                </label>
              </div>

              <motion.button
                type="button"
                onClick={handleAddToTable}
                disabled={status !== STATUS.found}
                whileHover={status === STATUS.found ? { scale: 1.02 } : undefined}
                whileTap={status === STATUS.found ? { scale: 0.98 } : undefined}
                className="btn-primary w-full"
              >
                <ListPlus size={16} />
                {activeSheet ? `Add to ${activeSheet.name}` : "Create table from scan"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
