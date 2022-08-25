const usersDB ={
    users: require('../model/users.json'),
    setUpdate: function(data){this.users =data}
}

const bcrypt = require('bcrypt');
// const { json } = require('express');

const handleLogin = async (req, res)=>{
    const{user, pwd}= req.body;
    if(!user || !pwd) return res.status(400).json({'massage':'need user name'});
    const foundUser = usersDB.users.find(person => person.username === user);
    if(!foundUser) return res.sendStatus(401);

    const match = await bcrypt.compare(pwd,foundUser.password);
    if(match){
        res.json({'success': `user ${user}` });
    }else{
        res.sendStatus(401);
    }
}

module.exports = { handleLogin};