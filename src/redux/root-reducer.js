import {combineReducers} from 'redux';
import userReducer from './user/user.reducer';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

import cartReducer from './cart/cart.reducer';

const persistConfig={
 key:'root',
 storage,
 whitelist:['cart']
}

const rootReducer =  combineReducers ({
    cart : cartReducer,
    user : userReducer,
    directory: directoryReducer,
    shop:shopReducer 
});


export  default persistReducer(persistConfig, rootReducer);