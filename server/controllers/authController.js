const users = require('../models/users');
let id = 1;
module.exports = {
    login: (req, res) => {
        const { username, password } = req.body;
        let userInd = users.findIndex(e => e.username === username && e.password === password);
        if (userInd === -1) {
            res.status(500).json({message: 'invalid username/password'})
        }else{
            req.session.user.username = username;
            res.status(200).json(req.session.user);
        }

    },
    register: (req, res) => { 
        const { username, password } = req.body;
        let user = {
            id,
            username,
            password
        }
        id++;
        users.push(user);
        req.session.user.username = username;
        res.status(200).json(req.session.user);
     },
    signout: (req, res) => { 
        req.session.destroy()
        res.status(200).json(req.session);
    },
    getUser: (req, res) => { 
        res.status(200).json(req.session.user);
    }

}