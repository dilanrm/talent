const { order, user } = require("../models");

class OrderController {
  static async getOrder(req, res) {
    try {
      let { id } = req.userData;
      const result = await order.findAll({
        where: {
          userId: id,
        },
        include: [user],
        order: [["id", "ASC"]],
      });
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({
        message: e.error,
      });
    }
  }

  static async addOrder(req, res) {
    const {
      enddate,
      startdate,
      tax,
      discount,
      total_due,
      total_days,
      description,
      payt_trx_numb,
      city,
      address,
      status,
    } = req.body;
    try {
      const { id } = req.userData;
      const result = await order.create({
        enddate,
        startdate,
        tax,
        discount,
        total_due,
        total_days,
        description,
        payt_trx_numb,
        city,
        address,
        status,
        userId: id,
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({
        message: err.error,
      });
    }
  }

  static async orderById(req, res) {
    try {
      const id = req.params.id;
      const result = await order.findByPk(id);
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({
        message: err.error,
      });
    }
  }

  static async editOrder(req, res) {
    try {
      const id = +req.params.id;
      const {
        enddate,
        startdate,
        tax,
        discount,
        total_due,
        total_days,
        description,
        payt_trx_numb,
        city,
        address,
        status,
        userId,
      } = req.body;
      const result = await order.update(
        {
          enddate,
          startdate,
          tax,
          discount,
          total_due,
          total_days,
          description,
          payt_trx_numb,
          city,
          address,
          status,
          userId,
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

  static async deleteOrder(req, res) {
    try {
      const id = +req.params.id;
      const result = await order.destroy({ where: { id } });
      res.status(200).json({ message: `Success deleted id ${id}` });
    } catch (err) {
      res.status(400).json({
        message: err.error,
      });
    }
  }
}

module.exports = OrderController;
