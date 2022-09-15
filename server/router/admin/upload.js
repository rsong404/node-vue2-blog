const verifyAuthorize = require('../../middleware/verifyAuthorize')
const model = require('../../model/carousel')
const multer = require('multer')
const MAO = require('multer-aliyun-oss');
// 上传到阿里云存储上的相关操作
const upload = multer({
    storage: MAO({
        config: {
            region: 'oss-cn-shenzhen',
            accessKeyId: 'xxxx',
            accessKeySecret: 'xxxx',
            bucket: 'xxxx',
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
        
        res.send(file)
    })
}