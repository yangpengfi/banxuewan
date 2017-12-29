/**
 * 电视剧，电影，综艺，专题，全部专题
 */
var ArtsDetail = {};

var artsDetail = null;

ArtsDetail.Init = function() {
	this.rows = 6;
	this.path = $("path").value;
	this.showIntroduction = false;// 是否显示简介 false 否
	// 详情页公有初始化参数
	this.token = $("token").value;
	this.vodType = $("vodType").value;
	this.videoId = $("videoId").value;
	this.artsDetailBorder = $("artsDetailBorder");
	this.addCollectionUrl = this.path + "/record/addFavorite";
	this.deleteCollectionUrl = this.path + "/record/deleteFavoriteById";
	this.fee = "";
	this.singleVideoId = epg.content.centerElement.length > 0 ? _s(epg.content.centerElement[0], "input")[0].value : "";
	this.artsTotal = $("total").value;
	this.artsCurPage = 1;
	this.artsPages = this.artsTotal % 6 == 0 ? this.artsTotal / 6 : Math.ceil(this.artsTotal / 6);
	this.getUrl = function() {
		return $("url").value;
	}
};

/**
 * 上侧键盘元素聚焦
 * 
 * @param topElement
 *            上侧键盘元素集合
 * @param index
 *            元素位置
 */
ArtsDetail.Init.prototype.contentTopFocus = function(topElement, index) {
	index = parseInt(index);
	focusElement(topElement[index]);
	artsDetail.focusElement = detail.getTopTypeIndex(index);
	artsDetail.focusElementIndex = index;
	epg.focusElement = Epg.Init.prototype.focusPosition.contentTop;
	epg.focusElementIndex = index;
};

/**
 * 上侧键盘元素聚焦
 * 
 * @param topElement
 *            上侧键盘元素集合
 * @param index
 *            元素位置
 */
ArtsDetail.Init.prototype.contentTopBlur = function(topElement, index) {
	blurElement(topElement[index]);
};


/**
 * 下侧键盘元素聚焦
 * 
 * @param centerElement
 *            下侧键盘元素集合
 * @param index
 *            元素位置
 */
ArtsDetail.Init.prototype.contentCenterFocus = function(centerElement, index, detailPosition) {
	index = parseInt(index);
	/*
	$("centerBg").className = "block artsDetail-center-bg" + index;
	epg.addScroll(getElementByTag(centerElement[index], 'div'), 16);
	if (detailPosition != null) {
		artsDetail.focusElement = detailPosition;
		artsDetail.focusElementIndex = index;
	}
	epg.focusElement = Epg.Init.prototype.focusPosition.contentCenter;
	epg.focusElementIndex = index;
	*/
	$("centerBg").className = "block artsDetail-center-bg"+(index%6);
	epg.addScroll(getElementByTag(centerElement[index],'div'), 16);
	if (detailPosition!=null) {
		artsDetail.focusElement = detailPosition;
		artsDetail.focusElementIndex = index;
	}
	epg.focusElement = Epg.Init.prototype.focusPosition.contentCenter;
	epg.focusElementIndex = index;
	
};

/**
 * 下侧键盘元素聚焦
 * 
 * @param centerElement
 *            下侧键盘元素集合
 * @param index
 *            元素位置
 */
ArtsDetail.Init.prototype.contentCenterBlur = function(centerElement, index) {
	//$("centerBg").className = "none artsDetail-center-bg" + index;
	$("centerBg").className = "none artsDetail-center-bg"+(index%6);
	epg.delScroll(getElementByTag(centerElement[index], "div"), getElementByTag(centerElement[index], "marquee"));
};


/**
 * 左侧键盘元素聚焦
 * 
 * @param bottomElement
 *            左侧键盘元素集合
 * @param index
 *            元素位置
 */
ArtsDetail.Init.prototype.contentBottomFocus = function(bottomElement, index) {
	index = parseInt(index);
	if (index > bottomElement.length - 1) {
		index = 0;
	}
	if (bottomElement[index] == undefined) {
		index = index + 5;
	}
	artsDetail.artsDetailBorder.style.left = 79 + (index > 5 ? index - 6 : index) * 191 + "px";
	if (index < 6) {
		artsDetail.artsDetailBorder.style.top = "710px";
	} else {
		artsDetail.artsDetailBorder.style.top = "960px";
	}
	block(artsDetail.artsDetailBorder);
	epg.addScroll(getElementByTag(bottomElement[index], "div"), 6);
	epg.focusElement = Epg.Init.prototype.focusPosition.contentBottom;
	epg.focusElementIndex = index;
};

/**
 * 左侧键盘元素聚焦
 * 
 * @param bottomElement
 *            左侧键盘元素集合
 * @param index
 *            元素位置
 */
ArtsDetail.Init.prototype.contentBottomBlur = function(bottomElement, index) {
	epg.delScroll(getElementByTag(bottomElement[index], "div"), getElementByTag(bottomElement[index], "marquee"));
	none(artsDetail.artsDetailBorder);
};



ArtsDetail.Init.prototype.moveUp = function() {
	if (artsDetail.showIntroduction) {
		return;
	}
	switch (epg.focusElement) {
		case Epg.Init.prototype.focusPosition.contentCenter:
			artsDetail.contentCenterBlur(epg.content.centerElement, epg.focusElementIndex);
			
			/*
			if (epg.focusElementIndex - 2 >= 0) {
				artsDetail.contentCenterFocus(epg.content.centerElement, epg.focusElementIndex - 2);
			} else {
				artsDetail.contentTopFocus(epg.content.topElement, 0);
			}
			*/
			if(epg.focusElementIndex%artsDetail.rows==0 || epg.focusElementIndex%artsDetail.rows==1){
				artsDetail.contentTopFocus(epg.content.topElement,0);
			}else{
				artsDetail.contentCenterFocus(epg.content.centerElement,epg.focusElementIndex-2);
			}
			
			break;
		case Epg.Init.prototype.focusPosition.contentBottom:
			artsDetail.contentBottomBlur(epg.content.bottomElement, epg.focusElementIndex);
			if (epg.focusElementIndex > 5 && epg.focusElementIndex < epg.content.bottomElement.length) {
				artsDetail.contentBottomFocus(epg.content.bottomElement, epg.focusElementIndex - 6);
			} else {
				$("contentUp").className = "content-up";
				$("contentDown").style.display = "none";
				$("artsDetailCenter").style.display = "block";
				//artsDetail.contentCenterFocus(epg.content.bottomElement, 0);
				artsDetail.contentCenterFocus(epg.content.bottomElement,(artsDetail.artsCurPage-1)*artsDetail.rows);
			}
			break;
	}
};


ArtsDetail.Init.prototype.moveDown = function() {
	if (artsDetail.showIntroduction) {
		return;
	}
	switch (epg.focusElement) {
	case Epg.Init.prototype.focusPosition.contentTop:
		if (epg.content.centerElement.length > 0) {
			artsDetail.contentTopBlur(epg.content.topElement, epg.focusElementIndex);
			//artsDetail.contentCenterFocus(epg.content.centerElement, 0);
			artsDetail.contentCenterFocus(epg.content.centerElement,(artsDetail.artsCurPage-1)*artsDetail.rows);
		}
		break;
	case Epg.Init.prototype.focusPosition.contentCenter:
		
		var curTotal = artsDetail.artsCurPage*6;
		if(curTotal>artsDetail.artsTotal){
			curTotal = artsDetail.artsTotal;
		}
		if(epg.focusElementIndex+2<curTotal) {
			artsDetail.contentCenterBlur(epg.content.centerElement,epg.focusElementIndex);
			artsDetail.contentCenterFocus(epg.content.centerElement,epg.focusElementIndex+2);
		} else {
			$("contentUp").className = "content-up_on";
			$("contentDown").style.display = "block";
			$("artsDetailCenter").style.display = "none";
			artsDetail.contentCenterBlur(epg.content.centerElement, epg.focusElementIndex);
			artsDetail.contentBottomFocus(epg.content.bottomElement, 0);
		}
		
		/*
		if (epg.focusElementIndex + 2 < epg.content.centerElement.length) {
			artsDetail.contentCenterBlur(epg.content.centerElement, epg.focusElementIndex);
			artsDetail.contentCenterFocus(epg.content.centerElement, epg.focusElementIndex + 2);
		} else {
			$("contentUp").className = "content-up_on";
			$("contentDown").style.display = "block";
			$("artsDetailCenter").style.display = "none";
			artsDetail.contentCenterBlur(epg.content.centerElement, epg.focusElementIndex);
			artsDetail.contentBottomFocus(epg.content.bottomElement, 0);
		}
		*/
		break;
	case Epg.Init.prototype.focusPosition.contentBottom:
		if (epg.focusElementIndex < 6 && epg.focusElementIndex + 6 <= epg.content.bottomElement.length - 1) {
			artsDetail.contentBottomBlur(epg.content.bottomElement, epg.focusElementIndex);
			artsDetail.contentBottomFocus(epg.content.bottomElement, epg.focusElementIndex + 6);
		}
		break;
	}
};




ArtsDetail.Init.prototype.moveLeft = function() {
	if (artsDetail.showIntroduction) {
		return;
	}
	switch (epg.focusElement) {
		case Epg.Init.prototype.focusPosition.contentTop:
			if (epg.focusElementIndex > 0) {
				artsDetail.contentTopBlur(epg.content.topElement, epg.focusElementIndex);
				artsDetail.contentTopFocus(epg.content.topElement, epg.focusElementIndex - 1);
			}
			break;
		case Epg.Init.prototype.focusPosition.contentCenter:
			if (epg.focusElementIndex % 2 != 0) {
				artsDetail.contentCenterBlur(epg.content.centerElement, epg.focusElementIndex);
				artsDetail.contentCenterFocus(epg.content.centerElement, epg.focusElementIndex - 1);
			} else if (epg.focusElementIndex % 2 == 0 && artsDetail.artsCurPage > 1) {
				//artsDetail.artsTurnPageByAjax("left");
				artsDetail.artsTurnPage("left");
			}
			break;
		case Epg.Init.prototype.focusPosition.contentBottom:
			if (epg.focusElementIndex % 6 != 0) {
				artsDetail.contentBottomBlur(epg.content.bottomElement, epg.focusElementIndex);
				artsDetail.contentBottomFocus(epg.content.bottomElement, epg.focusElementIndex - 1);
			}
			break;
	}
};



ArtsDetail.Init.prototype.moveRight = function() {
	if (artsDetail.showIntroduction) {
		return;
	}
	switch (epg.focusElement) {
		case Epg.Init.prototype.focusPosition.contentTop:
			if (epg.focusElementIndex < epg.content.topElement.length - 1) {
				artsDetail.contentTopBlur(epg.content.topElement, epg.focusElementIndex);
				artsDetail.contentTopFocus(epg.content.topElement, epg.focusElementIndex + 1);
			}
			break;
		case Epg.Init.prototype.focusPosition.contentCenter:
			if (epg.focusElementIndex % 2 == 0) {
				var focus = epg.focusElementIndex + 1;
				if (epg.focusElementIndex + 1 > epg.content.centerElement.length - 1) {
					focus = 0;
				}
				if(epg.focusElementIndex>=artsDetail.artsTotal-1){
					return;
				}
				artsDetail.contentCenterBlur(epg.content.centerElement, epg.focusElementIndex);
				artsDetail.contentCenterFocus(epg.content.centerElement, focus);
			} else {
				//if(artsDetail.artsCurPage * 8 < artsDetail.artsTotal){
				if(artsDetail.artsCurPage<artsDetail.artsPages){
					//artsDetail.artsTurnPageByAjax("right");
					artsDetail.artsTurnPage("right");
				}
			}
			break;
		case Epg.Init.prototype.focusPosition.contentBottom:
			if ((epg.focusElementIndex + 1) % 6 != 0) {
				if (epg.focusElementIndex + 1 <= epg.content.bottomElement.length - 1) {
					artsDetail.contentBottomBlur(epg.content.bottomElement, epg.focusElementIndex);
					artsDetail.contentBottomFocus(epg.content.bottomElement, epg.focusElementIndex + 1);
				}
			}
			break;
	}
};


ArtsDetail.Init.prototype.enter = function() {
	switch (epg.focusElement) {
		case Epg.Init.prototype.focusPosition.contentTop:
			switch (artsDetail.focusElement) {
				case Detail.Init.prototype.topType.play:
					detail.play(artsDetail);
					break;
				case Detail.Init.prototype.topType.collection:
					detail.addOrDeleteCollection(artsDetail);
					break;
				case Detail.Init.prototype.topType.introduction:
					block($("show-detail"));
					artsDetail.showIntroduction = true;
					break;
			}
			break;
		case Epg.Init.prototype.focusPosition.contentCenter:
			artsDetail.singleVideoId = _s(epg.content.centerElement[epg.focusElementIndex],"input")[0].value;
			artsDetail.singleVideoId = _s(epg.content.centerElement[epg.focusElementIndex],"input")[0].value;
			detail.play(artsDetail);
			break;
		case Epg.Init.prototype.focusPosition.contentBottom:
			var videoCategory = _s(epg.content.bottomElement[epg.focusElementIndex],"input")[0].value;
			var videoId = _s(epg.content.bottomElement[epg.focusElementIndex],"input")[1].value;
			var type = epg.getTypeByHiddenType(videoCategory);
			url = epg.getDetailUrlByType(type,videoId);
			//epg.focusMemory(epg.model, epg.type, epg.focusElement, epg.focusElementIndex);
			loadPage(url);
			break;
	}
}

/**
 * 翻页后初始化焦点
 */
ArtsDetail.Init.prototype.initFocusAfterLoadData = function(loadType) {
	switch (loadType) {
		case Epg.Init.prototype.loadDataType.turnRight:// 向上翻页
			artsDetail.contentTopFocus(epg.content.topElement, epg.focusElementIndex > 0 ? epg.focusElementIndex - artsDetail.pageLimit + 1 : 0);
			break;
		case Epg.Init.prototype.loadDataType.turnLeft:// 向下翻页
			if (!isNullOrEmpty($("lastFocusIndex").value)) {
				epg.focusElementIndex = parseInt($("lastFocusIndex").value);
			}
			artsDetail.contentTopFocus(epg.content.topElement, epg.focusElementIndex + artsDetail.pageLimit - 1);
			break;
		case Epg.Init.prototype.loadDataType.init:// 首次加载
			if (epg.content.topElement.length > 0) {
				artsDetail.contentTopFocus(epg.content.topElement, 0);
			}
			break;
		case Epg.Init.prototype.loadDataType.memory:
			Epg.focusElementMemory = getMemoryElement("focusElementMemory");
			Epg.focusElementIndexMemory = getMemoryElement("focusElementIndexMemory");
			var position = Epg.focusElementMemory.pop();
			var index = Epg.focusElementIndexMemory.pop();
			if(position == Epg.Init.prototype.focusPosition.contentCenter){
				var rangeIndex = parseInt(parseInt(index)/artsDetail.rows);
				artsDetail.memoryRang(rangeIndex);
				artsDetail.contentCenterFocus(epg.content.centerElement,index);
				//artsDetail.contentTopFocus(epg.content.topElement, 0);
			}else if(position == Epg.Init.prototype.focusPosition.contentBottom){
				$("contentUp").className = "content-up_on";
				$("contentDown").style.display = "block";
				$("artsDetailCenter").style.display = "none";
				artsDetail.contentBottomFocus(epg.content.bottomElement, index);
			}else{
				artsDetail.contentTopFocus(epg.content.topElement, 0);
			}
			break;
	}
}

ArtsDetail.Init.prototype.artsTurnPage = function(direction) {
	var page = artsDetail.artsCurPage;
	//隐藏当前页
	for(var i=(page-1)*6;i<epg.content.centerElement.length;i++){
		none(epg.content.centerElement[i]);
	}
	if (direction=="left"){
		page--;
		artsDetail.artsCurPage--;
		for(var i=(page-1)*artsDetail.rows;i<page*artsDetail.rows;i++){
			block(epg.content.centerElement[i]);
		}
		artsDetail.contentCenterBlur(epg.content.centerElement,epg.focusElementIndex);
		epg.focusElementIndex = epg.focusElementIndex-5;
		artsDetail.contentCenterFocus(epg.content.centerElement,epg.focusElementIndex);
	}else{
		page++;
		artsDetail.artsCurPage++;
		for(var i=(page-1)*artsDetail.rows;i<page*artsDetail.rows;i++){
			if(i<artsDetail.artsTotal){
				block(epg.content.centerElement[i]);
			}
		}
		artsDetail.contentCenterBlur(epg.content.centerElement,epg.focusElementIndex);
		if((epg.focusElementIndex+5)>artsDetail.artsTotal-1){
			epg.focusElementIndex = artsDetail.artsTotal-1;
		}else{
			epg.focusElementIndex = epg.focusElementIndex+5;
		}
		
		artsDetail.contentCenterFocus(epg.content.centerElement,epg.focusElementIndex);
	}
	if(artsDetail.artsCurPage<artsDetail.artsPages){
    	block($("artsDetailTurnRight"));
	}else{
		none($("artsDetailTurnRight"));
	}
	
	if(artsDetail.artsCurPage>1){
		block($("artsDetailTurnLeft"));
	}else{
		none($("artsDetailTurnLeft"));
	}
}

//显示第几页内容
ArtsDetail.Init.prototype.memoryRang = function (page){
	for(var i=0;i<epg.content.centerElement.length;i++){
		//隐藏其他页
		if(i>=(page*artsDetail.rows) && i<(page+1)*artsDetail.rows){
			block(epg.content.centerElement[i]);
		}else{
			none(epg.content.centerElement[i]);
		}
	}
	artsDetail.artsCurPage = page+1;
	if(artsDetail.artsCurPage<artsDetail.artsPages){
    	block($("artsDetailTurnRight"));
	}else{
		none($("artsDetailTurnRight"));
	}
	
	if(artsDetail.artsCurPage>1){
		block($("artsDetailTurnLeft"));
	}else{
		none($("artsDetailTurnLeft"));
	}
};

ArtsDetail.Init.prototype.artsTurnPageByAjax = function(direction) {
	var page = artsDetail.artsCurPage;
	if (direction == "left") {
		page--;
	} else {
		page++;
	}
	ajax({
		type : "post",
		url : artsDetail.path + "/arts/ajaxResource",
		data : "id=" + artsDetail.videoId + "&page=" + page + "&rows=" + 6,
		dataType : "json",
		success : function(data) {
			var status = data.status;
			if (status > 0) {
				artsDetail.contentCenterBlur(epg.content.centerElement, epg.focusElementIndex);
				var list = data.data;
				var str = "";

				for (var i = 0; i < list.length; i++) {
					if (i % 2 == 0) {
						var style = "left:80px;top:" + (i * 25 + 15) + "px";
					} else {
						var style = "left:642px;top:" + ((i - 1) * 25 + 15) + "px;"
					}

					var videoTitle = list[i].title.replace(/^\s+|\s+$/g, "");
					str += '<div  class="artsDetail-video-title" style="' + style + '">' 
						+ '<input type="hidden" value="' + list[i].id + '">'
						+ '<input type="hidden" value="' + list[i].path + '">' 
						+ '<div>' + videoTitle + '</div></div>';
				}

				$("artsDetailCenter").innerHTML = str;
				if (direction == "left") {
					artsDetail.artsCurPage--;
					artsDetail.contentCenterFocus(epg.content.centerElement, epg.focusElementIndex + 1);
				} else {
					artsDetail.artsCurPage++;
					epg.focusElementIndex = epg.focusElementIndex - 1 < list.length ? epg.focusElementIndex - 1 : 0;
					setTimeout("artsDetail.contentCenterFocus(epg.content.centerElement,epg.focusElementIndex)", 100);
				}
				if (artsDetail.artsCurPage * 8 < artsDetail.artsTotal) { 
					block($("artsDetailTurnRight"));
				} else {
					none($("artsDetailTurnRight"));
				}

				if (artsDetail.artsCurPage > 1) {// 页数大于 1
					block($("artsDetailTurnLeft"));
				} else {
					none($("artsDetailTurnLeft"));
				}
				epg.InitElement();
			}
		}
	});

}


ArtsDetail.Init.prototype.initModel = function(loadType) {
	artsDetail = new ArtsDetail.Init();
	detail = new Detail.Init();
	artsDetail.initFocusAfterLoadData(loadType);
};
