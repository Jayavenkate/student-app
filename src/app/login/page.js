"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/redux/Login/actionCreator";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin@123");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   try {
  //     const res = await dispatch(login(username, password));
  //     // await fetch("/api/login", {
  //     //   method: "POST",
  //     //   headers: { "Content-Type": "application/json" },
  //     //   body: JSON.stringify({ username, password }),
  //     // });

  //     const data = await res.json();

  //     if (!res.ok) {
  //       setError(data.error || "Login failed");
  //       return;
  //     }

  //     const role = data.user?.role;
  //     console.log("Logged in role:", role);

  //     if (role === "admin") {
  //       router.push("/admin/dashboard");
  //     } else if (role === "user") {
  //       router.push("/user/dashboard");
  //     } else {
  //       setError("Invalid role. Access denied.");
  //     }
  //   } catch (err) {
  //     setError("An error occurred");
  //     console.error("Login error:", err);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await dispatch(login(username, password)); // Receive parsed data directly

      if (!data) {
        setError("Login failed");
        return;
      }

      const role = data.user?.role;
      const status = data.user?.status;
      // console.log("Logged in role:", role);

      if (role === "admin") {
        router.push("/admin/dashboard");
      } else if (role === "user" && status === true) {
        router.push("/user/dashboard");
      } else {
        setError("Invalid role. Access denied .");
      }
    } catch (err) {
      setError("An error occurred");
      // console.error("Login error:", err);
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-100">
    //   <div className="bg-white p-8 rounded shadow-md w-96">
    //     <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
    //     {error && <p className="text-red-500 mb-4">{error}</p>}
    //     <form onSubmit={handleSubmit}>
    //       <div className="mb-4">
    //         <label className="block text-gray-700 mb-2">Username</label>
    //         <input
    //           type="text"
    //           value={username}
    //           onChange={(e) => setUsername(e.target.value)}
    //           className="w-full p-2 border rounded"
    //           required
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label className="block text-gray-700 mb-2">Password</label>
    //         <input
    //           type="text"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           className="w-full p-2 border rounded"
    //           required
    //         />
    //       </div>
    //       <button
    //         type="submit"
    //         className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
    //       >
    //         Login
    //       </button>
    //     </form>
    //     {/* <button
    //       onClick={handleClick}
    //       className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
    //     >
    //       handle admin button submit
    //     </button> */}

    //     <a
    //       //   onClick={handleSignup}
    //       className="w-full   p-2 rounded "
    //       href="/signup"
    //     >
    //       Signup
    //     </a>
    //   </div>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && (
          <p className="text-red-500 mb-4 text-sm text-center">{error}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition cursor-pointer"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
