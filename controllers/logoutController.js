const usersDB = {
    users: require('../data/users.json'),
    setUsers: function(data) {this.users = data}
}

const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req,res) => {

    const cookies = req.cookies;
    if(!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;
    
    //Check if refreshToken exists in db
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken)
    if(!foundUser){
        res.clearCookie('jwt',{httpOnly: true})
        return res.status(204);
    } 
    
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = {...foundUser,refreshToken: ''}
    usersDB.setUsers([...otherUsers,currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..','data', 'users.json'),
        JSON.stringify(usersDB.users)
    )

    res.clearCookie('jwt',{httpOnly: true, sameSite: 'None'}); // in production add secure:true
    res.sendStatus(204);
}

module.exports = {handleLogout}