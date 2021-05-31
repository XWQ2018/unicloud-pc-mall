const {
	Service
} = require('uni-cloud-router')
const uniID = require('uni-id')
module.exports = class UserService extends Service {
	async get({uniIdToken}) {
		console.log('uniIdToken===',uniIdToken);
		return {
			code:1,
			msg:'成功'
		}
		// const permission = this.ctx.auth.permission
		// let {
		// 	data: menuList
		// } = await this.collection.where({
		// 	enable: true
		// }).orderBy('sort', 'asc').limit(1000).get()

		// return buildMenus(menuList)
	}
}
