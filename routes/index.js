// 引入 express 包
let express = require('express')
//  引入 mongoose 包
let mongoose = require('mongoose')
// 引入 MD5 加密包
let md5 = require('blueimp-md5'); // 加载 blueimp-md5 模块(用于密码加密)
// 引入 formidable 包，处理图片上传请求
let formidable = require('formidable')

// 引入 path 模块
let path = require('path')

// 连接 MongoDB 数据库
mongoose.connect('mongodb://localhost/cbms')
let User = require('../models/user')
let Good = require('../models/goods')
let classifySchema = new mongoose.Schema({
    classification1: {
        type: String,
        required: true
    },
    classification2: {
        type: String,
        required: true
    }
})
let Classify = mongoose.model('Classify', classifySchema)

// 创建路由容器
let router = express.Router()

// 重定向至首页
router.get('/', (request, response) => {
    response.redirect('/index.html')
})

// 渲染首页
router.get('/index.html', (request, response) => {
    response.render('./index.html', {
        user: request.session.user
    })
})

// 渲染注册页面
router.get('/register', (request, response) => {
    response.render('./register .html')
})

// 处理注册请求
router.post('/register', (request, response) => {
    User.findOne({
        username: request.body.username
    }).then(data => {
        if (data) {
            response.json({
                status: 200,
                err_code: 1,
                message: '用户名已经被注册！'
            })
            throw new Error('用户名已经被注册！')
        } else {
            return User.findOne({
                telephone: request.body.telephone
            })
        }
    }).then(data => {
        if (data) {
            response.json({
                status: 200,
                err_code: 2,
                message: '电话已经被注册！'
            })
            throw new Error('电话已经被注册！')
        } else {
            let password = request.body.password
            let reg = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*.])[\da-zA-Z~!@#$%^&*.]{8,}$/g
            if (reg.test(password)) {
                password = md5(md5(password + 'qwe123ABC') + 'p0o9@123.c%')
                let user = new User({
                    username: request.body.username,
                    password: password,
                    telephone: request.body.telephone
                })
                user.save().then(() => {
                    console.log('保存成功！')
                }, err => {
                    console.log(err.errors)
                })
                response.json({
                    status: 200,
                    err_code: 0,
                    message: '注册成功！'
                })
            } else {
                response.json({
                    status: 200,
                    err_code: 3,
                    message: '密码太过于简单！'
                })
            }
        }
    }).catch(err => {
        if (err) {
            response.json({
                status: 500,
                err_code: 500,
                message: 'Server Error!'
            })
        }
    })
})

// 渲染登录页面
router.get('/login', (request, response) => {
    response.render('./login.html')
})

// 处理登录请求
router.post('/login', (request, response) => {
    let password = request.body.password
    password = md5(md5(password + 'qwe123ABC') + 'p0o9@123.c%')
    User.findOne({
        telephone: request.body.telephone
    }).then(data => {
        if (data) {
            return User.findOne({
                telephone: request.body.telephone,
                password: password
            })
        } else {
            response.json({
                status: 200,
                err_code: -2,
                message: '该电话号码未注册！'
            })
            throw new Error('该电话号码未注册！')
        }
    }).then(data => {
        if (data) {
            request.session.user = data
            response.json({
                status: 200,
                err_code: 0,
                message: '登陆成功！'
            })
        } else {
            response.json({
                status: 200,
                err_code: -3,
                message: '密码错误！'
            })
        }
    }).catch(err => {
        if (err) {
            response.json({
                status: 500,
                err_code: 500,
                message: 'Server Error!'
            })
        }
    })
})

// 处理退出请求
router.get('/logout', (request, response) => {
    response.send('处理退出请求')
})

// 渲染商品管理页面
router.get('/goods/commodity-management', (request, response) => {
    response.render('./goods/commodity-management.html', {
        user: request.session.user
    })
})

// 渲染添加商品页面
router.get('/goods/add', (request, response) => {
    response.render('./goods/add.html', {
        user: request.session.user
    })
})

// 处理添加商品请求
router.post('/goods/add', (request, response) => {
    console.log(request.body)
    let good = new Good({
        user_id: request.body.user_id,
        good_name: request.body.name,
        good_price: request.body.price,
        good_img: '../public/img/goods/sheng/分类名/d37191b00ded610e789acfa400f92d2.jpg',
        good_type: request.body.type,
        classification1: request.body.classification1,
        classification2: request.body.classification2
    })
    good.save().then(() => {
        response.json({
            status: 200,
            err_code: 0,
            message: '保存成功！'
        })
    }).catch(err => {
        if (err) {
            response.json({
                status: 500,
                err_code: 500,
                message: 'Server Error!'
            })
        }
    })
})

// 渲染分类管理页面
router.get('/goods/lassified-management', (request, response) => {
    response.render('./goods/lassified-management.html', {
        user: request.session.user
    })
})

// 渲染商品评价页面
router.get('/goods/commodity-evaluation', (request, response) => {
    response.render('./goods/commodity-evaluation.html', {
        user: request.session.user
    })
})

// 渲染热销商品页面
router.get('/goods/hot-goods', (request, response) => {
    response.render('./goods/hot-goods.html', {
        user: request.session.user
    })
})

// 渲染库存预警页面
router.get('/goods/inventory-warning', (request, response) => {
    response.render('./goods/inventory-warning.html', {
        user: request.session.user
    })
})

// 渲染订单管理页面
router.get('/order/order-management', (request, response) => {
    response.render('./order/order-management.html', {
        user: request.session.user
    })
})

// 渲染发货信息管理页面
router.get('/order/delivery-information-management', (request, response) => {
    response.render('./order/delivery-information-management.html', {
        user: request.session.user
    })
})

// 渲染订单管理页面
router.get('/order/refund-order', (request, response) => {
    response.render('./order/refund-order.html', {
        user: request.session.user
    })
})

// 获取分类列表
router.get('/goods/get-classification', (request, response) => {
    Classify.find().then(data => {
        /**
         * [ {'c1': ['c2', 'c3']}, {'c1': ['c2', 'c3']} ]
         */
        let temporaryArray = []
        let classification = []
        data.forEach((item, index) => {
            if(index === 0) {
                temporaryArray.push(item.classification1)
                classification.push({
                    classification1: item.classification1,
                    classification2: [item.classification2]
                })
            } else if(temporaryArray.includes(item.classification1)) {
                classification[temporaryArray.length -1].classification2.push(item.classification2)
            } else if(!temporaryArray.includes(item.classification1)) {
                temporaryArray.push(item.classification1)
                classification.push({
                    classification1: item.classification1,
                    classification2: [item.classification2]
                })
            }
        });
        response.json(classification)
    })
})

// 渲染 404 页面
router.get('/404', (request, response) => {
    response.send('404')
})

// 导出路由模块
module.exports = router