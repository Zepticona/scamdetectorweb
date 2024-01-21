import React, { useEffect, useState } from 'react'
import userImage from '../assets/demo-user.png'
import UpdateModal from '../component/UpdateModal';
import useUserStore from '../store/userStore';
import { collection, onSnapshot, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/dbConfig';

const Dashboad =  () => {
    const [view, setView] = useState(false)
    const { user, removeUser } = useUserStore()
    const [records, setRecords] = useState([])
    useEffect(() => {
        const getDatas = async () => {
            try {
                console.log(user.email);
                const docRef = doc(db, "users", user.email);
                const docSnap = await getDoc(docRef);
    
                if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                setRecords(docSnap.data().regions)
                } else {
                // docSnap.data() will be undefined in this case
                console.log("No such document!");
                }
            } catch (err) {
                console.log(err);
            }
        }
        getDatas()
        // try {
            
            // const q = query(collection(db, "responses"), where("user", "==", user.email))
            // console.log(q);
            // onSnapshot(q, (querySnapshot) => {
                
            //     const responses = [];
            //     querySnapshot.forEach((doc) => {
            //         responses.push(doc.data().name);
            //     })

            //     setRecords(responses)

            // })
        // } catch (error) {
        //     console.log(error)
        // }
    }, [])
    // console.log(user.email)

    // const getDatas=async() =>{
    //     try {
    //         console.log(user.email);
    //         const docRef = doc(db, "users", user.email);
    //         const docSnap = await getDoc(docRef);

    //         if (docSnap.exists()) {
    //         console.log("Document data:", docSnap.data());
    //         setRecords(docSnap.data().regions)
    //         } else {
    //         // docSnap.data() will be undefined in this case
    //         console.log("No such document!");
    //         }
    //         // const q = query(collection(db, "responses"), where("user", "==", user.email))
    //         // console.log(q);
    //         // onSnapshot(q, (querySnapshot) => {
                
    //         //     const responses = [];
    //         //     querySnapshot.forEach((doc) => {
    //         //         responses.push(doc.data().name);
    //         //     })

    //         //     setRecords(responses)

    //         // })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    return (
        <div
            className='md:w-1/2 md:mx-auto'
        >
            <button
            onClick={() => removeUser()}
            className='px-2 py-1 text-sm border rounded bg-red-500 text-white'
                >
                Logout
            </button>            
            <div
                className='m-2 p-2 space-y-2 bg-white rounded-md'
            >
                <h2
                    className='pb-2 text-xl border-b'
                >
                    Scam Attempts
                </h2>
                <p>
                    The following are the possible scams that may have happened to your safe contact. Please contact with them ASAP and inform the police if necessary.
                </p>
                <div
                    className='overflow-x-auto'
                >
                    <table
                        className='w-full'
                    >
                        <thead
                            className='bg-gray-100'
                        >
                            <tr>
                                <td
                                    className='px-2 py-1'
                                >
                                    #
                                </td>
                                <td
                                    className='px-2 py-1'
                                >
                                    Transcription
                                </td>
                                <td
                                    className='px-2 py-1'
                                >
                                    Verdict
                                </td>
                                <td
                                    className='px-2 py-1'
                                >
                                    Scammer Phone
                                </td>
                                <td
                                    className='px-2 py-1'
                                >
                                    Time
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            {records &&
                                records.map((record, i)=>
                                    <tr
                                    key={record?.id}
                                className='text-gray-500 text-sm border-b cursor-pointer'
                            >
                                <td className='px-2 py-1'>
                                {i+1}
                                </td>
                                <td className='px-2 py-1'>
                                {record?.Transcription}
                                </td>
                                <td className='px-2 py-1'>
                                {record?.Verdict}
                                </td>
                                <td className='px-2 py-1'>
                                {record?.scammerNumber}
                                </td>
                                <td className='px-2 py-1'>
                                {record?.time}
                                </td>
                            </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {view &&
                <UpdateModal {...{ view, setView }} />
            }
        </div>
    );
};

export default Dashboad;