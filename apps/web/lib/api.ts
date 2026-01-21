export async function apiFetch(path: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  const org = JSON.parse(localStorage.getItem("org") || "null");

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(org ? { "X-Organization-Id": org.id } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}
