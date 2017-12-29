/**
 * 电视剧，电影，综艺，专题，全部专题
 */
var SeriesDetail = {};

var seriesDetail = null;

SeriesDetail.Init = function ()
{
	this.rows = 6;
	this.path = $("path").value;
	this.showIntroduction = false;//是否显示简介 false 否
	this.token = $("token").value;
	this.vodType = $("vodType").value;
	this.videoId = $("videoId").value;
	this.seriesDetailBorder = $("seriesDetailBorder");
	this.addCollectionUrl = this.path+"/record/addFavorite";
	this.deleteCollectionUrl = this.path+"/record/deleteFavoriteById";
	this.seriesLimit = 20;
	this.seriesNumberCurPage = 1;
	this.selSeriesRangeIndex = 0;
	this.selSeriesNumberIndex = 0;
	this.focusElement = epg.focusElement;
	this.focusElementIndex = epg.focusElementIndex;
	this.seriesRange = epg.content.centerElement[0].children;
	this.seriesNumber = epg.content.centerElement[1].children;
	this.seriesTotal = $("total").value;
	this.singleVideoId = this.seriesNumber.length>0?_s(this.seriesNumber[0],"input")[0].value:"";
	this.fee = this.seriesNumber.length>0?_s(this.seriesNumber[0],"input")[1].value:"";
	this.numberBgFocus = "url(../public/images/tvseries/numberBgFocus.png)";
	this.numberBg = "url(../public/images/tvseries/numberBg.png)";
	this.numberBgSelected = "url(../public/images/tvseries/numberBgSelected.png)";
	this.getUrl = function()
	{
		return $("url").value;
	}
};

/**
 * 上侧键盘元素聚焦
 * @param topElement 上侧键盘元素集合
 * @param index 元素位置
 */
SeriesDetail.Init.prototype.contentTopFocus = function(topElement, index)
{
	index = parseInt(index);
	focusElement(topElement[index]);
	seriesDetail.focusElement = detail.getTopTypeIndex(index);
	seriesDetail.focusElementIndex = index;
	epg.focusElement = Epg.Init.prototype.focusPosition.contentTop;
	epg.focusElementIndex = index;
};

/**
 * 上侧键盘元素聚焦
 * @param topElement 上侧键盘元素集合
 * @param index 元素位置
 */
SeriesDetail.Init.prototype.contentTopBlur = function(topElement, index)
{
	blurElement(topElement[index]);
};

SeriesDetail.Init.prototype.focusPosition = {seriesRange:'seriesRange',seriesNumber:'seriesNumber'};

/**
 * 下侧键盘元素聚焦
 * @param centerElement 下侧键盘元素集合
 * @param index 元素位置
 */
SeriesDetail.Init.prototype.contentCenterFocus = function(centerElement, index,detailPosition){
	index = parseInt(index);
	centerElement[index].style.backgroundImage = seriesDetail.numberBgFocus;
	if (detailPosition!=null) {
		seriesDetail.focusElement = detailPosition;
		seriesDetail.focusElementIndex = index;
	}
	epg.focusElement = Epg.Init.prototype.focusPosition.contentCenter;
	epg.focusElementIndex = index;
};

/**
 * 下侧键盘元素聚焦
 * @param centerElement 下侧键盘元素集合
 * @param index 元素位置
 */
SeriesDetail.Init.prototype.contentCenterBlur = function(centerElement, index) {
	centerElement[index].style.backgroundImage = seriesDetail.numberBg;
	if ((seriesDetail.focusElement==SeriesDetail.Init.prototype.focusPosition.seriesRange
			&&seriesDetail.selSeriesRangeIndex==index)||
			(seriesDetail.focusElement==SeriesDetail.Init.prototype.focusPosition.seriesNumber&&
			seriesDetail.selSeriesNumberIndex==index))
	{
		centerElement[index].style.backgroundImage = seriesDetail.numberBgSelected;
	}
};


/**
 * 左侧键盘元素聚焦
 * 
 * @param bottomElement
 *            左侧键盘元素集合
 * @param index
 *            元素位置
 */
SeriesDetail.Init.prototype.contentBottomFocus = function(bottomElement, index) {
	index = parseInt(index);
	if (index > bottomElement.length - 1) {
		index = 0;
	}
	if (bottomElement[index] == undefined) {
		index = index + 5;
	}
	seriesDetail.seriesDetailBorder.style.left = 79 + (index > 5 ? index - 6 : index) * 191 + "px"
	if (index < 6) {
		seriesDetail.seriesDetailBorder.style.top = "710px";
	} else {
		seriesDetail.seriesDetailBorder.style.top = "960px";
	}
	block(seriesDetail.seriesDetailBorder);
	epg.addScroll(getElementByTag(bottomElement[index], "div"), 6);
	epg.focusElement = Epg.Init.prototype.focusPosition.contentBottom;
	epg.focusElementIndex = index;
};

/**
 * 左侧键盘元素聚焦
 * @param bottomElement 左侧键盘元素集合
 * @param index 元素位置
 */
SeriesDetail.Init.prototype.contentBottomBlur = function(bottomElement, index)
{
	epg.delScroll(getElementByTag(bottomElement[index], "div"), getElementByTag(bottomElement[index], "marquee"));
	none(seriesDetail.seriesDetailBorder);
};

SeriesDetail.Init.prototype.moveUp = function()
{
	if (seriesDetail.showIntroduction)
	{
		return;
	}
	switch (epg.focusElement) {
		case Epg.Init.prototype.focusPosition.contentBottom:
			seriesDetail.contentBottomBlur(epg.content.bottomElement,epg.focusElementIndex);
			if(epg.focusElementIndex>5&&epg.focusElementIndex<epg.content.bottomElement.length) {
				seriesDetail.contentBottomFocus(epg.content.bottomElement,epg.focusElementIndex-6);
			}else {
				//$("contentUp").className="content-up";
				$("contentUp").style.top="0px";
				$("contentDown").style.display="none";
				$("seriesDetailCenter").style.display="block";
				seriesDetail.contentCenterFocus(seriesDetail.seriesNumber,seriesDetail.focusElementIndex,SeriesDetail.Init.prototype.focusPosition.seriesNumber);
			}
			break;
		case Epg.Init.prototype.focusPosition.contentCenter:
			if (seriesDetail.focusElement==SeriesDetail.Init.prototype.focusPosition.seriesRange)
			{
				seriesDetail.contentCenterBlur(seriesDetail.seriesRange,seriesDetail.focusElementIndex);
				seriesDetail.contentTopFocus(epg.content.topElement,0);
			}else if(seriesDetail.focusElement==SeriesDetail.Init.prototype.focusPosition.seriesNumber)
			{
				seriesDetail.contentCenterBlur(seriesDetail.seriesNumber,seriesDetail.focusElementIndex);
				if (seriesDetail.focusElementIndex<seriesDetail.seriesNumberCurPage*seriesDetail.seriesLimit-seriesDetail.seriesLimit/2)
				{
					seriesDetail.contentCenterFocus(seriesDetail.seriesRange,seriesDetail.selSeriesRangeIndex,
							SeriesDetail.Init.prototype.focusPosition.seriesRange);
				}else
				{
					seriesDetail.contentCenterFocus(seriesDetail.seriesNumber,seriesDetail.focusElementIndex-seriesDetail.seriesLimit/2,
									SeriesDetail.Init.prototype.focusPosition.seriesNumber);
				}
			}
			break;
	}
};


SeriesDetail.Init.prototype.moveDown = function()
{
	if (seriesDetail.showIntroduction)
	{
		return;
	}
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.contentTop:
			if (seriesDetail.seriesRange.length>0)
			{
				seriesDetail.contentTopBlur(epg.content.topElement,epg.focusElementIndex);
				seriesDetail.contentCenterFocus(seriesDetail.seriesRange,0,SeriesDetail.Init.prototype.focusPosition.seriesRange);
			}
			break;
		case Epg.Init.prototype.focusPosition.contentCenter:
			if (seriesDetail.focusElement==SeriesDetail.Init.prototype.focusPosition.seriesRange)
			{
				seriesDetail.contentCenterBlur(seriesDetail.seriesRange,seriesDetail.focusElementIndex);
				seriesDetail.contentCenterFocus(seriesDetail.seriesNumber,(seriesDetail.seriesNumberCurPage-1)*seriesDetail.seriesLimit, 
						SeriesDetail.Init.prototype.focusPosition.seriesNumber);
			}else if(seriesDetail.focusElement==SeriesDetail.Init.prototype.focusPosition.seriesNumber)
			{
				if (seriesDetail.focusElementIndex<seriesDetail.seriesNumberCurPage*seriesDetail.seriesLimit-seriesDetail.seriesLimit/2
						&&seriesDetail.focusElementIndex+seriesDetail.seriesLimit/2<seriesDetail.seriesNumber.length)
				{
					seriesDetail.contentCenterBlur(seriesDetail.seriesNumber,seriesDetail.focusElementIndex);
					seriesDetail.contentCenterFocus(seriesDetail.seriesNumber,seriesDetail.focusElementIndex+seriesDetail.seriesLimit/2,
							SeriesDetail.Init.prototype.focusPosition.seriesNumber);
				}else
				{	
					//$("contentUp").className="content-up_on";
					$("contentUp").style.top="-600px";
					$("contentDown").style.display="block";
					$("seriesDetailCenter").style.display="none";
					
					seriesDetail.contentCenterBlur(seriesDetail.seriesNumber,seriesDetail.focusElementIndex);
					seriesDetail.contentBottomFocus(epg.content.bottomElement, 0);
				}
			}
			break;
		case Epg.Init.prototype.focusPosition.contentBottom:
			if (epg.focusElementIndex<6&&epg.focusElementIndex+6<=epg.content.bottomElement.length-1)
			{
				seriesDetail.contentBottomBlur(epg.content.bottomElement,epg.focusElementIndex);
				seriesDetail.contentBottomFocus(epg.content.bottomElement,epg.focusElementIndex+6);
			}
			break;
	}
};




SeriesDetail.Init.prototype.moveLeft = function()
{
	if (seriesDetail.showIntroduction)
	{
		return;
	}
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.contentTop:
			if(epg.focusElementIndex>0)
			{
				seriesDetail.contentTopBlur(epg.content.topElement,epg.focusElementIndex);
				seriesDetail.contentTopFocus(epg.content.topElement,epg.focusElementIndex-1);
			}else if(seriesDetail.curPage>1)
			{
				//翻页
				seriesDetail.curPage--;
				loadPage(seriesDetail.getPostData(Epg.Init.prototype.loadDataType.turnLeft))
			}
			break;
		case Epg.Init.prototype.focusPosition.contentCenter:
			if (seriesDetail.focusElementIndex>0)
			{
				if (seriesDetail.focusElement==SeriesDetail.Init.prototype.focusPosition.seriesRange)
				{
					seriesDetail.contentCenterBlur(seriesDetail.seriesRange,seriesDetail.focusElementIndex);
					seriesDetail.contentCenterFocus(seriesDetail.seriesRange,seriesDetail.focusElementIndex-1, 
							SeriesDetail.Init.prototype.focusPosition.seriesRange);
				}else if(seriesDetail.focusElement==SeriesDetail.Init.prototype.focusPosition.seriesNumber&&
						seriesDetail.focusElementIndex>0)
				{
					seriesDetail.contentCenterBlur(seriesDetail.seriesNumber,seriesDetail.focusElementIndex);
					if (seriesDetail.focusElementIndex==seriesDetail.seriesLimit*(seriesDetail.seriesNumberCurPage-1))
					{
						seriesDetail.turnSeriesNumber("left");
					}
					seriesDetail.contentCenterFocus(seriesDetail.seriesNumber,seriesDetail.focusElementIndex-1,
							SeriesDetail.Init.prototype.focusPosition.seriesNumber);
				}
			}
			break;
		case Epg.Init.prototype.focusPosition.contentBottom:
			if(epg.focusElementIndex%6!=0)
			{
				seriesDetail.contentBottomBlur(epg.content.bottomElement,epg.focusElementIndex);
				seriesDetail.contentBottomFocus(epg.content.bottomElement,epg.focusElementIndex-1);
			}
			break;
	}
};

SeriesDetail.Init.prototype.moveRight = function()
{
	if (seriesDetail.showIntroduction)
	{
		return;
	}
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.contentTop:
			if ((epg.focusElementIndex+1)%seriesDetail.pageLimit!=0)
			{
				if(epg.focusElementIndex<epg.content.topElement.length-1)
				{
					seriesDetail.contentTopBlur(epg.content.topElement,epg.focusElementIndex);
					seriesDetail.contentTopFocus(epg.content.topElement,epg.focusElementIndex+1);
				}
			}else if(seriesDetail.curPage<seriesDetail.pages)
			{
				//翻页
				seriesDetail.curPage++;
				loadPage(seriesDetail.getPostData(Epg.Init.prototype.loadDataType.turnRight));
			}
			break;
		case Epg.Init.prototype.focusPosition.contentCenter:
			if (seriesDetail.focusElement==SeriesDetail.Init.prototype.focusPosition.seriesRange) {
				if (seriesDetail.focusElementIndex<seriesDetail.seriesRange.length-1) {
					seriesDetail.contentCenterBlur(seriesDetail.seriesRange,seriesDetail.focusElementIndex);
					seriesDetail.contentCenterFocus(seriesDetail.seriesRange,seriesDetail.focusElementIndex+1,  SeriesDetail.Init.prototype.focusPosition.seriesRange);
				}
			}else if(seriesDetail.focusElement==SeriesDetail.Init.prototype.focusPosition.seriesNumber&&
					seriesDetail.focusElementIndex<seriesDetail.seriesNumber.length-1) {
				seriesDetail.contentCenterBlur(seriesDetail.seriesNumber,seriesDetail.focusElementIndex);
				if (seriesDetail.focusElementIndex+1>=seriesDetail.seriesLimit*seriesDetail.seriesNumberCurPage) {
					seriesDetail.turnSeriesNumber("right");
				}
				seriesDetail.contentCenterFocus(seriesDetail.seriesNumber,seriesDetail.focusElementIndex+1, SeriesDetail.Init.prototype.focusPosition.seriesNumber);
			}
			break;
		case Epg.Init.prototype.focusPosition.contentBottom:
			if ((epg.focusElementIndex+1)%6!=0)
			{
				if(epg.focusElementIndex+1<=epg.content.bottomElement.length-1)
				{
					seriesDetail.contentBottomBlur(epg.content.bottomElement,epg.focusElementIndex);
					seriesDetail.contentBottomFocus(epg.content.bottomElement,epg.focusElementIndex+1);
				}
			}
			break;
	}
};

SeriesDetail.Init.prototype.turnSeriesNumber = function(direction)
{
	if (direction=="right") {
		for (var i = seriesDetail.seriesLimit*(seriesDetail.seriesNumberCurPage-1); i < seriesDetail.seriesLimit*seriesDetail.seriesNumberCurPage; i++)
		{
			none(seriesDetail.seriesNumber[i]);
		}
		var end = seriesDetail.seriesLimit*seriesDetail.seriesNumberCurPage+seriesDetail.seriesLimit>seriesDetail.seriesNumber.length?
				seriesDetail.seriesNumber.length:seriesDetail.seriesLimit*seriesDetail.seriesNumberCurPage+seriesDetail.seriesLimit;
		for (var i = seriesDetail.seriesLimit*seriesDetail.seriesNumberCurPage; i <end; i++)
		{
			block(seriesDetail.seriesNumber[i]);
		}
		seriesDetail.seriesNumberCurPage++;
	}else {
		var end =  seriesDetail.focusElementIndex+seriesDetail.seriesLimit>seriesDetail.seriesNumber.length?seriesDetail.seriesNumber.length:seriesDetail.focusElementIndex+seriesDetail.seriesLimit;
		
		for (var i = seriesDetail.focusElementIndex; i < end; i++) {
			none(seriesDetail.seriesNumber[i]);
		} 
		
		for (var i = seriesDetail.focusElementIndex-1; i >=seriesDetail.focusElementIndex-seriesDetail.seriesLimit; i--) {
			block(seriesDetail.seriesNumber[i]);
		}
		seriesDetail.seriesNumberCurPage--;
	}
	
	unSelectedElement(seriesDetail.seriesNumber[seriesDetail.selSeriesNumberIndex]);
	seriesDetail.seriesNumber[seriesDetail.selSeriesNumberIndex].style.background="url(../public/images/tvseries/numberBg.png) no-repeat";
	
	
	seriesDetail.seriesRange[seriesDetail.selSeriesRangeIndex].style.backgroundImage = seriesDetail.numberBg;
	seriesDetail.seriesRange[seriesDetail.seriesNumberCurPage-1].style.backgroundImage = seriesDetail.numberBgSelected;
	seriesDetail.selSeriesRangeIndex = seriesDetail.seriesNumberCurPage-1;
	seriesDetail.selSeriesNumberIndex = (seriesDetail.seriesNumberCurPage-1)*seriesDetail.seriesLimit;
	seriesDetail.seriesNumber[seriesDetail.selSeriesNumberIndex].style.backgroundImage = seriesDetail.numberBgSelected;
}

SeriesDetail.Init.prototype.enter = function()
{
	switch (epg.focusElement)
	{
		case Epg.Init.prototype.focusPosition.contentTop:
			switch (seriesDetail.focusElement)
			{
				case Detail.Init.prototype.topType.play:
					/*var url="order/package";
					epg.focusMemory(epg.model, epg.type, epg.focusElement, epg.focusElementIndex);
					loadPage(url);*/
					detail.play(seriesDetail);
					break;
				case Detail.Init.prototype.topType.collection:
					detail.addOrDeleteCollection(seriesDetail);
					break;
				case Detail.Init.prototype.topType.introduction:
					block($("show-detail"));
					seriesDetail.showIntroduction = true;
					break;
			}
			break;
		case Epg.Init.prototype.focusPosition.contentCenter:
			seriesDetail.seriesSelected();
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
SeriesDetail.Init.prototype.initFocusAfterLoadData =function(loadType)
{
	switch (loadType)
	{
		case Epg.Init.prototype.loadDataType.turnRight://向上翻页
			seriesDetail.contentTopFocus(epg.content.topElement,epg.focusElementIndex>0?epg.focusElementIndex-seriesDetail.pageLimit+1:0);
			break;
		case Epg.Init.prototype.loadDataType.turnLeft://向下翻页
			if (!isNullOrEmpty($("lastFocusIndex").value))
			{
				epg.focusElementIndex = parseInt($("lastFocusIndex").value);
			}
			seriesDetail.contentTopFocus(epg.content.topElement,epg.focusElementIndex+seriesDetail.pageLimit-1);
			break;
		case Epg.Init.prototype.loadDataType.init://首次加载
			if (epg.content.topElement.length>0)
			{
				seriesDetail.contentTopFocus(epg.content.topElement,0);
			}
			break;
		case Epg.Init.prototype.loadDataType.memory:
			Epg.focusElementMemory = getMemoryElement("focusElementMemory");
			Epg.focusElementIndexMemory = getMemoryElement("focusElementIndexMemory");
			var position = Epg.focusElementMemory.pop();
			var index = Epg.focusElementIndexMemory.pop();
			//seriesDetail.contentTopFocus(epg.content.topElement,0);
			
			if(position == Epg.Init.prototype.focusPosition.contentCenter){
				if (parseInt(index) >= seriesDetail.seriesNumberCurPage*seriesDetail.seriesLimit){
					var rangeIndex = parseInt(parseInt(index)/seriesDetail.seriesLimit);// 0:1-20 1:21-40 2:41-60
					unSelectedElement(seriesDetail.seriesRange[seriesDetail.selSeriesRangeIndex]);
					seriesDetail.seriesRange[seriesDetail.selSeriesRangeIndex].style.background="url(../public/images/tvseries/numberBg.png) no-repeat";
					var oldRangs = seriesDetail.seriesRange[seriesDetail.selSeriesRangeIndex].innerText.split("-");
					var newRanges = seriesDetail.seriesRange[rangeIndex].innerText.split("-");
					for (var i = parseInt(oldRangs[0])-1; i <  parseInt(oldRangs[1]); i++){
						none(seriesDetail.seriesNumber[i]);
					}
					for (var i = parseInt(newRanges[0])-1; i < parseInt(newRanges[1]); i++){
						block(seriesDetail.seriesNumber[i]);
					}
					seriesDetail.selSeriesNumberIndex = parseInt(index);
					seriesDetail.seriesNumber[parseInt(index)].style.backgroundImage = seriesDetail.numberBgSelected;
					seriesDetail.seriesNumberCurPage = rangeIndex+1;
					
					seriesDetail.selSeriesRangeIndex = rangeIndex;
					seriesDetail.seriesRange[rangeIndex].style.backgroundImage = seriesDetail.numberBgSelected;
				}
				// 聚焦
				seriesDetail.contentCenterFocus(seriesDetail.seriesNumber,parseInt(index), SeriesDetail.Init.prototype.focusPosition.seriesNumber);
			}else if(position == Epg.Init.prototype.focusPosition.contentBottom){
				$("contentUp").style.top="-600px";
				$("contentDown").style.display="block";
				$("seriesDetailCenter").style.display="none";
				seriesDetail.contentBottomFocus(epg.content.bottomElement, index);
			} else {
				seriesDetail.contentTopFocus(epg.content.topElement,0);
			}
			
		}
}

// 剧集选中状态
SeriesDetail.Init.prototype.seriesSelected = function() {
	if (seriesDetail.focusElement==SeriesDetail.Init.prototype.focusPosition.seriesRange) {
		unSelectedElement(seriesDetail.seriesRange[seriesDetail.selSeriesRangeIndex]);// 去掉当前页的样式
		// 防止背景图片消失
		seriesDetail.seriesRange[seriesDetail.selSeriesRangeIndex].style.background="url(../public/images/tvseries/numberBg.png) no-repeat";
		unSelectedElement(seriesDetail.seriesNumber[seriesDetail.selSeriesNumberIndex]);
		seriesDetail.seriesNumber[seriesDetail.selSeriesNumberIndex].style.background="url(../public/images/tvseries/numberBg.png) no-repeat";
		if(seriesDetail.selSeriesRangeIndex==seriesDetail.focusElementIndex){// 确保已经选中 再点击 聚焦消失情况
			//seriesDetail.contentCenterBlur(seriesDetail.seriesRange,seriesDetail.focusElementIndex);
			seriesDetail.contentCenterFocus(seriesDetail.seriesRange,seriesDetail.focusElementIndex, SeriesDetail.Init.prototype.focusPosition.seriesRange);
		}
		var oldRangs = seriesDetail.seriesRange[seriesDetail.selSeriesRangeIndex].innerText.split("-");
		var newRanges = seriesDetail.seriesRange[seriesDetail.focusElementIndex].innerText.split("-");
		for (var i = parseInt(oldRangs[0])-1; i <  parseInt(oldRangs[1]); i++) {
			none(seriesDetail.seriesNumber[i]);
		}
		for (var i = parseInt(newRanges[0])-1; i < parseInt(newRanges[1]); i++) {
			block(seriesDetail.seriesNumber[i]);
		}
		seriesDetail.seriesNumber[parseInt(newRanges[0])-1].style.backgroundImage = seriesDetail.numberBgSelected;
		seriesDetail.selSeriesNumberIndex = parseInt(newRanges[0])-1;
		seriesDetail.seriesNumberCurPage = seriesDetail.focusElementIndex+1;
		seriesDetail.selSeriesRangeIndex = seriesDetail.focusElementIndex;
	}else if(seriesDetail.focusElement==SeriesDetail.Init.prototype.focusPosition.seriesNumber) {
		seriesDetail.seriesNumber[seriesDetail.selSeriesNumberIndex].style.backgroundImage = seriesDetail.numberBg;
		seriesDetail.selSeriesNumberIndex = seriesDetail.focusElementIndex;
		seriesDetail.singleVideoId = _s(seriesDetail.seriesNumber[seriesDetail.focusElementIndex],"input")[0].value;
		seriesDetail.fee = _s(seriesDetail.seriesNumber[seriesDetail.focusElementIndex],"input")[1].value;
		detail.play(seriesDetail);
	}
}

SeriesDetail.Init.prototype.initModel = function(loadType)
{
	seriesDetail = new SeriesDetail.Init();
	detail = new Detail.Init();
	seriesDetail.initFocusAfterLoadData(loadType);
};
