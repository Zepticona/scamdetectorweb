import React, { useState } from 'react';
import Input from '../component/Input';
import icon from '../assets/icon.png'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import axios from 'axios';
import { db } from '../utils/dbConfig';
import { collection, addDoc } from "firebase/firestore";

const Signup = () => {
    const navigate = useNavigate()
    const[loading,setLoading] = useState(false)
    const [value, setValue] = useState({
        name: '',
        phone: '',
        email: '',
        password: ''
    })
    const handleSignup = async (e) => {
        e.preventDefault()
        if (!value.email || !value.password) {
            return toast.error('Please enter email and password')
        }
        setLoading(!loading)
        try {
            const docRef = await addDoc(collection(db, "users"), value)
            if(docRef.id){
                toast.success('account created')
                navigate('/signin')
                setLoading(!loading)
            }
        } catch (error) {
            toast.error(error)
            setLoading(!loading)
        }
    }
    return (
        <div
            className='h-screen flex justify-center'
        >
            <div
                className='w-11/12 md:w-1/4'
            >
                <div
                    className='p-4 space-y-2'
                >
                    <img
                        src={icon}
                        className='w-20 mx-auto'
                    />
                    <h2
                        className='text-center text-xl font-sans'
                    >
                        Audio Anazyler
                    </h2>
                </div>
                <form
                    onSubmit={handleSignup}
                    className='space-y-2'
                >
                    <Input {...{
                        label: 'Name',
                        name: 'name',
                        currentValue: value.name,
                        value, setValue
                    }} />

                    <Input {...{
                        label: 'Phone',
                        name: 'phone',
                        type: 'phone',
                        currentValue: value.phone,
                        value, setValue
                    }} />
                    <Input {...{
                        label: 'Email',
                        name: 'email',
                        type: 'email',
                        currentValue: value.email,
                        value, setValue
                    }} />

                    <Input {...{
                        label: 'Password',
                        name: 'password',
                        currentValue: value.password,
                        value, setValue
                    }} />
                    <button
                        className='w-full p-2 bg-teal-500 text-white rounded'
                    >
                        {loading ? 'Creating ...' : 'Signup'}
                    </button>
                </form>
                <div
                    className='py-2 flex justify-between'
                >
                    <Link
                        to='/signin'
                        className='text-teal-500'
                    >
                        Have an account
                    </Link>
                    <Link
                        to='/forget'
                        className='text-red-500'
                    >
                        Forget password ?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;