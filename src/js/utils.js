// caller is optional for debugging
export let checkPropsExist = (props, caller) => {
	let value = Object.keys(props).every(prop => typeof props[prop] !== 'undefined')
	if (caller) console.log(`checkPropsExist returned: ${value} for caller: ${caller}`)
	return value
}

export function deepCopy(obj) {
	let clone, i
	if (typeof obj !== 'object' || !obj) return obj
	if ('[object Array]' === Object.prototype.toString.apply(obj)) {
		clone = []
		let len = obj.length
		for (i = 0; i < len; i++) clone[i] = deepCopy(obj[i])
		return clone
	}
	clone = {}
	for (i in obj) if (obj.hasOwnProperty(i)) clone[i] = deepCopy(obj[i])
	return clone
}
