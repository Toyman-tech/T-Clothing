import React from 'react';
import { connect } from 'react-redux';
import {  Routes,  Route} from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import ShopPage from './pages/shop/shop.components.jsx';
import HomePage from "./pages/homepage/homepage.component.jsx";
import  { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils.js';
import Header from './components/header/header.component.jsx';

import SignInAndSignUpPage from './pages/sign-in-and-sign-out/sign-in-and-sign-out.component.jsx';
import {  onSnapshot } from 'firebase/firestore';
import { setCurrentUser } from './redux/user/user.action.js';
import { selectCurrentUser } from './redux/user/user.selectors.js';
import {createStructuredSelector} from 'reselect';
import CheckoutPage from './pages/checkout/checkout.component.jsx';
import { selectCollectionsForPreview } from './redux/shop/shop.selectors.js';

 class App extends React.Component {
 
 
  unsubscribeFromAuth = null;

  componentDidMount(){
    
    const {setCurrentUser, collectionsArray}= this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth=>  {
      if (userAuth){
         const userRef = await createUserProfileDocument(userAuth);
         

       onSnapshot(userRef, (doc)=> {
        setCurrentUser({
          currentUser : {
            id : doc.id,
            ...doc
              
          }
        })
      });  
      } 
        setCurrentUser(userAuth);
        addCollectionAndDocuments('collections', collectionsArray.map(({title, items})=>({title, items})))
    });
    
  }
  
   componentWillUnmount(){ this.unsubscribeFromAuth();}
  
  render() {
    return( 
      <div>
     <Header/>
       <Routes>
          <Route 
           path='/'  element={<HomePage/>} />
          <Route  path='/shop/*' authed={true}  element={<ShopPage/>}>
           </Route>
          <Route exact path='/checkout'  element ={<CheckoutPage/>} />
          <Route exact  path='/signin'  element={this.props.currentUser ? <Navigate to='/'/> : <SignInAndSignUpPage/>}></Route>
          
        </Routes> 
    
    </div>
    )  
  };
}

 const mapStateToProps = createStructuredSelector ({
    currentUser : selectCurrentUser, 
    collectionsArray: selectCollectionsForPreview
 })

 const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentUser: (user) => {
      dispatch(setCurrentUser(user))
    }
  }
 }

export default connect(mapStateToProps, mapDispatchToProps)(App);
//"terminal.integrated.automationProfile.linux": {},