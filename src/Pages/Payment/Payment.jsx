import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import ProductCard from "../../Components/Product/ProductCard";
import { Datacontext } from "../../Components/DataProvider/DataProvider";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormator from "../../Components/CurrenceFormator/CurrencyFormator";

function Payment() {
  const [{ basket, user }, dispatch] = useContext(Datacontext);
  console.log(user);
  //total item on the basket
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  // total basket or product price
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  // after importing them we call them here
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    console.log(e);
    e.error?.message ? setCardError(e.error?.message) : setCardError(""); // if there is error set error from the event if no erroer set it empty
  };

  return (
    <LayOut>
      {/*header */}
      <div className={classes.payment__header}>Checkout {totalItem} items</div>
      {/*payment methodd */}

      <section className={classes.payment}>
        {/*addres */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>1234 Node Lean</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />
        {/*product */}
        <div className={classes.flex}>
          <h3>Review items and deliver addresse</h3>
          <div>
            {basket?.map((item, i) => {
              return <ProductCard key={i} data={item} flex={true} />;
            })}
          </div>
        </div>
        <hr />

        {/*card form */}
        <div className={classes.flex}>
          <h3>payment methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form action="">
                {/*error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/*card elment*/}
                <CardElement onChange={handleChange} />
                {/*price */}

                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      total Order |<CurrencyFormator amount={total} />{" "}
                    </span>
                  </div>
                  <button>pay Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
