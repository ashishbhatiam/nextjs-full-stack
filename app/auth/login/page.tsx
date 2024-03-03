'use client'
import axios from "@/utils/axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState('ab@gmail.com')
  const [password, setPassword] = useState('secret')
  const route = useRouter()

  const loginHandler = async () => {
      const data = {
        email,
        password
      }

      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/",
      }).then((response) => {
        console.log('response: ', response);
        if (response?.error) {
          // setErrorMessage(response.error);-
        } else if(response) {
          route.push('/home')
        }
      });

  }

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-screen hidden lg:block overflow-hidden">
      <div className="relative w-full" style={{ paddingBottom: '100%' }}>
        <Image
          src="https://images.unsplash.com/photo-1561439870-ea1043ca4406?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Placeholder Image"
          className="absolute inset-0 object-cover w-full h-full"
          layout="fill"
        />
      </div>
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 overflow-auto">
        <h1 className="text-2xl font-semibold mb-4 text-black">Login</h1>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="username"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="username"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
              autoComplete="off"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 text-black"
              autoComplete="off"
            />
          </div>
          {/* <div className="mb-6 text-blue-500">
            <a href="#" className="hover:underline">
              Forgot Password?
            </a>
          </div> */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            onClick={loginHandler}
          >
            Login
          </button>
        {/* <div className="mt-6 text-blue-500 text-center">
          <a href="#" className="hover:underline">
            Sign up Here
          </a>
        </div>   */}
      </div>
    </div>
  );
};

export default Login;
