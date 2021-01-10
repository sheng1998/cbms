# 商品后台管理系统

## 环境依赖
node v10.0.0+

## 启动项目
```shell
npm initall
node app.js
```

## 目录结构描述
```
.                           // 项目根目录
├── controllers
├── models
├── node_modules            // 第三方包下载目录
├── public                  // 公共静态资源目录
│   ├── css
│       ├── reset.css       // 浏览器样式重置文件
│   ├── img
│   ├── js
├── routes                  // 路由目录
├── views                   // 视图文件目录
│   ├── goods
│       ├── commodity-management.html       // 商品管理页面
│       ├── lassified-management.html       // 分类管理页面
│       ├── commodity-evaluation.html       // 商品评价页面
│       ├── hot-goods.html                  // 热销商品页面
│       ├── inventory-warning.html          // 库存预警页面
│   ├── order
│       ├── order-management.html           // 订单管理页面
│       ├── delivery-information-management.html        // 发货信息管理页面
│       ├── refund-order.html               // 订单管理页面
│   ├── index.html           // 首页
├── .gitigore               // gitigore 配置文件
├── app.js                  // 项目入口文件
├── package-lock.json       // 第三方包版本锁定文件
├── package.json            // 包描述文件
├── README.md               // 项目说明书
```

## 路由设计
| 路径      | 方法 | GET 参数 | POST 参数                            | 备注         |
| --------- | ---- | -------- | ------------------------------------ | ------------ |
| /         | GET  |          |                                      | 渲染首页     |
| /register | GET  |          |                                      | 渲染注册页面 |
| /register | POST |          | nickname、password、email、telephone | 处理注册请求 |
| /login    | GET  |          |                                      | 渲染登录页面 |
| /login    | POST |          | nickname/email/telephone、password   | 处理登录请求 |
| /logout   | GET  |          |                                      | 处理退出请求 |
| /404.html | GET  |          |                                      | 渲染404页面  |

## 模型设计

## 功能实现

