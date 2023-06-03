import React, {useState} from "react";
import './sign-up.styles.scss'
import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component";
 
import CustomButton from "../custom-button/custom-button.component";
import { signUpStart } from "../../redux/user/user.action";

const SignUp= ({signUpStart})=> {
    const [userCredentials, setUserCredentials] = useState(
        {
            displayName : '',
            email: '',
            password : '',
            confirmPassword : ''
        }
    )
    
    const {displayName, email, password, confirmPassword }= userCredentials;
    
    const handleSubmit = async event => {
        event.preventDefault();

        if (password !== confirmPassword){
           alert( "passwords don't match ");
           return;
        }
        signUpStart ({displayName, email, password})   ;
        // try{
        //     const {user} = await createUserWithEmailAndPassword(auth, email, password);
         
        // await   createUserProfileDocument(user, {displayName}); 
        // setUserCredentials ( {
        //     displayName : '',
        //     email: '',
        //     password : '',
        //     confirmPassword : ''
        // });
        // } catch(error)
        // { console.error(error);
        // }
    };

    const handleChange = event =>{
        const {name, value} = event.target;   
         setUserCredentials({...userCredentials, [name]: value});
    }

        return(
            <div className="Sign-up">
                <h2 className="tittles">
                    i do not have a account
                </h2>
                <span>sign up with your email and password</span>
                <form className="sign-up" onSubmit={handleSubmit}>
                  <FormInput 
                  type='text'
                  name='displayName'
                  value={displayName}
                  onChange ={handleChange}
                  label='Display Name'
                  required />
                     <FormInput 
                  type='email'
                  name='email'
                  value={email}
                  onChange ={handleChange}
                  label='Email'
                  required />
                     <FormInput 
                  type='password'
                  name='password'
                  value={password}
                  onChange ={handleChange}
                  label='password'
                  required />
                     <FormInput 
                  type='password'
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange ={handleChange}
                  label='Confirm Password'
                  required />
                  <CustomButton type= 'submit'> SIGN UP </CustomButton>
                </form>
            </div>
        )
};
const mapDispatchToProps = dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
  });
  
  export default connect(
    null,
    mapDispatchToProps
  )(SignUp);