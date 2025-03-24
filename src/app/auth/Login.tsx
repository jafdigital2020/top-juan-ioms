


import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Login = () => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const navigate = useNavigate();

     const handleLogin = async (evt: React.FormEvent) => {
          evt.preventDefault();
          try {
               const response = await axios.post(
                    `${import.meta.env.VITE_PUBLIC_API_URL}/api/auth/login`,
                    { email, password },
                    { withCredentials: true }
               );

               if (response.data.success.code !== 200) {
                    toast.error(response.data.success.message);
               } else {
                    toast.success(response.data.success.message);
                    return navigate("/auth");
               }
          } catch (error) {
               toast.error("An error occurred while signing you in.");
          }
     };
     return (
          <div className="flex h-screen">
               <div className="w-1/2 flex items-center justify-center">
                    <form onSubmit={handleLogin} className="bg-white p-8 rounded w-3/4">
                         <h2 className="text-2xl font-semi-bold mb-6 text-primary">Welcome back to</h2>
                         <img src="/images/logo.png" alt="Logo" className=" mb-6" />
                         <div className="mb-4">
                              <label className="block text-gray-700 text-sm  mb-2" htmlFor="email">
                                   Email
                              </label>
                              <Input
                                   type="email"
                                   id="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   className=" rounded w-full py-2 px-3 text-gray-700 mb-3 "
                                   required
                              />
                         </div>
                         <div className="mb-6">
                              <label className="block text-gray-700 text-sm  mb-2 rounded-lg" htmlFor="password">
                                   Password
                              </label>
                              <Input
                                   type="password"
                                   id="password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   className=" rounded w-full py-2 px-3 text-gray-700 mb-3 "
                                   autoComplete='password'
                                   required
                              />
                         </div>
                         <div className="flex items-centerjustify-center w-full">
                              <Button
                              variant={"default"}
                                   type="submit"
                                   className="bg-primary  mt-8  text-white font-semi-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full "
                              >
                                   Login
                              </Button>
                         </div>
                         <div className="mt-4 text-center text-gray-500 text-sm">
                              &copy; {new Date().getFullYear()} All rights reserved.
                         </div>
                    </form>
               </div>
               <div className="w-1/2 bg-gray-200 flex items-center justify-center">
                    <img src="/images/topjuan-bg.png" alt="Login" className="object-cover h-full w-full" />
               </div>
          </div>
     );
};


export default Login;