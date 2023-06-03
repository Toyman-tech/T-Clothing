import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { connect } from "react-redux";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";


import {useLocation} from 'react-router-dom';
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import { useEffect } from "react";




const ShopPage=({ fetchCollectionsStart})=>
{
  useEffect(() => {
  fetchCollectionsStart()
  }, [fetchCollectionsStart])
  const {pathname} = useLocation();
  const collect=useParams();
  const collectionId = collect['*']
 return (
  <div className="shop-page">
     <Routes>
     <Route  exact path='/' element={<CollectionsOverviewContainer/>} />
      
     <Route path=':collectionId'  element={<CollectionPageContainer collectionId={collectionId} />}    />
        </Routes>
  </div>
)};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCollectionsStart : () => {
      dispatch(fetchCollectionsStart())
    }
  }
}

export default connect(null, mapDispatchToProps)(ShopPage);