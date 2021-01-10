// 引入 express 包
let express = require('express')

// 创建路由容器
let router = express.Router()

// 重定向至首页
router.get('/', (request, response) => {
    response.redirect('/index.html')
})

// 渲染首页
router.get('/index.html', (request, response) => {
    response.render('./index.html')
})

// 渲染商品管理页面
router.get('/goods/commodity-management', (request, response) => {
    response.render('./goods/commodity-management.html')
})

// 渲染分类管理页面
router.get('/goods/lassified-management', (request, response) => {
    response.render('./goods/lassified-management.html')
})

// 渲染商品评价页面
router.get('/goods/commodity-evaluation', (request, response) => {
    response.render('./goods/commodity-evaluation.html')
})

// 渲染热销商品页面
router.get('/goods/hot-goods', (request, response) => {
    response.render('./goods/hot-goods.html')
})

// 渲染库存预警页面
router.get('/goods/inventory-warning', (request, response) => {
    response.render('./goods/inventory-warning.html')
})

// 渲染订单管理页面
router.get('/order/order-management', (request, response) => {
    response.render('./order/order-management.html')
})

// 渲染发货信息管理页面
router.get('/order/delivery-information-management', (request, response) => {
    response.render('./order/delivery-information-management.html')
})

// 渲染订单管理页面
router.get('/order/refund-order', (request, response) => {
    response.render('./order/refund-order.html')
})

// 渲染注册页面
router.get('/register', (request, response) => {
    response.send('渲染注册页面')
})

// 处理注册请求
router.post('/register', (request, response) => {
    response.send('首页')
})

// 渲染登录页面
router.get('/login', (request, response) => {
    response.send('渲染登录页面')
})

// 处理登录请求
router.post('/login', (request, response) => {
    response.send('首页')
})

// 处理退出请求
router.get('/logout', (request, response) => {
    response.send('处理退出请求')
})

// 渲染 404 页面
router.get('/404', (request, response) => {
    response.send('404')
})

// 导出路由模块
module.exports = router
