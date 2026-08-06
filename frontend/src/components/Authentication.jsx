import { useNavigate} from "react-router-dom";
import { useState } from "react";
export default function Auth({ darkMode, onLogin }) {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const url = isLogin
      ? "http://localhost:5000/api/auth/login"
      : "http://localhost:5000/api/auth/register";

    const body = isLogin
      ? { email, password }
      : {
          name,
          username: name.toLowerCase().replace(/\s+/g, ""),
          email,
          password,
        };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
   console.log("LOGIN RESPONSE:", data);
    if (!res.ok) {
      alert(data.message);
      return;
    }

    localStorage.setItem("token", data.token);

    onLogin(data.user);

    navigate("/");
  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  }
};
 return (
  <div
    className={`min-h-screen flex ${
      darkMode
        ? "bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950"
        : "bg-gradient-to-br from-blue-50 via-white to-cyan-100"
    }`}
  >
   
    <div className="hidden lg:flex w-1/2 items-center justify-center p-16">
      <div className="max-w-lg">
        <h1 className="text-6xl font-extrabold text-blue-500 mb-6">
          Social-Buzz
        </h1>

        <h2
          className={`text-4xl font-bold mb-6 ${
            darkMode ? "text-white" : "text-gray-800"
          }`}
        >
          The easiest way to connect
<br />
with creators and friends.
        </h2>

       <p
  className={`text-lg leading-8 ${
    darkMode ? "text-gray-300" : "text-gray-700"
  }`}
>
  <div className="flex gap-10 mt-8 mb-10">

  <div>
    <h2 className="text-3xl font-bold text-blue-600">12K+</h2>
    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
      Active Users
    </p>
  </div>

  <div>
    <h2 className="text-3xl font-bold text-blue-600">5K+</h2>
    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
      Posts Daily
    </p>
  </div>

  <div>
    <h2 className="text-3xl font-bold text-blue-600">120+</h2>
    <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
      Communities
    </p>
  </div>

</div>
  Share ideas, dicover communities, chat with friends, and stay updated with what's happening around the world-all in one place.
</p>
<div className="grid grid-cols-2 gap-4 mt-10">
  <div className={`rounded-2xl p-5 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
  darkMode
    ? "bg-white/10 hover:bg-white/20"
    : "bg-blue-50 hover:bg-blue-100"
}`}>
    <h3 className="font-bold text-xl">🔥 Trending</h3>
    <p className="text-sm mt-2">Explore what's happening worldwide.</p>
  </div>

  <div className={`rounded-2xl p-5 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
  darkMode
    ? "bg-white/10 hover:bg-white/20"
    : "bg-blue-50 hover:bg-blue-100"
}`}>
    <h3 className="font-bold text-xl">💬 Chat</h3>
    <p className="text-sm mt-2">Stay connected with your friends.</p>
  </div>

  <div className={`rounded-2xl p-5 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
  darkMode
    ? "bg-white/10 hover:bg-white/20"
    : "bg-blue-50 hover:bg-blue-100"
}`}>
    <h3 className="font-bold text-xl">❤️ Posts</h3>
    <p className="text-sm mt-2">Share your daily moments instantly.</p>
  </div>

  <div className={`rounded-2xl p-5 backdrop-blur-md cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
  darkMode
    ? "bg-white/10 hover:bg-white/20"
    : "bg-blue-50 hover:bg-blue-100"
}`}>
    <h3 className="font-bold text-xl">🚀 Discover</h3>
    <p className="text-sm mt-2">Find creators and communities.</p>
  </div>
</div>
      </div>
    </div>

    
    <div className="flex w-full lg:w-1/2 items-center justify-center p-8">

      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md backdrop-blur-xl rounded-3xl shadow-2xl border p-10 transition-all ${
         darkMode
  ? "bg-slate-900/70 border-slate-700 text-white shadow-blue-900/30"
  : "bg-white border-gray-200 shadow-2xl"
        }`}
      >

        <div className="text-center mb-8">

          <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center 
           bg-gradient-to-r from-blue-600 to-cyan-500 text-2xl font-bold text-white mb-4 shadow-lg">
            SB
          </div>

          <h2 className="text-3xl font-bold">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          <p
  className={`mt-2 ${
    darkMode ? "text-gray-400" : "text-gray-600"
  }`}
>
            {isLogin
              ? "Login to continue"
              : "Join the Social-Buzz community"}
          </p>

        </div>

        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-5 py-4 rounded-xl border mb-5 outline-none transition
${
  darkMode
    ? "bg-slate-900/40 border-gray-600 focus:border-blue-500"
    : "bg-white border-gray-300 focus:border-blue-500"
}`}
          />
        )}

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full px-5 py-4 rounded-xl border mb-5 bg-transparent outline-none transition
${
  darkMode
    ? "border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
    : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
}`}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full px-5 py-4 rounded-xl border mb-5 bg-transparent outline-none transition
${
  darkMode
    ? "border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
    : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
}`}
        />

        <div className="flex justify-between items-center text-sm mb-6">

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember Me
          </label>

          <button
            type="button"
            className="text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>

        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700  
          hover:to-cyan-600 text-white text-lg font-semibold shadow-lg transition-all duration-300"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="mx-4 text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div className="space-y-3">

          <button
  type="button"
  className={`w-full flex items-center justify-center gap-3 rounded-xl py-3 border font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
    darkMode
      ? "border-gray-700 hover:bg-slate-800 hover:border-blue-500"
      : "border-gray-300 hover:bg-red-50 hover:border-red-400"
  }`}
>
  🌐 Continue with Google
</button>

        </div>

        <p className="text-center mt-8">

          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-blue-500 font-semibold hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>

        </p>

      </form>

    </div>
  </div>
);
}