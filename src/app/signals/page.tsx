import { Suspense } from "react";
import { SignalsView } from "@/components/signals/SignalsView";

export default function SignalsPage() {
  return (
    <div className="flex flex-col gap-3 max-w-7xl mx-auto">
      <Suspense fallback={<div className="text-stone-400 text-[12px]">Loading…</div>}>
        <SignalsView />
      </Suspense>
    </div>
  );
}
