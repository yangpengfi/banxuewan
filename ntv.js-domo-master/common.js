
    var jsonResponse;  //用于AJAX
    var prcvinceJsons;  //用于AJAX
    var urlid1=0;   //传递用参数
    var urlid2=0; 
    var urlid3=0; 
    var urlid4=0; 
    var urlid5=0; 
    var urlid6=0; 
    var urlid7=0; 


    //url数据解析函数
      //代码
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
     //使用方法
   /*
     var Request = new Object();
     Request = GetRequest();
     var 现页面变量名 = Request['url中变量名']
   */

   
//mac地址获取  现该功能移至
     //代码
   function getmac(){
      stbMac = network.ethernets[0].MACAddress;   
   }
   
//页面传递参数
   //代码
    function gourl(){
        var urlgogogo = urlgo +'?id1='+urlid1+'&id2='+urlid2+'&id3='+urlid3+'&id4='+urlid4+'&id5='+urlid5+'&id6='+urlid6+'&id7='+urlid7;
        urlgogogo=encodeURI(urlgogogo);
        window.location.href=urlgogogo;
       }
 
//数据库取值(GET)
     //代码
     function ajaxget(id){      //此处id用于对应不同的填充代码 具体填充代码见html同目录下ajax.js文件;
     xmlhttp=new XMLHttpRequest(); 
       getStr =web_url+get_url;  //使用前现声明变量get_url；web_url在文件env_info.js中设置,必要时可以重新声明
       xmlhttp.open("get",getStr, true);
       xmlhttp.send(); 
     
     xmlhttp.onreadystatechange=function () {
     //document.getElementById("test").innerHTML = xmlhttp.responseText;
       if (xmlhttp.readyState == 4&&xmlhttp.status == 200){
             jsonResponse = xmlhttp.responseText;
             prcvinceJsons = eval("(" + jsonResponse + ")");
            ajaxput(id);  //
            }
          }   
    }
    //具体   例 document.getElementById("list6nameshow").innerHTML=prcvinceJsons[0].building_name;
  //测试代码  用于测试与服务器的连接等问题
  function ajaxgettest(){    
     xmlhttp=new XMLHttpRequest(); 
       getStr =web_url+get_url;  //使用前现声明变量get_url；web_url在文件env_info.js中设置,必要时可以重新声明
     document.getElementById('text0').innerHTML = getStr;
       xmlhttp.open("get",getStr, true);
       xmlhttp.send(); 
     
     xmlhttp.onreadystatechange=function () {
    // if(xmlhttp.readyState==0){document.getElementById("test1").innerHTML = xmlhttp.readyState+&nbsp+'请求未初始化（还没有调用 ）'}
   //  if(xmlhttp.readyState==1){document.getElementById("test1").innerHTML = xmlhttp.readyState+&nbsp+'请求已经建立，但是还没有发送（还没有调用 ）'}
    // if(xmlhttp.readyState==2){document.getElementById("test1").innerHTML = xmlhttp.readyState+&nbsp+'请求已发送，正在处理中'}
    // if(xmlhttp.readyState==3){document.getElementById("test1").innerHTML = xmlhttp.readyState+&nbsp+'请求在处理中；通常响应中已有部分数据可用了，但是服务器还没有完成响应的生成。）'} 
    // if(xmlhttp.readyState==4){document.getElementById("test1").innerHTML = xmlhttp.readyState+&nbsp+'响应已完成；您可以获取并使用服务器的响应了'}
     
    // if(xmlhttp.status==100){document.getElementById("test2").innerHTML = xmlhttp.status+&nbsp+'客户必须继续发出请求 '}
    // if(xmlhttp.status==200){document.getElementById("test2").innerHTML = xmlhttp.status+&nbsp+'请求成功'}
    // if(xmlhttp.status==300){document.getElementById("test2").innerHTML = xmlhttp.status+&nbsp+'请求的资源可在多处得到'}
    // if(xmlhttp.status==400){document.getElementById("test2").innerHTML = xmlhttp.status+&nbsp+'错误请求，如语法错误'} 
    // if(xmlhttp.status==500){document.getElementById("test2").innerHTML = xmlhttp.status+&nbsp+'服务器内部错误'}
     document.getElementById("text1").innerHTML = xmlhttp.readyState;
     document.getElementById("text2").innerHTML = xmlhttp.status;
     document.getElementById("text3").innerHTML = xmlhttp.responseText;
       
     if (xmlhttp.readyState == 4&&xmlhttp.status == 200){
             jsonResponse = xmlhttp.responseText;
             prcvinceJsons = eval("(" + jsonResponse + ")");
            }
          }   
    }
   //测试代码食用方法:
    // 添加下面
     /*<div  style="position:absolute;width:813px;height:80px;top:105px; left:40px;font-size:24px;line-height:20px;z-index:999;text-align:left;color:#ffffff;">
        getStr:<span id="text0"></span></br>
      xmlhttp.readyState:<span id="text1"></span></br>
      xmlhttp.status:<span id="text2"></span> </br>
      xmlhttp.responseText:<span id="text3"></span> </br>
     </div>   
    */
  

//焦点切换代码<a> 需注意:当页面中同时存在<a>及<input>
    //方法一:外发光与图片分离 通过控制外发光图片的display来实现
     //onmouseover/onfocus
       function overdisplay(id){
       document.getElementById(id).style.display = 'block';   
       }  
  
      //onmouseout/onblur
    function outdisplay(id){
       document.getElementById(id).style.display = 'none';
       }  
  
    //方法二:外发光与按钮坐在一张图中 通过更改img的src来实现 使用前现声明图片地址bgsrc
    //onmouseover/onfocus
       function oversrc(){
       document.getElementById(bgid).src = bgsrc;
       }

       
      function accessRecord(pageAddr){
        xmlhttp=new XMLHttpRequest(); 
        //var poststr = "deviceType=TV&deviceToken=1";
        xmlhttp.open("post", "http://10.27.107.19:8888/dfzf.api_logs", true);
        //xmlhttp.open("post", "http://192.168.200.32:8888/dfzf.api_logs", true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        //xmlhttp.send(postStr);

        // var tempTest = {
        //   "timestamp": "2016-01-21 12:12:12",
        //   "userId": stbMac,//"9843ODce88",
        //   "deviceType": "TV",
        //   "deviceToken":"",
        //   "action":pageAddr,
        //   "raw_data":null
        // };
        //var usent = JSON.stringify(tempTest);
        //xmlhttp.send('json={ \"timestamp\":\"2016-01-21 12:12:12\", \"deviceToken\":null,\"deviceType\":\"TV\", \"userId\":\"'+stbMac+'\", \"action\":\"'+pageAddr+'\",\"raw_data\":null}');
      }
       
    //onmouseout/onblur    
      // function outsrc(){
       //document.getElementById(bgid).src = bgsrc;
       //}  
      
     /* function dizhi(){
     stbMac = '98-bc-57-06-28-b9';//network.ethernets[0].MACAddress; 
       var Mac = stbMac.split("-");
       var num1 = "";
     for (i=0;i<Mac.length ;i++ ) 
     { 
     turemac = num1+=Mac[i];
     } 
     document.getElementById('text4').innerHTML = turemac;
    xmlhttp=new XMLHttpRequest(); 
   // var mmdz = "http://192.168.200.103:8880/RemoteBackend/bill/getBillAcct?userId=1&mac=";
   var mmdz = "http://219.233.47.225:8880/RemoteBackend/bill/getBillAcct?userId=1&mac=";
   //var mmdz = "http://219.233.175.88:8801/RemoteBackend/bill/getBillAcct?userId=1&mac=98bc570628b9";
    var getStr0 = mmdz+turemac;
    document.getElementById('text3').innerHTML = getStr0; 
    xmlhttp.open("get",getStr0, true);  
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send();
   
   xmlhttp.onreadystatechange=function (){ 
    setTimeout("dizhierror();",4000);
    document.getElementById('text0').innerHTML = xmlhttp.readyState+""+xmlhttp.status;  
    if (xmlhttp.readyState==4 && xmlhttp.status==200){
    var jsonResponse=xmlhttp.responseText;
    var prcvinceJsons=eval("("+jsonResponse+")");
      document.getElementById('text1').innerHTML = prcvinceJsons.data;
      if(prcvinceJsons.data=='null'){
         dizhierror();
      }
      else{
       
         var regExp = new RegExp('.+苑|小区|公寓|号|弄|村');
         prcvinceJsons.data.address.match(regExp);  
         var right=RegExp.rightContext;
       var left=RegExp.leftContext;
       var ooo = RegExp.lastContext;
       var right1=right.replace(/[0-9]|[a-zA-Z]|[_]/g,"*");
         var addressnew = prcvinceJsons.data.address.replace(right,right1);
     document.getElementById("input_address").value = addressnew; 
     document.getElementById('div_address').innerHTML = addressnew;
     document.getElementById('input_phonenum').focus();
    }
  }
   if (xmlhttp.readyState==4 && xmlhttp.status==0){
      dizhierror()
   }
   
   }
}
   function dizhierror(){
      if(addressnow==0){
        document.getElementById("input_address").value='请输入您的家庭地址';
        document.getElementById('div_address').innerHTML = '请输入您的家庭地址';
        document.getElementById('input_address').style.display='block';
        document.getElementById('div_address').style.display='none';
        document.getElementById('input_address').focus();
        addressnow=1;
      }
      else{}
   }
*/
