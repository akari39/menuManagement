/*
 * @Date: 2021-06-13 22:54:52
 * @LastEditTime: 2021-06-13 23:23:17
 */
const Controller = require('egg').Controller
const { success, fail } = require('../../public/requestBody')

class DeskController extends Controller {
  async operate() {
    const deskForm = this.ctx.request.body
    let result
    let insertSuccess = false
    if (deskForm.id) {
      deskForm.updatedAt = new Date()
      result = await this.app.mysql.update('desk', deskForm)
    } else {
      deskForm.createdAt = new Date()
      deskForm.updatedAt = new Date()
      result = await this.app.mysql.insert('desk', deskForm)
    }
    insertSuccess = result.affectedRows === 1
    if (insertSuccess) {
      this.ctx.body = success()
    } else {
      this.ctx.body = fail(deskForm.id ? '编辑桌椅失败' : '新增桌椅失败')
    }
  }

  async getAllDesk() {
    const { restaurantId, current, pageSize } = this.ctx.query
    let sql = `SELECT id, type, number, seatAmount, peopleAmount FROM desk WHERE restaurantId = '${restaurantId}' ORDER BY id ASC`
    if (current && pageSize) {
      sql += ` LIMIT ${(current - 1) * pageSize},${pageSize}`
    }
    const countSql = `SELECT count(*) as totalCount FROM desk WHERE restaurantId = '${restaurantId}'`
    const deskList = await this.app.mysql.query(sql)
    const deskTotalCount = await this.app.mysql.query(countSql)
    this.ctx.body = success({
      totalData: deskTotalCount[0].totalCount,
      list: deskList
    })
  }

  async getDeskById() {
    const { id } = this.ctx.query
    const desk = await this.app.mysql.get('desk', { id })
    this.ctx.body = success(desk)
  }

  async deleteDeskById() {
    const { id } = this.ctx.query
    await this.app.mysql.delete('desk', { id })
    this.ctx.body = success()
  }
}

module.exports = DeskController
