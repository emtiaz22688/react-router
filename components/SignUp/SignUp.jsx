import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithPopup
} from "firebase/auth";
import app from "../../fairebase/fairebase.init";

const SignUp = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ফর্ম ইনপুট ক্লিয়ার করার ফাংশন
  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: name });
      alert("✅ SignUp successful! Now login.");
      clearForm(); // ফর্ম ক্লিয়ার করা
      navigate("/sign-in");
    } catch (err) {
      alert("❌ SignUp Error: " + err.message);
    }
  };

  const handleSocialLogin = async (provider, providerName) => {
    try {
      const res = await signInWithPopup(auth, provider);
      alert(`✅ ${providerName} login success: ${res.user.email}`);
      clearForm(); // Social login-এর পরে ফর্ম ক্লিয়ার করা
      navigate("/");
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <form onSubmit={handleSignUp} className="space-y-3">
          <label className="label">Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="label">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="label">Password</label>
          <input
            type="password"
            className="input input-bordered w-full"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-neutral w-full mt-2">
            Sign Up
          </button>
        </form>

        <div className="flex justify-between mt-2 text-sm">
          <Link to="/sign-in" className="link link-hover">
            Already have an account? Sign In
          </Link>
        </div>

        <div className="divider">OR</div>

        <button
          onClick={() => handleSocialLogin(googleProvider, "Google")}
          className="btn btn-outline w-full mb-2"
        >
          Continue with Google
        </button>
        <button
          onClick={() => handleSocialLogin(githubProvider, "GitHub")}
          className="btn btn-outline w-full mb-2"
        >
          Continue with GitHub
        </button>
        <button
          onClick={() => handleSocialLogin(facebookProvider, "Facebook")}
          className="btn btn-outline w-full"
        >
          Continue with Facebook
        </button>
      </div>
    </div>
  );
};

export default SignUp;
