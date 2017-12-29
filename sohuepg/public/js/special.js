/**
 * 电视剧，电影，综艺，专题，全部专题
 */
var Special = {};

var special = null;

Special.Init = function ()
{
	this.rows = 6;
	this.pageLimit = 6;
	this.curPage = $("specialCurPage").value;
	this.total = $("specialTotal").value;
	this.pages = $("specialTotalPage").value;
	this.specialDetailBorder = $("specialBorder");
	this.specialId = $("specialId").value;
	this.imgUrl = $("imgUrl").value;
	this.getPostData =function(loadType)
	{
		return "special/special?specialId="+special.specialId+"&rows="
		+special.rows+"&page=" + special.curPage+"&lt="+loadType
		+"&specialBg="+$("specialBg").value+"&lastFocusIndex="+epg.focusElementIndex;
	}
	this.getUrl = function()
	{
		return $("url").value+"&rows="+special.rows+"&page=" 
		+ special.curPage+"&specialBg="+$("specialBg").value;
	}
};




/**
 * 上侧键盘元素聚焦
 * @param topElement 上侧键盘元素集合
 * @param index 元素位置
 */
Special.Init.prototype.contentTopFocus = function(topElement, index)
{
	index = parseInt(index);

//	for (var i = 0; i < _s(topElement[index],'img').length; i++)
//	{
//		focusElement(_s(topElement[index],'img')[i]);
//	}
	if (!isNullOrEmpty(_s(topElement[index],'img')[1]))
	{
		_s(topElement[index],'img')[1].style.left = (193*(index>5?index-6:index))+"px";
	}
	epg.addScroll(getElementByTag(topElement[index], "div"), 6);
//	focusElement(getElementByTag(topElement[index],'div'));
	special.specialDetailBorder.style.left = 54+(193*(index>5?index-6:index))+"px";
	special.specialDetailBorder.style.display = "block";
	epg.focusElement = Epg.Init.prototype.focusPosition.contentTop;
	epg.focusElementIndex = index;
};

/**
 * 上侧键盘元素聚焦
 * @param topElement 上侧键盘元素集合
 * @param index 元素位置
 */
Special.Init.prototype.contentTopBlur = function(topElement, index)
{
	if (!isNullOrEmpty(_s(topElement[index],'img')[1]))
	{
		_s(topElement[index],'img')[1].style.left = (193*(index>5?index-6:index))+"px";
	}
	epg.delScroll(getElementByTag(topElement[index], "div"), 
			getElementByTag(topElement[index], "marquee"));
};


/**
 * 下侧键盘元素聚焦
 * @param bottomElement 下侧键盘元素集合
 * @param index 元素位置
 */
Special.Init.prototype.contentBottomFocus = function(bottomElement, index,detailPosition)
{
	
};

/**
 * 下侧键盘元素聚焦
 * @param bottomElement 下侧键盘元素集合
 * @param index 元素位置
 */
Special.Init.prototype.contentBottomBlur = function(bottomElement, index){};

Special.Init.prototype.moveUp = function(){};


Special.Init.prototype.moveDown = function(){};




Special.Init.prototype.moveLeft = function() {
	if(epg.focusElementIndex>0) {
		special.contentTopBlur(epg.content.topElement,epg.focusElementIndex);
		special.contentTopFocus(epg.content.topElement,epg.focusElementIndex-1);
	}else if(special.curPage>1) {
		//翻页
		special.curPage--;
		loadPage(special.getPostData(Epg.Init.prototype.loadDataType.turnLeft));
	}
};





Special.Init.prototype.moveRight = function() {
	if ((epg.focusElementIndex + 1) % special.pageLimit != 0) {
		if (epg.focusElementIndex < epg.content.topElement.length - 1) {
			special.contentTopBlur(epg.content.topElement, epg.focusElementIndex);
			special.contentTopFocus(epg.content.topElement, epg.focusElementIndex + 1);
		}
	} else if (special.curPage < special.pages) {
		// 翻页
		special.curPage++;
		loadPage(special.getPostData(Epg.Init.prototype.loadDataType.turnRight));
	} else if (special.total % 6 == 0) {
		special.curPage++;
		loadPage(special.getPostData(Epg.Init.prototype.loadDataType.turnRight));
	}
};


Special.Init.prototype.enter = function()
{
	epg.focusMemory(epg.model, epg.type, epg.focusElement, epg.focusElementIndex);
	loadPage(epg.getDetailPageUrl(epg.content.topElement[epg.focusElementIndex]));
}

/**
 * 翻页后初始化焦点
 */
Special.Init.prototype.initFocusAfterLoadData =function(loadType)
{
	switch (loadType)
	{
		case Epg.Init.prototype.loadDataType.turnRight://向上翻页
			special.contentTopFocus(epg.content.topElement,epg.focusElementIndex>0?epg.focusElementIndex-special.pageLimit+1:0);
			break;
		case Epg.Init.prototype.loadDataType.turnLeft://向下翻页
			if (!isNullOrEmpty($("lastFocusIndex").value))
			{
				epg.focusElementIndex = parseInt($("lastFocusIndex").value);
			}
			special.contentTopFocus(epg.content.topElement,epg.focusElementIndex+special.pageLimit-1);
			break;
		case Epg.Init.prototype.loadDataType.init://首次加载
			if (epg.content.topElement.length>0)
			{
				special.contentTopFocus(epg.content.topElement,0);
			}
			break;
		case Epg.Init.prototype.loadDataType.memory:
			Epg.focusElementMemory = getMemoryElement("focusElementMemory");
			Epg.focusElementIndexMemory = getMemoryElement("focusElementIndexMemory");
			var position = Epg.focusElementMemory.pop();
			var index = Epg.focusElementIndexMemory.pop();
			special.contentTopFocus(epg.content.topElement,index);
			break;
	}
}

Special.Init.prototype.initModel = function(loadType)
{
	special = new Special.Init();
	special.initFocusAfterLoadData(loadType);
};
