module.exports = (req,res,next) => {
    req.model = require('../model/' + req.params.type)
    next()
}