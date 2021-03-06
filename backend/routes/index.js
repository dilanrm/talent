const router = require("express").Router();
const CheckoutContoller = require("../controllers/CheckoutController");
const { authentication } = require("../middlewares/auth");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Home Page",
  });
});

router.post("/checkout", authentication, CheckoutContoller.index);

const userRoutes = require("./user");
router.use("/users", userRoutes);
const talentRoute = require("./talent");
router.use("/talents", talentRoute);
const orderRoute = require("./order");
router.use("/orders", orderRoute);
const shoppingRoute = require("./shoppingCart");
router.use("/carts", shoppingRoute);
const talentImgRoute = require("./talentImg");
router.use("/talent-images", talentImgRoute);
const talentSocialRoute = require("./talentSocial");
router.use("/talent-socials", talentSocialRoute);
const talentCommentRoute = require("./talentComment");
router.use("/talent-comments", talentCommentRoute);
const lineItemRoute = require("./lineItem");
router.use("/line-items", lineItemRoute);
const uploadRoute = require("./upload");
router.use("/upload", uploadRoute);
const messageRoute = require("./message");
router.use("/message", messageRoute);

module.exports = router;
