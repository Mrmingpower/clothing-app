export const formatSourceType = function(sourceType) {
	if (sourceType === 0) {
		return '采购入口'
	} else if (sourceType === 1) {
		return '期初入库'
	} else {
		return '其他入库'
	}
}
export const formatSourceTypeImg = function(sourceType) {
	if (sourceType === 0) {
		return 'purchase.png'
	} else if (sourceType === 2) {
		return 'purchase1.png'
	} else {
		return 'purchase1.png'
	}
}

export const formatStockInStatus = function(status) {
	if (status === 0) {
		return '未审核'
	} else if(status === 1) {
		return '已审核'
	} else {
		return '已取消'
	}
}

export const formatStockInStatusType = function(status) {
	if (status === 0) {
		return 'error'
	} else if(status === 1) {
		return 'success'
	} else {
		return 'info'
	}
}

export const formatProperties = function(properties) {
	if (properties === 0) {
		return '面料'
	} else {
		return '辅料'
	}
}

export const formatPropertiesType = function(properties) {
	if (properties === 0) {
		return 'primary'
	} else {
		return 'warning'
	}
}

export const sumQuantity = function(item) {
	let quantityArr = []
	let amount = 0
	let quantityByAssistant = 0
	let quantity = 0
	for (var i = 0; i < item.exchangeRate.length; i++) {
		quantityArr.push(item.exchangeRate[i] * item.quantityByAssistant[i])
		amount = amount + (item.exchangeRate[i] * item.quantityByAssistant[i] * item.price)
		quantityByAssistant = quantityByAssistant + item.quantityByAssistant[i]
		quantity = quantity + (item.exchangeRate[i] * item.quantityByAssistant[i])
	}
	item.quantity = quantity
	item.allQuantityByAssistant = quantityByAssistant
	// item.amount = item.price * item.quantity
	item.amount = amount
	return quantity
}

export const sumAmount = function(item) {
	return item.quantity * item.price
}

// export const formatArr = function(arr) {
	
// }