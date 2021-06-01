const {
	Service
} = require('uni-cloud-router')
const uniID = require('uni-id')
module.exports = class UserService extends Service {
	constructor(ctx) {
		super(ctx)
		this.collection = this.db.collection('mix-advert')
	}
	async get() {
		const {
			offset,
			limit
		} = this.ctx.data;
		// const resPro = await this.db.collection('mix-product').skip(offset).limit(limit).get();
		const resPro = await this.collection.where({type:'advert'}).get();
		if (resPro.data) {
			return {
				code: 0,
				total: resPro.affectedDocs,
				data: resPro.data.slice(offset, offset + limit),
				msg: '成功'
			}
		}
	}
}
