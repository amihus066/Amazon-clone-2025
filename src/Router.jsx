import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
//import A from "./Pages/Auth/Auth";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Auth from "./Pages/Auth/Auth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51R0qscKuHWG1GxTbzfIVXztmfjw45PQfj9R8SP56ElOKN3hPr0r9jiouUlpzrVvZ5JquGEWV91GxtgCUVPlvyCER00amIA9YWT"
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />
        <Route path="/orders" element={<Orders />} />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
