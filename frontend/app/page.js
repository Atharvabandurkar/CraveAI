import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="pt-32 pb-20 px-4">
        <Button variant="primary" size="xl" className="bg-primary text-primary-foreground hover:bg-primary/90">
          Hemloo guys 
        </Button>
      </section>
    </div>
  );
}
