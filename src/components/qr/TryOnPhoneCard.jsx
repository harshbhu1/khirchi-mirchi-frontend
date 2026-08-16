import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Smartphone } from "lucide-react";

export const TRY_ON_PHONE_URL = "https://harshbhu1.github.io/khirchi-mirchi-frontend/upload";

/** Generates the QR code client-side, no network round-trip needed. */
export default function TryOnPhoneCard() {
  const [qrDataUrl, setQrDataUrl] = useState(null);

  useEffect(() => {
    let cancelled = false;

    QRCode.toDataURL(TRY_ON_PHONE_URL, {
      width: 220,
      margin: 1,
      color: { dark: "#1c1917", light: "#ffffff" },
    }).then((url) => {
      if (!cancelled) setQrDataUrl(url);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
        <Smartphone size={20} />
      </span>

      <div>
        <h2 className="text-base font-bold text-slate-900 dark:text-white">Try it on your phone</h2>
        <p className="mt-1 max-w-xs text-xs text-slate-500 dark:text-slate-400">
          Scan this code with your phone&apos;s camera to open the Upload page.
        </p>
      </div>

      <div className="flex h-56 w-56 items-center justify-center rounded-2xl border border-slate-200 bg-white p-3 shadow-soft dark:border-slate-800">
        {qrDataUrl ? (
          <img
            src={qrDataUrl}
            alt="QR code to open Khirchi Mirchi on your phone"
            className="h-full w-full"
          />
        ) : (
          <div className="h-full w-full animate-pulse rounded-xl bg-slate-100 dark:bg-slate-800" />
        )}
      </div>

      <p className="max-w-xs break-all text-[11px] text-slate-400">{TRY_ON_PHONE_URL}</p>
    </div>
  );
}
