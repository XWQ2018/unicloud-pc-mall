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
		}).field({
			add_time:1,
			image: 1,
			name: 1,
			status: 1,
			type: 1,
			_id: 1
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

	async addAdvert() {
		const {
			status,
			name,
			image,
		} = this.ctx.data;
		const res = await this.collection.add({
			add_time: Date.now(),
			update_time: Date.now(),
			status,
			name,
			image,
			type: 'advert',
			advert_type: 'carousel',
			link: '',
			sort: 0
		});

		if (res.id) {
			return {
				code: 0,
				msg: '新增成功'
			};
		} else {
			return {
				code: 40300,
				msg: '新增失败'
			};
		}

	}
}
