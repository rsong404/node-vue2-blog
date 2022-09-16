# node-vue2-blog
这是一个后端使用node+mongodb,前端和后台使用vue2+vue-router+vuex+element-ui的个人博客项目。

# 博客效果图

此项目文档不够详细，不适合小白，需有点基础

![](https://cdn.jsdelivr.net/gh/rsong404/vuepress_img@master/images/kkan2.jpg)

![](https://cdn.jsdelivr.net/gh/rsong404/vuepress_img@master/images/kkan1.jpg)

# 安装运行
1. 首先确保你电脑或服务器上安装了 nodejs 和 MongoDB

2. 下载安装整个项目

3. 进入项目根目录的 server 文件夹打开此目录下的终端 输入 npm i 按回车执行，等它下载安装所有依赖，然后运行 npm run start (正常的话可以是看到终端输出 服务地址，和数据库链接成功的字样，可以在浏览器中打开)

4. 同理进入根目录的 admin文件夹调开此文件夹下的终端，执行终端命令 npm i 安装所有依赖，安装完成后执行 npm run serve 开启服务,访问后台，初始化地址

5. 同理进入根目录的 fontend 文件夹调开此文件夹下的终端，执行终端命令 npm i 安装所有依赖，安装完成后执行 npm run serve 开启服务

# 需修改的文件
## 需要修改的地方都在文件里注释好了

/server/router/admin/admin.js

/server/router/admin/upload.js  //此文件可以不修改，不修改的话，后台上传图片时只能上传图片地址，就是使用图库的里图片，不能直接上传图片到服务器

/server/router/fontend/message.js

fontend还有很多小地方需要调整和修改，自己研究一下吧

/fontend/src/util/audio.js  //修改音源地址