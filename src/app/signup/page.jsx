"use client"
import SocialLogin from '@/components/shared/SocialLogin';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';


const page = () => {
  const handleRegister = async (event) =>{
    event.preventDefault();
    const newUser = {
     name : event.target.name.value,
     email : event.target.email.value,
     password : event.target.password.value,
     image : event.target.image.value,
    };
    console.log(newUser);
   
    const resp = await fetch('http://localhost:3000/signup/newUser', {
     method:"POST",
     headers: {
       "Content-type": "application/json"
     },
     body: JSON.stringify(newUser)

    })
    console.log(resp);
    if(resp){
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
        <form onSubmit={handleRegister} className="card-body">
          <h1 className="text-3xl font-bold">Please SignUp!</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="text" placeholder="Your name" name="name" className="input input-bordered" required />
          </div>
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
          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input type="text" name="image" placeholder="your image" className="input input-bordered" required />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Register</button>
          </div>
          <label className="label mb-4">
            <Link href='/login' className="text-center label-text-alt link link-hover">Already have an account? <span className='text-primary font-semibold'>Please Login!</span> </Link>
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