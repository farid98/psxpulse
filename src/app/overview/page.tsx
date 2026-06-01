import { MarketMetrics } from "@/components/overview/MarketMetrics";
import { NewsDigest } from "@/components/overview/NewsDigest";
import { SectorSnapshot } from "@/components/overview/SectorSnapshot";
import { StockPicks } from "@/components/overview/StockPicks";

export default function OverviewPage() {
  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <MarketMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <NewsDigest />
        <SectorSnapshot />
      </div>

      <StockPicks />
    </div>
  );
}
