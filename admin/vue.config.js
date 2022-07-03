const { resolve } = require('path')
module.exports = {
  lintOnSave: process.env.NODE_ENV === 'production',
  outputDir: resolve(__dirname , '../server/admin'), //定义打包文件的输出目录
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
}
