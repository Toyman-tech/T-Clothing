import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollections } from "../../redux/shop/shop.selectors";
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../../pages/collection/collection.component';
import {useLocation} from 'react-router-dom'

const ShopPage=(props)=>{
  const {pathname} = useLocation();
  const collect=useParams();
  const collectionId = collect['*']
  console.log( props, pathname, collectionId);
 return (
  <div className="shop-page">
     <Routes>
     <Route  exact path='/' element={<CollectionsOverview/>}  />
      
     <Route path=':collectionId'  element = {<CollectionPage collectionId={collectionId} />}    />
        </Routes>
  </div>
)};

const mapStateToProps = createStructuredSelector({
  collections: selectCollections
});


export default connect(mapStateToProps)(ShopPage);