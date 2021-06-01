import * as allFn from './common';
export const install=(Vue)=>{
	Object.keys(allFn).forEach(row=>{
		Vue.prototype[`$${row}`] = allFn[row];
	})
}