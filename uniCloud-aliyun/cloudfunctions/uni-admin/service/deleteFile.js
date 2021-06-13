const {
	Service
} = require('uni-cloud-router')
module.exports = class UserService extends Service {
	constructor(ctx) {
		super(ctx)
	}

	async deleteFilePic() {
		const {
			fileID = ''
		} = this.ctx.data;
		const role = this.ctx.auth.role

		if (fileID) {
			if (role.indexOf('admin') > -1) {
				const result = await uniCloud.deleteFile({
					fileList: [
						fileID
					]
				});
				if (result.length > 0) {
					return {
						code: 0,
						msg: '删除成功'
					}
				} else {
					return {
						code: 40300,
						msg: '删除失败'
					}
				}
			} else {
				return {
					code: 40300,
					msg: '删除请联系管理员'
				}
			}
		}

	}
}
