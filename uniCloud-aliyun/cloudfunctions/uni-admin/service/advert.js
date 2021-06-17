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
			add_time: 1,
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

		if (typeof status == 'undefined' || typeof name == 'undefined' || typeof image == 'undefined') {
			return {
				code: 40300,
				msg: '参数不能为空'
			}
		}
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

	async updateAdvert() {
		const {
			status,
			name,
			image,
			_id
		} = this.ctx.data;

		if (typeof status == 'undefined' || typeof name == 'undefined' || typeof image == 'undefined' ||
			typeof _id == 'undefined') {
			return {
				code: 40300,
				msg: '参数不能为空'
			}
		}

		const res = await this.collection.doc(_id).update({
			update_time: Date.now(),
			status,
			name,
			image,
		});

		if (res.updated) {
			return {
				code: 0,
				msg: '修改成功'
			}
		} else {
			return {
				code: 40300,
				msg: '修改失败'
			}
		}
	}

	async deleteAdvert() {
		const {
			_id
		} = this.ctx.data;
		const role = this.ctx.auth.role;

		if (typeof _id == 'undefined') {
			return {
				code: 40300,
				msg: '_id不能为空'
			}
		}

		if (role.indexOf('admin') > -1) {
			const result = await this.collection.doc(_id).remove();
			
			if (result.deleted) {
				return {
					code: 0,
					msg: '删除成功'
				}
			} else {
				return {
					code: 40300,
					msg: "删除失败！"
				}
			}
		} else {
			return {
				code: 40300,
				msg: "请联系管理员！"
			}
		}
	}
}
