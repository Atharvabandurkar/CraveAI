"use client";

import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PantryPage() {
  return (
    <div className="mt-12 flex items-center justify-center gap-109">
  <div className="flex items-center gap-4">
    <div
      className="p-4 rounded-xl"
      style={{ backgroundColor: "#10B98120" }}
    >
      <Package size={40} style={{ color: "#10B981" }} />
    </div>

    <h1
      className="text-4xl font-bold"
      style={{ color: "#18181B" }}
    >
      My Pantry
    </h1>
  </div>

  <Button
    onClick={() => setIsModalOpen(true)}
    className="bg-[#10B981] hover:bg-[#059669] text-white gap-2"
    size="lg"
  >
    <Plus className="w-5 h-5" />
    Add to Pantry
  </Button>
</div>
  );
}