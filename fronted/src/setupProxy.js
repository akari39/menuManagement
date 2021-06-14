/*
 * @Date: 2021-06-10 23:20:58
 * @LastEditTime: 2021-06-12 15:22:24
 */
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://127.0.0.1:7001',
      changeOrigin: true
    })
  )
}
