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
	if(typeof FileReader === 'undefined') {
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