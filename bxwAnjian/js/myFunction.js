/**
 * Created by ypf on 2017/12/21.
 */
//var hostIp='http://www.mybanxue.com';
//var hostIp='http://192.168.8.251/banxue';
//var hostVideoIP='http://www.mybanxue.com:86';

/*var hostIp='http://10.215.0.40/banxue';
var hostVideoIP='http://10.215.0.40:86';*/

var hostIp='http://192.168.17.12/banxue';
var hostVideoIP='http://192.168.17.13:86';

/*
* 获取token
* */
var token="";
var parameter={
    username:18800000000,
    pwd:"e10adc3949ba59abbe56e057f20f883e",
    skey:"skey",
    type:1
};
banxue.ajax({
    url:hostIp+'/app/user/login.do',
    type:'POST',
    data:parameter,
    success:function(data){
        //console.log(data);
        token=data.data.token;
       // console.log(token);
    }
});


/**
 * 元素点击函数
 * */
function headerClick(){
    banxue("#footer li").removeClass();
    banxue('#footer').animate({
        'top':'540px'
    },500)
}

function asideLiClick(){
    banxue(this).addClass("active").siblings().removeClass();
    sessionStorage.setItem("liIdex",banxue(this).index());
    var subjectId=banxue(this).attr('data-id');
    var gradeId=banxue(this).attr('data-gradeId');
    var versionId=banxue(this).attr('data-versionId');
    var altKey=banxue(this).children('img').attr('data-key')
    var params={
        token:token,
        gradeId:gradeId,
        subjectId:subjectId,
        versionId:versionId,
        pageSize:100
    };
    getList(params,altKey);
}

function centerLiClick(){
    //console.log(banxue(this).attr('data-resourceId')!=undefined);
    if(banxue(this).attr('data-resourceId')!=undefined){
        var resourceId=banxue(this).attr('data-resourceId');
        banxue(this).addClass('select').siblings().removeClass();
        var params={
            token:token,
            resourceId:resourceId
        };
        banxue.ajax({
            url:hostIp+'/app/microcourse/a/getResourceDetail.do',
            type:'POST',
            data:params,
            success:function(data){
                //console.log(data)
                location.href="details.html";
                sessionStorage.setItem("data",JSON.stringify(data.data));
            }
        });
    }else{
        var gradeId=banxue(this).attr('data-gradeId');
        var subjectId=banxue(this).attr('data-subjectId');
        var topicId=banxue(this).attr('data-topicid');
        var params={
            token:token,
            gradeId:gradeId,
            subjectId:subjectId,
            topicId:topicId,
            pageSize:100
        };
        getSubList(params);
    }

}

function footerLiClick(){
    var gradeId=banxue(this).children('img').attr('data-grade');
    banxue('#textCont').text(banxue(this).text()).attr('data-grade',gradeId);
    banxue('#footer').animate({
        'top':'720px'
    },500);
    var params={
        token:token,
        gradeId:gradeId
    };
    getLeftList(params);
    ntv.navigation.move_focus(11);
}



//定义学科小图片数组
var imgArr=['sub_chinesesmall.png','sub_mathsmall.png','sub_englishsmall.png','sub_physicssmall.png','sub_chemistrysmall.png','sub_geographysmall.png','sub_historysmall.png','sub_politikbsmall.png','sub_biologysmall.png','sub_chinesesmall.png','sub_sciensesmall.png','sub_politikbsmall.png'];

//定义学科大图片数组
var imgBigArr=['sub_chinesebig.png','sub_mathbig.png','sub_englishbig.png','sub_physicsbig.png','sub_chemistrybig.png','sub_geographybig.png','sub_historybig.png','sub_politikbig.png','sub_biologybig.png','sub_chinesebig.png','sub_sciensebig.png','sub_politikbig.png'];

/**
 *
 * 获取左侧列表函数
 * */
function getLeftList(params){
    banxue.ajax({
        url:hostIp+'/app/microcourse/a/getSubjectList4Tv.do',
        type:'POST',
        data:params,
        success:function(data){
           // console.log(data)
            var html='';
            if(data.data.length){
                banxue('#asideList li p').empty();
                banxue.each(data.data,function(key,val){
                    if(key==0&&params.gradeId<=6){
                        banxue(banxue('#asideList li').eq(key)).children('p').html(val.name+'&nbsp;<span>'+val.versionName+'</span>').attr({
                            'data-id':val.id,
                            'data-gradeId':params.gradeId,
                            'data-versionId':val.versionId,
                            style:"text-align:left;"
                        });

                        /*html+='<li data-id="'+val.id+'" data-gradeId="'+params.gradeId+'" data-versionId="'+val.versionId+'" style="text-align:left;">'+
                            '<img src="img/sideList.png" alt="11" data-type="1" data-key="'+(key+1)+'"/>'+val.name+'&nbsp;<span>'+val.versionName+'</span></li>';*/
                        params.subjectId=val.id;
                        params.versionId=val.versionId;
                        params.pageSize=100;
                    }else if(key==0&&params.gradeId>6){
                        banxue(banxue('#asideList li').eq(key)).children('p').html(val.name).attr({
                            'data-id':val.id,
                            'data-gradeId':params.gradeId,
                            'data-versionId':val.versionId
                        });
                        /*html+='<li data-id="'+val.id+'" data-gradeId="'+params.gradeId+'" data-versionId="'+val.versionId+'">'+
                            '<img src="img/sideList.png" alt="11" data-type="1" data-key="'+(key+1)+'"/>'+val.name+'</li>';*/
                        params.subjectId=val.id;
                        params.versionId=val.versionId;
                        params.pageSize=100;
                    }else if(key>0&&params.gradeId<=6){
                        banxue(banxue('#asideList li').eq(key)).children('p').html(val.name+'&nbsp;<span>'+val.versionName+'</span>').attr({
                            'data-id':val.id,
                            'data-gradeId':params.gradeId,
                            'data-versionId':val.versionId,
                            style:"text-align:left;"
                        });
                        /*html+='<li data-id="'+val.id+'" data-gradeId="'+params.gradeId+'" data-versionId="'+val.versionId+'" style="text-align:left;">'+
                        '<img src="img/sideList.png" alt="'+(key+1)+'1" data-type="1" data-key="'+(key+1)+'"/>'+val.name+'&nbsp;<span>'+val.versionName+'</span></li>';*/
                    }else if(key>0&&params.gradeId>6){
                        banxue(banxue('#asideList li').eq(key)).children('p').html(val.name).attr({
                            'data-id':val.id,
                            'data-gradeId':params.gradeId,
                            'data-versionId':val.versionId
                        });
                        /*html+='<li data-id="'+val.id+'" data-gradeId="'+params.gradeId+'" data-versionId="'+val.versionId+'">'+
                            '<img src="img/sideList.png" alt="'+(key+1)+'1" data-type="1" data-key="'+(key+1)+'"/>'+val.name+'</li>';*/
                    }
                });
                //banxue('#asideList').append(html);
                //sessionStorage.setItem("leftList",html);
                sessionStorage.setItem("grade",params.gradeId);
                getList(params,1);
            }else{
                alert("暂无此年级相关课程，敬请期待！")
            }
        }
    });
}
/**
 * 获取content列表函数
 * */
function getList(paramData,altKey){
    banxue.ajax({
        url:hostIp+'/app/microcourse/a/getTopicList.do',
        type:'POST',
        data:paramData,
        success:function(data){
            var html='';
            //console.log(data);
            banxue('#content ul').empty();

            if(data.data.length==1&&data.data[0].isSkip==1){
                banxue.ajax({
                    url:hostIp+'/app/microcourse/a/getResourceList.do',
                    type:'POST',
                    data:paramData,
                    success:function(data){
                        //console.log(data)
                        banxue.each(data.data,function(key,val){
                            html+='<li data-resourceId="'+val.resourceId+'">'+
                                '<img src="img/smallAct.png" alt="'+(altKey*10+2+key)+'" data-type="2"/>'+
                                '<p>'+val.knowledgePoint+'</p>'+
                                '<img src="img/index/'+imgArr[paramData.subjectId-1]+'"/>'+
                                '</li>';
                        });
                        banxue('#centerList ul').append(html);
                        sessionStorage.setItem("contentLi",html);
                    }
                });
            }else{
                banxue.each(data.data,function(key,val){
                    html+='<li data-topicId="'+val.topicId+'" data-subjectId="'+val.subjectId+'" data-gradeId="'+val.gradeId+'">'+
                        '<img src="img/smallAct.png" alt="'+(altKey*10+2+key)+'" data-type="2"/>'+
                        '<p>'+val.topicName+'</p>'+
                        '<img src="img/index/'+imgArr[paramData.subjectId-1]+'"/>'+
                        '</li>';
                })
            }
            banxue('#content ul').append(html);
            sessionStorage.setItem("contentLi",html);
        }
    });
}

/**
 * 获取content二级列表函数
 * */
function getSubList(params){
    banxue.ajax({
        url:hostIp+'/app/microcourse/a/getResourceList.do',
        type:'POST',
        data:params,
        success:function(data){
            //console.log(data)
            location.href="wkSubList.html";
            var html='';
            banxue.each(data.data,function(key,val){
                html+='<li data-resourceId="'+val.resourceId+'">'+
                    '<img src="img/bigAct.png" alt="'+(11+key)+'" data-type="2"/>'+
                    '<p>'+val.knowledgePoint+'</p>'+
                    '<img src="img/index/'+imgArr[params.subjectId-1]+'"/>'+
                    '</li>';
            })
            sessionStorage.setItem("subList",html)
        }
    });
}
/**
* 特殊列表获取（奥数，小升初，中考）
* */
function showList(paramData){
    banxue.ajax({
        url:hostIp+'/app/microcourse/a/getThemeList.do',
        type:'POST',
        data:paramData,
        success:function(data){
            //console.log(data)
            var html='';
            banxue.each(data.data,function(key,val){
                if(key==0){
                    html+='<li data-subjectId="'+val.subjectId+'" data-themeId="'+val.themeId+'" data-gradeId="'+paramData.gradeId+'">'+
                        '<img src="img/sideList.png" alt="11" data-type="2"/>'+val.themeName+'</li>';
                    paramData.themeId=val.themeId;
                    paramData.pageSize=100;
                    paramData.subjectId=val.subjectId;
                }else{
                    html+='<li data-subjectId="'+val.subjectId+'" data-themeId="'+val.themeId+'" data-gradeId="'+paramData.gradeId+'">'+
                        '<img src="img/sideList.png" alt="'+(key+1)+'1" data-type="2"/>'+val.themeName+'</li>';
                }

            });
            getOtherList(paramData);
            sessionStorage.setItem("list",html);
        }
    });
    setTimeout(function(){
        location.href="list.html";
    },300)
}
function getOtherList(params){
    banxue.ajax({
        url:hostIp+'/app/microcourse/a/getResourceList.do',
        type:'POST',
        data:params,
        success:function(data){
            console.log(data)
            var html='';
            banxue.each(data.data,function(key,val){
                html+='<li data-resourceId="'+val.resourceId+'">'+
                    '<img src="img/smallAct.png" alt="'+(12+key)+'" data-type="2"/>'+
                    '<p>'+val.knowledgePoint+'</p>'+
                    '<img src="img/index/'+imgArr[params.subjectId-1]+'"/>'+
                    '</li>';
            });
            sessionStorage.setItem("contentLi",html);
            banxue('#content ul').empty().append(html);
        }
    });
}

