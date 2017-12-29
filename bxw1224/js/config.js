/**
 * url配置=====================================
 */
//var hostIp='http://www.mybanxue.com';
//var hostVideoIP='http://www.mybanxue.com:86';

//var hostIp='http://192.168.8.251/banxue';
//var hostIp='http://192.168.8.252:86';

var hostIp='http://192.168.17.12/banxue';
var hostVideoIP='http://192.168.17.13:86';

/*var hostIp='http://10.215.0.40/banxue';
var hostVideoIP='http://10.215.0.40:86';*/

/*
* 定义基础变量==============================================================
* */
//定义学科小图片数组
var imgArr=['sub_chinesesmall.png','sub_mathsmall.png','sub_englishsmall.png','sub_physicssmall.png','sub_chemistrysmall.png','sub_geographysmall.png','sub_historysmall.png','sub_politikbsmall.png','sub_biologysmall.png','sub_chinesesmall.png','sub_sciensesmall.png','sub_politikbsmall.png'];

//定义学科大图片数组
var imgBigArr=['sub_chinesebig.png','sub_mathbig.png','sub_englishbig.png','sub_physicsbig.png','sub_chemistrybig.png','sub_geographybig.png','sub_historybig.png','sub_politikbig.png','sub_biologybig.png','sub_chinesebig.png','sub_sciensebig.png','sub_politikbig.png'];

/*
 * 获取token
 * */
var parameter={
    username:18800000000,
    //username:15989346035,
    pwd:"e10adc3949ba59abbe56e057f20f883e",
    skey:"skey",
    type:1
};


/*封装ajax*/
function getData( params,url,callback){
    banxue.ajax({
        url:hostIp+url,
        type:'POST',
        data:params,
        success:callback
    });
}


/*
* wkList页相关操作==============================================================================
* */
function headerClick(){
    banxue("#footer li").removeClass();
    banxue('#footer').animate({
        'top':'540px'
    },500)
}
function footerLiClick(){
    var gradeId=banxue(focusEle).attr('data-grade');
    sessionStorage.setItem("gradeId",gradeId);
    banxue('#textCont').text(banxue(focusEle).parent().text()).attr('data-grade',gradeId);
    banxue('#footer').animate({
        'top':'720px'
    },500);
    getData(parameter,'/app/user/login.do',function(data){
        var params={
            token:data.data.token,
            gradeId:gradeId
        };
        getData(params,'/app/microcourse/a/getSubjectList4Tv.do',setLeftList);
    });
    ntv.navigation.move_focus(11);
}
function centerLiClick(){
    //console.log(banxue(focusEle).parent().attr('data-resourceId')!=undefined);

    if(banxue(focusEle).parent().attr('data-resourceId')!=undefined){
        var postId=banxue(focusEle).parent().attr('data-resourceId');
        location.href="details.html";
        sessionStorage.setItem("resourceid",postId);
    }else{
        var postId=banxue(focusEle).parent().attr('data-topicId');
        location.href="wkSubList.html";
        sessionStorage.setItem("topicId",postId);
    }
}
/*
 * 创建左侧菜单列表
 * */
var setLeftList=function(msg){
    //console.log(data);
    var len=msg.data.length;
    if(len){
        banxue('#asideList li p').empty();
        var gradeId=sessionStorage.getItem("gradeId");
        banxue("#asideList img:gt("+(len-1)+")").removeAttr("alt");
        for(var i=0;i<len;i++){
            if(gradeId<=6){
                //console.log(banxue('.subjectName').eq(i));
                banxue('#asideList li p').eq(i)
                    .html(msg.data[i].name+'<span>'+msg.data[i].versionName+'</span>')
                    .attr("styel","text-align:left");
            }else{
                banxue('#asideList li p').eq(i).html(msg.data[i].name);
            }
            banxue("#asideList img").eq(i).attr({
                'data-subjectId':msg.data[i].id,
                'data-versionId':msg.data[i].versionId,
            });
            if(i==0){
                getData(parameter,'/app/user/login.do',function(data){
                    var params={
                        token:data.data.token,
                        gradeId:gradeId,
                        subjectId:msg.data[0].id,
                        versionId:msg.data[0].versionId,
                        pageSize:100
                    };
                    getData(params,'/app/microcourse/a/getTopicList.do',setCenterList);
                });
            }
        }
    }else{
        alert("暂无此年级相关课程，敬请期待！")
    }
};
/*
 * 创建中间菜单列表
 * */
var setCenterList=function(msg){
    //console.log(msg);
    banxue("#centerList li p").empty().next().remove();
    if(msg.data.length==1&&msg.data[0].isSkip==1){
        getData(parameter,'/app/user/login.do',function(data){
            var params={
                token:data.data.token,
                gradeId:msg.data[0].gradeId,
                subjectId:msg.data[0].subjectId,
                topicId:msg.data[0].topicId,
                pageSize:100
            };
            getData(params,'/app/microcourse/a/getResourceList.do',function(res){
                console.log(res);
                var lenghs=res.data.length;
                banxue("#totalPage").html(Math.ceil(lenghs/8));
                if(Math.ceil(lenghs/8)>1){
                    banxue("#pageBar").show();
                }
                banxue("#centerList img:gt("+(lenghs-1)+")").removeAttr("alt").hide();
                for(var i=0;i<lenghs;i++){
                    if(i<8){
                        banxue("#centerList li p").eq(i).html(res.data[i].videoName);
                        banxue("#centerList li").eq(i)
                            .attr("data-resourceid",res.data[i].resourceId)
                            .append('<img src="img/index/'+imgArr[res.data[i].subjectId-1]+'">');
                    }
                }
            })
        });
    }else{
        var lens=msg.data.length;
        banxue("#totalPage").html(Math.ceil(lens/8));
        if(Math.ceil(lens/8)>1){
            banxue("#pageBar").show();
        }
        banxue("#centerList img:gt("+(lens-1)+")").removeAttr("alt").hide();
        for(var i=0;i<lens;i++){
            if(i<8){
                banxue("#centerList li p").eq(i).html(msg.data[i].topicName);
                banxue("#centerList li").eq(i)
                    .attr("data-topicId",msg.data[i].topicId)
                    .removeAttr("data-resourceid")
                    .append('<img src="img/index/'+imgArr[msg.data[i].subjectId-1]+'">');
            }
        }
    }
}
/*
* 创建中间子菜单列表
* */
var setSubCenterList=function(msg){
    console.log(msg);
    var len=msg.data.length;
    banxue("#subCenterList img:gt("+(len-1)+")").removeAttr("alt").hide();
    banxue("#subCenterList li p").empty().next().remove();
    banxue("#totalPage").html(Math.ceil(len/8));
    if(Math.ceil(len/8)>1){
        banxue("#pageBar").show();
    }
    for(var i=0;i<len;i++){
        if(i<8){
            banxue("#subCenterList li p").eq(i).html(msg.data[i].videoName);
            banxue("#subCenterList li").eq(i)
                .attr("data-resourceid",msg.data[i].resourceId)
                .append('<img src="img/index/'+imgArr[msg.data[i].subjectId-1]+'">');
        }
    }
}
/*
* 小升初，中考
* */
function setThemeLeftList(msg){
    console.log(msg)
    var len=msg.data.length;
    banxue('#asideList p').empty();
    var gradeId=JSON.parse(sessionStorage.getItem("themePrm")).gradeId;
    banxue("#asideList img:gt("+(len-1)+")").removeAttr("alt");
    for(var i=0;i<len;i++){
        //console.log(banxue('#asideList li p').eq(i));
        banxue('#asideList p').eq(i).html(msg.data[i].themeName);
        banxue("#asideList img").eq(i).attr({
            'data-subjectId':msg.data[i].subjectId,
            'data-themeId':msg.data[i].themeId
        });
        if(i==0){
            getData(parameter,'/app/user/login.do',function(data){
                var params={
                    token:data.data.token,
                    gradeId:gradeId,
                    subjectId:msg.data[0].subjectId,
                    themeId:msg.data[0].themeId,
                    pageSize:100
                };
                getData(params,'/app/microcourse/a/getResourceList.do',setOthCenterList);
            });
        }
    }
}
function setOthCenterList(msg){
    var len=msg.data.length;
    banxue("#centerList img:gt("+(len-1)+")").removeAttr("alt").hide();
    banxue("#centerList li p").empty().next().remove();
    banxue("#totalPage").html(Math.ceil(len/8));
    if(Math.ceil(len/8)>1){
        banxue("#pageBar").show();
    }
    for(var i=0;i<len;i++){
        if(i<8){
            banxue("#centerList li p").eq(i).html(msg.data[i].videoName);
            banxue("#centerList li").eq(i)
                .attr("data-resourceid",msg.data[i].resourceId)
                .append('<img src="img/index/'+imgArr[msg.data[i].subjectId-1]+'">');
        }
    }
}
/*
*初始化详情页======================================================
* */
var initDetailsHtml=function(msg){
    var data=msg.data;
    console.log(data);
    banxue('#topic').html((data.topic=="全部")?'':data.topic);
    banxue('#knowledgePoint').html(data.knowledgePoint);
    banxue('#lecturer').html(data.lecturer);
    banxue('#courIcon').attr('src','img/index/'+imgBigArr[data.subjectId-1]);
    banxue('#videoIntro').html(data.videoIntro);
    banxue('#lecturerIntro').html(data.lecturerIntro);
    banxue('#playBtn').attr('data-url',data.videoUrl);
}