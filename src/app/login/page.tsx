"use client";
//  form login/register
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const url = isRegister
      ? "http://localhost:4000/auth/register"
      : "http://localhost:4000/auth/login";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || JSON.stringify(data));

      if (isRegister) {
        setMessage("Đăng ký thành công! Bây giờ thử login nhé.");
      } else {
        localStorage.setItem("token", data.access_token);
        setMessage("Đăng nhập thành công!");
      }
    } catch (err: any) {
      setMessage("Lỗi: " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">{isRegister ? "Register" : "Login"}</h1>
      {message && <p className="mb-4 text-red-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      <button
        className="mt-4 text-sm underline"
        onClick={() => {
          setIsRegister(!isRegister);
          setMessage("");
        }}
      >
        {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
      </button>
    </div>
  );
}
