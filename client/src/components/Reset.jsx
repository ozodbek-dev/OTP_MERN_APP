import React from 'react';
import {Toaster} from "react-hot-toast";
import styles from "../styles/Username.module.css";
import {Link} from "react-router-dom";
import {useFormik} from "formik";
import { resetPasswordValidate} from "../helper/validate";

const Reset = () => {
    const formik = useFormik({
        initialValues: {
            password: "" ,
            confirm_pwd:""
        },
        validate: resetPasswordValidate,
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: async values => {
            console.log(values)
        }
    });

    return (
        <div className="container mx-auto">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div className="flex justify-center items-center h-screen flex flex-col">
                <div className={styles.glass}>
                    <div className="title flex flex-col items-center">
                        <h4 className="text-5xl font-bold">Reset</h4>
                        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
                           Enter new password.
                    </span>
                    </div>
                    <form className="py-4 flex flex-col items-center " onSubmit={formik.handleSubmit}>
                        <div className="flex flex-col items-center w-[100%]">
                            <span className="py-4 text-xl w-2/3 text-center text-gray-500">Enter 6 digit OTP sent to your email address.</span>
                            <div className="py-4 text-center">
                                <input {...formik.getFieldProps("password")}  style={{width:"100%"}} type="password" placeholder="New Password"
                                       className={styles.textbox}/>
                            </div>

                            <div className="py-4 text-center ">
                                <input {...formik.getFieldProps("confirm_pwd")} style={{width:"100%"}}  type="password" placeholder="Confirm New Password"
                                       className={styles.textbox} />
                            </div>
                            
                            <button
                                className="rounded-lg bg-indigo-500 w-4/5 py-4 text-gray-50 mt-4 text-xl shadow-sm hover:bg-[#ff6a6a]"
                                type="submit">Let's Go
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Reset;