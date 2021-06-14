/*
 * @Date: 2021-06-12 12:37:42
 * @LastEditTime: 2021-06-12 12:57:50
 */
module.exports = (app) => {
  const { router, controller } = app
  router.post('/file/uploadFile', controller.file.fileUpload.uploadFile)
}
