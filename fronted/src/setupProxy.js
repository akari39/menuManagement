/*
 * @Date: 2021-06-10 23:20:58
 * @LastEditTime: 2021-06-17 23:28:39
 */
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://128.199.161.136:7001',
      changeOrigin: true
    })
  )
}
