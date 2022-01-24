module.exports = () => {
    const mongooes = require("mongoose");
mongooes.connect("mongodb://127.0.0.1:27017/myblog", {
    useNewUrlParser: true, //这个属性会在url里识别验证所需的db
    useUnifiedTopology: true,
})
.then(() => {
    console.log('数据库连接成功！')
})
.catch(() => {
    console.log('数据库连接失败')
})
}