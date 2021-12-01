const { talent, talent_social } = require("../models");

class TalentSocialController {
  static async getTalentSocial(req, res) {
    try {
      // console.log(req.userData)
      const data = await talent_social.findAll({
        include: [talent],
        order: [["id", "ASC"]],
      });
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ msg: e.error });
    }
  }

  static async addSocial(req, res) {
    try {
      const { platform, account, talentId } = req.body;

      const data = await talent_social.create({
        platform,
        account,
        talentId,
      });
      res.status(200).json({ msg: "Success add", data: data });
    } catch (e) {
      res.json({ msg: e.error });
    }
  }
}

module.exports = TalentSocialController;
