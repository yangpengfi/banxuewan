var Order = {};

var order = null;

Order.Init = function() {
	this.cId = $('cId').value;
	this.cType = $('cType').value;
	this.path = $('path').value;
	this.alertBox = $('orderBt').children;
	this.orderBorder = $('orderBorder');
	this.focusElementIndex = epg.focusElementIndex;
	this.prodId = "";
	this.prodName = "";
	this.feeId = "";
	this.price = "";
	this.check = "";
	this.t = null;// 定时器
	this.orderFocusBg = "url('../public/images/package/bg_focus.png')";
	this.orderBlurBg = "url('../public/images/package/bg_blur.png')";
	this.getUrl = function() {
		return "order/package";
	}
};

Order.Init.prototype.focusPosition = {
	alertBox : 'alertBox'
};

Order.Init.prototype.headerType = {
	filter : 'filter',
	search : 'search',
	main : 'main',
	back : 'back'
};


Order.Init.prototype.getHeaderTypeByIndex = function(index) {
	var hiddenInputValue = getHiddenInputValue(epg.header[index]);
	if (isContain(hiddenInputValue, "index")) {
		return Order.Init.prototype.headerType.main;
	} else if (isContain(hiddenInputValue, "back")) {
		return Order.Init.prototype.headerType.back;
	}
}

Order.Init.prototype.headerFocus = function(header, index) {
	focusElement(header[index]);
	epg.focusElement = Epg.Init.prototype.focusPosition.header;
	epg.focusElementIndex = index;
};

Order.Init.prototype.headerBlur = function(header, index) {
	blurElement(header[index]);
};

/**
 * 元素聚焦
 * 
 * @param topElement
 *            元素集合
 * @param index
 *            元素位置
 */
Order.Init.prototype.contentTopFocus = function(topElement, index) {
	topElement[index].style.backgroundImage = order.orderFocusBg;
	focusElement(getElementByTag(topElement[index], "div"));
	focusElement(_s(topElement[index], "div")[1]);
	focusElement(_s(topElement[index], "div")[3]);
	if (_s(topElement[index], "input")[4].value != 0) {
		focusElement(getElementByTag(topElement[index], "img"));
	}
	epg.focusElement = Epg.Init.prototype.focusPosition.contentTop;
	epg.focusElementIndex = index;
}

/**
 * 元素失去聚焦
 * 
 * @param topElement
 *            元素集合
 * @param index
 *            元素位置
 */
Order.Init.prototype.contentTopBlur = function(topElement, index) {
	blurElement(getElementByTag(topElement[index], "div"));
	blurElement(_s(topElement[index], "div")[1]);
	blurElement(_s(topElement[index], "div")[3]);
	blurElement(getElementByTag(topElement[index], "img"));
	topElement[index].style.backgroundImage = order.orderBlurBg;
};

/**
 * 元素开通状态
 * 
 * @param topElement
 *            元素集合
 * @param index
 *            元素位置
 */
Order.Init.prototype.contentTopOpen = function(topElement, index) {
	topElement[index].style.backgroundImage = order.orderFocusBg;
	focusElement(getElementByTag(topElement[index], "img"));
	blockByClass(getElementByTag(topElement[index], "img"));
	focusElement(getElementByTag(topElement[index], "div"));
	focusElement(_s(topElement[index], "div")[1]);
	_s(topElement[index], "div")[1].innerText = "订购成功";
	epg.focusElement = Epg.Init.prototype.focusPosition.contentTop;
	_s(topElement[index], "input")[3].value = 1;
	epg.focusElementIndex = index;
};

Order.Init.prototype.contentBottomFocus = function(bottomElement, index) {
	index = parseInt(index);
	order.orderBorder.style.left = 75 + 284 * index + "px";
	block(order.orderBorder);
	blockByClass(getElementByTag(bottomElement[index], "div"));
	epg.addScroll(getElementByTag(bottomElement[index], "div"), 10);
	epg.focusElement = Epg.Init.prototype.focusPosition.contentBottom;
	epg.focusElementIndex = index;
};

Order.Init.prototype.contentBottomBlur = function(bottomElement, index) {
	none(order.orderBorder);
	epg.delScroll(getElementByTag(bottomElement[index], "div"), getElementByTag(bottomElement[index], "marquee"));
	noneByClass(getElementByTag(bottomElement[index], "div"));
};

Order.Init.prototype.moveUp = function() {
	switch (epg.focusElement) {
	case Epg.Init.prototype.focusPosition.contentBottom:
		if (epg.content.topElement.length > 0) {
			order.contentBottomBlur(epg.content.bottomElement, epg.focusElementIndex);
			order.contentTopFocus(epg.content.topElement, 0);
		}
		break;
	}
};

Order.Init.prototype.moveDown = function() {
	switch (epg.focusElement) {
	case Epg.Init.prototype.focusPosition.contentTop:
		if (epg.content.bottomElement.length > 0) {
			order.contentTopBlur(epg.content.topElement, epg.focusElementIndex);
			order.contentBottomFocus(epg.content.bottomElement, 0);
		}
		break;
	}
};

Order.Init.prototype.moveLeft = function() {
	switch (epg.focusElement) {
	case Epg.Init.prototype.focusPosition.contentTop:
		if (epg.focusElementIndex > 0) {
			order.contentTopBlur(epg.content.topElement, epg.focusElementIndex);
			order.contentTopFocus(epg.content.topElement, epg.focusElementIndex - 1);
		}
		break;
	case Epg.Init.prototype.focusPosition.contentBottom:
		if (epg.focusElementIndex > 0) {
			order.contentBottomBlur(epg.content.bottomElement, epg.focusElementIndex);
			order.contentBottomFocus(epg.content.bottomElement, epg.focusElementIndex - 1);
		}
		break;
	case Order.Init.prototype.focusPosition.alertBox:
		if (order.focusElementIndex > 0) {
			order.alertBoxBlur(order.alertBox, order.focusElementIndex);
			order.alertBoxFocus(order.alertBox, order.focusElementIndex - 1);
		}
		break;
	}
};

Order.Init.prototype.moveRight = function() {
	switch (epg.focusElement) {
	case Epg.Init.prototype.focusPosition.contentTop:
		if (epg.focusElementIndex < epg.content.topElement.length - 1) {
			order.contentTopBlur(epg.content.topElement, epg.focusElementIndex);
			order.contentTopFocus(epg.content.topElement, epg.focusElementIndex + 1);
		}
		break;
	case Epg.Init.prototype.focusPosition.contentBottom:
		if (epg.focusElementIndex < epg.content.bottomElement.length - 1) {
			order.contentBottomBlur(epg.content.bottomElement, epg.focusElementIndex);
			order.contentBottomFocus(epg.content.bottomElement, epg.focusElementIndex + 1);
		}
		break;
	case Order.Init.prototype.focusPosition.alertBox:
		if (order.focusElementIndex < order.alertBox.length - 1) {
			order.alertBoxBlur(order.alertBox, order.focusElementIndex);
			order.alertBoxFocus(order.alertBox, order.focusElementIndex + 1);
		}
		break;
	}
};

Order.Init.prototype.enter = function() {
	var url = "";
	switch (epg.focusElement) {
	case Epg.Init.prototype.focusPosition.contentTop:
		order.initTopElement(epg.content.topElement[epg.focusElementIndex]);
		if (order.check == 0) {
			order.contentTopBlur(epg.content.topElement, epg.focusElementIndex);
			block($("orderAlert"));
			order.alertBoxFocus(order.alertBox, 0);
		}
		break;
	case Epg.Init.prototype.focusPosition.contentBottom:
		epg.focusMemory(epg.model, epg.type, epg.focusElement, epg.focusElementIndex);
		url = Epg.Init.prototype.getDetailPageUrl(epg.content.bottomElement[epg.focusElementIndex]);
		loadPage(url);
		break;
	case Order.Init.prototype.focusPosition.alertBox:
		none($("orderAlert"));
		order.alertBoxBlur(order.alertBox, order.focusElementIndex);
		if (order.focusElementIndex == 0) {
			//alert(order.path+"order/ajaxPlaceAnOrder");
			order.ajaxPlaceAnOrder();// 下单请求
			
			block($('orderInfo'));
			//_s(epg.content.topElement[epg.focusElementIndex], "input")[4].value = 1;
			order.orderInfoTimer = setInterval(hideInfo, 2000);
			order.contentTopFocus(epg.content.topElement,epg.focusElementIndex);
			//order.contentTopOpen(epg.content.topElement, epg.focusElementIndex);
			return;
		} else {
			order.contentTopFocus(epg.content.topElement,epg.focusElementIndex);
		}
		break;
	}
}

function hideInfo() {
	none($('orderInfo'));
	clearInterval(order.orderInfoTimer);
}

Order.Init.prototype.alertBoxFocus = function(alertBox, index) {
	focusElement(alertBox[index]);
	epg.focusElement = Order.Init.prototype.focusPosition.alertBox;
	order.focusElementIndex = index;
}

Order.Init.prototype.alertBoxBlur = function(alertBox, index) {
	blurElement(alertBox[index]);
}


Order.Init.prototype.ajaxPlaceAnOrder = function(o) {
	ajax({
		type : "post",
		url : order.path+"order/ajaxPlaceAnOrder",
		data : "packageId="+order.packageId+"&price="+order.price+"&bindProductID="+order.bindProductID,
		dataType : "json",
		success:function(data) {
			var flag = data.flag;
			if(flag=="true"||flag==true){// 订购成功，跳转页面
				$('order_info_text').innerHTML=data.msg;
				window.location.href = data.payUrl;
			}else{// 订购失败，提示
				$('order_info_text').innerHTML=data.msg;
			}
		}
	});

}

Order.Init.prototype.initTopElement = function(topElement) {
	order.packageId = _s(topElement, "input")[0].value;
	order.packageName = _s(topElement, "input")[1].value;
	order.feeId = _s(topElement, "input")[2].value;
	order.price = _s(topElement, "input")[3].value;
	order.check = _s(topElement, "input")[4].value;
	order.bindProductID = _s(topElement, "input")[5].value;
}

Order.Init.prototype.initFocusAfterLoadData = function(loadType) {
	switch (loadType) {
		case Epg.Init.prototype.loadDataType.memory:
			Epg.focusElementMemory = getMemoryElement("focusElementMemory");
			Epg.focusElementIndexMemory = getMemoryElement("focusElementIndexMemory");
			var position = Epg.focusElementMemory.pop();
			var index = Epg.focusElementIndexMemory.pop();
			if (position == epg.focusPosition.contentBottom) {
				order.contentBottomFocus(epg.content.bottomElement, index);
			}
			break;
		case Epg.Init.prototype.loadDataType.init:// 首次加载
			order.contentTopFocus(epg.content.topElement, 0);
			break;
	}
}

Order.Init.prototype.initModel = function(loadType) {
	order = new Order.Init();
	order.initFocusAfterLoadData(loadType);
	// order.contentTopFocus(epg.content.topElement, 0);
};