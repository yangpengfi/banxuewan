var Chart = {};

var chart = null;

Chart.Init = function() {
	this.selectedIndex = 0;// 默认选中第0个当前屏幕在导航菜单第0个
	this.num = 0;
	this.path = $("path").value;
	this.focusElement = epg.focusElement;
	this.getUrl = function() {
		return "chart/searchChart";
	};

};

/**
 * 焦点左移
 */
Chart.Init.prototype.moveLeft = function() {
	switch (epg.focusElement) {
		case Epg.Init.prototype.focusPosition.contentLeft:
			if (epg.focusElementIndex > 0) {
				if (epg.focusElementIndex == 5 && chart.num == 1) {
					// 更新样式
					chart.contentLeftBlur(epg.content.leftElement, epg.focusElementIndex);
					// 显示前五个图片，同时隐藏后五个
					for (var i = 0; i < epg.content.leftElement.length; i++) {
						if (i < 5) {
							epg.content.leftElement[i].style.display = "block";
						} else {
							epg.content.leftElement[i].style.display = "none";
						}
					}
					chart.contentLeftFocus(epg.content.leftElement, epg.focusElementIndex - 1);
					chart.num = 0;
				} else {
					chart.contentLeftBlur(epg.content.leftElement, epg.focusElementIndex);
					chart.contentLeftFocus(epg.content.leftElement, epg.focusElementIndex - 1);
				}
			} else {
				var url = "";
				var type = $("type").value;
				if (type == "ustvs") {// 美剧
					url = "chart/searchChart?type=hottvs";
				} else if (type == "movietv") {// 最新电影
					url = "chart/searchChart?type=ustvs";
				} else if (type == "varietytv") {// 王牌综艺
					url = "chart/searchChart?type=movietv";
				}
				if (url != "") {
					loadPage(url);
				}
			}
			break;
		case Epg.Init.prototype.focusPosition.header:
			if (epg.focusElementIndex > 0) {
				Chart.Init.prototype.headerBlur(epg.header, epg.focusElementIndex);
				Chart.Init.prototype.headerFocus(epg.header, epg.focusElementIndex - 1);
				var type = getHiddenInputValue(epg.header[epg.focusElementIndex]);
				url = "chart/searchChart?type=" + type;
				loadPage(url);
			}
			break;
	}
};

/**
 * 焦点右移
 */
Chart.Init.prototype.moveRight = function() {
	switch (epg.focusElement) {
		case Epg.Init.prototype.focusPosition.contentLeft:
			if (epg.focusElementIndex < epg.content.leftElement.length - 1) {
				if (epg.focusElementIndex == 4 && chart.num == 0) {
					// 更新样式:移动第六个到第一个
					chart.contentLeftBlur(epg.content.leftElement, epg.focusElementIndex);
					// 隐藏前五个图片，同时展示最后四个
					for (var i = 0; i < epg.content.leftElement.length; i++) {
						if (i < 5) {
							epg.content.leftElement[i].style.display = "none";
						} else {
							epg.content.leftElement[i].style.display = "block";
						}
					}
					chart.contentLeftFocus(epg.content.leftElement, epg.focusElementIndex + 1);
					chart.num = 1;
				} else {
					chart.contentLeftBlur(epg.content.leftElement, epg.focusElementIndex);
					chart.contentLeftFocus(epg.content.leftElement, epg.focusElementIndex + 1);
				}
			} else {
				var url = "";
				var type = $("type").value;
				if (type == "hottvs") {// 美剧
					url = "chart/searchChart?type=ustvs";
				} else if (type == "ustvs") {// 最新电影
					url = "chart/searchChart?type=movietv";
				} else if (type == "movietv") {// 王牌综艺
					url = "chart/searchChart?type=varietytv";
				}
				if (url != "") {
					loadPage(url);
				}
			}
			break;
		case Epg.Init.prototype.focusPosition.header:
			if (epg.focusElementIndex < epg.header.length - 1) {
				Chart.Init.prototype.headerBlur(epg.header, epg.focusElementIndex);
				Chart.Init.prototype.headerFocus(epg.header, epg.focusElementIndex + 1);
				var type = getHiddenInputValue(epg.header[epg.focusElementIndex]);
				var url = "chart/searchChart?type=" + type;
				loadPage(url);
			}
			break;
	}
};

/**
 * left焦点上移方法
 * 
 */
Chart.Init.prototype.moveUp = function() {
	switch (epg.focusElement) {
	case Epg.Init.prototype.focusPosition.contentLeft:
		Chart.Init.prototype.contentLeftBlur(epg.content.leftElement, epg.focusElementIndex);// 去掉当前焦点
		Chart.Init.prototype.headerUpFocus();
		break;
	}
}

/**
 * header焦点下移方法
 * 
 */
Chart.Init.prototype.moveDown = function() {
	switch (epg.focusElement) {
	case Epg.Init.prototype.focusPosition.header:// 从homeLeft下移
		if(epg.content.leftElement.length>0){
			Chart.Init.prototype.headerBlur(epg.header, epg.focusElementIndex);
			chart.contentLeftFocus(epg.content.leftElement, 0);// 聚焦到left第一个
			// 显示前五个图片，同时隐藏最后五个
			for (var i = 0; i < epg.content.leftElement.length; i++) {
				if (i < 5) {
					epg.content.leftElement[i].style.display = "block";
				}
				if (i >= 5) {
					epg.content.leftElement[i].style.display = "none";
				}
			}
			chart.num = 0
		}
	}
}

/**
 * enter 确认
 */
Chart.Init.prototype.enter = function() {
	switch (epg.focusElement) {
	case Epg.Init.prototype.focusPosition.contentLeft:
		var url = Epg.Init.prototype.getDetailPageUrl(epg.content.leftElement[epg.focusElementIndex]);
		epg.focusMemory(epg.model, $("type").value, epg.focusElement, epg.focusElementIndex);
		loadPage(url);
		break;
	}

}

/**
 * header失去焦点
 * 
 * @author Administrator
 * 
 */
Chart.Init.prototype.headerBlur = function(header, index) {
	// getElementByTag(header[index],'span').style.color ="#b1b1b1";
	getElementByTag(header[index], 'span').style.fontSize = "30px";
	epg.focusElement = Epg.Init.prototype.focusPosition.header;
	epg.focusElementIndex = index;
}

/**
 * header得到焦点
 * 
 * @param leftElement
 * @param index
 */
Chart.Init.prototype.headerFocus = function(header, index) {
	getElementByTag(header[index], 'span').style.color = "white";
	getElementByTag(header[index], 'span').style.fontSize = "36px";
	epg.focusElement = Epg.Init.prototype.focusPosition.header;
	epg.focusElementIndex = index;
}
/**
 * 失去焦点
 * 
 * @author Administrator
 * 
 */
Chart.Init.prototype.contentLeftBlur = function(leftElement, index) {
	none($("chartRightBorder-" + index));
	epg.focusElement = Epg.Init.prototype.focusPosition.contentLeft;
	epg.focusElementIndex = index;
}

/**
 * 得到焦点
 * 
 * @param leftElement
 * @param index
 */
Chart.Init.prototype.contentLeftFocus = function(leftElement, index) {
	index = parseInt(index);
	block($("chartRightBorder-" + index));
	epg.focusElement = Epg.Init.prototype.focusPosition.contentLeft;
	epg.focusElementIndex = index;
	// 影片详情
	chart.videoDetail(leftElement[index], index);
}

/**
 * 获取影片内容详情
 */
Chart.Init.prototype.videoDetail = function(element, index) {
	var temp_model = element.getElementsByTagName("input")[0].value;
	var videoId = "";
	if (temp_model == "TVDRAMA" || temp_model == "VARIETY") {
		videoId = element.getElementsByTagName("input")[2].value;
	} else {
		videoId = element.getElementsByTagName("input")[1].value;
	}
	ajax({
		type : "POST",
		url : chart.path + "chart/searchVideoDetail",
		data : "videoId=" + videoId + "&type=" + $("type").value,
		dataType : "json",
		async : false,
		success : function(date) {
			var status = date.status;
			if (status > 0) {
				var html = "";
				// 标题
				html += "<div class='video_title'>";
				html += "<span class='video_titleNum'>NO." + (index + 1)
						+ "&nbsp;" + date.title + "</span></div>";
				// 主演、类型、地区
				html += "<div class='video_center'><ul><li style='width:600px;'>主演："
						+ date.director;
				html += "</li><li style='width:200px;'>类型:" + date.type;
				html += "</li><li style='width:200px;'>地区:" + date.area
						+ "</li></ul></div>";
				// 剧情简介
				html += "<div class='video_footer'><p class='video_content'>剧情简介:";
				if (date.description != null || date.description != '') {
					if (date.description.length > 190) {
						var descruotion = date.description.substring(0, 190);
						html += descruotion + "......</p></div>";
					} else {
						html += date.description + "</p></div>";
					}
				}
				$("chartfooter").innerHTML = html;
			}
		}
	});
}

/**
 * 通过标签名获取元素中的第一个元素
 * 
 * @param element
 *            元素
 * @param tagName
 *            标签名
 * @returns 获取到的元素
 */
function getElementByTag(element, tagName) {
	return element.getElementsByTagName(tagName)[0];
}

/**
 * 获取元素中第1个input的值
 * 
 * @param element
 * @returns input 值
 */
function getHiddenInputValue(element) {
	return element.getElementsByTagName("input")[0].value;
}

/**
 * title定位
 */
Chart.Init.prototype.titleFocus = function() {
	var type = $("type").value;
	var n = 0;
	if (type == "hottvs") {// 热播
		n = 0;
	} else if (type == "ustvs") {// 美剧
		n = 1;
	} else if (type == "movietv") {// 最新电影
		n = 2;
	} else { // 王牌综艺
		n = 3;
	}
	getElementByTag(epg.header[n], 'span').style.color = "white";
}

/**
 * 上移确定header聚焦
 */
Chart.Init.prototype.headerUpFocus = function() {
	var type = $("type").value;
	var n = 0;
	if (type == "hottvs") {// 热播
		n = 0;
	} else if (type == "ustvs") {// 美剧
		n = 1;
	} else if (type == "movietv") {// 最新电影
		n = 2;
	} else { // 王牌综艺
		n = 3;
	}
	Chart.Init.prototype.headerFocus(epg.header, n);// 默认聚焦header第n+1个元素
}

/**
 * 处理排行榜加载的数据以及初始化焦点
 */
Chart.Init.prototype.initModel = function(loadType) {
	chart = new Chart.Init();
	switch (loadType) {
		case Epg.Init.prototype.loadDataType.init:// 首次加载
			Chart.Init.prototype.titleFocus();
			
			if(epg.content.leftElement.length>0){
				Chart.Init.prototype.contentLeftFocus(epg.content.leftElement, 0);//默认聚焦left第1个元素
				chart.videoDetail(epg.content.leftElement[0],0);
			}else{
				Chart.Init.prototype.headerUpFocus();
			}
			break;
		case Epg.Init.prototype.loadDataType.memory:// 记忆返回
			Epg.focusElementMemory = getMemoryElement("focusElementMemory");
			var position = Epg.focusElementMemory.pop();
			Epg.focusElementIndexMemory = getMemoryElement("focusElementIndexMemory");
			var index = Epg.focusElementIndexMemory.pop();
			switch (position) {
				case Epg.Init.prototype.focusPosition.contentLeft:
					if (index >= 5) {
						for (var i = 0; i < epg.content.leftElement.length; i++) {
							if (epg.content.leftElement[i].style.display == "none") {
								epg.content.leftElement[i].style.display = "block";
							} else {
								epg.content.leftElement[i].style.display = "none";
							}
						}
						chart.num = 1;
					}
					Chart.Init.prototype.contentLeftFocus(epg.content.leftElement, index);
					Chart.Init.prototype.titleFocus();
					break;
			}
			break;
	}
};