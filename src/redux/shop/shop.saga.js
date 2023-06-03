import {takeLatest, call, put, all} from 'redux-saga/effects';
import { firestore } from '../../firebase/firebase.utils';
import { convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { collection, getDocs } from 'firebase/firestore';
import ShopActionTypes from './shop.types';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

export function* fetchCollectionsAsync () {

try{
   const collectionRef = yield (collection(firestore, 'collections'))
    
      const snapshot = yield getDocs(collectionRef)
    
      
      const collectionsMap = yield call(
     convertCollectionsSnapshotToMap, snapshot
     );

      yield put (fetchCollectionsSuccess(collectionsMap)) ;
      
    } catch (error){
        yield put (fetchCollectionsFailure(error.message))
    }
}

export function* fetchCollectionsStart(){
yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}

export function* shopSagas(){
  yield(all([call(fetchCollectionsStart)]))
}