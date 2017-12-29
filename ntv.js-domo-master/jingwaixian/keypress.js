 
 function kpress(){                      //ntv.js下按键控制   *return false疑似无效

       set_listen_handle = function(keycode){
	   //document.getElementById('text1').innerHTML = keycode;
       switch(keycode)
            {
       
            case 1:
		    if(partnow==1){document.getElementById('a1').focus();return false;}
			if(partnow==2){document.getElementById('a2').focus();return false;}
			if(partnow==3){document.getElementById('a3').focus();return false;}
			if(partnow==4){document.getElementById('a4').focus();return false;}
            break;

		    case 2:
			if(partnow==1){document.getElementById('a1').focus();return false;}
			if(partnow==2){document.getElementById('a2').focus();return false;}
			if(partnow==3){document.getElementById('a3').focus();return false;}
			if(partnow==4){document.getElementById('a4').focus();return false;}
            break;
			
			
			case 3:
			if(partnow==1){document.getElementById('a1').focus();return false;}
			if(partnow==2){document.getElementById('a1').focus();return false;}
			if(partnow==3){document.getElementById('a2').focus();return false;}
			if(partnow==4){document.getElementById('a3').focus();return false;}
			break;
			
			case 4:			
			if(partnow==1){document.getElementById('a2').focus();return false;}
			if(partnow==2){document.getElementById('a3').focus();return false;}
			if(partnow==3){document.getElementById('a4').focus();return false;}
			if(partnow==4){document.getElementById('a4').focus();return false;}
			break;
			
		    }
 } 
}	  