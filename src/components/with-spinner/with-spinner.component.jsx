import React from "react";
 import { SpinnerContainer, SpinnerOverlay } from "./with-spinner.styles";

 const withSpinner = WrapppedComponent =>{
  const spinner= ({ isLoading, ...otherProps})=>{
    return isLoading?(
        <SpinnerOverlay>
            <SpinnerContainer/>
        </SpinnerOverlay>
    ):(
        <WrapppedComponent {...otherProps} />
    )
 }
  return spinner;
};
 export default withSpinner;