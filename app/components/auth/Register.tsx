import { ShowErrorObject } from '@/app/types/types';
import React,  { useCallback, useState } from 'react';
import TextInput from '../TextInput';
import showError from '@/app/helpers/showError';
import { BiLoader } from 'react-icons/bi';
import { useUser } from '@/app/context/userContext';
import { useRouter } from 'next/navigation';
import { useGeneralStore } from '@/app/stores/general';


export default function Register() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<ShowErrorObject | null>(null);

    const contextUser = useUser();
    let { setIsLoginOpen } = useGeneralStore();

    const validate = () => {
        setError(null);
        let isError  = false;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (!name) {
            setError({ type: 'name', message: 'A Name is required'})
            isError = true
        } else if (!email) {
            setError({ type: 'email', message: 'An Email is required'})
            isError = true
        } else if (!reg.test(email)) {
            setError({ type: 'email', message: 'The Email is not valid'})
            isError = true
        } else if (!password) {
            setError({ type: 'password', message: 'A Password is required'})
            isError = true
        } else if (password.length < 8) {
            setError({ type: 'password', message: 'The Password needs to be longer'})
            isError = true
        } else if (password != confirmPassword) {
            setError({ type: 'password', message: 'The Passwords do not match'})
            isError = true
        }
        return isError;

    }

    const handleRegister = async () => {
        let isError = validate();

        if(isError) return;

        if(!contextUser) return;

        try {
            setLoading(true);
            await contextUser.register(name, email, password);
            setLoading(false);
            setIsLoginOpen(false);
            router.refresh();
        } catch (error) {
            setLoading(false);
            alert(error)
            throw error;
        }
    }

    return (
        <>
         <div>
            <h1 className="text-center text-[28px] mb-4 font-bold ">Register</h1>
            <div className="px-6 pb-2">
                <TextInput 
                 string={name}
                 placeholder='Name'
                 inputType='text'
                 onUpdate={setName}
                 error={showError(error, "name")}
                />
            </div>

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

            <div className="px-6 pb-2">
                <TextInput 
                 string={confirmPassword}
                 placeholder='Confirm Password'
                 inputType='password'
                 onUpdate={setConfirmPassword}
                 error={showError(error, "confirmPassword")}
                />
            </div>

            <div className="px-6 pb-2 mt-6">
                <button
                disabled={loading || !name || !email || !password || !confirmPassword}
                onClick={handleRegister}
                className={`
                 flex items-center justify-center w-full text-[17px] font-semibold text-white py-3 rounded-sm
                 ${!email || !password ? "bg-gray-200" : "bg-[#f02c56]" }
                `}
                >
                    { loading ? <BiLoader size={25} color="#fff" className="animate-spin" /> : 'Register' }
                </button>
            </div>
         </div>
        </>
    )
}