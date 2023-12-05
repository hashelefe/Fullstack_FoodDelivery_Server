const usersDB = {
    users: require('../data/users.json'),
    setUsers: function(data) {this.users = data}
}

const jwt = require('jsonwebtoken')
require('dotenv').config();

const handleRefreshToken = (req,res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(401);
    console.log(cookies.jwt)
    const refreshToken = cookies.jwt;

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken)
    if(!foundUser) return res.status(403);
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,decoded) => {
            if(err || foundUser.username !== decoded.username) return res.status(403);
            const roles = Object.values(foundUser.roles)
            const accessToken = jwt.sign(
                {"UserInfo":{
                    "username": decoded.username,
                    "roles": roles }},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '2m'}   
            );
            res.json({accessToken})
        })
}

module.exports = {handleRefreshToken}