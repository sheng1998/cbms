// 引入 node 自带模块 path
let path = require('path')
// 引入 express 包
let express = require('express')

// 引入路由模块
let router = require('./routes/index') 

// 创建 express 的实例
let app = express()

// 公开静态资源目录 public
app.use('/public/', express.static(path.join(__dirname, './public/')))

// 在 express 中配置使用 express-art-template 模板引擎
app.engine('html', require('express-art-template'))
// 需要注意的是 express-art-template 依赖 art-template 模块，所以必须也要安装 art-template 包
// 上面的第一个参数说明，在渲染以 .html 结尾的文件时，使用 express-art-template 模板引擎处理。
// express-art-template 是专门用来在 express 中把 art-template 整合到 express 中的包。

// express 为 response 相应对象提供了一个方法：render, 该方法默认情况下是不可以使用的，当配置了模板引擎就可以使用了
// 用法：response.render('html模板名', {模板数据})
// 第一个参数指定模板文件，默认会到服务器入口文件所在目录的 views 目录中寻找
app.set('views', path.join(__dirname, './views/'))

// 把路由模块挂载到 app 服务中
app.use(router)

// 监听服务器端口
app.listen(3000, () => {
    console.log('running...')
})
