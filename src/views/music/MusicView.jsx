import AnimatedVillageTruck from "../../components/decor/AnimatedVillageTruck";
import MusicPlayer from "../../components/music/MusicPlayer";

/** Only route where the music player lives — it mounts and unmounts with this page. */
export default function MusicView() {
  return (
    <div className="flex h-full min-h-0 animate-fade-up flex-col gap-4">
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-3xl border border-slate-200 shadow-soft dark:border-slate-800">
        <AnimatedVillageTruck className="absolute inset-0 h-full w-full" />
      </div>

      <div className="shrink-0">
        <MusicPlayer />
      </div>
    </div>
  );
}
