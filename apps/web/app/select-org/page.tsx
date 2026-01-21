"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type Org = {
  id: string;
  name: string;
  role: string;
};

export default function SelectOrgPage() {
  const [orgs, setOrgs] = useState<Org[]>([]);

  useEffect(() => {
    apiFetch("me/organizations").then((res) => {
      setOrgs(res.data);
    });
  }, []);

  function selectOrg(org: Org) {
    localStorage.setItem("org", JSON.stringify(org));
    window.location.href = "/projects";
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="space-y-4 w-full max-w-md">
        <h1 className="text-xl font-semibold text-center">
          Select an organization
        </h1>

        {orgs.map((org) => (
          <Card key={org.id} className="p-4 flex justify-between items-center">
            <div>
              <div className="font-medium">{org.name}</div>
              <div className="text-sm text-muted-foreground">
                Role: {org.role}
              </div>
            </div>

            <Button onClick={() => selectOrg(org)}>Enter</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
