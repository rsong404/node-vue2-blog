const verifyAuthorize = require('../../middleware/verifyAuthorize')
const model = require('../../model/carousel')
const multer = require('multer')
const MAO = require('multer-aliyun-oss');
const upload = multer({
    storage: MAO({
        config: {
            region: 'oss-cn-shenzhen',
            accessKeyId: 'LTAI5t6RGrh1Fd7tEkW7Ykok',
            accessKeySecret: 'kBwrUeKRMEM87vwJjMZo2uGW4z7yVB',
            bucket: 'myblog-public-image',
        },
        
    })
});
module.exports = (app) => {
    app.get('/admin/api/upload', async(req,res) => {
        const reuslt =await model.find({})
        res.send(reuslt)
    })

    app.post('/admin/api/upload', verifyAuthorize, upload.single('file'), async(req,res) => {
        const file = `https://myblog-public-image.oss-cn-shenzhen.aliyuncs.com/${req.file.filename}`
        // const reuslt =await model.create({imgsrc:file})
        // console.log(reuslt)
        res.send(file)
    })
}