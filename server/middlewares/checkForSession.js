module.exports = {
    checkForSession: (req, res, next) => {
        // console.log(req.session.user);
        if (!req.session.user) {
            let user = {
                username: '',
                cart: [],
                total: 0
            }
            req.session.user = user;
        }
        // console.log(req.session.user);
        next();
    }
}