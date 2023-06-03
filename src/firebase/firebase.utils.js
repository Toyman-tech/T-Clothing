import { initializeApp } from '@firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

import { signInWithPopup } from 'firebase/auth';

 
const firebaseConfig = {
    apiKey: "AIzaSyC65muqzdRcs6D_AfhZx_mj3bLhhyPUCJ4",
    authDomain: "toyman-db.firebaseapp.com",
    projectId: "toyman-db",
    storageBucket: "toyman-db.appspot.com",
    messagingSenderId: "974675889668",
    appId: "1:974675889668:web:79c058fda144c16324af51",
    measurementId: "G-7Q17Y57K37"
};
const app = initializeApp (firebaseConfig);
 //  const docRef = doc (firestore, 'users/udg837e87eysb' );
  //  const docSnap = await getDoc (docRef);
  //     console.log(docSnap);
     
export const createUserProfileDocument =  async (
    userAuth, additionalData ) => {
    if (!userAuth) return;
 
    const userRef = doc(firestore, 'users',`${userAuth.uid}`  );
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(doc(userRef, 'users', 'data' ), {
          displayName,
          email,
          createdAt,
          ...additionalData
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
  
    return userRef;
  };

  export const addCollectionAndDocuments = async(collectionKey, objectsToAdd)=> {
    const collectionRef = collection(firestore,  collectionKey)
    console.log(collectionRef);

    const batch = writeBatch(firestore);
    
  objectsToAdd.forEach(obj => {
    const newDocRef = doc( collectionRef )
     console.log(newDocRef);
     batch.set(newDocRef, obj)
       });
    return  batch.commit();
  };
  
  export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc=> {
      const {title, items} = doc.data();
      return{
        routeName: encodeURI(title.toLowerCase()),
        id : doc.id,
        title,
        items
      }
    });
    return transformedCollection
  };

 export const getCurrentUser=()=> {
  return new Promise((resolve, reject)=> {
    const unsubscribe = auth.onAuthStateChanged(userAuth=>{
      unsubscribe();
      resolve (userAuth);
    }, reject)
  });
 }

  export const auth = getAuth(app);
    export const firestore = getFirestore(app);

    export const googleProvider = new GoogleAuthProvider();
    
    googleProvider.setCustomParameters({prompt : 'select_account'});
     export const signInWithGoogle = ()=> signInWithPopup(auth, googleProvider);

     export default app;

     