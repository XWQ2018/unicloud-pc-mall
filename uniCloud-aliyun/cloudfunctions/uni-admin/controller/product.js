const {
	Controller
} = require('uni-cloud-router')
module.exports = class UserController extends Controller {
	async getProductList() {
		return this.service.product.get()
	}
}
