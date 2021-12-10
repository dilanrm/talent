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
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({
        message: e.error,
      });
    }
  }

  static async getAll(req, res) {
    try {
      const result = await order.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(result);
    } catch (e) {
      res.status(400).json(e);
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
      payt_trx_num,
      city,
      address,
    } = req.body;
    const { id } = req.userData;
    try {
      const result = await order.create({
        enddate,
        startdate,
        tax,
        discount,
        total_due,
        total_days,
        description,
        payt_trx_num,
        city,
        address,
        status: "pending",
        userId: id,
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({
        message: err,
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
  static async confirm(req, res) {
    try {
      const id = +req.params.id;
      const status = "success";
      const result = await order.update(
        {
          status,
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
        payt_trx_num,
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
          payt_trx_num,
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
