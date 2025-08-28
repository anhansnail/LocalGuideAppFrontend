export const API =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const apiFetch = async (path: string, init?: RequestInit) => {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
};
