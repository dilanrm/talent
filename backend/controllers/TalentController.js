const { talent, user } = require("../models");

class TalentCotroller {
  static async getTalent(req, res) {
    try {
      // console.log(req.userData)
      let { id } = req.userData;
      const data = await talent.findAll({
        where: {
          userId: id,
        },
        include: [user],
        order: [["id", "ASC"]],
      });
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ msg: e.error });
    }
  }

  static async getTalentAll(req, res) {
    try {
      // console.log(req.userData)
      const data = await talent.findAll({
        include: [user],
        order: [["id", "ASC"]],
      });
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ msg: e.error });
    }
  }

  static async getTalentById(req, res) {
    const id = +req.params.id;
    try {
      // console.log(req.userData)
      let { id } = req.userData;
      const data = await talent.findAll({
        where: {
          id,
          userId: id,
        },
        include: [user],
        order: [["id", "ASC"]],
      });
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ msg: e.error });
    }
  }

  static async addTalent(req, res) {
    try {
      const {
        fullname,
        age,
        birth,
        personality,
        skills,
        price,
        gender,
        nationality,
        height,
      } = req.body;
      let id = 0;
      if (req.body.userId) {
        id = req.body.userId;
      } else {
        id = req.userData.id;
      }
      const data = await talent.create({
        fullname,
        age,
        birth,
        personality,
        skills,
        price,
        gender,
        nationality,
        height,
        userId: id,
      });
      res.status(200).json({ msg: "Success add" });
    } catch (e) {
      res.json({ msg: e.error });
    }
  }

  static async talentById(req, res) {
    const id = +req.params.id;
    try {
      const data = await talent.findByPk(id);
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ msg: e.error });
    }
  }

  static async editTalent(req, res) {
    try {
      const id = +req.params.id;
      const {
        fullname,
        age,
        birth,
        personality,
        skills,
        price,
        gender,
        nationality,
        height,
        userId,
      } = req.body;
      const data = await talent.update(
        {
          fullname,
          age,
          birth,
          personality,
          skills,
          price,
          gender,
          nationality,
          height,
          userId,
        },
        { where: { id } }
      );
      res.status(200).json({ msg: "Edit Success" });
    } catch (e) {
      res.status(400).json({ msg: e.error });
    }
  }

  static async deleteTalent(req, res) {
    try {
      const id = +req.params.id;
      const data = await talent.destroy({ where: { id } });
      res.status(200).json({ msg: `Succes delete id ${id}` });
    } catch (e) {
      res.status(400).json({ msg: e.error });
    }
  }
}

module.exports = TalentCotroller;
