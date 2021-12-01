const { talent, user, talent_comment } = require("../models");

class TalentCommentCotroller {
  static async getTalentComment(req, res) {
    try {
      // console.log(req.userData)
      const data = await talent_comment.findAll({
        include: [talent, user],
        order: [["id", "ASC"]],
      });
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ msg: e.error });
    }
  }

  static async addComment(req, res) {
    try {
      const { comment, rating, talentId } = req.body;
      const id = req.userData.id;
      
      const data = await talent_comment.create({
        comment,
        rating,
        talentId,
        userId: id,
      });
      res.status(200).json({ msg: "Success add",data:data });
    } catch (e) {
      res.json({ msg: e.error });
    }
  }
}

module.exports = TalentCommentCotroller;
