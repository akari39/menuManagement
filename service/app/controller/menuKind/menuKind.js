/*
 * @Date: 2021-06-12 17:11:27
 * @LastEditTime: 2021-06-13 19:39:31
 */
const Controller = require('egg').Controller
const { success, fail } = require('../../public/requestBody')

class MenuKindController extends Controller {
  async operate() {
    const { id, kindName, imageUrl, restaurantId } = this.ctx.request.body
    let result
    let insertSuccess = false
    const kindForm = {
      name: kindName,
      imageUri: imageUrl,
      restaurantId
    }
    if (id) {
      kindForm.id = id
      kindForm.updatedAt = new Date()
      result = await this.app.mysql.update('section', kindForm)
    } else {
      kindForm.createdAt = new Date()
      kindForm.updatedAt = new Date()
      result = await this.app.mysql.insert('section', kindForm)
    }
    insertSuccess = result.affectedRows === 1
    if (insertSuccess) {
      this.ctx.body = success()
    } else {
      this.ctx.body = fail(id ? '编辑菜单种类失败' : '新增菜单种类失败')
    }
  }
  async getMenuAllKind() {
    const { restaurantId, current, pageSize } = this.ctx.query
    let sql = `SELECT id, name, imageUri FROM section WHERE restaurantId = '${restaurantId}' ORDER BY id ASC`
    if (current && pageSize) {
      sql += ` LIMIT ${(current - 1) * pageSize},${pageSize}`
    }
    const countSql = `SELECT count(*) as totalCount FROM section WHERE restaurantId = '${restaurantId}'`
    const menuKindList = await this.app.mysql.query(sql)
    const menuKindTotalCount = await this.app.mysql.query(countSql)
    this.ctx.body = success({
      totalData: menuKindTotalCount[0].totalCount,
      list: menuKindList
    })
  }
  async getMenuKindById() {
    const { id } = this.ctx.query
    const menuKind = await this.app.mysql.get('section', { id })
    this.ctx.body = success(menuKind)
  }
  async deleteMenuKindById() {
    const { id } = this.ctx.query
    await this.app.mysql.delete('section', { id })
    this.ctx.body = success()
  }
}
module.exports = MenuKindController
