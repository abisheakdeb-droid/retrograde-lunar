import { TacticalLayout } from "@/components/layout/tactical-layout";
import { TrainingOverview } from "@/components/training/training-overview";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function TrainingPage() {
  return (
    <TacticalLayout
      headerTitle="Training & Development"
      headerSubtitle="Personnel Upskilling & Certification Matrix"
      actions={
        <Button className="gap-2">
            <PlusCircle className="w-4 h-4" />
            New Program
        </Button>
      }
    >
      <div className="p-6">
        <TrainingOverview />
      </div>
    </TacticalLayout>
  );
}
