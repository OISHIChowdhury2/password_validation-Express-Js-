const data ={
info : require('../model/info.json'),
setInfo: function (data) {this.info =data}
}
const getAllInfo = (req,res)=>{
    res.json(data.info);
}
const createNewInfo =(req,res)=>{
    const newInfo ={
        id: data.info[data.info.length - 1].id + 1|| 1,
        fistName: req.body.firstName,
        lastName: req.body.lastName
    }
    if(!newInfo.fistName || !newInfo.lastName){
        return res.status(400).json({'message': 'first and last name'});
    }
        data.setInfo([...data.info, newInfo]);
        res.json(data.info);
}

const updateInfo = (req,res)=>{
  const info =data.info.find(emp => emp.id === parseInt(req.body.id));
  if(!info){
        return res.status(400).json({'massage': `information ID ${req.body.id} not found`});
  }
  if(req.body.firstName) info.firstName = req.body.firstName;
  if(req.body.lastName) info.lastName = req.body.lastName;
        const filteredArray = data.info.filter(emp => emp.id !== parseInt(req.body.id));
        const unsortedArray = [...filteredArray, info];
        data.setInfo(unsortedArray.sort((a,b)=> a.id> b.id ?1 : a.id< b.id? -1 : 0));
        res.json(data.info);
}

const deleteInfo = (req,res)=>{
  const info=data.info.filter(emp=> emp.id !== parseInt(req.body.id));
  if(!info){
        return res.status(400).json({'massage': `information id ${req.body.id}`});
  }
        const filteredArray =data.info.filter(emp=>emp.id !== parseInt(req.body.id));
        data.setInfo([...filteredArray]);
        res.json(data.info);
}
const getInfoById = (req,res)=>{
    const info=data.info.filter(emp=> emp.id !== parseInt(req.body.id));
    if(!info){
        return res.status(400).json({'massage': `information id ${req.body.id}`});
    }
    res.json(info);
}
module.exports={
        getAllInfo,
        createNewInfo,
        updateInfo,
        deleteInfo,
        getInfoById
}