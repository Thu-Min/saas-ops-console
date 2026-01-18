"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { apiFetch } from "@/lib/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Project = {
  id: string;
  name: string;
};

type Capabilities = {
  canUpdate: boolean;
  canDelete: boolean;
};

export default function ProjectDetailPage() {
  const params = useParams();

  const [project, setProject] = useState<Project | null>(null);
  const [capabilities, setCapabilities] = useState<Capabilities>({
    canUpdate: false,
    canDelete: false,
  });

  useEffect(() => {
    apiFetch(`projects/${params.id}`).then((res) => {
      setProject(res.data);
      setCapabilities(res.capabilities);
    });
  }, [params.id]);

  if (!project) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <Card className="p-4">
        <h1 className="text-xl font-semibold">{project.name}</h1>
      </Card>

      <div className="flex gap-2">
        {capabilities.canUpdate && <Button>Edit</Button>}
        {capabilities.canDelete && (
          <Button variant="destructive">Delete</Button>
        )}
      </div>
    </div>
  );
}
