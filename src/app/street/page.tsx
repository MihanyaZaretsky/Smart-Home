import { CameraCard } from "@/components/Street/CameraCard";
import { PageTransition } from "@/components/PageTransition";
import { TopBar } from "@/components/TopBar";

export default function StreetPage() {
  return (
    <PageTransition className="pb-20">
      <TopBar title="Улица" showSettings />
      <div className="p-5 grid grid-cols-1 gap-5 max-w-md md:max-w-none mx-auto">
        <CameraCard />
      </div>
    </PageTransition>
  );
}
