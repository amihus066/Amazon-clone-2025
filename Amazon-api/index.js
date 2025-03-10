const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // this will read the .env key
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express(); // initializing express
app.use(cors({ origin: true })); // initaliz cors
app.use(express.json()); // the middle ware use to read jason data

app.get("/", (req, res) => {
  res.status(200).json({
    message: "success",
  });
});

// sending post request or sending the total amount on the cart to the stripe to process and geting the payment intent
app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
  if (total > 0) {
    //console.log("payment recived", total);// after checking this on thunder and its successe we creat payment intent to the stripe
    //res.send(total);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    console.log(paymentIntent);
    res.status(201).json({
      clinentSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(403).json({
      message: "total must be graeter than zero",
    });
  }
});

app.listen(5000, (err) => {
  if (err) throw err;
  console.log("Amazon Server Running on PORT:5000, http://localhost:5000");
});
