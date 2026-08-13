import TryOnPhoneCard from "../../components/qr/TryOnPhoneCard";

/** Small-screen equivalent of the desktop floating button — its own tab instead. */
export default function TryPhoneView() {
  return (
    <div className="mx-auto flex max-w-md animate-fade-up flex-col items-center py-10">
      <TryOnPhoneCard />
    </div>
  );
}
