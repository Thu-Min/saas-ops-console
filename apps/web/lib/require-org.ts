export function requireOrg() {
  const org = localStorage.getItem("org");
  if (!org) {
    window.location.href = "/select-org";
    return null;
  }
  return JSON.parse(org);
}
