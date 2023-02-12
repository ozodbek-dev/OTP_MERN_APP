import React from 'react';
import {Link} from "react-router-dom";
import styles from '../styles/Username.module.css'

const Username = () => {
    return (
        <div className="container mx-auto">
            <div className="flex justify-center items-center h-screen flex flex-col">
                <div className={styles.glass}>
                    <div className="title flex flex-col items-center">
                        <h4 className="text-5xl font-bold">Hello Again</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                         Explore More by connection with us
                    </span>
                    </div>
                    <form className="py-1 flex flex-col items-center ">
                        <div className="profile flex justify-center py-4">
                            <img
                                className={styles.profile_img}
                                src="https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=60"
                                alt="avatar"/>
                        </div>
                        <div className="flex flex-col items-center w-[100%]">
                            <input type="text" placeholder="Username" className={styles.textbox}/>
                            <button className="rounded-lg bg-indigo-500 w-3/4 py-4 text-gray-50 mt-4 text-xl shadow-sm hover:bg-[#ff6a6a]" type="submit">Let's Go</button>
                        </div>
                        <div className="text-center py-4">
                        <span className="text-gray-500">
                            Not a Member <Link to='/register' className='text-gray-500'>Click Here</Link>
                        </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Username;