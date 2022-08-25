
const {format} = require('date-fns');
const {v4: uuid}=require('uuid');
const fs =require('fs');
const fsPromises = require('fs').promises;
const path =require('path');

const logEvent = async (message) =>{
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try{
        if(!fs.existsSync(path.join(__dirname,'..','log')))
        {
            await fsPromises.mkdir(path.join(__dirname,'..','log'));
        }
        await fsPromises.appendFile(path.join(__dirname,'..','log','event.txt'),logItem);
    }
    catch(err){
        console.error(err);
    }
}

const logger =(req,res,next)=>
{
    logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`,'event.txt');
    console.log(`${req.method} ${req.path}`);
    next();
}  

module.exports = {logger,logEvent};
