import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { BsGoogle, BsGithub} from "react-icons/bs"
const SocialLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const handleSocialLogin = async (provider) => {
    const res = await signIn(provider, {
      redirect: true, 
      callbackUrl: path ? path:'/'
    })
  }
  return (
    <div className='items-center text-center'>
    <div className="divider">OR</div>
      <h6 className='mb-4'>sign in with </h6>
      <div>
        <button onClick={() =>handleSocialLogin('google')}><BsGoogle size={20} className='mr-4 text-blue-600'/></button>
        <button  onClick={() =>handleSocialLogin('github')}><BsGithub size={20}  /></button>
      </div>
    </div> 
  );
};

export default SocialLogin;