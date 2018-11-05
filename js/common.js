/**
 * Created by Nicholas on 2018/10/8.
 * Nicholas Shan
 */
/*last updated in 2018/10/8*/

// Part1.弹窗类函数
// 技术选型：jquery框体
// 涉及功能：图片上传、图片查看
// 涉及页面：工作上报页（gzsb）、发起投诉页（complain）、稽查上报页（check）

/*若当前页没有设置弹窗属性，则默认如下属性*/
function Layer(options) {

	this.config = {
		layerBoxClass: "layerBox",
		layerclass: "",
		width: 100,
		height: 200,
		left: 0,
		top: 80,
		zIndex: 1000,
		alerttit: "信息",
		setOverflow: "overflow-y:scroll",
		callback: function() {}
	}
	$.extend(this.config, options);

}

/*创建弹出框*/
Layer.prototype = {

	//生成弹窗div的html代码，包含两个不同的input
	_createDialog: function(state) {
		var that = this;
		var str = "";
		that.config.zIndex++;
		var s = UDP.Public.view();
		str = '<div class="overlay" style="z-index:' + that.config.zIndex + ' ;position:fixed;">' +
			'<div class="animated zoomIn ' + that.config.layerBoxClass + '" style = "width:' + this.config.width + '%;height:' +
			this.config.height + 'px;">' +
			'<h4 class="layerHeader">' + this.config.alerttit + '<a href="javascript:;" class="close_btn"></a></h4>' +
			'<div class="layerContianer ' + this.config.layerclass + '" style="' + this.config.setOverflow + '">' +
			'<button id="add" class="button_pass" onclick="getlocal()">本地图片</button>' +
			'<button id="add1" class="button_pass" onclick="getcamera()">拍摄照片</button> ' +
			'<span class="layer-size"></span></div></div>';
		//添加到body
		$("body").append(str);
		//关闭弹窗
		$(".close_btn").click(function() {
			that.delDialog($(this));
		});
		//确定弹窗class"overlay"的left和top属性
		$("." + that.config.layerBoxClass).eq($(".overlay").size() - 1).css({
			left: (s.w - s.w) / 2 + "%",
			top: (s.h2 * 0.75) + "px",
		});
		if(that.config.callback) {
			that.config.callback.apply(this, []);
		}
		return str;
	},

	/*移除弹框*/
	delDialog: function(ele) {
		$(ele).parents(".overlay").remove();
	},

	/*手动调整弹框大小*/
	revampSize: function() {
		var that = this;
		var s = UDP.Public.view();
		$(".layer-size").mousedown(function(e) {
			var theme = this;
			var moveEle = $(theme).parents("." + that.config.layerBoxClass);
			var x = e.clientX - moveEle.width();
			var y = e.clientY - moveEle.height();
			$(document).mousemove(function(e) {
				var width = e.clientX - x + "px";
				var height = e.clientY - y + "px";
				width = width < 0 ? 0 : width;
				width = width > s.w ? s.w : width;
				height = height < 0 ? 0 : height;
				height = height > s.h ? s.h : height;
				moveEle.css({
					width: width,
					height: height
				});
			});
			$(document).mouseup(function() {
				$(document).unbind("mousemove");
			});
		});
	},

	//显示弹窗
	show: function() {
		this._createDialog();
		this.revampSize();
	}
};

//捕捉当前屏幕宽度与高度
(function(win) {
	if(win["UDP"]) {
		win["UDP"].Layer = Layer;
	} else {
		win.UDP = {
			Layer: Layer
		};
	}
})(window);

//提交Form表单后，弹出弹窗
function checkPhone() {
	alert("上报成功!");
	window.location.href = "../../index.html";
}

function checkPhone1() {
	alert("投诉成功!");
	window.location.href = "../../index.html";
}

function checkPhone2() {
	alert("提交成功!");
	window.location.href = "list_attendence.html";
}

// Part2.图片类函数
// 技术选型：js
// 涉及功能：多图片上传、图片查看、图片缩放、获取相机
// 涉及页面：工作上报页（gzsb）、发起投诉页（complain）、稽查上报页（check）

//初始化，获得手机类型，唤起监听器以及设定图片变量，需在页面加载完成后执行
function start() {
	var result;
	var dataArr = []; // 储存所选图片的结果(文件名和base64数据)  
	var fd; //FormData方式发送请求		
	//判断是否支持H5监听对象		
	if(typeof FileReader == 'undefined') {
		alert("抱歉，你的浏览器不支持 FileReader");
		input.setAttribute('disabled', 'disabled');
	} else {
		document.getElementById("file_input").removeEventListener('change', readFile); //防止重复监听
		document.getElementById("file_input1").removeEventListener('change', readFile); //防止重复监听
		document.getElementById("file_input").addEventListener('change', readFile);
		document.getElementById("file_input1").addEventListener('change', readFile);

	}

	//读取图片文件
	function readFile() {
		fd = new FormData();
		var iLen = this.files.length; //选取图片的数量
		var index = 0;
		for(var i = 0; i < iLen; i++) {
			//             if (!input['value'].match(/.jpg|.gif|.png|.jpeg|.bmp/i)){　　//判断上传文件格式    
			//                 return alert("上传的图片格式不正确，请重新选择");    
			//             }  
			var reader = new FileReader();
			reader.index = i;
			fd.append(i, this.files[i]);
			reader.readAsDataURL(this.files[i]); //转成base64    
			reader.fileName = this.files[i].name;

			//回显图片
			reader.onload = function(e) {
				var imgMsg = {
					name: this.fileName, //获取文件名    
					base64: this.result //reader.readAsDataURL方法执行完后，base64数据储存在reader.result里    
				}
				dataArr.push(imgMsg);
				result = '<div class="delete">delete</div><div class="result"><img src="' + this.result + '" alt=""/></div>';
				var div = document.createElement('div');
				div.innerHTML = result;
				div['className'] = 'float';
				div['index'] = index;
				document.getElementsByTagName('body')[0].appendChild(div); //插入dom树    
				var img = div.getElementsByTagName('img')[0];
				img.onload = function() {
					var nowHeight = ReSizePic(this); //设置图片大小    
					this.parentNode.style.display = 'block';
					var oParent = this.parentNode;
					if(nowHeight) {
						oParent.style.paddingTop = (oParent.offsetHeight - nowHeight) / 2 + 'px';
					}
				}

				//删除图片
				div.onclick = function() {
					this.remove(); // 在页面中删除该图片元素  
					delete dataArr[this.index]; // 删除dataArr对应的数据  

				}
				index++; //计数加一
			}
		}
	}
}

//发送图片到后台，暂无后台交互，技术选型Ajax
function send() {
	var submitArr = [];
	for(var i = 0; i < dataArr.length; i++) {
		if(dataArr[i]) {
			submitArr.push(dataArr[i]);
		}
	}
	// console.log('提交的数据：'+JSON.stringify(submitArr)) 
	$.ajax({
		url: 'http://123.206.89.242:9999',
		type: 'post',
		data: JSON.stringify(submitArr),
		dataType: 'json',
		//processData: false,   用FormData传fd时需有这两项    
		//contentType: false,    
		success: function(data) {
			console.log('返回的数据：' + JSON.stringify(data))
		}

	})
}

//缩放图片
function ReSizePic(ThisPic) {
	var RePicWidth = 200; //这里修改为您想显示的宽度值    

	var TrueWidth = ThisPic.width; //图片实际宽度    
	var TrueHeight = ThisPic.height; //图片实际高度    

	if(TrueWidth > TrueHeight) {
		//宽大于高    
		var reWidth = RePicWidth;
		ThisPic.width = reWidth;
		//垂直居中    
		var nowHeight = TrueHeight * (reWidth / TrueWidth);
		return nowHeight; //将图片修改后的高度返回，供垂直居中用    
	} else {
		//宽小于高    
		var reHeight = RePicWidth;
		ThisPic.height = reHeight;
	}
}

function showPicture(imgFile) {
	/*获取上传文件的路径，并赋给img标签*/
	a = window.URL.createObjectURL(imgFile.files[0]);

	return a;
}

function look() {
	document.getElementById("newImage").src = a;

}


// Part3.移动端函数
// 技术选型：js
// 涉及功能：多图片上传、获取相机
// 涉及页面：工作上报页（gzsb）、发起投诉页（complain）、稽查上报页（check）

//点击按钮，判断是否为Android,如果是弹出弹窗
function show_btn() {
	var pattern_phone = new RegExp("iphone", "i");
	var pattern_android = new RegExp("Android", "i");
	var userAgent = navigator.userAgent.toLowerCase();
	var isAndroid = pattern_android.test(userAgent);
	var isIphone = pattern_phone.test(userAgent);

	//若为Android，需要执行的动作
	if(isAndroid) {
		//capture="camera"
		layer.show();

		//alert("a");
	} else {
		getlocal();

	}
};

function getPhoneType() {
	//正则,忽略大小写

	var pattern_phone = new RegExp("iphone", "i");
	var pattern_android = new RegExp("Android", "i");
	var userAgent = navigator.userAgent.toLowerCase();
	var isAndroid = pattern_android.test(userAgent);
	var isIphone = pattern_phone.test(userAgent);
}

function showPicture(imgFile) {
	/*获取上传文件的路径，并赋给img标签*/
	document.getElementById("newImage").src = window.URL.createObjectURL(imgFile.files[0]);
}

function showPicture1(imgFile) {
	/*获取上传文件的路径，并赋给img标签*/
	document.getElementById("newImage1").src = window.URL.createObjectURL(imgFile.files[0]);
}

function showPicture2(imgFile) {
	/*获取上传文件的路径，并赋给img标签*/
	document.getElementById("newImage2").src = window.URL.createObjectURL(imgFile.files[0]);
}

function entry() {
	alert("提交成功!");
	window.location.href = "all_application.html";
}

//获取android相机焦点
function getcamera() {
	document.getElementById("file_input1").value = "";
	document.getElementById("file_input1").click();
}

//获取IOS和Android的图片库
function getlocal() {
	document.getElementById("file_input").value = "";
	document.getElementById("file_input").click();
}

function getQueryString(name) {
	var uri = window.location.search;
	uri = uri.replace("&amp;", "&").replace("%2526", "&").replace("%26", "&");
	//alert(uri);
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	uri = uri.substr(1).match(reg);
	uri = uri[2];
	return uri;
}


function autofill() {
	var bianhao = getQueryString('bh');
	var gongsi = getQueryString("gs");

	//alert(shijian);
	//alert(document.getElementById("Txt_1"));
	//alert(document.getElementById("Txt_3"));
	document.getElementById("bh").value = bianhao;
	document.getElementById("gs").value = gongsi;

}

function autofill1() {
	var xiangmu = getQueryString('xm');
	var gongwei = getQueryString("gw");
	var yuangong = getQueryString("yg");

	//alert(shijian);
	//alert(document.getElementById("Txt_1"));
	//alert(document.getElementById("Txt_3"));
	document.getElementById("xm").value = xiangmu;
	document.getElementById("gw").value = gongwei;
	document.getElementById("yg").value = yuangong;

}

var a = null;




// Part4.地图类函数
// 技术选型：js,百度地图API
// 涉及功能：用户定位，工位签到
// 涉及页面：新建签到页、工作上报页（complain）、稽查上报页（check）
function RSMap() {
	var geolocation = new BMap.Geolocation(); //创建百度地图定位实例
	//var geomap = new BMap.Map(this.mapid); //创建百度地图图像实例
	var geocoder = new BMap.Geocoder(); //创建百度地图地址编译器实例
	var geomark; //创建地图标记
	var geolabel; //创建地图标记文字说明
	//var geoaddress;
	var currentpoint;
	var initialpoint = new BMap.Point(116.331398, 39.897445);



	//初始化函数
	if (typeof RSMap.initialized == "undefined") {

		//功能1:获取当前位置的经纬度坐标,并分别应道到ID为lng和lat的元素中
		RSMap.prototype.getPoint = function(lng, lat) {

			//向百度地图API服务器发送去获取当前定位的请求
			geolocation.getCurrentPosition(function(r) {
				//对服务器返回结果进行状态判断,如果返回SUCCESS,则开始解析
				if (this.getStatus() == BMAP_STATUS_SUCCESS) {
					document.getElementById(lat).value = r.point.lat;
					document.getElementById(lng).value = r.point.lng;
					//console.log(geopoint.lat);
				}



function dis_confirm() {
	var r = confirm("尚未绑定手机号，点击确认绑定!")
	if(r == true) {
		window.location.href = "self_phone_bind.html"
	}
}

function keep() {
	var r = confirm("是否保存？")
	if(r == true) {
		alert("保存成功！");

	}
}

function sub() {
	var r = confirm("是否上报？")
	if(r == true) {
		alert("上报成功！");
		window.location.href = "all_application.html";
	}
}

function revise() {
	alert("该任务已被锁定，无法修改!")
}

function attendenceSub() {
	var r = confirm("是否上报？")
	if(r == true) {
		alert("上报成功！");
		window.location.href = "list_attendence.html";
	}
}

function complainSub() {
	var r = confirm("是否上报？")
	if(r == true) {
		alert("上报成功！");
		window.location.href = "list_complain.html";
	}
}

function workSub() {
	var r = confirm("是否上报？")
	if(r == true) {
		alert("上报成功！");
		window.location.href = "list_work.html";
	}
}

function superviseSub() {
	var r = confirm("是否上报？")
	if(r == true) {
		alert("上报成功！");
		window.location.href = "list_supervise.html";
	}
}

function today() { //构建方法
	var today = new Date(); //new 出当前时间
	var h = today.getFullYear(); //获取年
	var m = today.getMonth() + 1; //获取月
	var d = today.getDate(); //获取日
	var H = today.getHours(); //获取时
	var M = today.getMinutes(); //获取分
	var S = today.getSeconds(); //获取秒
	//返回 年-月-日 时:分:秒
	document.getElementById("today").value = h + "-" + m + "-" + d + " " + H + ":" + M + ":" + S; //将获取到的 年-月-日 时:分:秒 赋给input文本输入框

}

function fillSelect() {
	var obj = document.getElementById("s1");
	var s2 = document.getElementById("s2");
	for(var i = 2010; i < 2054; i++) {

		var op = new Option(i, i);
		obj.add(op);
	}
	for(var y = 1; y < 13; y++) {
		var a = new Option(y, y);
		s2.add(a);
	}
}

function HideOrShowFont(obj) {
	if(obj == "a1") {
		document.getElementById("a1").style.color = "red";
		
		document.getElementById("a2").style.color = "dodgerblue";
		document.getElementById("a3").style.color = "dodgerblue";
	} else if(obj == 'a2') {
		document.getElementById("a1").style.color = "dodgerblue";
		document.getElementById("a2").style.color = "red";
			

		document.getElementById("a3").style.color = "dodgerblue";
	} else if(obj == 'a3') {
		document.getElementById("a1").style.color = "dodgerblue";
		document.getElementById("a2").style.color = "dodgerblue";
		document.getElementById("a3").style.color = "red";
	}
}

			})

		}

		//功能2:获取当前位置的具体地址,并分别映射到ID为address的元素中
		RSMap.prototype.getAddress = function(address) {
			geolocation.getCurrentPosition(function(r) {
				//对服务器返回结果进行状态判断,如果返回SUCCESS,则开始解析
				if (this.getStatus() == BMAP_STATUS_SUCCESS) {
					geocoder.getLocation(r.point, function(rs) {
						//console.log(rs.address);
						document.getElementById(address).value = rs.address;
					})
				}

			})
		}

		//功能3:获取当前地图,显示到ID为map的元素中
		RSMap.prototype.getMap = function(map) {
			//初始化地图
			var geomap = new BMap.Map(map);
			var initialpoint = new BMap.Point(116.331398, 39.897445);
			geomap.centerAndZoom(initialpoint, 12);


			//获取当前定位
			geolocation.getCurrentPosition(function(r) {
				//对服务器返回结果进行状态判断,如果返回SUCCESS,则开始解析
				if (this.getStatus() == BMAP_STATUS_SUCCESS) {

					//创建当前位置的地图标记
					geomark = new BMap.Marker(r.point);
					geomap.addOverlay(geomark);
					geomap.panTo(r.point);
					//获取地址信息
					geocoder.getLocation(r.point, function(rs) {
						//添加地图缩放和模式转换的控件

						geomap.addControl(new BMap.MapTypeControl({
							mapTypes: [
								BMAP_NORMAL_MAP,
								BMAP_HYBRID_MAP
							]
						}));
						geomap.enableScrollWheelZoom(true);
						//创建当前位置的地址标签
						geolabel = new BMap.Label(rs.address, {
							offset: new BMap.Size(20, -10)
						});
						geomark.setLabel(geolabel);
						//固定当前标签
						geomark.disableDragging();
					})
				}
				//console.log(geopoint);

			})
		};

	}
	RSMap.initialized = true;
}



// Part5.图表类函数
// 技术选型：js,E-chart API
// 涉及功能：薪资查询，绩效查询
// 涉及页面：薪资查询页、绩效查询页
function RSChart(chartid, title) {
	//获取图表ID和图表标题
	var chartid = chartid;
	var title = title;
	//初始化echarts实例
	var chart = echarts.init(document.getElementById(chartid));
	//配置图表属性
	option = {
		//打开图表渐进动画
		animation: true,
		//设置标题
		title: {
			left: 'center',
			text: title,
		},
		//设置图例
		legend: {
			top: 'bottom',
			//data: ['dd', 'dada']
		},
		//设置说明
		tooltip: {
			triggerOn: 'item',
			position: function(pt) {
				return [pt[0], 130];
			},
			alwaysShowContent: true
		},
		//设置图表工作栏
		toolbox: {
			left: 'center',
			itemSize: 25,
			top: 55,
			feature: {
				dataZoom: {
					yAxisIndex: 'none'
				},
				restore: {}
			}
		},
		//设置X轴属性
		xAxis: {
			type: 'category',
			//设置X轴坐标样式
			axisPointer: {
				value: '0',
				snap: true,
				lineStyle: {
					color: '#004E52',
					opacity: 0.5,
					width: 2
				},
				//X轴标签
				label: {
					show: true,
					formatter: function(params) {
						return echarts.format.formatTime('yyyy-M', params.value);
					},
					backgroundColor: '#004E52'
				},
				//添加拖动条
				handle: {
					show: true,
					color: '#004E52'
				},
			},
			//录入X轴样例数据
			data: ["2018-1", "2018-2", "2018-3", "2018-4", "2018-5", "2018-6", "2018-7", "2018-8"],
			//添加X轴分割线
			splitLine: {
				show: true
			}

		},
		//设置Y轴属性
		yAxis: {
			type: 'value',
			axisTick: {
				inside: true
			},
			splitLine: {
				show: false
			},
			axisLabel: {
				inside: true,
				formatter: '{value}\n'
			},
			//设置Y坐标轴最小值
			min: function(value) {
				return value.min - 400;
			},
			
			z: 10
		},
		grid: {
			top: 110,
			left: 15,
			right: 15,
			height: 160
		},
		dataZoom: [{
			type: 'inside',
			throttle: 50
		}],
		//录入图表数值
		series: [{
				name: '实际收入',
				type: 'bar',
				smooth: true,
				symbol: 'circle',
				symbolSize: 5,
				sampling: 'average',
				itemStyle: {
					normal: {
						color: '#8ec6ad'
					}
				},
				stack: 'a',
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: '#8ec6ad'
						}, {
							offset: 1,
							color: '#ffe'
						}])
					}
				},
				data: [4300.6, 4375.3, 4425.6, 4241, 4822.3, 4769.2, 4231.6, 4446.6]
			},
			{
				name: '应收收入',
				type: 'line',
				smooth: true,
				stack: 'b',
				symbol: 'circle',
				symbolSize: 5,
				sampling: 'average',
				itemStyle: {
					normal: {
						color: '#d68262'
					}
				},
				areaStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
							offset: 0,
							color: '#d68262'
						}, {
							offset: 1,
							color: '#ffe'
						}])
					}
				},
				data: [4942.6, 4355.9, 4589.0, 4226.4, 4228.7, 4770.7, 4175.6, 4182.2]
			}

		]
	};
	
	if (typeof RSChart.initialized == "undefined") {
		
		//生成echart图表的函数
		RSChart.prototype.getChart = function(title) {
			this.title = title;
			chart.setOption(option);

		}
	}

}




// Part6.系统类函数
// 技术选型：js
// 涉及功能：页面确认，上报确认
// 涉及页面：



function keep() {
	var r = confirm("是否保存？")
	if(r == true) {
		alert("保存成功！");

	}
}

function sub() {
	var r = confirm("是否上报？")
	if(r == true) {
		alert("上报成功！");
		window.location.href = "all_application.html";
	}
}

function revise() {
	alert("该任务已被锁定，无法修改!")
}

function attendenceSub() {
	var r = confirm("是否上报？")
	if(r == true) {
		alert("上报成功！");
		window.location.href = "list_attendence.html";
	}
}

function complainSub() {
	var r = confirm("是否上报？")
	if(r == true) {
		alert("上报成功！");
		window.location.href = "list_complain.html";
	}
}

function workSub() {
	var r = confirm("是否上报？")
	if(r == true) {
		alert("上报成功！");
		window.location.href = "list_work.html";
	}
}

function superviseSub() {
	var r = confirm("是否上报？")
	if(r == true) {
		alert("上报成功！");
		window.location.href = "list_supervise.html";
	}
}



function today() { //构建方法
	var today = new Date(); //new 出当前时间
	var h = today.getFullYear(); //获取年
	var m = today.getMonth() + 1; //获取月
	var d = today.getDate(); //获取日
	var H = today.getHours(); //获取时
	var M = today.getMinutes(); //获取分
	var S = today.getSeconds(); //获取秒
	//返回 年-月-日 时:分:秒
	document.getElementById("today").value = h + "-" + m + "-" + d + " " + H + ":" + M + ":" + S; //将获取到的 年-月-日 时:分:秒 赋给input文本输入框

}



function HideOrShowFont(obj) {
	if(obj == "a1") {
		document.getElementById("a1").style.color = "red";
		
		document.getElementById("a2").style.color = "dodgerblue";
		document.getElementById("a3").style.color = "dodgerblue";
	} else if(obj == 'a2') {
		document.getElementById("a1").style.color = "dodgerblue";
		document.getElementById("a2").style.color = "red";
			

		document.getElementById("a3").style.color = "dodgerblue";
	} else if(obj == 'a3') {
		document.getElementById("a1").style.color = "dodgerblue";
		document.getElementById("a2").style.color = "dodgerblue";
		document.getElementById("a3").style.color = "red";
	}
}

function dis_confirm() {
	var r = confirm("尚未绑定手机号，点击确认绑定!")
	if(r == true) {
		window.location.href = "self_phone_bind.html"
	}
}
 function change(){
 	alert('提交成功！');
 	window.location.href="self_information.html"
 }
 function dis_confirm() {
	var r = confirm("尚未绑定手机号，点击确认绑定!")
	if(r == true) {
		window.location.href = "self_phone_bind.html"
	}
}

		function l(){
			
   document.getElementById("newImage").src="../../images/858712093676267294.jpg"
		
		}
	function l2(){
		document.getElementById("newImage").src="../../images/t01b98ba8990e577af4.jpg"
	}