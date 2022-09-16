const verifyAuthorize = require('../../middleware/verifyAuthorize')
const model = require('../../model/carousel')
const multer = require('multer')
const MAO = require('multer-aliyun-oss');
// 上传到阿里云存储上的相关操作
const upload = multer({
    storage: MAO({
        config: {
            region: 'oss-cn-shenzhen',
            accessKeyId: 'xxxx', //改成你自己的云存储id
            accessKeySecret: 'xxxx',//改成你自己的云存储accessKeySecret
            bucket: 'xxxx',//改成你自己的云存储bucket
        },
        
    })
});
module.exports = (app) => {
    app.get('/admin/api/upload', async(req,res) => {
        const reuslt =await model.find({})
        res.send(reuslt)
    })

    app.post('/admin/api/upload', verifyAuthorize, upload.single('file'), async(req,res) => {
        const file = `改成你自己的云存储地址如https://xxxxx.oss-cn-shenzhen.aliyuncs.com/${req.file.filename}`
        
        res.send(file)
    })
}