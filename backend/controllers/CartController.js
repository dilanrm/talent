const {cart, user} = require('../models');

class CartController{
    static async getCart(req,res) {
        try {
            let {id} = req.userData
            const result = await cart.findAll({
                where: {
                    userId: id
                },
                include: [user],
                order: [["id", "ASC"]]
            });
            res.status(200).json(result)
        }catch(err) {
            res.status(400).json({
                message: err.error
            })
        }
    }

    static async addCart(req,res) {
        const {status} = req.body;
        try {
            let {id} = req.userData
            const result = await cart.create({
                status,userId: id
            });
            res.status(200).json(result)
        }catch(err) {
            res.status(400).json({
                message: err.error
            })
        }
    }

    static async cartById(req,res){
        const id = req.params.id;
        try {
            const result = await cart.findByPk(id);
            res.status(200).json(result);
        }catch(err) {
            res.status(400).json({
                message: err.error
            })
        }
    }

    static async editCart(req,res) {
        try {
            const id = +req.params.id;
            const {status,userId} = req.body;
            const result = await cart.update({
                status,userId
            }, {where: {id} });
            res.status(200).json(result);
        }catch(err) {
            res.status(400).json({
                message: err.error
            })
        }
    }

    static async deleteCart(req,res) {
        try {
            const id = +req.params.id;
            const result = await cart.destroy({where: {id} });
            res.status(400).json(result);
        }catch(err) {
            res.status(400).json({
                message: err.error
            })
        }
    }
}

module.exports = CartController;