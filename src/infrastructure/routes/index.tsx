import { Button } from "@heroui/react";
import { createFileRoute } from "@tanstack/react-router";
import { Coins } from "lucide-react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="flex w-full flex-col items-center justify-end gap-4 py-8">
        <div className="flex w-full flex-col items-center gap-2">
          <span className="inline-flex items-center gap-1 text-4xl">
            <Coins className="bg-accent h-[1em] w-[1em] rounded-xl p-1" />
            <span className="font-heading font-semibold">ITALA</span>
          </span>
          <p className="font-heading text-xl font-medium">
            Spend with intention.
          </p>
          <p className="text-muted w-1/2 text-center text-xs">
            A calmer way to track every peso, plan ahead, and feel in control.
          </p>
        </div>
        <div className="flex w-full flex-col items-center gap-2">
          <Button className="w-full">Create an account</Button>
          <Button variant="secondary" className="w-full">
            I already have an account
          </Button>
        </div>
      </div>
    </>
  );
}
