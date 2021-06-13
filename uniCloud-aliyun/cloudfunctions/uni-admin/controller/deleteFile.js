const {
	Controller
} = require('uni-cloud-router')
module.exports = class UserController extends Controller {
	async deleteFilePic() {
		return this.service.deleteFile.deleteFilePic()
	}
}
