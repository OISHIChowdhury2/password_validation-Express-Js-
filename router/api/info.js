const express =require('express');
const router =express.Router();
const infoController =require('../../controllers/infoController');

router.route('/')
    .get(infoController.getAllInfo)
    .post(infoController.createNewInfo)
    .put(infoController.updateInfo)
    .delete(infoController.deleteInfo);

router.route('/:id')
      .get(infoController.getInfoById);
module.exports=router;
