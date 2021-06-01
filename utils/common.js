// 设置窗口的下拉背景色
export function setBgColor(color = '#46aef7') {
	uni.setBackgroundColor({
		backgroundColor: color,
	});
}

/** 
 * 方法说明
 * @description: 缓存方法
 * @Param: 第一个参数可选值 get set remove
 * @Param: 第二个参数为存储的名字key
 * @Param: 第三个参数为设置缓存时的参数内容
 * @Param: sync参数 标识设置缓存使用同步或异步  0异步 1同步  默认0
 * @Author: xwq
 * @return: 
 */
export function storageFn(type, key, data, sync = 0) {
	if (type == 'set') {
		if (typeof data == 'object' && Array.isArray(data) && data.length == 0) {
			return
		} else if (typeof data == 'object' && !Array.isArray(data)) {
			if (Object.keys(data).length == 0) {
				return
			}
		} else if (!data) {
			return
		}
	};
	let typeFn = {
		get: (key) => {
			try {
				const value = uni.getStorageSync(key);
				if (value) {
					return value;
				}
			} catch (e) {
				// error
			}
		},
		set: (key, data) => {
			if (sync) {
				uni.setStorageSync(key, data);
			} else {
				uni.setStorage({
					key: key,
					data: data
				});
			}
		},
		remove: (key) => {
			try {
				uni.removeStorageSync(key);
			} catch (e) {
				// error
			}
		}
	};
	return (typeFn[type](key, data));
}


export function lockBgScroll(isLock) {
	let bodyEl = document.body;
	let top = 0;
	(function stopBodyScroll(isLock) {
		if (isLock) {
			top = window.scrollY;
			bodyEl.style.position = 'fixed';
			bodyEl.style.top = -top + 'px';
		} else {
			top = Math.abs(parseInt(getComputedStyle(bodyEl).top));
			bodyEl.style.position = '';
			bodyEl.style.top = '';
			window.scrollTo(0, top);
		}
	})(isLock);
}
//深复制
export function dpCopyObj(obj) {
	if (!(typeof obj === 'object')) return
	return JSON.parse(JSON.stringify(obj));
}
//浅复制
export function easyCopyObj(obj1 = {}, obj) {
	return Object.assign(obj1, obj);
}
/**
 * @Description: 防抖方法(一般用于输入框实时检索数据)
 * @Param:fn[type=function]
 * @Param:delay[type=number] 延迟时间
 * @return: 
 */
export function debounce(fn, delay) {
	return function(value) {
		if (!value) {
			return false;
		}
		clearTimeout(fn.id);
		fn.id = setTimeout(() => {
			fn(value);
		}, delay);
	};
}
/**
 * @Description: 日期对象转格式 例如获取2019-04格式 dateFormat(date, "yyyy-MM"),传入的时间支持的格式(2020-05-04、2020/05/04或者时间戳),不支持20200504格式
 * @Param:time  时间
 * @Param:format 需要转换的格式
 * @LastEditTime: Do not edit
 * @return: 
 */
export function dateFormat(time, format) {
	if (typeof time === 'string') {
		time = time.replace(/-/g, '/')
	}
	let t = new Date(time);
	let tf = function(i) {
		return (i < 10 ? '0' : '') + i;
	};
	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
		switch (a) {
			case 'yyyy':
				return tf(t.getFullYear());
			case 'MM':
				return tf(t.getMonth() + 1);
			case 'mm':
				return tf(t.getMinutes());
			case 'dd':
				return tf(t.getDate());
			case 'HH':
				return tf(t.getHours());
			case 'ss':
				return tf(t.getSeconds());
		}
	});
}
/**
 * @Description: 判断数组或对象是否为空
 * @Param: data[type=Object/array]
 * @LastEditTime: Do not edit
 * @return: 
 */
export function isEmptyObj(data) {
	let len = Object.keys(data).length;
	if (len > 0) {
		return false;
	}
	return true;
}
/**
 * @Description: 字符串去空格
 * @Param: val [String]
 * @LastEditTime: Do not edit
 * @return: 
 */
export function clearEmpty(val) {
	if (typeof val != 'string') return;
	return val.replace(/\s*/g, '');
	//val.replace(/\s*/g, '') 去除全部空格
	//val.replace(/^\s*/g, '') 去除左边空格
	//val.replace(/\s$*/g, '') 去除右边空格
	//val.replace(/^\s*|\s$*/g, '') 去除左右空格
	//val.trimLeft() 去除左边空格
	//val.trimRight() 去除右边空格
	//val.trim() 去除左右空格
}

/**
 * @Description: 验证规则
 * @Param: type [String] 验证的类型
 * @Param: val [String] 验证的值
 * @LastEditTime: Do not edit
 * @return: 
 */
export function formValidate(type = null, val = null) {
	// console.log('参数==', arguments);
	const ValidateType = {
		//手机号
		phone: (v) => {
			let regT = /^1[3456789]\d{9}$/;
			return (regT.test(v));
		},
		//邮箱
		email: (v) => {
			let regT =
				/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return (regT.test(v));
		},
		//身份证
		Car: (v) => {
			let regT = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			return (regT.test(v));
		},
		//合法url
		URL: (v) => {
			let regT =
				/^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
			return (regT.test(v));
		},
		//表单数字类型带.字符输入限制
		numberP: (v) => {
			return v.replace(/^\D|\D\./g, '')
				.replace(/[\u4E00-\u9FA5]+|[a-z]/g, '')
				.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
				.replace(/^0[0?]/g, '0')
				.replace(/^0[\d]/g, v.slice(1))
				.replace(
					/[`~!@#$%^&*()_\-+=<>?:"{}|,\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
					''
				);
		},
		//表单纯数字输入
		number: (v) => {
			return v.replace(/[^\d]/g, '')
				.replace(/^0[0?]/g, '0')
				.replace(/^0[\d]/g, v.slice(1));
		},
		//表单纯英文输入
		pureEnglish: (v) => {
			return v.replace(/[^a-z|A-Z]/g, '');
		},
		//表单英文+数字输入
		numberEng: (v) => {
			return v.replace(/[^a-z|A-Z|0-9]/g, '');
		},
		//表单纯中文输入
		pureChinese: (v) => {
			return v.replace(/[^\u4E00-\u9FA5]+/g, '');
		}
	};
	if (!type || !val || typeof val != 'string') return;
	if (!ValidateType[type]) {
		throw new Error('This method was not found');
	}
	return (ValidateType[type](val));
}
/**
 * @Description: requestAnimation帧动画兼容处理
 * @Param: 
 * @LastEditTime: Do not edit
 * @return: 
 */
export function requestAnimationFnInit() {
	if (!Date.now)
		Date.now = function() {
			return new Date().getTime();
		};
	// (function () {
	// 'use strict';
	let vendors = ['webkit', 'moz'];
	for (let i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
		let vp = vendors[i];
		window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame'] ||
			window[vp + 'CancelRequestAnimationFrame']);
	}
	if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
		||
		!window.requestAnimationFrame || !window.cancelAnimationFrame) {
		let lastTime = 0;
		window.requestAnimationFrame = function(callback) {
			let now = Date.now();
			let nextTime = Math.max(lastTime + 16, now);
			return setTimeout(function() {
					callback(lastTime = nextTime);
				},
				nextTime - now);
		};
		window.cancelAnimationFrame = clearTimeout;
	}
	// }());
}
/**
 * @Description: 获取设备状态栏高度
 * @Param: 
 * @LastEditTime: Do not edit
 * @return: 
 */
export function isBarHeight() {
	return new Promise((resolve, reject) => {
		let that = this
		let isTemp = {}
		uni.getSystemInfo({
			success(res) {
				let totalTopHeight = 68
				if (res.model.indexOf('iPhone X') !== -1) {
					totalTopHeight = 88
				} else if (res.model.indexOf('iphone') !== -1) {
					totalTopHeight = 64
				}
				isTemp['statusBarHeight'] = res.statusBarHeight
				isTemp['titleBarHeight'] = totalTopHeight - res.statusBarHeight
				isTemp['allHeight'] = totalTopHeight
				resolve(isTemp)
			},
			fail(e) {
				reject(e)
			}
		})
	})
}
/**
 * @Description: 设置TabBarBadge
 * @Param: 
 * @LastEditTime: Do not edit
 * @return: 
 */
export function setTabBarBadge(obj) {
	if (obj.text && typeof obj.text == 'number') {
		obj.text = obj.text + '';
	}
	let _default = {
		index: 2,
		text: '0',
		type: 'set'
	};
	_default = easyCopyObj(_default, obj);
	let {
		type
	} = _default;
	let {
		index,
		text
	} = _default;
	const objFn = {
		set: () => {
			uni.setTabBarBadge({
				index,
				text
			});
		},
		remove: () => {
			uni.removeTabBarBadge({
				index
			})
		}
	}
	return (objFn[type]())
}
//处理商品详情的价格区间
export function priceBetFormate(arr = []) {
	return `${Math.min.apply(null,arr)} - ${Math.max.apply(null,arr)}`;
}


//年月日时分秒转时间戳 兼容ios不支持-格式
export function gettimesTamp(time) {
	if (/\-/g.test(time)) {
		time = time.replace(/\-/g, '/');
	}
	return (new Date(time)).getTime();
}
//获取月份的天数  date格式：2020/07/27或毫秒数(横杠格式ios不支持)
export function getCountDays(date) {
	date = date || null;
	if (date && date.indexOf('-') > -1) {
		date = date.replace(/-/g, '/')
	}
	let curDate = new Date(date);
	/* 获取当前月份 */
	let curMonth = curDate.getMonth();
	/* Month设置 */
	curDate.setMonth(curMonth + 1);
	/* 将日期设置为0 */
	curDate.setDate(0);
	/* 返回当月的天数 */
	return curDate.getDate();
}
//计算当前日期距离传入时间的剩余毫秒数
export function countDateTime(dateTime) {
	console.log('传入的时间==', dateTime);
	//团购结束时间
	let teamDateTime = new Date(gettimesTamp(dateTime));
	let team_month = teamDateTime.getMonth() + 1;
	let team_date = teamDateTime.getDate();
	let team_h = teamDateTime.getHours();
	let team_m = teamDateTime.getMinutes();
	let team_s = teamDateTime.getSeconds();

	//当前时间
	let currentDateTime = new Date();
	let current_month = currentDateTime.getMonth() + 1;
	let current_date = currentDateTime.getDate();
	let current_h = currentDateTime.getHours();
	let current_m = currentDateTime.getMinutes();
	let current_s = currentDateTime.getSeconds();

	if (team_month == current_month) {
		if (team_date > current_date) {
			let current_totalTime = ((24 - current_h) * 60 * 60 * 1000) + ((60 - current_m) * 60 * 1000) + ((60 -
					current_s) *
				1000);
			let team_totalTime;
			if (team_date - current_date > 1) { //相差大于一天
				team_totalTime = ((team_date - current_date - 1) * 24 * 60 * 60 * 1000) + team_h * 60 * 60 * 1000 +
					team_m * 60 *
					1000 + team_s * 1000;
			} else { //等于一天
				team_totalTime = team_h * 60 * 60 * 1000 + team_m * 60 * 1000 + team_s * 1000;
			}
			return (current_totalTime + team_totalTime);
		} else if (team_date == current_date) {
			let res_s,
				res_m,
				res_h;
			if (team_s - current_s < 0) {
				team_m--;
				team_s = team_s + 60;
			}
			if (team_m - current_m < 0) {
				team_h--;
				team_m = team_m + 60;
			}
			res_s = (team_s - current_s) * 1000;
			res_m = (team_m - current_m) * 60 * 1000
			res_h = (team_h - current_h) > 0 ? (team_h - current_h) * 60 * 60 * 1000 : 0;

			return (res_s + res_m + res_h);
		}
	} else if (team_month > current_month) { //跨月份计算
		let countDayDate = currentDateTime.getFullYear() + '/' + current_month + '/' + current_date
		let allMonthDay = getCountDays(countDayDate); //获取当月的所有天数

		let cuurrent_month_time = ((allMonthDay - current_date) * 24 * 60 * 60 * 1000) + ((24 - current_h) * 60 * 60 *
			1000) + ((60 - current_m) * 60 * 1000) + ((60 - current_s) *
			1000);
		let other_month_time;

		if (team_date > 1) {
			other_month_time = ((team_date - 1) * 24 * 60 * 60 * 1000) + (team_h * 60 * 60 * 1000) + (team_m * 60 *
					1000) +
				(team_s * 1000);
		} else {
			other_month_time = (team_h * 60 * 60 * 1000) + (team_m * 60 * 1000) + (team_s * 1000);
		}
		return (cuurrent_month_time + other_month_time);
	}
}
//计算商品秒杀时间time为结束时间戳
export function flashProductTime(time) {
	if (!time) return;
	if (/\-/g.test(time)) {
		time = time.replace(/\-/g, '/');
	}
	let currentTime = new Date(),
		currentTime_hours = currentTime.getHours(),
		currentTime_minute = currentTime.getMinutes(),
		currentTime_seconds = currentTime.getSeconds();

	let endTime = new Date(time),
		endTime_hours = endTime.getHours(),
		endTime_minute = endTime.getMinutes(),
		endTime_seconds = endTime.getSeconds();


	let result_seconds,
		result_Minute,
		result_Hourse;

	if (endTime_seconds - currentTime_seconds < 0) {
		endTime_minute--;
		endTime_seconds += 60;
	}
	if (endTime_minute - currentTime_minute < 0) {
		endTime_hours--;
		endTime_minute += 60;
	}

	result_seconds = (endTime_seconds - currentTime_seconds) * 1000;
	result_Minute = (endTime_minute - currentTime_minute) * 60 * 1000
	result_Hourse = (endTime_hours - currentTime_hours) > 0 ? (endTime_hours - currentTime_hours) * 60 * 60 * 1000 : 0;

	return (result_seconds + result_Minute + result_Hourse);

}
//拨打电话
export function callPhone(phoneNumber) { // 调起拨打电话方法
	uni.makePhoneCall({
		phoneNumber,
		complete: () => {}
	})
}
/**
 * @Description: 深拷贝
 * @Param: 
 * @Author: 陆城锫
 * @Date: 2020-12-25 14:26:47
 * @LastEditors: 陆城锫
 * @LastEditTime: Do not edit
 * @return {*}
 * @param {*} obj
 */
export function deepClone(obj) {
	const objClone = Array.isArray(obj) ? [] : {};
	if (obj && typeof obj === 'object') {
		for (let key in obj) {
			if (Object.prototype.hasOwnProperty.call(obj, key)) {
				if (obj[key] && typeof obj[key] === 'object') {
					objClone[key] = deepClone(obj[key]);
				} else {
					objClone[key] = obj[key];
				}
			}
		}
	}
	return objClone;
}
//获取元素的高度
export function offset(selector) {
	if (!(this instanceof Vue)) return
	return new Promise((resolve, reject) => {
		uni.createSelectorQuery().in(this).select(selector).boundingClientRect(data => {
			data ? resolve(data) : reject('元素不存在')
		}).exec()
	})
}
// 显示 toast
export function tips(title, icon = 'none', duration = 1500, mask = false) {
	if (!title) return
	title = title.toString()
	setTimeout(() => {
		uni.showToast({
			mask,
			title,
			duration,
			image: icon.includes('/') ? icon : '',
			icon: icon.includes('/') ? 'none' : icon
		})
	})
}
// 显示 loading
export function loading(title = '加载中...', mask = true) {
	uni.hideLoading()
	uni.showLoading({
		title,
		mask
	})
}
// 停止 loading
export function loaded() {
	uni.hideLoading()
}
// 停止 toast
export function tiped() {
	uni.hideToast()
}
/** 
 * 方法说明
 * @description: 显示 model 此方法三个参数
 * @Param: 第一个为提示title 必传
 * @Param: 第二个为内容content 必传
 * @Param: 第三个为对象  即uni.showModal的其他参数 可自行配置
 * @Author: xwq
 * @return: 
 */
export function model(...args) {
	const conf = args.find(e => typeof e === 'object') || {};
	return new Promise((resolve, reject) => {
		uni.showModal({
			...conf,
			title: args.length > 1 ? args[0] : '提示!',
			content: (args.length > 1 && typeof args[1] != 'object') ? args[1] : '',
			success: ({
				confirm
			}) => {
				confirm ? resolve() : reject()
			}
		})
	})
}
// 复制到剪切板方法
export function copy(data, title, icon) {
	data = data.toString()
	uni.setClipboardData({
		data,
		success() {
			if (title) {
				tiped()
				tips(title, icon)
			}
		}
	})
}
//打开调试
export function opendDebug() {
	uni.setEnableDebug({
		enableDebug: true
	})
}
//关闭调试
export function closeDebug() {
	uni.setEnableDebug({
		enableDebug: false
	})
}
//版本更新
export function updateManage() {
	const updateManager = uni.getUpdateManager();
	updateManager.onCheckForUpdate(function(res) {
		console.log('检测是否有版本更新==', res.hasUpdate);
	});

	updateManager.onUpdateReady(function(res) {
		uni.showModal({
			title: '更新提示',
			content: '新版本已经准备好，需要重启应用',
			showCancel: false,
			success(res) {
				if (res.confirm) {
					updateManager.applyUpdate();
				}
			}
		});

	});

	updateManager.onUpdateFailed(function(res) {
		// 新的版本下载失败
		console.log('更新失败==', res);
	});
}
//编码
export function encodePramas(obj) {
	return encodeURIComponent(JSON.stringify(obj));
}
//解码
export function decodePramas(obj) {
	return JSON.parse(decodeURIComponent(obj));
}
//处理特殊字符录入
export function specialCharacter(val) {
	return val.replace(
		/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g,
		""
	);
}

/* 
	数组对象去重
	arr----去重的数组
	key----去重的目标值
 */
export function reduceFn(arr, key) {
	if (!arr || !key) return;
	let obj = {};
	return arr.reduce((cur, next) => {
		obj[next[key]] ? "" : obj[next[key]] = true && cur.push(next);
		return cur;
	}, []) //设置cur默认类型为数组，并且初始值为空的数组
}

//起始位置和终点位置的经纬度计算距离
export function getLineDistance(startP, endP) {
	let Lat1 = startP[1] * Math.PI / 180.0;
	let Lat2 = endP[1] * Math.PI / 180.0;

	let a = Lat1 - Lat2;
	let b = startP[0] * Math.PI / 180.0 - endP[0] * Math.PI / 180.0;

	let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(Lat1) * Math.cos(Lat2) * Math.pow(Math.sin(
		b / 2), 2)));
	s = s * 6378137.0;
	s = Math.round(s * 10000) / 10000.0;
	let km = {
		num: '',
		unit: '',
		desc: '',
	};
	// km.num = s > 1000 ? parseInt(parseInt(s) / 100) / 10 : parseInt(s);
	km.num = s > 1000 ? (s / 1000).toFixed(2) : s.toFixed(2);
	km.unit = s > 1000 ? 'km' : 'm';
	km.num =
		(km.num + '').substr(-1) == 0 ?
		(+km.num).toFixed(1) :
		km.num;
	km.desc = km.num + km.unit;
	return km;
}

// logo图标路径拼接
export function getIconPath(iconName) {
	return `https://www.wanguoqiche.com/files/logo/${iconName}.jpg`;
}

/** 
 * 方法说明
 * @description: 解析字符串参数
 * @Param: str 字符串参数
 * @Author: xwq
 * @return: 
 */
export function getUrlParams(str) {
	let reg = new RegExp('(^|&)*=([^&]*)(&|$)', 'i');
	let r = str;
	let query = {};
	if (r) {
		r = unescape(decodeURIComponent(r));
		r = r.split('&');
		if (r.length > 0) {
			query = {};
			for (let i = 0; i < r.length; i++) {
				r[i] = r[i].split('=');
				query[r[i][0]] = r[i][1];
			}
		}
	}
	return query;
}

/** 
 * 方法说明
 * @description: 参数序列化处理
 * @Param: 
 * @Author: xwq
 * @return: 
 */
export function paramsFormate(params) {
	const qs = require('qs');
	return qs.stringify(params)
}

/** 
 * 方法说明
 * @description: reduce重组数据
 * @Param: arr 要处理的数组
 * @Param: key 标题内容使用的字段名(只能是数据里面的字段)
 * @Param: titleName 重组后对象的title字段名 默认title
 * @Param: listName  重组后对象存放数据的字段名 默认list
 * @Author: xwq
 * @return: 
 */
export function reduceData(arr, key, titleName = 'title', listName = 'list') {
	return Array.from(arr.reduce((pre, cur) => {
		pre.set(cur[key], [...(pre.get(cur[key]) || []), cur])
		return pre
	}, new Map)).map(([title, list]) => ({
		[titleName]: title,
		[listName]: list
	}))
}
