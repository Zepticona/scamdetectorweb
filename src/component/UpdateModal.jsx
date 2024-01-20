import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';
import { db } from '../utils/dbConfig';
import Input from './Input';

const UpdateModal = ({ view, setView }) => {
    const { user,addUser } = useUserStore()
    const [value, setValue] = useState(user)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleUpdate = async (e) => {
        e.preventDefault()
        if (!value.name || !value.phone || !value.email) {
            return toast.error('Please enter email and password')
        }
        setLoading(true)
        try {
            const userRef = doc(db, "users", value.id)

            await updateDoc(userRef, {
                name: value.name,
                email: value.email,
                phone: value.phone,
            })

            const q = query(collection(db, "users"), where("email", "==", value.email),where("password", "==", value.password ))

            const findUser = await getDocs(q)
            if(findUser){
                const users = []
                findUser.forEach(doc=>{
                    users.push({id: doc.id,...doc.data()})
                })
                if(users[0]){
                    addUser(users[0])
                    toast.success('updated succesfull')
                    navigate('/')
                    setLoading(false)
                    setView(!view)
                }
            }else{
                toast.error('No updated.')
                setLoading(false)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
            setLoading(false)
        }

    }
    
    return (
        <div
            className='fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-teal-500/50'
        >
            <div
                className='w-11/12 md:w-4/12 mx-auto bg-white rounded-md shadow'
            >
                <div
                    className='px-4 py-2 flex justify-between items-center border-b'
                >
                    <h2
                        className='text-xl uppercase'
                    >
                        Update profile
                    </h2>
                    <RxCross2
                        size={28}
                        onClick={() => setView(!view)}
                        className='cursor-pointer hover:text-red-500'
                    />
                </div>
                <form
                    onSubmit={handleUpdate}
                    className='p-4 space-y-2'
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

                    <button
                        className='w-full p-2 bg-teal-500 text-white rounded'
                    >
                        {loading ? 'Updateing...' : 'Update'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateModal;