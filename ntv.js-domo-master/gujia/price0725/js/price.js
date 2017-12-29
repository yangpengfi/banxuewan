var partnow;  //用于识别现在位置
var pagenow =1;  //用于识别现在页面
var residence_id;
var pass1 = false; //用于标记第一部分是否已选
var property_type_id; //小区类型
var pass2 = false;
var room_num;
var pass3 = false;
var property_area;
var pass4 = false;
var place_floor;
var total_floor;
var pass5 = false;
var input1;
var input2;
var input3;
var input4;
var input5;
var input6;
var planeType;
//var web_url1 = "http://10.27.97.219"
var web_url1 = web_url;
//console.log(web_url);
window.onload = function(){
	press();
    var Request = new Object();
    Request = GetRequest();
    residence_id = decodeURI(Request['residence_id']);
	document.getElementById('a11').focus();
//	console.log(web_url1)
}



function fo(id){   //聚焦动作
	partnow = id;
    if(id==11){
    	document.getElementById("part1_f").style.display="block";
    	document.getElementById("part1_f").style.left="190px";
    } 
    if(id==12){
    	document.getElementById("part1_f").style.display="block";
    	document.getElementById("part1_f").style.left="388px";
    } 
    if(id==13){
    	document.getElementById("part1_f").style.display="block";
    	document.getElementById("part1_f").style.left="586px";
    } 
    if(id==14){
    	document.getElementById("part1_f").style.display="block";
    	document.getElementById("part1_f").style.left="784px";
    } 
    if(id==15){
    	document.getElementById("part1_next").src="img/next_f.png";
    } 
    if(id==21){
    	document.getElementById("part2_img1").src="img/input_f.png";
    } 
    if(id==22){
    	document.getElementById("part2_img2").src="img/input_f.png";
    }
    if(id==23){
    	document.getElementById("part2_img3").src="img/input_f.png";
    } 
    if(id==24){
    	document.getElementById("part2_previous").src="img/previous_f.png";
    } 
    if(id==25){
    	document.getElementById("part2_next").src="img/next_f.png";
    } 
    if(id==31){
    	document.getElementById("part3_img").src="img/input_f.png";
    } 
    if(id==32){
    	document.getElementById("part3_previous").src="img/previous_f.png";
    } 
    if(id==33){
    	document.getElementById("part3_next").src="img/next_f.png";
    } 
    if(id==41){
    	document.getElementById("part4_img1").src="img/input_f.png";
    } 
    if(id==42){
    	document.getElementById("part4_img2").src="img/input_f.png";
    } 
    if(id==43){
    	document.getElementById("part4_previous").src="img/previous_f.png";
    } 
    if(id==44){
    	document.getElementById("part4_next").src="img/next_f.png";
    } 
    if(id==51){
    	document.getElementById("part5_f").style.display="block";
    	document.getElementById("part5_f").style.left="230px";
    } 
    if(id==52){
    	document.getElementById("part5_f").style.display="block";
    	document.getElementById("part5_f").style.left="405px";
    } 
    if(id==53){
      document.getElementById("part5_f").style.display="block";
      document.getElementById("part5_f").style.left="580px";
    } 
    if(id==54){
      document.getElementById("part5_f").style.display="block";
      document.getElementById("part5_f").style.left="755px";
    } 
    if(id==55){
    	document.getElementById("part5_previous").src="img/previous_f.png";
    } 
    if(id==56){
    	document.getElementById("part5_next").src="img/submit_f.png";
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
    if(id==11){
    	document.getElementById("part1_f").style.display="none";
    } 
    if(id==12){
    	document.getElementById("part1_f").style.display="none";
    } 
    if(id==13){
    	document.getElementById("part1_f").style.display="none";
    } 
    if(id==14){
    	document.getElementById("part1_f").style.display="none";
    } 
    if(id==15){
    	document.getElementById("part1_next").src="img/next_n.png";
    } 
    if(id==21){
    	document.getElementById("part2_img1").src="img/input_n.png";
    } 
    if(id==22){
    	document.getElementById("part2_img2").src="img/input_n.png";
    }
    if(id==23){
    	document.getElementById("part2_img3").src="img/input_n.png";
    } 
    if(id==24){
    	document.getElementById("part2_previous").src="img/previous_n.png";
    } 
    if(id==25){
    	if(pass2){
    	document.getElementById("part2_next").src="img/next_n.png";
    	}
    	else{document.getElementById("part2_next").src="img/next_d.png";}
    } 
    if(id==31){
    	document.getElementById("part3_img").src="img/input_n.png";
    } 
    if(id==32){
    	document.getElementById("part3_previous").src="img/previous_n.png";
    } 
    if(id==33){
    	if(pass3){
    	document.getElementById("part3_next").src="img/next_n.png";
    	}
    	else{document.getElementById("part3_next").src="img/next_d.png";}
    } 
    if(id==41){
    	document.getElementById("part4_img1").src="img/input_n.png";
    } 
    if(id==42){
    	document.getElementById("part4_img2").src="img/input_n.png";
    } 
    if(id==43){
    	document.getElementById("part4_previous").src="img/previous_n.png";
    } 
    if(id==44){
    	if(pass4){
    	document.getElementById("part4_next").src="img/next_n.png";
    	}
    	else{document.getElementById("part4_next").src="img/next_d.png";}
    } 
    if(id==51){
    	document.getElementById("part5_f").style.display="none";
    } 
    if(id==52){
    	document.getElementById("part5_f").style.display="none";
    } 
    if(id==53){
      document.getElementById("part5_f").style.display="none";
    } 
    if(id==54){
      document.getElementById("part5_f").style.display="none";
    } 
    if(id==55){
    	document.getElementById("part5_previous").src="img/previous_n.png";
    } 
    if(id==56){
    	if(pass5){
    	document.getElementById("part5_next").src="img/submit_n.png";
    	}
    	else{document.getElementById("part5_next").src="img/submit_d.png";}
    } 
     if(id==100){
    	document.getElementById("iab_f").style.display="none";
    } 
    if(id==101){
    	document.getElementById("iab_f").style.display="none";
    } 
}

function part1c(id){
	pass1 = true;
	for(var i=1;i<5;i++){
		var part1num = 'part1_'+i;
		document.getElementById(part1num).style.color = '#ffffff';
	}
	var part1now = 'part1_'+id;
	document.getElementById(part1now).style.color = '#fe8f00';
    property_type_id = id;
    document.getElementById('record1').innerHTML = document.getElementById(part1now).innerHTML;
    document.getElementById('part1_next').src = 'img/next_n.png';

}

function part5c(id){
	pass5 = true;
	for(var i=1;i<5;i++){
		var part5num = 'part5_'+i;
		document.getElementById(part5num).style.color = '#ffffff';
	}
	var part5now = 'part5_'+id;
	document.getElementById(part5now).style.color = '#fe8f00';
    document.getElementById('record5').innerHTML = document.getElementById(part5now).innerHTML;
    document.getElementById('part5_next').src = 'img/submit_n.png';
    planeType = id;
}

function inpu(id){
	input1 = document.getElementById('part2_input1');
	input2 = document.getElementById('part2_input2');
	input3 = document.getElementById('part2_input3');
	input4 = document.getElementById('part3_input');
	input5 = document.getElementById('part4_input1');
	input6 = document.getElementById('part4_input2');
	if(id==21){document.getElementById('record2').getElementsByTagName('span')[0].innerHTML = input1.value;room_num = input1.value;}
	if(id==22){document.getElementById('record2').getElementsByTagName('span')[1].innerHTML = input2.value}
	if(id==23){document.getElementById('record2').getElementsByTagName('span')[2].innerHTML = input3.value}
    if(id==31){document.getElementById('record3').getElementsByTagName('span')[0].innerHTML = input4.value;property_area = input4.value;}
    if(id==41){document.getElementById('record4').getElementsByTagName('span')[0].innerHTML = input5.value;place_floor = input5.value;}
    if(id==42){document.getElementById('record4').getElementsByTagName('span')[1].innerHTML = input6.value;total_floor = input6.value;}
	if(input1.value==''||input2.value==''||input3.value==''){
       pass2 = false;
       document.getElementById('part2_next').src = 'img/next_d.png';
	}
	else{
	   pass2 = true;
       document.getElementById('part2_next').src = 'img/next_n.png'; 
	}
	if(input4.value==''){
       pass3 = false;
       document.getElementById('part3_next').src = 'img/next_d.png';
	}
	else{
	   pass3 = true;
       document.getElementById('part3_next').src = 'img/next_n.png'; 
	}
	if(input5.value==''||input6.value==''){
       pass4 = false;
       document.getElementById("part4_info").style.display = "none";
       document.getElementById('part4_next').src = 'img/next_d.png';
	}
	
	else{
		//alert(input5.value-input6.value);
	   if(input5.value-input6.value>0){
//	   	alert("123")
	   document.getElementById("part4_info").style.display = "block";
	   
       pass4 = false;
       document.getElementById('part4_next').src = 'img/next_d.png';
	   }
	   else{
	   	document.getElementById("part4_info").style.display = "none";
	   pass4 = true;
       document.getElementById('part4_next').src = 'img/next_n.png';
       } 
	}
}

function nextpage(id){
    for(var i=1;i<6;i++){
       var pagenum = 'part'+i;
       document.getElementById(pagenum).style.display = 'none';
    }
    pagenow = id;
    var pageshow = 'part'+id;
    document.getElementById(pageshow).style.display = 'block';
    if(id==2){
    	
    	if(pass2){document.getElementById('a25').focus();}
    	else{document.getElementById('part2_input1').focus();}
    }
    if(id==3){
    	
    	if(pass3){document.getElementById('a33').focus();}
    	else{document.getElementById('part3_input').focus();}
    }
    if(id==4){
    	//alert(pass4);
   
    	if(pass4){document.getElementById('a44').focus();}
    	else{document.getElementById('part4_input1').focus();}
    }
     if(id==5){
    	if(pass5){document.getElementById('a54').focus();}
    	else{document.getElementById('a51').focus();}
    }
}

function prevpage(id){
    for(var i=1;i<6;i++){
       var pagenum = 'part'+i;
       document.getElementById(pagenum).style.display = 'none';
    }
    pagenow = id;
    var pageshow = 'part'+id;
    document.getElementById(pageshow).style.display = 'block';
    if(id==1){
    	if(pass1){document.getElementById('a15').focus();}
    	else{document.getElementById('a11').focus();}
    }
    if(id==2){
    	document.getElementById('a24').focus();
    }
    if(id==3){
    	document.getElementById('a32').focus();
    }
     if(id==4){
    	document.getElementById('a43').focus();
    }
}

     
function gujia(){
       var getStr = web_url1+"/api/sellHouse/assess?accessToken=8b4088ab78204ba4bcd0b5367683330e";
       postw = "residence_id="+residence_id+"&room_num="+room_num+"&property_type_id="+property_type_id+'&property_area='+property_area+'&place_floor='+place_floor+'&total_floor='+total_floor+'&planeType='+planeType;
//       alert(postw);
       xmlhttp=new XMLHttpRequest(); 
       postStr = getStr;  //使用前现声明变量get_url；web_url在文件env_info.js中设置,必要时可以重新声明
       xmlhttp.open("post",postStr, true);
       xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
       xmlhttp.send(postw); 
       xmlhttp.onreadystatechange=function () {
       	
	       if (xmlhttp.readyState == 4){
	       		if(xmlhttp.status == 200){
	            	jsonResponse = xmlhttp.responseText;
	//         alert(jsonResponse);
				if(jsonResponse==null){
	              		document.getElementById('errorimg').style.display = 'block';
	              		document.getElementById('errora').style.display = 'block';
	              		document.getElementById('errora').focus();
	            	}else{
	            		prcvinceJsons = eval("(" + jsonResponse + ")");
	//         alert(prcvinceJsons.assTotalPrice);
	            	if(prcvinceJsons.assTotalPrice==null){
	              		document.getElementById('errorimg').style.display = 'block';
	              		document.getElementById('errora').style.display = 'block';
	              		document.getElementById('errora').focus();
	            	}else{
	//           	alert("redirect...");
	             		window.location.href = "../result/index.html?price="+prcvinceJsons.assTotalPrice+'&id='+residence_id;
	            	}
	            	}
	            	
	
	            }else{
	       			document.getElementById('errorimg').style.display = 'block';
	              	document.getElementById('errora').style.display = 'block';
	              	document.getElementById('errora').focus();
       			}
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

function press(){
//             document.onkeypress = grabEvent1;
             document.onirkeypress = grabEvent1;  
			       document.onkeydown = grabEvent1;
             function grabEvent1(event){
	         var val = event || window.event || arguments.callee.caller.arguments[0];
	         switch(val.keyCode){	
	           case 1:
             case 38://shang
             if(partnow==11){document.getElementById('back').focus();return false;}  
             if(partnow==12){document.getElementById('back').focus();return false;}
             if(partnow==13){document.getElementById('back').focus();return false;}  
             if(partnow==14){document.getElementById('back').focus();return false;} 
             if(partnow==15){document.getElementById('a11').focus();return false;} 
             if(partnow==21){document.getElementById('back').focus();return false;}  
             if(partnow==22){document.getElementById('back').focus();return false;}
             if(partnow==23){document.getElementById('back').focus();return false;} 
             if(partnow==24){document.getElementById('part2_input1').focus();return false;}
             if(partnow==25){document.getElementById('part2_input1').focus();return false;} 
             if(partnow==31){document.getElementById('back').focus();return false;}  
             if(partnow==32){document.getElementById('part3_input').focus();return false;}
             if(partnow==33){document.getElementById('part3_input').focus();return false;}
             if(partnow==41){document.getElementById('back').focus();return false;}  
             if(partnow==42){document.getElementById('back').focus();return false;}  
             if(partnow==43){document.getElementById('part4_input1').focus();return false;}
             if(partnow==44){document.getElementById('part4_input1').focus();return false;}  
             if(partnow==51){document.getElementById('back').focus();return false;}  
             if(partnow==52){document.getElementById('back').focus();return false;} 
             if(partnow==53){document.getElementById('back').focus();return false;}  
             if(partnow==54){document.getElementById('back').focus();return false;}   
             if(partnow==55){document.getElementById('a51').focus();return false;}
             if(partnow==56){document.getElementById('a53').focus();return false;}  
             if(partnow==100){return false;}  
             if(partnow==101){return false;} 
         break;
         
         case 2:
         case 40: //xia
         if(partnow==11){
                      if(pass1){document.getElementById('a15').focus();return false;}
                      else{return false;}
         }  
             if(partnow==12){
                if(pass1){document.getElementById('a15').focus();return false;}
                      else{return false;}
             }
             if(partnow==13){
                if(pass1){document.getElementById('a15').focus();return false;}
                      else{return false;}
             }  
             if(partnow==14){
                if(pass1){document.getElementById('a15').focus();return false;}
                      else{return false;}
             }
             if(partnow==15){
                      return false;
             }
             if(partnow==21){
              if(pass2){document.getElementById('a25').focus();return false;}
              else{document.getElementById('a24').focus();return false;}
             }  
             if(partnow==22){
              if(pass2){document.getElementById('a25').focus();return false;}
              else{document.getElementById('a24').focus();return false;}
             }
             if(partnow==23){
              if(pass2){document.getElementById('a25').focus();return false;}
              else{document.getElementById('a24').focus();return false;}
             } 
             if(partnow==24){return false;}
             if(partnow==25){return false;}
             if(partnow==31){
              if(pass3){document.getElementById('a33').focus();return false;}
              else{document.getElementById('a32').focus();return false;}
             } 
             if(partnow==32){return false;}
             if(partnow==33){return false;}
             if(partnow==41){
              if(pass4){document.getElementById('a44').focus();return false;}
              else{document.getElementById('a43').focus();return false;}
             } 
             if(partnow==42){
              if(pass4){document.getElementById('a44').focus();return false;}
              else{document.getElementById('a43').focus();return false;}
             } 
             if(partnow==43){return false;}
             if(partnow==44){return false;}
             if(partnow==51){
              if(pass5){document.getElementById('a56').focus();return false;}
              else{document.getElementById('a55').focus();return false;}
             } 
             if(partnow==52){
              if(pass5){document.getElementById('a56').focus();return false;}
              else{document.getElementById('a55').focus();return false;}
             } 
             if(partnow==53){
              if(pass5){document.getElementById('a56').focus();return false;}
              else{document.getElementById('a55').focus();return false;}
             } 
             if(partnow==54){
              if(pass5){document.getElementById('a56').focus();return false;}
              else{document.getElementById('a55').focus();return false;}
             } 
             if(partnow==55){return false;}
             if(partnow==56){return false;}
             if(partnow==100){
               if(pagenow==1){document.getElementById('a11').focus();return false;}
               if(pagenow==2){document.getElementById('part2_input1').focus();return false;}
               if(pagenow==3){document.getElementById('part3_input').focus();return false;}
               if(pagenow==4){document.getElementById('part4_input1').focus();return false;}
               if(pagenow==5){document.getElementById('a51').focus();return false;}
             }  
             if(partnow==101){
              if(pagenow==1){document.getElementById('a11').focus();return false;}
              if(pagenow==2){document.getElementById('part2_input1').focus();return false;}
              if(pagenow==3){document.getElementById('part3_input').focus();return false;}
              if(pagenow==4){document.getElementById('part4_input1').focus();return false;}
              if(pagenow==5){document.getElementById('a51').focus();return false;}
             } 
               break;
         
         case 3:
         case 37://zuo
         	if(partnow==100){document.getElementById('back').focus();return false;}
             if(partnow==101){document.getElementById('index').focus();return false;}
         break;
         
         case 4:
         case 39://you
         if(partnow==11){document.getElementById('a12').focus();return false;}  
             if(partnow==12){document.getElementById('a13').focus();return false;}
             if(partnow==13){document.getElementById('a14').focus();return false;}  
             if(partnow==14){return false;} 
             if(partnow==15){return false;} 
             if(partnow==21){document.getElementById('part2_input2').focus();return false;}  
             if(partnow==22){document.getElementById('part2_input3').focus();return false;}
             if(partnow==23){return false;}
             if(partnow==24){
              if(pass2){document.getElementById('a25').focus();return false;}
              else{return false;}
             }
             if(partnow==25){return false;}  
             if(partnow==31){return false;}  
             if(partnow==32){
              if(pass3){document.getElementById('a33').focus();return false;}
              else{return false;}
             }
             if(partnow==33){return false;} 
             if(partnow==41){document.getElementById('part4_input2').focus();return false;}
             if(partnow==42){return false;}  
             if(partnow==43){
              if(pass4){document.getElementById('a44').focus();return false;}
              else{return false;}
             }
             if(partnow==44){return false;} 
             if(partnow==51){document.getElementById('a52').focus();return false;}
             if(partnow==52){document.getElementById('a53').focus();return false;}
             if(partnow==53){document.getElementById('a54').focus();return false;}
             if(partnow==54){return false;}  
             if(partnow==55){
              if(pass5){document.getElementById('a56').focus();return false;}
              else{return false;}
             }
             if(partnow==56){return false;} 
             if(partnow==100){document.getElementById('back').focus();return false;}  
             if(partnow==101){return false;} 
               break;
            
              
      case 340:  //返回
      case 4096:
    history.go(-1);
      break;
      
      case 13:   //确定     
      break;
    	
    
          
      }			
      }

  
}