import { Header } from "@/components/Main page/Header";
import { ImageCard } from "@/components/Main page/ImageCard";
import { OfficeCard } from "@/components/Main page/OfficeCard";
import { HallwayCard } from "@/components/Main page/HallwayCard";
import { KitchenCard } from "@/components/Main page/KitchenCard";
import { BathroomCard } from "@/components/Main page/BathroomCard";
import { EventsCard } from "@/components/Main page/EventsCard";
import { StreetCard } from "@/components/Main page/StreetCard";
import { PageTransition } from "@/components/PageTransition";

export default function Home() {
  return (
    <PageTransition className="mx-auto w-full p-5 pb-20">
      <div className="max-w-md md:max-w-none mx-auto space-y-5 md:space-y-6">
        <Header />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="md:col-span-2 lg:col-span-3">
            <ImageCard />
          </div>
          <OfficeCard />
          <HallwayCard />
          <KitchenCard />
          <BathroomCard />
          <StreetCard />
          <div className="md:col-span-2 lg:col-span-3 h-full">
            <EventsCard />
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
