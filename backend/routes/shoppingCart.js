const shoppingRoute = require("express").Router();
const shoppingController = require("../controllers/CartController");
const { authentication } = require("../middlewares/auth");

shoppingRoute.get("/", authentication, shoppingController.getCart);
shoppingRoute.post("/add", authentication, shoppingController.addCart);
shoppingRoute.get("/:id", shoppingController.cartById);
shoppingRoute.put("/edit/:id", authentication, shoppingController.editCart);
shoppingRoute.delete(
  "/delete/:id",
  authentication,
  shoppingController.deleteCart
);

module.exports = shoppingRoute;
