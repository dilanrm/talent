const { line_item, talent, cart } = require("../models");

class LineItemController {
  static async getLineItem(req, res) {
    try {
      const result = await line_item.findAll({
        include: [talent, cart],
        order: [["id", "ASC"]],
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({
        message: err,
      });
    }
  }

  static async addLineItem(req, res) {
    const { days, status, talentId, cartId } = req.body;
    try {
      const result = await line_item.create({
        days,
        status,
        talentId,
        cartId,
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({
        message: err.error,
      });
    }
  }

  static async editLineItem(req, res) {
    try {
      const id = +req.params.id;
      const { days, status, talentId, cartId } = req.body;
      const result = await line_item.update(
        {
          days,
          status,
          talentId,
          cartId,
        },
        { where: { id } }
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({
        message: err.error,
      });
    }
  }

  static async deleteItemLine(req, res) {
    try {
      const id = +req.params.id;
      const result = await line_item.destroy({
        where: { id },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status.json({
        message: err.error,
      });
    }
  }
}

module.exports = LineItemController;
