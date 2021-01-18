const userDao = require('../daos/userDao');

module.exports = function(app, socket) {
    app.get("/login", (req, res) => {
        userDao.findUserByCredentials(req.headers.username, req.headers.password)
        .then((user) => res.json(user))
        .catch(() => res.status(400).send("Failed to login"))
    })

    app.get("/users", (req, res) => {
        userDao.findAllUsers()
        .then((users) => res.json(users))
        .catch(() => res.status(400).send("Failed"))
    })

    app.post("/users", (req, res) => {
        const userInfo = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
        };
    
        if (typeof req.body["password"] !== 'undefined')
            userInfo["password"] = req.body.password
    
        if (typeof req.body["userType"] !== 'undefined')
            userInfo["userType"] = req.body.userType
    
        userDao.findUserByUserName(userInfo.userName)
        .then(user => {
            if (user !== null) {
                console.log(user)
                res.status(400).send("Failed to create user")
            }
            else {
                userDao.createUser(userInfo)
                .then((user) => res.json(user))
                .catch(() => res.status(400).send("Failed"))
            }
                
        })
        .catch(() => res.status(400).send("Failed"))
    })

    app.get("/users/:userName", (req, res) => {
        userDao.findUserByUserName(req.params.userName)
        .then((user) => res.json(user))
        .catch(() => res.status(400).send("Failed"))
    })

    app.put("/users/:userName", (req, res) => {
        userDao.updateUserDetails(req.params.userName, req.body)
        .then(user => res.json(user))
        .catch(() => res.status(400).send("Failed to update"))
    })

    app.delete("/users/:id", (req, res) => {
        userDao.deleteUserById(req.params.id)
        .then(() => res.send("Success"))
        .catch(() => res.status(400).send("Failed to delete user"))
    })
}