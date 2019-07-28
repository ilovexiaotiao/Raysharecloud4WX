//任务和巡查二维码上报逻辑

function getQueryString_report(name) {
	
	var uri = window.location.search;
//	alert(uri);
	var urichange = "";
	urichange = uri.replace("%3D","=").replace("%3D","=").replace("&amp;", "&").replace("%2526", "&").replace("%26", "&").replace("qrresult=","");
//	alert(urichange);
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	urichange = urichange.substr(1).match(reg);
//	alert(urichange);
	urichange = urichange[2];
//	alert(urichange);
	return urichange;

}

function getCurrentDate_report(format) {
	var now = new Date();
	var year = now.getFullYear(); //得到年份
	var month = now.getMonth(); //得到月份
	var date = now.getDate(); //得到日期
	var day = now.getDay(); //得到周几
	var hour = now.getHours(); //得到小时
	var minu = now.getMinutes(); //得到分钟
	var sec = now.getSeconds(); //得到秒
	month = month + 1;
	if(month < 10) month = "0" + month;
	if(date < 10) date = "0" + date;
	if(hour < 10) hour = "0" + hour;
	if(minu < 10) minu = "0" + minu;
	if(sec < 10) sec = "0" + sec;
	var time = "";
	//精确到天
	if(format == 1) {
		time = year + "-" + month + "-" + date;
	}
	//精确到分
	else if(format == 2) {
		time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
	}
	return time;
};

function autofill_report() {
	var gongwei = getQueryString_report('gwbh');
//	alert(gongwei)
	//			var shijian=getCurrentDate(2);;
	var xiangmu = getQueryString_report("xmbh");
//	alert(xiangmu);
//	var yuangong = getQueryString_report('ygbh');
	//		    var pic=getQueryString('PIC')
	//		    var route="{{ url_for('uploaded_file', filename=cookiename) }}"+pic;
	//		    var getnickname=Octal2Chinese(getCookie("nickname"));
	//		    alert(getnickname);
	// alert(shijian);
	// alert(document.getElementById("Txt_1"));
	//alert(document.getElementById("Txt_3"));
	// alert(pic);
	//		    alert(route);
	document.getElementById("xm").value = xiangmu;
//	alert("ok");
	//		    document.getElementById("Txt_2").value=shijian;
	document.getElementById("gw").value = gongwei;
//	document.getElementById("yg").value = yuangong;
	//			document.getElementById("img_area").innerHTML =  '<img src="'+route+'" width=100% height="400" alt=""/>';
}

function Octal2Chinese(str) {
	const matches = str.match(/(\\\d{3}){3}/g);
	if(matches) matches.forEach(match => {
		let encoded = '';
		const splits = match.split('\\');
		splits.forEach(code => !code || (encoded += '%' + parseInt(code, 8).toString(16)));
		const cChar = decodeURI(encoded);
		str = str.replace(match, cChar);
	});
	return str;
}