import { useState } from "react";
import AdminLogin from "../API's/AdminAPI/AdminLogin";
import logo from "../assests/HomePage/Logo-WithoutBg.png";

export function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    if (!email || !password) {
      setError("Please enter both email and password");
      setLoading(false);
      return;
    }

    const success = await AdminLogin(email, password);

    if (!success?.success) {
      setError(success?.message || "Invalid email or password.");
      setLoading(false);
    } else {
      setLoading(false);
      window.location.href = "/admindashboard";
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* DevCaps Logo */}
        <div className="text-center mb-8">
          <div className="mx-auto w-24 h-24 mb-4 flex items-center justify-center">
            <img src={logo} alt="DevCaps" className="w-full h-full object-contain" />
          </div>
          <p className="text-gray-600 mt-2">Admin Panel Access</p>
        </div>

        {/* Card */}
        <div className="border border-gray-200 rounded-lg shadow-md p-6 bg-white">
          <div className="mb-4">
            
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-black focus:outline-none"
              />
            </div>

            {error && (
              <div className="border border-red-200 bg-red-50 p-3 rounded-md">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          
        </div>
      </div>
    </div>
  );
}

export default Login;
