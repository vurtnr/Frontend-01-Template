# 每周总结可以写在这里

- 首先唤起一个登录，启动一个server供服务器publish链接获取
- 获取github返回的code给到oauth服务进行认证
- 通过access_token地址返回token
- 生成带publish链接的页面或者可以直接跳转（类似微信公众号效果）
- 点击链接回到tool端，执行publish动作，向服务端发起请求
- 服务端接受到请求，获取到token，向github发起user请求获取user数据
- 可根据user返回的数据进行权限检查
- 最后进行打包发布上线操作

