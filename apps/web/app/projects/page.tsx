"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { apiFetch } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

type Project = {
  id: string;
  name: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>();
  const [canCreate, setCanCreate] = useState(false);

  useEffect(() => {
    apiFetch("projects").then((res) => {
      setProjects(res.data);
      setCanCreate(res.capabilities.canCreate);
    });
  }, []);

  async function handleCreateProject() {
    const name = prompt("Project name");
    if (!name) return;

    await apiFetch("projects", {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    const res = await apiFetch("projects");
    setProjects(res.data);
  }

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Projects</h1>
        {canCreate && (
          <Button onClick={handleCreateProject}>Create Project</Button>
        )}
      </div>

      <div className="grid gap-4">
        {projects &&
          projects.map((p) => (
            <Link key={p.id} href={`/projects/${p.id}`}>
              <Card className="p-4 hover:bg-muted cursor-pointer">
                {p.name}
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
}
