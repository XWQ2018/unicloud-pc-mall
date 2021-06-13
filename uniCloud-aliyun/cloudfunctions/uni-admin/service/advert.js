const {
	Service
} = require('uni-cloud-router')
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
		const resPro = await this.collection.where({
			type: 'advert'
		}).get();
		if (resPro.data) {
			return {
				code: 0,
				total: resPro.affectedDocs,
				data: resPro.data.slice(offset, offset + limit),
				msg: '成功'
			}
		}
	}

	async hideAdvert() {
		const res = await this.collection.where({
			_id: this.ctx.data.id
		}).update({
			status: this.ctx.data.status
		});

		if (res.updated > 0) {
			return {
				code: 0,
				msg: '成功'
			};
		}

	}
}
