const User = require('../data/User')
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
    console.log("Server responded")
    const {username, password} = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Invalid request' });
    }
  
    // Check if the username is already taken
    const duplicate = await User.findOne({username}).exec();
    if (duplicate) {
      return res.status(409).json({ error: 'Username taken' });
    }

    try {
        //Encrypt password
        const hashedPassword = await bcrypt.hash(password,10);

        //Create and store new user
        const result = await User.create({ 
          "username": username,
          "password": hashedPassword });

          console.log(result)
          
        res.status(201).json({'success':`New user ${result.username} created`})
    } catch(err) { 
        res.status(500).json({'message': err.message})
    }
  }

module.exports = {handleRegister};