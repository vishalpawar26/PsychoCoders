import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import logo from "../assets/images/logo-1.png";
import Footer from "../components/Footer";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [institution, setInstitution] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [processing, setProcessing] = useState(false);

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);

    axios
      .post("https://psycho-coders-server.vercel.app/auth/register", {
        username,
        institution,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        setMessage(null);
        setProcessing(false);
        if (res.status === 201) {
          navigate("/login");
        }
      })
      .catch((err) => {
        if (err.response.data.message) {
          setMessage(err.response.data.message);
        }
        console.log(err);
        setProcessing(false);
      });
  };

  return (
    <>
      <Navbar />
      <div className="bg-dark-gray h-main min-w-[1024px] flex justify-center items-center">
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-8 bg-dark-yellow/10 w-96 rounded-lg flex flex-col justify-center items-center shadow-lg">
            <img src={logo} alt="PsychoCoders" className="w-44 mb-4" />

            {message && (
              <div className="px-2 py-1 mb-4 border border-red-500 rounded bg-red-500/15">
                <p className="text-red-500">{message}</p>
              </div>
            )}

            <p className="mb-1 ml-1 w-full text-white/60 text-left">Username</p>
            <input
              autoComplete="off"
              type="text"
              placeholder="Your Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-2 mb-4 w-full text-white/60 bg-white/5 rounded-md outline-none focus:border focus:border-white/30"
            />

            <p className="mb-1 ml-1 w-full text-white/60 text-left">
              Institution
            </p>
            <input
              autoComplete="off"
              type="text"
              placeholder="Your Institution"
              name="institution"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="px-4 py-2 mb-4 w-full text-white/60 bg-white/5 rounded-md outline-none focus:border focus:border-white/30"
            />

            <p className="mb-1 ml-1 w-full text-white/60 text-left">Email</p>
            <input
              autoComplete="off"
              type="email"
              placeholder="Your Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 mb-4 w-full text-white/60 bg-white/5 rounded-md outline-none focus:border focus:border-white/30"
            />

            <p className="mb-1 ml-1 w-full text-white/60 text-left">Password</p>
            <input
              autoComplete="off"
              type="password"
              placeholder="Your Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 mb-4 w-full text-white/60 bg-white/5 rounded-md outline-none focus:border focus:border-white/30"
            />
            <button
              type="submit"
              className="px-4 py-2 my-4 w-full bg-dark-yellow text-white rounded-md font-semibold flex justify-center items-center"
            >
              {processing ? (
                <img src={loader} alt="Loading..." className="w-6" />
              ) : (
                <p>Sign Up</p>
              )}
            </button>
            <p className="text-white/60">
              Have an account? {}
              <Link to="/login" className="underline">
                Login!
              </Link>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default SignUpPage;
