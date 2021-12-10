const { line_item, order } = require("../models");
const stripe = require("stripe")(
  "sk_test_51K2wUBCHu9iZyST2aKLTbxg6PWm9drKpWYCmpkROKYUDv4XmgevtT4nXBq0GYWQefgJlgAv5fHjxE9h2D8NZHsYl007HoCqNmB"
);
const { v4: uuidv4 } = require("uuid");
uuidv4();

class CheckoutContoller {
  static async index(req, res) {
    // res.status(200).json({status:"success",msg:req.body});
    let error;
    let status;
    let datas;
    const { product, token } = req.body;
    try {
      const customer = await stripe.customers.create({
        email: token.email,
        source: token.id,
      });

      const idempotencyKey = uuidv4();
      const charge = await stripe.charges.create(
        {
          amount: product.total_due * 100,
          currency: "idr",
          customer: customer.id,
          receipt_email: token.email,
          description: `Purchased the ${product.data[0].talent.fullname}`,
          shipping: {
            name: token.card.name,
            address: {
              line1: token.card.address_line1,
              line2: token.card.address_line2,
              city: token.card.address_city,
              country: token.card.address_country,
              postal_code: token.card.address_zip,
            },
          },
        },
        {
          idempotencyKey,
        }
      );
      console.log("Charge:", { charge });
      status = "success";
      datas = { charge };
    } catch (error) {
      console.error("Error:", error);
      status = "failure";
    }
    res.json({ error, status, data: datas });
  }
}

module.exports = CheckoutContoller;
