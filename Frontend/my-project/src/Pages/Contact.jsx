import { useState } from 'react';
import { useAuth } from '../store/auth';
import contactImg from '../assets/contact.png'
import callIcon from '../assets/callIcon.png'
import emailIcon from '../assets/emailIcon.png'
import locationIcon from '../assets/locationIcon.png'

export const Contact = () => {
    const [contact, setContact] = useState({
        username: "",
        email: "",
        message: "",
    });

    const [userData, setUserData] = useState(true);
    const { user } = useAuth();

    if (userData && user) {
        setContact({
            username: user.username,
            email: user.email,
            message: "",
        })
        setUserData(false);
    }

    const handleInput = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;
        setContact({
            ...contact,
            [name]: value,
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(contact);
        try {
            const response = await fetch(`http://localhost:5000/api/form/contact`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                },
                body:
                    JSON.stringify(contact)

            });

            if (response.ok) {
                setContact(
                    {
                        username: "",
                        email: "",
                        message: ""
                    }
                );
                alert("message send successfully");
            }
            console.log(response);
        } catch (error) {
            console.log("contact", error);
            alert("message not delivered");
        }
    }
    return (
        <>
            <div className=" mt-16 sm:mt-24 flex min-h-[70vh] py-0 px-0 sm:p-10 lg:px-[20vw]  rounded-none sm:rounded-md overflow-x-hidden   ">
                <div className=" flex flex-col lg:flex-row w-full">
                    <div className=" w-full lg:w-[40%] sm:rounded-tl-md p-7 text-white rounded-none sm:rounded-bl-md" style={{ backgroundImage: `url(${contactImg})`, backgroundPosition: 'center' }}>
                        <h1 className=' text-xl font-bold'>Contact Information</h1>
                        <p className=' text-sm text-[#C9C9C9]'>Say something to start a live chat!</p>
                        <div className=" text-md flex flex-col mt-20 gap-8">
                            <div className=" flex gap-2 align-middle justify-start items-center">
                                <img src={callIcon} className='text-md w-[20px] h-[20px]' />
                                <div className=" flex flex-col">
                                    <h1 className=' text-[12px]'>Phone</h1>
                                    <p className=' text-[12px] text-[#C9C9C9]'>6376481302</p>
                                </div>
                            </div>
                            <div className=" flex gap-2 align-middle justify-start items-center">
                                <img src={emailIcon} className='text-md w-[20px] h-[20px]' />
                                <div className=" flex flex-col">
                                    <h1 className='text-[12px]'>Email</h1>
                                    <p className='text-[12px] text-[#C9C9C9]'>ganesh123@gmail.com</p>
                                </div>
                            </div>
                            <div className=" flex gap-2 align-middle justify-start items-center">
                                <img src={locationIcon} className='text-md w-[20px] h-[20px]' />
                                <div className=" flex flex-col">
                                    <h1 className='text-[12px]'>Address</h1>
                                    <p className='text-[12px] text-[#C9C9C9]'>kota</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" w-full lg:w-[60%] p-10 shadow-lg rounded-tr-md rounded-br-md ">
                        <div className="mx-auto">
                            <form className="-m-2 flex flex-wrap" onSubmit={handleSubmit}>
                                <div className="w-1/2 p-2">
                                    <div className="relative">
                                        <input type="text" id="username" name="username" className="peer w-full  border-b-2 border-[#8D8D8D]  bg-opacity-40 py-1 px-3 text-base leading-8 text-black placeholder-transparent outline-none transition-colors duration-200 ease-in-out" placeholder="Name" value={contact.username} onChange={handleInput} />
                                        <label htmlFor="name" className="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2  peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500">Name</label>
                                    </div>
                                </div>
                                <div className="w-1/2 p-2">
                                    <div className="relative">
                                        <input type="email" id="email" name="email" className="peer w-full  border-b-2 border-[#8D8D8D]  bg-opacity-40 py-1 px-3 text-base leading-8 text-black placeholder-transparent outline-none transition-colors duration-200 ease-in-out " placeholder="Email" value={contact.email} onChange={handleInput} />
                                        <label htmlFor="email" className="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2  peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500">Email</label>
                                    </div>
                                </div>
                                <div className="mt-4 w-full p-2">
                                    <div className="relative">
                                        <textarea id="message" name="message" className="peer h-32 w-full resize-none  border-b-2 border-[#8D8D8D] bg-opacity-40 py-1 px-3 text-base leading-6 text-black placeholder-transparent outline-none transition-colors duration-200 ease-in-out focus:border-black  focus:ring-1 focus:ring-black" placeholder="Message" value={user.message} onChange={handleInput}></textarea>
                                        <label htmlFor="message" className="absolute left-3 -top-6 bg-transparent text-sm leading-7 text-indigo-500 transition-all peer-placeholder-shown:left-3 peer-placeholder-shown:top-2  peer-placeholder-shown:text-base peer-placeholder-shown:text-black peer-focus:left-3 peer-focus:-top-6 peer-focus:text-sm peer-focus:text-indigo-500">Message</label>
                                    </div>
                                </div>
                                <div className=" w-full p-2 ">
                                    <button type='submit' className="mx-auto flex rounded border-0 bg-black py-2 px-8 text-lg text-white focus:outline-none">send message</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}