import React from "react";
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 1000;
    const publishablekey = 'pk_test_51MkabaKMI64olOgIfSzkqlSbBnZmAUsX8JtH4RqFMUlFZOdnzCfDtISUGTbo85jaBwSLFtugBQj51j2fMUyJPOVS00HDBovth7';
    const onToken = token => {
        console.log(token);
        alert(`your payment of $${price} is successful. Thanks for the patronage`)
    }

    return(
     <StripeCheckout
      label = 'Pay Now'
      name="Toyin Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description= {`Your total is ${price}`}
      amount = {priceForStripe}
      panelLabel ='Pay Now'
      token={onToken}
      stripeKey ={publishablekey}
      />
    )
} ;

export default StripeCheckoutButton;