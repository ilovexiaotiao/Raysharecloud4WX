 function dis_confirm(){
 	var r = confirm("尚未绑定手机号，点击确认绑定!")
 	if(r==true){
 		window.location.href="self_phone_bind.html"
 	}
 }
 function keep(){
 	 	var r = confirm("是否保存？")
 	if(r==true){
 		alert("保存成功！");
 		
 	}
 }
function sub(){
	 	var r = confirm("是否上报？")
 	if(r==true){
 		alert("上报成功！");
 		window.location.href="all_application.html";
 	}
}
function revise(){
	alert("该任务已被锁定，无法修改!")
}
function attendenceSub(){
	 	var r = confirm("是否上报？")
 	if(r==true){
 		alert("上报成功！");
 		window.location.href="list_attendence.html";
 	}
}
function complainSub(){
	 	var r = confirm("是否上报？")
 	if(r==true){
 		alert("上报成功！");
 		window.location.href="list_complain.html";
 	}
}
function workSub(){
	 	var r = confirm("是否上报？")
 	if(r==true){
 		alert("上报成功！");
 		window.location.href="list_work.html";
 	}
}
function superviseSub(){
	 	var r = confirm("是否上报？")
 	if(r==true){
 		alert("上报成功！");
 		window.location.href="list_supervise.html";
 	}
}
      function today(){//构建方法
        var today=new Date();//new 出当前时间
        var h=today.getFullYear();//获取年
        var m=today.getMonth()+1;//获取月
        var d=today.getDate();//获取日
        var H = today.getHours();//获取时
        var M = today.getMinutes();//获取分
        var S = today.getSeconds();//获取秒
       //返回 年-月-日 时:分:秒
        document.getElementById("today").value=h+"-"+m+"-"+d+" "+H+":"+M+":"+S; //将获取到的 年-月-日 时:分:秒 赋给input文本输入框

}


