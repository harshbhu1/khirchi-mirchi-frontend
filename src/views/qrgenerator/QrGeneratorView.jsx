import { useState } from "react";
import QRCode from "qrcode";
import { Download, LoaderCircle, QrCode, RotateCcw } from "lucide-react";
import { useToast } from "../../components/ui/toast-context";

const MAX_LENGTH = 300;

/** Turns any typed message into a scannable, downloadable QR code. */
export default function QrGeneratorView() {
  const [message, setMessage] = useState("");
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { notify } = useToast();

  const handleGenerate = async () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    setIsGenerating(true);

    try {
      const dataUrl = await QRCode.toDataURL(trimmed, {
        width: 320,
        margin: 1,
        color: { dark: "#1c1917", light: "#ffffff" },
      });
      setQrDataUrl(dataUrl);
    } catch {
      notify({
        title: "Couldn't generate QR code",
        description: "Try a shorter message.",
        variant: "error",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setQrDataUrl(null);
    setMessage("");
  };

  return (
    <div className="mx-auto max-w-xl animate-fade-up space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          QR Code Generator
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Type any message, generate a QR code for it, then download or show it to someone to scan.
        </p>
      </div>

      <div className="card space-y-4 p-5">
        <div>
          <label
            htmlFor="qr-message"
            className="mb-1.5 block text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            Message
          </label>
          <textarea
            id="qr-message"
            rows={4}
            value={message}
            maxLength={MAX_LENGTH}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Type the message you want hidden in the QR code…"
            className="input resize-none"
          />
          <p className="mt-1 text-right text-xs text-slate-400">
            {message.length}/{MAX_LENGTH}
          </p>
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={!message.trim() || isGenerating}
          className="btn-primary w-full"
        >
          {isGenerating ? (
            <LoaderCircle size={16} className="animate-spin" />
          ) : (
            <QrCode size={16} />
          )}
          Generate QR Code
        </button>
      </div>

      {qrDataUrl ? (
        <div className="card flex animate-scale-in flex-col items-center gap-4 p-6">
          <img
            src={qrDataUrl}
            alt="Generated QR code"
            className="h-56 w-56 rounded-xl border border-slate-200 dark:border-slate-800"
          />

          <div className="flex flex-wrap items-center justify-center gap-2">
            <a href={qrDataUrl} download="message-qr-code.png" className="btn-primary">
              <Download size={15} />
              Download
            </a>
            <button type="button" onClick={handleReset} className="btn-ghost">
              <RotateCcw size={15} />
              Start over
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
