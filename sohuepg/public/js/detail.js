/**
 * 电视剧，电影，综艺，专题，全部专题
 */
var Detail = {};

var detail = null;

Detail.Init = function() {
};

Detail.Init.prototype.topType = {
	play : 'play',
	collection : 'collection',
	introduction : 'introduction',
};

Detail.Init.prototype.getTopTypeIndex = function(index) {
	switch (index) {
		case 0:
			return Detail.Init.prototype.topType.play;
		case 1:
			return Detail.Init.prototype.topType.collection;
		case 2:
			return Detail.Init.prototype.topType.introduction;
	}
};

Detail.Init.prototype.getCTypeByType = function(type) {
	switch (type) {
		case Epg.Init.prototype.type.movieDetail:
			return "movie";
		case Epg.Init.prototype.type.seriesDetail:
			return "tv";
		case Epg.Init.prototype.type.artsDetail:
			return "arts";
	}
}

Detail.Init.prototype.getCId = function(curObj) {
	switch (epg.type) {
	case Epg.Init.prototype.type.movieDetail:
		return curObj.videoId;
	case Epg.Init.prototype.type.seriesDetail:
	case Epg.Init.prototype.type.artsDetail:
		return curObj.singleVideoId;
	}
}

Detail.Init.prototype.play = function(curObj) {
	
	var burl = curObj.path + curObj.getUrl();
	burl.replace(/\@/g,"&");
	if (isContain(burl, "?")) {
		burl = burl
			+"&lt=memory"
			+"&um="+Epg.urlMemory
			+"&mm="+Epg.modelMemory+","+epg.model
			+"&tm="+Epg.typeMemory+","+epg.type
			+"&fem="+Epg.focusElementMemory+","+epg.focusElement
			+"&feim="+Epg.focusElementIndexMemory+","+epg.focusElementIndex;
	}
	burl = encodeURIComponent(burl);
	
	location.href = curObj.path 
			+ "/player/index?vodType=" + curObj.vodType
			+ "&vodID=" + curObj.videoId 
			+ "&cId=" + detail.getCId(curObj)
			+ "&fee=" + curObj.fee 
			+ "&cType=" + detail.getCTypeByType(epg.type)
			+ "&backUrl="+burl;
}

/**
 * 添加或删除收藏
 */
Detail.Init.prototype.addOrDeleteCollection = function(curObj) {
	var url = curObj.deleteCollectionUrl;
	var text = "收藏";
	var flag = true;
	if (reMoveAllSpecialCharacters(getElementByTag(
			epg.content.topElement[epg.focusElementIndex], "span").innerHTML) == "收藏") {
		flag = false;
		url = curObj.addCollectionUrl;
		text = "已收藏"
	}
	ajax({
		type : "post",
		url : url,
		data : "token=" + curObj.token + "&type=" + curObj.vodType
				+ "&favoriteId=" + curObj.videoId + "&userCode=",
		dataType : "json",
		success : function(data) {
			var status = data.result;
			if (status == "Success") {
				var left = '15px';
				var left1 = '78px';
				if (flag) {
					left1 = '72px';
					left = '18px';
				}
				getElementByTag(epg.content.topElement[epg.focusElementIndex],
						"span").innerHTML = text;
				getElementByTag(epg.content.topElement[epg.focusElementIndex],
						"span").style.left = left;
				getElementByTag(epg.content.topElement[epg.focusElementIndex],
						"img").style.left = left1;
			}
		}
	});
}
