import React, {useState} from 'react';
import {Toaster} from "react-hot-toast";
import styles from "../styles/Username.module.css";
import {Link} from "react-router-dom";
import {useFormik} from "formik";
import {resetPasswordValidation} from "../helper/validate";
import convertToBase64 from "../helper/convert";
import extend from '../styles/Profile.module.css'

const avatar = "https://images.unsplash.com/photo-1618641986557-1ecd230959aa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=60"

const Profile = () => {
    const [file, setFile] = useState()
    const formik = useFormik({
        initialValues: {
            firstName:"",
            lastName:"",
            email:"",
            mobile:"",
            address:""
        },
        validate: resetPasswordValidation,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            values = await Object.assign(values, {profile: file || ''})
            console.log(values)
        }
    });
    const onUpload = async e => {
        const base64 = await convertToBase64(e.target.files[0])
        setFile(base64)
    }

    return (
        <div className="container mx-auto">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div className="flex justify-center items-center h-screen flex flex-col">
                <div className={`${styles.glass} ${extend.glass}`} style={{wdith: "45%"}}>
                    <div className="title flex flex-col items-center">
                        <h4 className="text-5xl font-bold">Profile</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                         You can update the details.
                    </span>
                    </div>
                    <form className="py-1 flex flex-col items-center " onSubmit={formik.handleSubmit}>
                        <div className="profile flex justify-center py-4">
                            <label htmlFor="profile">
                                <img
                                    className={styles.profile_img}
                                    style={{cursor: "pointer"}}
                                    src={file || avatar}
                                    alt="avatar"/>
                            </label>
                            <input type="file" id="profile" name="profile" onChange={onUpload}/>
                        </div>
                        <div className="textbox flex flex-col items-center w-[100%] gap-3    ">
                            <div className="name flex w-3/4 gap-10">
                                <input {...formik.getFieldProps("firstName")} type="text" placeholder="FirstName"
                                       className={`${styles.textbox} ${extend.textbox}`}/>
                                <input {...formik.getFieldProps("lastName")} type="text" placeholder="LastName"
                                       className={`${styles.textbox} ${extend.textbox}`}/>
                            </div>

                            <div className="name flex w-3/4 gap-10">
                                <input {...formik.getFieldProps("mobile")} type="text" placeholder="Mobile No."
                                       className={`${styles.textbox} ${extend.textbox}`}/>
                                <input {...formik.getFieldProps("email")} type="text" placeholder="Email*"
                                       className={`${styles.textbox} ${extend.textbox}`}/>
                            </div>

                            <div className="name flex w-3/4 gap-10">
                                <input {...formik.getFieldProps("address")} style={{width:"100%"}} type="text" placeholder="Address"
                                       className={`${styles.textbox} ${extend.textbox}`}/>

                            </div>
                            <button
                                className="rounded-lg bg-indigo-500 w-3/4 py-2 text-gray-50 mt-4 text-xl shadow-sm hover:bg-[#ff6a6a]"
                                type="submit">Update
                            </button>


                        </div>
                        <div className="text-center py-4">
                        <span className="text-gray-500">
                            Come back later? <Link to='/' className='text-gray-500 underline'>Logout</Link>
                        </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;