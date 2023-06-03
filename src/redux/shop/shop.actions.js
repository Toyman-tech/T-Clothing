import ShopActionTypes from "./shop.types";

export const fetchCollectionsStart=()=> ({
    type:ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess= (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload : collectionsMap
})

export const fetchCollectionsFailure =(errorMessage) => ({
    type : ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload : errorMessage
})

// export const fetchCollectionsStartAsync =()=> {
//     return dispatch => {
//      const collectionRef = collection (firestore, 'collections')
//      console.log(collectionRef);
//      dispatch(fetchCollectionsStart());
     
//       collectionRef.get().then(snapShot=>{
//         const collectionsMap = convertCollectionsSnapshotToMap(snapShot);
//         console.log(collectionsMap);
//        dispatch(fetchCollectionsSuccess(collectionsMap));
//      }).catch(error => dispatch(fetchCollectionsFailure(error.message)))
//     }
// }