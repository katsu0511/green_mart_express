const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const handleSignup = async (name: string, email: string, password: string) => {
  const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) {
    const data = await res.json();
    return { message: data.error }
  }
};
