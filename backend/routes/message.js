const messageRoute = require("express").Router();
const MessageController = require("../controllers/MessageController");
const { authentication } = require("../middlewares/auth");

messageRoute.get("/", MessageController.getMsg);
messageRoute.post("/add", MessageController.addMsg);
messageRoute.delete("/delete/:id", authentication, MessageController.delMsg);

module.exports = messageRoute;
