const talentSocialRoute = require("express").Router();
const TalentSocialController = require("../controllers/TalentSocialController");
const { authentication } = require("../middlewares/auth");

talentSocialRoute.get("/", TalentSocialController.getTalentSocial);
talentSocialRoute.post(
  "/add",
  authentication,
  TalentSocialController.addSocial
);

module.exports = talentSocialRoute;
