module.exports = (app) => {
    app.post('/fontend/api/message',async (req,res)=>{
      let result = await require('../../model/message').create(req.body)
        res.send(result)
    })
}