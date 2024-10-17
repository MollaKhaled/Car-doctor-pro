"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import { BsGoogle, BsGithub } from "react-icons/bs"
import SocialLogin from '@/components/shared/SocialLogin';
import { useRouter , useSearchParams} from 'next/navigation';

const page = () => {
  const router = useRouter();
  const session = useSession();
  const searchParams = useSearchParams();
  const path = searchParams.get("redirect");
  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;

    const password = event.target.password.value;
    const resp = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl:path ? path: '/'
    });
    console.log(resp);
    if (resp.ok) {
      // Reset the form fields after successful login
      event.target.reset();
    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='w-1/2 mr-12'>
        <Image src="/assets/images/login/login.svg" height={400} width={400} alt="login image" />
      </div>
      <div className="hero w-1/2 bg-base-200 min-h-screen flex items-center">
        <div className="hero-content">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLogin} className="card-body">
              <h1 className="text-3xl font-bold">Please SignIn!</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">SignIn</button>
              </div>
              <label className="label mb-4">
                <Link href='/signup' className="text-center label-text-alt link link-hover">Are you new an car doctor? <span className='text-primary font-semibold'>Please Register!</span> </Link>
              </label>

            </form>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>

  );
};

export default page;