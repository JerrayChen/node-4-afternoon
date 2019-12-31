const swag = require('../models/swag');
module.exports = {
    search: (req, res) => {
        const {category} = req.query;
        // console.log(category);
        
        let filteredSwag = swag.filter(e=>e.category === category);
        if (filteredSwag.length === 0){
            res.status(200).json(swag);
        }else{
            res.status(200).json(filteredSwag);
        }
    }
}