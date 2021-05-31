const {
	Controller
} = require('uni-cloud-router')
const uniID = require('uni-id')
module.exports = class UserController extends Controller {
	async getProductList() {
		console.log('ctx===',this.ctx.data);
		console.log('ctx22===',this.service);
		
		return this.service.product.get(this.ctx.event.uniIdToken)
	}
}
