import toast from 'react-hot-toast'
import password from "../components/Password";

// validate login page username

export async function usernameValidate(values) {
    const errors = usernameVerify({}, values);

    return errors
}

// validate username
function usernameVerify(error = {}, values) {
    if (!values.username) {
        error.username = toast.error("Username is Required...!")
    } else if (values.username.includes(" ")) {
        error.username = toast.error("Invalid Username...!")
    }
    return error;
}


// Validate Password;
export async function passwordValidate (values){
const errors = passwordVerify({},values);
return errors
}

function passwordVerify(error = {}, values) {
    const specials = /(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/
    if (!values.password) {
        error.password = toast.error("Password is Required...!")
    } else if (values.password.includes(" ")) {
        error.password = toast.error("Invalid Password...!")
    } else if (values.password.length < 6) {
        error.password = toast.error("Password must be at least 6 characters")
    } else if (!specials.test(values.password)) {
        error.password = toast.error("Password must have special characters: ?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]")
    }
    return error;
}


// Validate reset Password;
export async function resetPasswordValidate (values){
    const errors = passwordVerify({},values);
       if(values.password !== values.confirm_pwd) {
           errors.exist = toast.error("Password Not match ... !")
       }
    return errors
}


//validate register form
export async function resetPasswordValidation(values){
    const errors = usernameVerify({},values)
    passwordVerify(errors,values)
    emailVerify(errors,values);
    return errors;
}

// validate email

function emailVerify(error={},values)   {
     if(!values.email){
       error.email = toast.error("Email Required...!")
     }
     else if(values.email.includes(" ")){
         error.email = toast.error("Wrong email...!")
     }
     else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(values.email)){
         error.email = toast.error("Invalid email address...!")
     }
     return error;
}

// validate profile page
export async function profileValidation(values){
    const errors = emailVerify({},values);

    
     return errors;
}