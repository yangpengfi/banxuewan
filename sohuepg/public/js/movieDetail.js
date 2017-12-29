/**
 * 电视剧，电影，综艺，专题，全部专题
 */
var MovieDetail = {};

var movieDetail = null;

MovieDetail.Init = function ()
{
	this.rows = 6;
	this.path = $("path").value;
	this.showIntroduction = false;//是否显示简介 false 否
	//详情页公有初始化参数
	this.token = $("token").value;
	this.vodType = $("vodType").value;
	this.videoId = $("videoId").value;
	this.addCollectionUrl = this.path+"/record/addFavorite";
	this.deleteCollectionUrl = this.path+"/record/deleteFavoriteById";
	this.getUrl = function() {
		return $("url").value;
	}
	this.movieDetailBorder = $("movieDetailBorder");
	this.fee = $("fee").value;
};


/**
 * 上侧键盘元素聚焦
 * @param topElement 上侧键盘元素集合
 * @param index 元素位置
 */
MovieDetail.Init.prototype.contentTopFocus = function(topElement, index)
{
	index = parseInt(index);
	focusElement(topElement[index]);
	movieDetail.focusElement = detail.getTopTypeIndex(index);
	movieDetail.focusElementIndex = index;
	epg.focusElement = Epg.Init.prototype.focusPosition.contentTop;
	epg.focusElementIndex = index;
};

/**
 * 上侧键盘元素聚焦
 * @param topElement 上侧键盘元素集合
 * @param index 元素位置
 */
MovieDetail.Init.prototype.contentTopBlur = function(topElement, index)
{
	blurElement(topElement[index]);
};


/**
 * 下侧键盘元素聚焦
 * @param bottomElement 下侧键盘元素集合
 * @param index 元素位置
 */
MovieDetail.Init.prototype.contentBottomFocus = function(bottomElement, index,detailPosition)
{
	index = parseInt(index);
	
	epg.addScroll(getElementByTag(bottomElement[index], "div"), 6);
//	focusElement(getElementByTag(bottomElement[index],"img"));
	movieDetail.movieDetailBorder.className = "movieDetail-border"+index+" movieDetail-border-on";
	block(movieDetail.movieDetailBorder);
	if (detailPosition!=null)
	{
		movieDetail.focusElement = detailPosition;
		movieDetail.focusElementIndex = index;
	}
	epg.focusElement = Epg.Init.prototype.focusPosition.contentBottom;
	epg.focusElementIndex = index;
};

/**
 * 下侧键盘元素聚焦
 * @param bottomElement 下侧键盘元素集合
 * @param index 元素位置
 */
MovieDetail.Init.prototype.contentBottomBlur = function(bottomElement, index)
{
	epg.delScroll(getElementByTag(bottomElement[index], "div"), 
	getElementByTag(bottomElement[index], "marquee"));
//	blurElement(getElementByTag(bottomElement[index],"img"));
	none(movieDetail.movieDetailBorder);
};

MovieDetail.Init.prototype.moveUp = function()
{
	if (movieDetail.showIntroduction)
	{
		return;
	}
	movieDetail.contentBottomBlur(epg.content.bottomElement,epg.focusElementIndex);
	movieDetail.contentTopFocus(epg.content.topElement,0);
};
 

MovieDetail.Init.prototype.moveDown = function()
{	
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.contentTop:
				movieDetail.contentTopBlur(epg.content.topElement,epg.focusElementIndex);
				movieDetail.contentBottomFocus(epg.content.bottomElement,0);
			break;
	}
};




MovieDetail.Init.prototype.moveLeft = function()
{
	if (movieDetail.showIntroduction)
	{
		return;
	}
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.contentTop:
			if(epg.focusElementIndex>0)
			{
				movieDetail.contentTopBlur(epg.content.topElement,epg.focusElementIndex);
				movieDetail.contentTopFocus(epg.content.topElement,epg.focusElementIndex-1);
			}
			break;
		case Epg.Init.prototype.focusPosition.contentBottom:
			if(epg.focusElementIndex>0)
			{
				movieDetail.contentBottomBlur(epg.content.bottomElement,epg.focusElementIndex);
				movieDetail.contentBottomFocus(epg.content.bottomElement,epg.focusElementIndex-1);
			}
			break;
	}
};

MovieDetail.Init.prototype.moveRight = function()
{
	if (movieDetail.showIntroduction)
	{
		return;
	}
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.contentTop:
			if(epg.focusElementIndex<epg.content.topElement.length-1)
			{
				movieDetail.contentTopBlur(epg.content.topElement,epg.focusElementIndex);
				movieDetail.contentTopFocus(epg.content.topElement,epg.focusElementIndex+1);
			}
			break;
		case Epg.Init.prototype.focusPosition.contentBottom:
			if(epg.focusElementIndex<epg.content.bottomElement.length-1)
			{
				movieDetail.contentBottomBlur(epg.content.bottomElement,epg.focusElementIndex);
				movieDetail.contentBottomFocus(epg.content.bottomElement,epg.focusElementIndex+1);
			}
				
	}
};


MovieDetail.Init.prototype.enter = function()
{
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.contentTop:
			switch (movieDetail.focusElement)
			{
				case Detail.Init.prototype.topType.play:
					detail.play(movieDetail);
					break;
				case Detail.Init.prototype.topType.collection:
					detail.addOrDeleteCollection(movieDetail);
					break;
				case Detail.Init.prototype.topType.introduction:
					block($("show-detail"));
					movieDetail.showIntroduction = true;
					break;
			}
			break;
		case Epg.Init.prototype.focusPosition.contentBottom:
			//epg.focusMemory(epg.model, epg.type, epg.focusElement, epg.focusElementIndex);
			var url = epg.getDetailPageUrl(epg.content.bottomElement[epg.focusElementIndex]);
			loadPage(url);
			break;
	}
}

/**
 * 翻页后初始化焦点
 */
MovieDetail.Init.prototype.initFocusAfterLoadData =function(loadType)
{
	switch (loadType)
	{
		case Epg.Init.prototype.loadDataType.turnRight://向上翻页
			movieDetail.contentTopFocus(epg.content.topElement,epg.focusElementIndex>0?epg.focusElementIndex-movieDetail.pageLimit+1:0);
			break;
		case Epg.Init.prototype.loadDataType.turnLeft://向下翻页
			if (!isNullOrEmpty($("lastFocusIndex").value))
			{
				epg.focusElementIndex = parseInt($("lastFocusIndex").value);
			}
			movieDetail.contentTopFocus(epg.content.topElement,epg.focusElementIndex+movieDetail.pageLimit-1);
			break;
		case Epg.Init.prototype.loadDataType.init://首次加载
			if (epg.content.topElement.length>0)
			{
				movieDetail.contentTopFocus(epg.content.topElement,0);
			}
			break;
		case Epg.Init.prototype.loadDataType.memory:
			Epg.focusElementMemory = getMemoryElement("focusElementMemory");
			Epg.focusElementIndexMemory = getMemoryElement("focusElementIndexMemory");
			var position = Epg.focusElementMemory.pop();
			var index = Epg.focusElementIndexMemory.pop();
			//console.log("电影详情："+position+"，"+index);
			movieDetail.contentTopFocus(epg.content.topElement,0);
			break;
	}
}


MovieDetail.Init.prototype.initModel = function(loadType) {
	movieDetail = new MovieDetail.Init();
	detail = new Detail.Init();
	movieDetail.initFocusAfterLoadData(loadType);
};
