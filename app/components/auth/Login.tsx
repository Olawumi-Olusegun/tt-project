import { ShowErrorObject } from '@/app/types/types';
import React,  { useState } from 'react';
import TextInput from '../TextInput';
import showError from '@/app/helpers/showError';
import { BiLoader } from 'react-icons/bi';
import { useUser } from '@/app/context/userContext';
import { useGeneralStore } from '@/app/stores/general';


export default function Login() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<ShowErrorObject | null>(null);

    let { setIsLoginOpen } = useGeneralStore();

    const contextUser = useUser();

    const validate = () => {
        setError(null);
        let isError  = false;

        if (!email) {
            setError({ type: 'email', message: 'An Email is required'})
            isError = true
        } else if (!password) {
            setError({ type: 'password', message: 'A Password is required'})
            isError = true
        }

        return isError;

    }

    const handleLogin = async () => {
        try {

            let isError = validate();
            if(isError) return;
            if(!contextUser) return;

            setLoading(true);
            await contextUser.login(email, password);
            setLoading(false);
            setIsLoginOpen(false);

        } catch (error) {
            setLoading(false);
            alert(error)
        }

    }


    return (
        <>
         <div>

            <h1 className="text-center text-[28px] mb-4 font-bold ">Log in</h1>
           
                <div className="px-6 pb-2">
                    <TextInput 
                    string={email}
                    placeholder='Email address'
                    inputType='email'
                    onUpdate={setEmail}
                    error={showError(error, "email")}
                    />
                </div>

                <div className="px-6 pb-2">
                    <TextInput 
                    string={password}
                    placeholder='Password'
                    inputType='password'
                    onUpdate={setPassword}
                    error={showError(error, "password")}
                    />
                </div>

                <div className="px-6 pb-2 mt-6">
                    <button
                    disabled={loading || !email || !password}
                    onClick={handleLogin}
                    className={`
                    flex items-center justify-center w-full text-[17px] font-semibold text-white py-3 rounded-sm
                    ${!email || !password ? "bg-gray-200" : "bg-[#f02c56]" }
                    `}
                    >
                        { loading ? <BiLoader size={25} color="#fff" className="animate-spin" /> : 'Login' }
                    </button>
                </div>
       
         </div>
        </>
    )
}