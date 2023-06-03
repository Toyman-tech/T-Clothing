import {takeLatest, put, all, call} from 'redux-saga/effects';
import { UserActionTypes } from './user.types';
import { auth, googleProvider, getCurrentUser,  createUserProfileDocument } from '../../firebase/firebase.utils'; 
import { signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
signInWithPopup} from 'firebase/auth';
import {
    signInFailure, 
    signInSuccess,
    signOutSuccess,
    signOutFailure,
    signUpSuccess,
    signUpFailure
    } from './user.action';
import { getDoc } from 'firebase/firestore';

export function* getSnapshotFromAuth(userAuth, additionalData){
 try {
    const userRef = yield call (createUserProfileDocument, userAuth, additionalData);
    const userSnapshot = yield getDoc(userRef); 
  yield put(signInSuccess({id: userSnapshot, ...userSnapshot.data()}));
 } catch (error) {
    yield put (signInFailure(error));
 }
};

export function* signInWithGoogle (){
 try {
    const {user} = yield signInWithPopup(auth, googleProvider)
    getSnapshotFromAuth(user)
 } catch (error) {
    yield put (signInFailure(error));
 }
}


export function* onGoogleSignInStart(){
    yield takeLatest (UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle );
}

export function* signInWithEmail({payload: {email, password}}){
 try {
    const {user} = yield signInWithEmailAndPassword(auth, email, password);
    console.log(user);
    yield getSnapshotFromAuth(user)   
  } catch (error) {
    yield put (signInFailure(error))
 }
}

export function* onEmailSignInStart(){
yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* isUserAuthenticated(){
 try {
    const userAuth = yield getCurrentUser()
    if(!userAuth) return;
    yield getSnapshotFromAuth(userAuth)
 } catch (error) {
    yield put(signInFailure(error))
 }
}

export function* signOut(){
    try {
        yield auth.signOut()
        yield put (signOutSuccess())
    } catch (error) {
        yield put(signOutFailure(error))
    }
}

export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut )
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapshotFromAuth(user, additionalData);
  }

export function* signUp({payload: {email, password, displayname}}){
    try {
        const {user} = yield createUserWithEmailAndPassword(auth, email, password);
        yield put (signUpSuccess({user, additionalData:{displayname}}));
    } catch (error) {
        yield put(signUpFailure(error));
    }
}
export function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
  }
  
  export function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
  }

export function* userSagas(){
    yield all([
        call(onGoogleSignInStart), call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}

