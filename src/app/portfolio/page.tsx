import { PortfolioSummary } from "@/components/portfolio/PortfolioSummary";
import { AllocationBar } from "@/components/portfolio/AllocationBar";
import { HoldingsTable } from "@/components/portfolio/HoldingsTable";

export default function PortfolioPage() {
  return (
    <div className="flex flex-col gap-5 max-w-7xl mx-auto">
      <PortfolioSummary />
      <AllocationBar />
      <HoldingsTable />
    </div>
  );
}
