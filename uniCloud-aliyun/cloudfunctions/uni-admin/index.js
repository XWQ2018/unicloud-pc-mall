'use strict';
const {
    Router
} = require('uni-cloud-router')
const router = new Router(require('./config.js'))
exports.main = async (event, context) => {
	console.log('==',event);
	console.log('context==',context);
    return router.serve(event, context)
};
