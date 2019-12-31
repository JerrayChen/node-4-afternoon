let swag = require('../models/swag');

module.exports = {
    add: (req, res) => {
        
        const { id } = req.params;
        // console.log(id);
        let ind = swag.findIndex(e => e.id == id);
        // console.log(ind);
        
        if (ind !== -1) {
            // swag[ind]
            let cartInd = req.session.user.cart.findIndex(e=>e.id==id);
            // not in the cart, add to the cart.
            if(cartInd == -1){
                req.session.user.cart.push(swag[ind]);
                req.session.user.total += swag[ind].price;
            }
        }
        res.status(200).json(req.session.user);
    },
    delete: (req, res) => {
        const { id } = req.params;
        let { user } = req.session;
        let ind = user.cart.findIndex(e => e.id == id);
        if (ind !== -1) {
            user.total -= user.cart[ind].price;
            user.cart.splice(ind, 1);
        }
        res.status(200).json(req.session.user);
    },
    checkout: (req, res) => {
        let { user } = req.session;
        user.cart = [];
        user.total = 0;
        res.status(200).json(req.session.user);
    }
}