/**
 * Created by fuzl on 2017-10-30.
 */
import requester from "./request"
// vuex actions第一个参数是store，剔除
let wrapRequester = {}
for (let i in requester) {
	wrapRequester[i] = function () {
		let args = Array.prototype.slice.call(arguments, 1)
		return requester[i].apply(null, args)
	}
}

export default {
	state: {

	},
	actions: Object.assign(requester, {

	}),
	mutations: {

	},
	getters: {

	}
}