const { line_item, talent, cart, order } = require("../models");

class LineItemController {
  static async getLineItem(req, res) {
    let { id } = req.userData;

    try {
      const cartId = await cart.findAll({
        where: { userId: id },
      });
      if (cartId) {
        try {
          const result = await line_item.findAll({
            where: {
              cartId: cartId[0].dataValues.id,
              status: "booking",
            },
            include: [talent, cart, order],
            order: [["id", "ASC"]],
          });
          res.status(200).json(result);
        } catch (e) {
          res.status(400).json({
            message: err,
          });
        }
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err,
      });
    }
  }

  static async getItemByOrder(req,res){
    const id = +req.params.id;
    try {
      const result = await line_item.findAll({
        include: [talent],
        order: [["id", "ASC"]],
      });
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({
        message: e,
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

  static async edit(req, res) {
    const id = +req.params.id;
    const { ids } = req.body;
    console.log(req.body)
    try {
      const result = await line_item.update(
        { orderId: id, status: "success" },
        { where: { id: ids } }
      );
      res.status(200).json(result);
    } catch (e) {
      res.status(500).json(e);
      console.log(e)
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
