/**
 * 电视剧，电影，综艺，专题，全部专题
 */
var AllSpecial = {};

var allSpecial = null;

AllSpecial.Init = function ()
{
	this.rows = 6;
	this.curPage = $("allSpecialCurPage").innerText;
	this.total = $("allSpecialTotal").innerText;
	this.pages = $("allSpecialTotalPage").innerText;
	this.pageLimit = 3;
	this.url = "special/getAllSpecialList";
	this.imgUrl = $('imgUrl').value;
	this.allSpecialBorder = $("allSpecialBorder");
	this.getPostData =function(loadType)
	{
		return "/special/allSpecial?rows="+allSpecial.rows+"&page="+ allSpecial.curPage
		+"&specialBg="+$("specialBg").value+"&lt="+loadType+"&lastFocusIndex="+epg.focusElementIndex;
	}
	this.getUrl = function()
	{
		return "/special/allSpecial?rows="+allSpecial.rows+"&page=" 
		+ allSpecial.curPage+"&specialBg="+$("specialBg").value;
	}
};



/**
 * 上侧键盘元素聚焦
 * @param topElement 上侧键盘元素集合
 * @param index 元素位置
 */
AllSpecial.Init.prototype.contentTopFocus = function(topElement, index) {
	index = parseInt(index);
	allSpecial.allSpecialBorder.style.left = 60+(390*(index>2?index-3:index))+"px";
	if (!isNullOrEmpty(_s(topElement[index],'img')[1])) {
		_s(topElement[index],'img')[1].style.left = 5+(390*(index>2?index-3:index))+"px";
	}
	allSpecial.allSpecialBorder.style.display = "block";
	if (index<allSpecial.pageLimit) {
		allSpecial.allSpecialBorder.style.top = "108px";
	}else {
		allSpecial.allSpecialBorder.style.top = "395px";
	}

	epg.focusElement = Epg.Init.prototype.focusPosition.contentTop;
	epg.focusElementIndex = index;
};

/**
 * 上侧键盘元素聚焦
 * @param topElement 上侧键盘元素集合
 * @param index 元素位置
 */
AllSpecial.Init.prototype.contentTopBlur = function(topElement, index) {
	if (!isNullOrEmpty(_s(topElement[index],'img')[1])) {
		_s(topElement[index],'img')[1].style.left = 5+(390*(index>2?index-3:index))+"px";
	}
};


/**
 * 下侧键盘元素聚焦
 * @param bottomElement 下侧键盘元素集合
 * @param index 元素位置
 */
AllSpecial.Init.prototype.contentBottomFocus = function(bottomElement, index,allSpecialPosition){};

/**
 * 下侧键盘元素聚焦
 * @param bottomElement 下侧键盘元素集合
 * @param index 元素位置
 */
AllSpecial.Init.prototype.contentBottomBlur = function(bottomElement, index){};

AllSpecial.Init.prototype.moveUp = function()
{
	if(epg.focusElementIndex>allSpecial.pageLimit-1&&epg.focusElementIndex<epg.content.topElement.length)
	{
		allSpecial.contentTopBlur(epg.content.topElement,epg.focusElementIndex);
		allSpecial.contentTopFocus(epg.content.topElement,epg.focusElementIndex-allSpecial.pageLimit);
	}
};


AllSpecial.Init.prototype.moveDown = function()
{
	if (epg.focusElementIndex<allSpecial.pageLimit&&
			epg.focusElementIndex+allSpecial.pageLimit<epg.content.topElement.length)
	{
		allSpecial.contentTopBlur(epg.content.topElement,epg.focusElementIndex);
		allSpecial.contentTopFocus(epg.content.topElement,epg.focusElementIndex+allSpecial.pageLimit);
	}
};




AllSpecial.Init.prototype.moveLeft = function() {
	if(epg.focusElementIndex>0) {
		allSpecial.contentTopBlur(epg.content.topElement,epg.focusElementIndex);
		allSpecial.contentTopFocus(epg.content.topElement,epg.focusElementIndex-1);
	}else if(allSpecial.curPage>1) {
		//翻页
		allSpecial.curPage--;
		loadPage(allSpecial.getPostData(Epg.Init.prototype.loadDataType.turnLeft));
	}
};


AllSpecial.Init.prototype.moveRight = function()
{
	if ((epg.focusElementIndex+1)%allSpecial.pageLimit!=0)
	{
		if(epg.focusElementIndex<epg.content.topElement.length-1)
		{
			allSpecial.contentTopBlur(epg.content.topElement,epg.focusElementIndex);
			allSpecial.contentTopFocus(epg.content.topElement,epg.focusElementIndex+1);
		}
	}else if(allSpecial.curPage<allSpecial.pages)
	{
		//翻页
		allSpecial.curPage++;
		loadPage(allSpecial.getPostData(Epg.Init.prototype.loadDataType.turnRight));
	}
};

AllSpecial.Init.prototype.enter = function()
{
	epg.focusMemory(epg.model, epg.type, epg.focusElement, epg.focusElementIndex);
	loadPage(epg.getDetailPageUrl(epg.content.topElement[epg.focusElementIndex]));
}

/**
 * 翻页后初始化焦点
 */
AllSpecial.Init.prototype.initFocusAfterLoadData =function(loadType)
{
	switch (loadType)
	{
		case Epg.Init.prototype.loadDataType.turnRight://向上翻页
			allSpecial.contentTopFocus(epg.content.topElement,epg.focusElementIndex>0?epg.focusElementIndex-allSpecial.pageLimit+1:0);
			break;
		case Epg.Init.prototype.loadDataType.turnLeft://向下翻页
			if (!isNullOrEmpty($("lastFocusIndex").value))
			{
				epg.focusElementIndex = parseInt($("lastFocusIndex").value);
			}
			allSpecial.contentTopFocus(epg.content.topElement,epg.focusElementIndex+allSpecial.pageLimit-1);
			break;
		case Epg.Init.prototype.loadDataType.init://首次加载
			if (epg.content.topElement.length>0)
			{
				allSpecial.contentTopFocus(epg.content.topElement,0);
			}
			break;
		case Epg.Init.prototype.loadDataType.memory:
			Epg.focusElementMemory = getMemoryElement("focusElementMemory");
			Epg.focusElementIndexMemory = getMemoryElement("focusElementIndexMemory");
			var position = Epg.focusElementMemory.pop();
			var index = Epg.focusElementIndexMemory.pop();
			allSpecial.contentTopFocus(epg.content.topElement,index);
			break;
	}
}


AllSpecial.Init.prototype.initModel = function(loadType)
{
	allSpecial = new AllSpecial.Init();
	allSpecial.initFocusAfterLoadData(loadType);
};
