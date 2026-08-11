import { useCallback } from "react";

/**
 * Copies text to the clipboard.
 * Falls back to a hidden textarea because navigator.clipboard is unavailable
 * on insecure origins (e.g. staging over plain http on a LAN address).
 */
function legacyCopy(text) {
  const textarea = document.createElement("textarea");

  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-9999px";
  textarea.style.opacity = "0";

  document.body.appendChild(textarea);
  textarea.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }

  textarea.remove();
  return copied;
}

export function useClipboard() {
  const copy = useCallback(async (value) => {
    const text = value === null || value === undefined ? "" : String(value);

    if (navigator.clipboard?.writeText && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch {
        // Permission denied or clipboard blocked — try the legacy path.
      }
    }

    return legacyCopy(text);
  }, []);

  return { copy };
}

export default useClipboard;
