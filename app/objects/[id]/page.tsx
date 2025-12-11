import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ObjectDetail } from "@/components/ObjectDetail";
import { getStolenObjectById, stolenObjects } from "@/lib/objects";

export function generateStaticParams() {
  return stolenObjects.map((o) => ({ id: o.id }));
}

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const object = getStolenObjectById(params.id);

  if (!object) {
    return { title: "Object not found" };
  }

  return {
    title: `${object.title} — Stolen Objects`,
    description: `${object.objectType} from ${object.origin}. Reference: ${object.caseReference}.`,
  };
}

export default function ObjectPage({ params }: { params: { id: string } }) {
  const object = getStolenObjectById(params.id);
  if (!object) notFound();

  return (
    <main>
      <ObjectDetail object={object} />
    </main>
  );
}
