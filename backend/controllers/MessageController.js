const { user, message } = require("../models");

class MessageController {
  static async getMsg(req, res) {
    try {
      // console.log(req.userData)
      const data = await message.findAll({
        include: [user],
        order: [["id", "ASC"]],
      });
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ msg: e.error });
    }
  }

  static async addMsg(req, res) {
    // console.log(req.body, req.userData);
    const { name, subject, email, phone, messages } = req.body;
    const id = req.userData.id || 1;
    try {
      console.log("send");

      const data = await message.create({
        name,
        subject,
        email,
        phone,
        message: messages,
        userId: id,
      });
      res.status(200).json({ msg: "Success add", data: data });
    } catch (e) {
      res.json({ msg: e });
    }
  }

  static async delMsg(req, res) {
    if (req.userData.type !== "admin") {
      res.status(400).json({ msg: "You're not an Admin!" });
    } else {
      try {
        const id = +req.params.id;
        const data = await message.destroy({ where: { id } });
        res.status(200).json({ msg: `Success delete id ${id}` });
      } catch (e) {
        res.status(400).json({ msg: e });
      }
    }
  }
}

module.exports = MessageController;
