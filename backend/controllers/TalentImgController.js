const { talent,talent_image } = require("../models");

class TalentImgCotroller {
  static async getTalentImg(req, res) {
    try {
      // console.log(req.userData)
      const data = await talent_image.findAll({
        include: [talent],
        order: [["id", "ASC"]],
      });
      res.status(200).json(data);
    } catch (e) {
      res.status(400).json({ msg: e.error });
    }
  }

  static async update(req,res){
    const id = +req.params.id;
    const { talentId } = req.body;
    try{
      const result = await talent_image.update(
        {talentId},
        {where: {id} }
      );

      res.status(200).json({msg: `Update ${id} success!`, data: resul})
      }catch(err){
        res.status(500).json(err);
      }
    }

    static async imageByTalentId(req,res){
      const id = +req.params.id;
      try{
        const result = await talent_image.findAll({
          where:{talentId:id,primary:true}
        })

        res.status(200).json(result[0])
      }catch(e){
        res.status(400).json(e)
      }
    }
  }

module.exports = TalentImgCotroller;
