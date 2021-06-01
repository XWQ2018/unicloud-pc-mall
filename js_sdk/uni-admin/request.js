import store from '@/store'
import config from '@/admin.config.js'
const debugOptions = config.navBar.debug

const db = uniCloud.database()
db.on('refreshToken', function({
	token,
	tokenExpired
}) {
	store.commit('user/SET_TOKEN', {
		token,
		tokenExpired
	})
})

export function request(action, data, {
	functionName = 'uni-admin',
	showModal = true
} = {}) {
	return uniCloud.callFunction({
		name: functionName,
		data: {
			action,
			data
		}
	}).then(({
		result
	}) => {
		if (!result) {
			return Promise.resolve(result)
		}
		if (result.code) {
			if (typeof result.code === 'string' && result.code.indexOf('TOKEN_INVALID') === 0) {
				uni.reLaunch({
					url: config.login.url
				})
			}
			// const err = new Error(result.message)
			// err.code = result.code
			
			const err = result
			return Promise.reject(err)
		}
		const {
			token,
			tokenExpired
		} = result
		if (token && tokenExpired) {
			store.commit('user/SET_TOKEN', {
				token,
				tokenExpired
			})
		}
		return Promise.resolve(result)
	}).catch(err => {
		console.log('error==',err);
		const that = this
		showModal && uni.showModal({
			content: err.message || '请求服务失败',
			showCancel: false,
			success: function() {
				// #ifdef H5
				if (err.code === 10101 && that.$refs.usernameInput) {
					that.$refs.usernameInput.$refs.input.focus()
				}
				if (err.code === 10102 && that.$refs.passwordInput) {
					that.$refs.passwordInput.$refs.input.focus()
				}
				// #endif
			}
		})
		// #ifdef H5
		const noDebugPages = ['/pages/login/login', '/pages/init/init']
		const {
			path
		} = this.$route
		if (debugOptions && debugOptions.enable === true && noDebugPages.indexOf(path) === -1) {
			store.dispatch('error/add', {
				err: err.toString(),
				info: '$request("' + action + '")',
				route: '',
				time: new Date().toLocaleTimeString()
			})
		}
		// #endif
		return Promise.reject(err)
	})
}

export function initRequest(Vue) {
	Vue.prototype.$request = request
}
