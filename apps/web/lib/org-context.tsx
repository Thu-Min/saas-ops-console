"use client";

import { createContext, useContext, useState } from "react";

type Org = {
  id: string;
  name: string;
  role: string;
};

const OrgContext = createContext<{
  org: Org | null;
  setOrg: (org: Org) => void;
}>({
  org: null,
  setOrg: () => {},
});

export function OrgProvider({ children }: { children: React.ReactNode }) {
  const [org, setOrg] = useState<Org | null>(null);

  return (
    <OrgContext.Provider value={{ org, setOrg }}>
      {children}
    </OrgContext.Provider>
  );
}

export const useOrg = () => useContext(OrgContext);
