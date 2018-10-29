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
				geomap.centerAndZoom(initialpoint,12);	
				
				
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


	var map = new RSMap();
	map.getPoint("lng", "lat");
	map.getAddress("address");
	map.getMap("allmap");
	//console(map.getPoint().lng);

	//console.log(map.sendSignal());
	//map.getMap();
	//map.getAddress();