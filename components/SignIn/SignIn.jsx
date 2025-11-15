import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import app from './../../fairebase/fairebase.init';
import {

  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";

const SignIn = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Login Successful!");
      setEmail(""); setPassword("");
      navigate("/");
    } catch (err) {
      alert("❌ Login Error: " + err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) return alert("Please enter your email first!");
    try {
      await sendPasswordResetEmail(auth, email);
      alert("📧 Password reset email sent!");
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  const handleSocialLogin = async (provider, name) => {
    try {
      const res = await signInWithPopup(auth, provider);
      alert(`✅ ${name} login success: ${res.user.email}`);
      navigate("/");
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

        <form onSubmit={handleSignIn} className="space-y-3">
          <label className="label">Email</label>
          <input type="email" className="input input-bordered w-full" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label className="label">Password</label>
          <input type="password" className="input input-bordered w-full" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <button type="submit" className="btn btn-neutral w-full mt-2">Sign In</button>
        </form>

        <div className="flex justify-between mt-2 text-sm">
          <button onClick={handleForgotPassword} className="link link-hover">Forgot password?</button>
          <Link to="/sign-up" className="link link-hover">Create an account</Link>
        </div>

        <div className="divider">OR</div>

        <button onClick={() => handleSocialLogin(googleProvider, "Google")} className="btn btn-outline w-full mb-2">Continue with Google</button>
        <button onClick={() => handleSocialLogin(githubProvider, "GitHub")} className="btn btn-outline w-full mb-2">Continue with GitHub</button>
        <button onClick={() => handleSocialLogin(facebookProvider, "Facebook")} className="btn btn-outline w-full">Continue with Facebook</button>
      </div>
    </div>
  );
};

export default SignIn;
