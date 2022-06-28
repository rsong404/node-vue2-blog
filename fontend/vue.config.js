module.exports = {
  lintOnSave: process.env.NODE_ENV === 'production',
  outputDir: __dirname + '/../server/fontend', //定义打包文件的输出目录
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
}
