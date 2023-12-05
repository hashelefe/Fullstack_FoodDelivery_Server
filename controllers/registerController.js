const usersDB = {
    users: require('../data/users.json'),
    setUsers: function(data) {this.users = data}
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const handleRegister = async (req, res) => {
    console.log("Server responded")
    const {username, password} = req.body;
    const userId = uuid.v4();
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Invalid request' });
    }
  
    // Check if the username is already taken
    if (usersDB.users.some(user => user.username === username)) {
      return res.status(409).json({ error: 'Username taken' });
    }
    try {
        //Encrypt password
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = { 
          "id": userId,
           username,
          "password": hashedPassword };
        usersDB.setUsers([...usersDB.users, newUser])
        await fsPromises.writeFile(
            path.join(__dirname,'../','data','users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({'success':`New user ${newUser} created`})
    } catch(err) { 
        res.status(500).json({'message': err.message})
    }
  }

module.exports = {handleRegister};