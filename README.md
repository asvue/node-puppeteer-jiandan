# node-puppeteer-jiandan
一个使用puppeteer爬取煎蛋网妹子图的demo

# 前因

 原来本来有用request.js一个爬煎蛋网妹子图的....不过站长改了图片加载方式,从之前页面渲染好就有图片地址到页面渲染好加载个空白图片,空白图片加载好再加载..好了.我只能重新写,刚好最近puppeteer挺火,索性重新写写

# 简介
这个demo直接把当前页码的网页里图片取到存mysql.然后页码+1.我是用liunx定时任务启动.这样子就可以实现每日爬取.

# 运行
`先修改当前文件夹里的db文件,把数据库换成自己地址`
```
npm i  --registry=https://registry.npm.taobao.org

npm start
```