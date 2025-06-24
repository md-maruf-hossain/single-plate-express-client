"use client";

import { useContext, useState } from "react";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { AuthContext } from "../../contexts/AuthProvider";
import { toast } from "react-hot-toast";
import UseAccessToken from "../../hooks/UseAccessToken";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import UpButton from "@/components/UpButton";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginUserEmail, setLoginUserEmail] = useState("");

  const { logIn, googleLogin, loading } = useContext(AuthContext);
  const [token] = UseAccessToken(loginUserEmail);

  const router = useRouter();

  if (token) {
    router.push("/");
    window.location.reload(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // login
    logIn(email, password)
      .then((result) => {
        const user = result.user;
        if (user) {
          router.push("/");
          toast.success("Login successful");
        }
        form.reset();
        setLoginUserEmail(email);
      })
      .catch((error) => toast.error(error.message));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        setLoginUserEmail(user.email);
        toast.success("Successfully Logged in");
        router.push("/");
      })
      .catch((error) => {
        console.error("Google login error:", error);
        toast.error(error.message);
      });
  };

  return (
    <div className="flex min-h-screen">
      {/* Left - Image */}
      <div className="w-1/2 relative">
        <Image src="/images/hero-image.jpg" alt="Background" layout="fill" className="absolute blur-xs" priority />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">Single meal Express</h1>
      </div>

      {/* Right - Form */}
      <div className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
          <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="email" placeholder="Email" name="email" required className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                required
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <span className="absolute right-3 top-4 cursor-pointer text-gray-600" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
            <div className="text-right text-green-600 text-sm">
              <Link href="/forget-password">Forget Password?</Link>
            </div>
            <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition">
              {loading ? <Loading /> : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center text-green-600">Or sign in with</div>
          <div className="flex justify-center mt-4 space-x-4">
            <button onClick={handleGoogleLogin} className="p-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition">
              <FaGoogle size={20} />
            </button>
            <button className="p-3 bg-gray-300 text-white rounded-full" disabled>
              <FaFacebook size={20} />
            </button>
            <button className="p-3 bg-gray-300 text-white rounded-full" disabled>
              <FaApple size={20} />
            </button>
          </div>

          <div className="mt-6 text-center text-gray-500">
            Don't have an account yet?{" "}
            <Link href="/register" className="text-green-600">
              Register
            </Link>
          </div>
        </div>
      </div>
      <UpButton />
    </div>
  );
};

export default LoginPage;
