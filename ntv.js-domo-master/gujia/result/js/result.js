var id;
var indicator;
//var num = "111111";

window.onload = function(){
    press();
    var Request = new Object();
    Request = GetRequest();
    var price = decodeURI(Request['price']);
    id = decodeURI(Request['id']);
    document.getElementById('price').getElementsByTagName('span')[0].innerHTML = price;
	document.getElementById('index').focus();
    indicatorget();
    
}


function fo(id){   //聚焦动作
    partnow = id;
    if(id==1){
        document.getElementById("button").src="img/back_f.png";
    } 

    if(id==100){
        document.getElementById("iab_f").style.display="block";
        document.getElementById("iab_f").style.left="87px";
    } 
    if(id==101){
        document.getElementById("iab_f").style.display="block";
        document.getElementById("iab_f").style.left="152px";
    } 
   
}

function bu(id){   //失焦动作
    if(id==1){
        document.getElementById("button").src="img/back_n.png";
    } 
     if(id==100){
        document.getElementById("iab_f").style.display="none";
    } 
    if(id==101){
        document.getElementById("iab_f").style.display="none";
    } 
}

function press(){
             document.onkeypress = grabEvent1;
             document.onirkeypress = grabEvent1;  
             document.onkeydown = grabEvent1;
             function grabEvent1(event){
             var val = event || window.event || arguments.callee.caller.arguments[0];
             switch(val.keyCode){   
                
                 case 1:
                 case 38:
                 if(partnow==1){document.getElementById('back').focus();return false;}  
                 if(partnow==100){return false;} 
                 if(partnow==101){return false;}
                 break;
               
                 case 2:
                 case 40: 
                 if(partnow==1){return false;}  
                 if(partnow==100){document.getElementById('a1').focus();return false;} 
                 if(partnow==101){document.getElementById('a1').focus();return false;}
                 break;
                
                 case 3:
                 case 37:
                 if(partnow==1){return false;}  
                 if(partnow==100){return false;} 
                 if(partnow==101){document.getElementById('index').focus();return false;} 
                 break;
                 
                 case 4:
                 case 39:
                 if(partnow==1){return false;}  
                 if(partnow==100){document.getElementById('back').focus();return false;}   
                 if(partnow==101){return false;} 
                 break;
            
                
            case 4096:  //返回
            case 340:
            case 8:
            history.go(-1);
            return false;
            break;
            
            case 13:   //确定
            
            //ajax(2);
            break;

            
      }         
      }
}

 function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串
        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
          var str = url.substr(1);
              strs = str.split("&");
              for(var i = 0; i < strs.length; i ++) 
        {
              theRequest[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
              }
           }
       return theRequest;
     }

 function indicatorget(){
       xmlhttp=new XMLHttpRequest(); 
       var get_url = "/api/AssessHouse/"+id+"/radar";
       getStr =web_url+get_url;  
       xmlhttp.open("get",getStr, true);
       xmlhttp.send(); 
     
     xmlhttp.onreadystatechange=function () {
       if (xmlhttp.readyState == 4&&xmlhttp.status == 200){
             jsonResponse = xmlhttp.responseText;
             prcvinceJsons = eval("(" + jsonResponse + ")");
//           alert("prcvinceJsons"+prcvinceJsons);
//			console.log(prcvinceJsons);
             indicator = 'indicator='+prcvinceJsons.R1.公交+','+prcvinceJsons.R2.地铁+','+prcvinceJsons.R3.商场百货+','+prcvinceJsons.R4.超市+','+prcvinceJsons.R5.教育+','+prcvinceJsons.R6.娱乐+',';
//             alert("indicator"+indicator);
//				document.getElementById("test1").innerHTML = indicator;
             picget();
            }
          }   

 }


  function picget(){  
  xmlhttp=new XMLHttpRequest(); 
  var poststr = indicator;
//	xmlhttp.open("post", "http://192.168.200.46:3000/ajax/renderCharts", true);
xmlhttp.open("post", web_u+"/ajax/renderCharts", true);
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.send(poststr);
  
   xmlhttp.onreadystatechange=function (){ 
   
     if (xmlhttp.readyState==4 && xmlhttp.status==200)
   {
    
    var jsonResponse=xmlhttp.responseText;
    
    var prcvinceJsons=eval("("+jsonResponse+")");
//  document.getElementById("test").innerHTML = prcvinceJsons;
    document.getElementById('pic').src = web_u+"/img/" +prcvinceJsons.img;
    //alert(prcvinceJsons.base64);
    }
  }
             
}

        //var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
       // var data = 'indicator=0,1,1,1,1,1';
        //xmlhttp.open("post", "http://192.168.20.121:3000/ajax/renderCharts");
        //xmlhttp.withCredentials = true;//放在 open 方法后面比较靠谱
        //xmlhttp.onload = function(res){
         //       var data = JSON.parse(res.currentTarget.response);
         //       alert(data.base64)
                //console.log(data.base64);
                //document.getElementById('img').src = data.base64;           

/*function ajax(){
    var web_url = 'http://192.168.20.121:3000';
     xmlhttp=new XMLHttpRequest(); 
       var get_url = "/ajax/getTime";
       getStr =web_url+get_url;  
       xmlhttp.open("get",getStr, true);
       xmlhttp.send(); 
     
     xmlhttp.onreadystatechange=function () {
       if (xmlhttp.readyState == 4&&xmlhttp.status == 200){
             jsonResponse = xmlhttp.responseText;
             prcvinceJsons = eval("(" + jsonResponse + ")");
             alert(prcvinceJsons.timeStamp);  //
            }
          }   
     }
*/