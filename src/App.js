import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import {  Routes,  Route} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import ShopPage from './pages/shop/shop.components.jsx';
import HomePage from "./pages/homepage/homepage.component.jsx";
import Header from './components/header/header.component.jsx';

import SignInAndSignUpPage from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component.jsx';
import CheckoutPage from './pages/checkout/checkout.component.jsx';
import { checkUserSession } from './redux/user/user.action.js';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors.js';
import { createStructuredSelector } from 'reselect';
import { collection } from 'firebase/firestore';


const App =({checkUserSession, currentUser, collectionsArray}) =>{
  
  useEffect (()=>{
    checkUserSession();
      }, [checkUserSession]);
    
   // const {setCurrentUser}= this.props;
    // this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth=>  {
    //   if (userAuth){
    //      const userRef = await createUserProfileDocument(userAuth);
         

    //    onSnapshot(userRef, (doc)=> {
    //     setCurrentUser({
    //       currentUser : {
    //         id : doc.id,
    //         ...doc
              
    //       }
    //     })
      // });  
      // } 
      //   setCurrentUser(userAuth);
    //});
    
     
  //  componentWillUnmount(){ this.unsubscribeFromAuth();}
  
    return( 
      <div>
     <Header/>
       <Routes>
          <Route 
           path='/'  element={<HomePage/>} />
          <Route  path='/shop/*' authed={true}  element={<ShopPage/>}>
           </Route>
          <Route exact path='/checkout'  element ={<CheckoutPage/>} />
          <Route exact  path='/signin'  element={currentUser ? <Navigate to='/'/> : <SignInAndSignUpPage/>}></Route>
          
        </Routes> 
    
    </div>
  )  
};

const mapStateToProps = createStructuredSelector({
  collectionsArray: selectCollectionsForPreview
})

 const mapDispatchToProps = (dispatch) => {
  return {
    checkUserSession: ()=> dispatch(checkUserSession())
  }
 }

export default connect(mapStateToProps, mapDispatchToProps)(App);
//"terminal.integrated.automationProfile.linux": {},