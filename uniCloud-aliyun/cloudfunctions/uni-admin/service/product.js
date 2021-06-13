const {
	Service
} = require('uni-cloud-router')
module.exports = class UserService extends Service {
	constructor(ctx) {
		super(ctx)
		this.collection = this.db.collection('mix-product')
	}
	async get() {
		const {
			offset,
			limit,
			keyword = '',
			status = 1
		} = this.ctx.data;
		// const resPro = await this.db.collection('mix-product').skip(offset).limit(limit).get();
		let whereObj = {
			status: +status
		};
		if (keyword) {
			whereObj.title = new RegExp(keyword, 'g');
		}
		const resPro = await this.collection.where(whereObj).get();
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
