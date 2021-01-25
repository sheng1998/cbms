# 商品后台管理系统
该系统只是为了熟悉 node 开发流程，所以该系统的大部分功能没有实现，只完成了对商品的`增删改查`功能和登录注册功能，还有部分数据请求的功能，对于增删改查功能的实现是在商品列表实现的，具体的地址是：`http://127.0.0.1:3000/goods/commodity-management`

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
│   ├── user.js             // 用户表模型设置
│   ├── goods.js            // 商品表模型设置
│   ├── classification.js   // 分类表模型设置
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
| 路径                        | 方法 | GET 参数 | POST 参数                                                  | 备注             |
| --------------------------- | ---- | -------- | ---------------------------------------------------------- | ---------------- |
| /index.html                 | GET  |          |                                                            | 渲染首页         |
| /register                   | GET  |          |                                                            | 渲染注册页面     |
| /register                   | POST |          | username、password、telephone                              | 处理注册请求     |
| /login                      | GET  |          |                                                            | 渲染登录页面     |
| /login                      | POST |          | telephone、password                                        | 处理登录请求     |
| /logout                     | GET  |          |                                                            | 处理退出请求     |
| /404.html                   | GET  |          |                                                            | 渲染404页面      |
| /goods/commodity-management | GET  |          |                                                            | 渲染商品管理页面 |
| /goods/add                  | GET  |          |                                                            | 渲染添加商品页面 |
| /goods/add                  | POST |          | name、price、type、image、classification1、classification2 | 处理添加商品请求 |
| /get-classification         | GET  |          |                                                            | 获取分类列表     |
| /goods/remove               | GET  | id       |                                                            | 删除指定商品     |


<br>

## 模型设计
**1、用户表：**
| 键名         | 中文名   | 是否必需 | 类型   | 默认值   | 可选值      | 备注                                                                                                                  |
| ------------ | -------- | -------- | ------ | -------- | ----------- | --------------------------------------------------------------------------------------------------------------------- |
| username     | 用户名   | 是       | String |          |             | 3 <= username.length < =12                                                                                            |
| password     | 密码     | 是       | String |          |             | 必须有字母数字和符号(采用 MD5 加密)                                                                                   |
| telephone    | 电话     | 是       | String |          |             |                                                                                                                       |
| limit        | 权限     | 是       | Number | 1        | -1, 0, 1, 2 | -1：禁止登陆<br />0：只读<br />1：可添加、修改、删除商品信息<br />2：可管理用户以及用户权限，也可以修改、删除商品信息 |
| created_time | 创建时间 | 是       | Date   | Date.now |             |                                                                                                                       |

**2、商品表：**
| 键名            | 中文名   | 是否必需 | 类型   | 默认值   | 可选值 | 备注 |
| --------------- | -------- | -------- | ------ | -------- | ------ | ---- |
| user_id         | 用户ID   | 是       | String |          |        |      |
| good_name       | 商品名称 | 是       | String |          |        |      |
| good_img        | 商品图片 | 是       | String |          |        |      |
| good_type       | 商品种类 | 是       | String |          |        |      |
| classification1 | 一级分类 | 是       | String |          |        |      |
| classification2 | 二级分类 | 是       | String |          |        |      |
| add_time        | 添加时间 | 是       | Date   | Date.now |        |      |

**3、分类表：**
| 键名            | 中文名   | 是否必需 | 类型   | 默认值 | 可选值 | 备注 |
| --------------- | -------- | -------- | ------ | ------ | ------ | ---- |
| good_id         | 商品ID   | 是       | String |        |        |      |
| classification1 | 一级分类 | 是       | String |        |        |      |
| classification2 | 二级分类 | 是       | String |        |        |      |

## 功能实现

