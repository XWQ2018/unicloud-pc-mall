const {
	Controller
} = require('uni-cloud-router')
const uniID = require('uni-id')
module.exports = class UserController extends Controller {
	async getAdvertList() {
		return this.service.advert.get()
	}
	
	async hideAdvertImage(){
		return this.service.advert.hideAdvert()
	}
	
	async addAdvertImage(){
		return this.service.advert.addAdvert()
	}
}
