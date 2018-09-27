<template>
	<div class="openlayer">
		<div id="mapEle"></div>
		<div id="popup-content" class="el-popover el-popper" :class="!popupData.isShow ? 'hidden' : ''" x-placement="top">
			<div class="el-popover__title">{{popupData.name}}</div>
			<p>经纬度：{{popupData.hdms}}</p>
			<P>geoType: {{popupData.type}}</P>
			<div x-arrow="" class="popper__arrow" style="left: 107px;"></div>
		</div>
		<el-slider
			v-model="mapZoom"
			vertical
			:min="1"
			:max="18"
			:step="0.1"
			show-step
			@change="mapZoomChange"
			class="zoomControl"
			height="180px">
		</el-slider>
		<div class="custom-control">
			<el-tooltip effect="dark" content="返回中心点" placement="left">
				<el-button type="primary" icon="el-icon-search" @click="backToCenterControl"></el-button>
			</el-tooltip>
			<el-tooltip effect="dark" content="地图绘制" placement="left">
				<el-dropdown @command="editMapControl" trigger="click">
					<el-button type="primary" icon="el-icon-edit"></el-button>
  					<el-dropdown-menu slot="dropdown">
    					<el-dropdown-item command="Point">点</el-dropdown-item>
    					<el-dropdown-item command="LineString">线</el-dropdown-item>
    					<el-dropdown-item command="Polygon">面</el-dropdown-item>
    					<el-dropdown-item command="Circle">圆</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-tooltip>
			<el-tooltip effect="dark" content="切换底图" placement="left">
				<el-dropdown @command="changeTileServer" trigger="click">
					<el-button type="primary" icon="el-icon-picture"></el-button>
  					<el-dropdown-menu slot="dropdown">
    					<el-dropdown-item command="ArcGIS">默认</el-dropdown-item>
    					<el-dropdown-item command="OSM">OSM</el-dropdown-item>
    					<el-dropdown-item command="Bing">Bing</el-dropdown-item>
    					<el-dropdown-item command="Google">Google</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-tooltip>
		</div>
	</div>
</template>

<script>
import ol from "openlayers"
import "openlayers/dist/ol.css"
import icon from "@/assets/01.png"
import iconActive from "@/assets/marker_active.png"

export default {
	name: "openlayer",
	data() {
		return {
			olMap: null,
			center: [12473897.880706105,2811920.244959629], // 中心点
			mapZoom: 11,
			popupOverlay: null,
			canMaker: false,
			makerSource:null,
			drawInteraction:null,
			snapInteraction:null,
			mapTileLayer:null,
			popupData: {
				isShow: false,
				name: "",
				hdms: "",
				type: ""
			},
			tileSourceUrl: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}", // 地图服务地址
			geoJson: {
				"type": "FeatureCollection",
				"name": "LZ",
				"crs": {
					"type": "name",
					"properties": {
						"name": "urn:ogc:def:crs:OGC:1.3:CRS84"
					}
				},
				"features": [{
						"type": "Feature",
						"properties": {
							"id": 1,
							"Name": "林场1",
							"x": 112.0209662239902,
							"y": 24.623569604516721
						},
						"geometry": {
							"type": "Point",
							"coordinates": [111.970054236717914, 24.474083344015099]
						}
					},
					{
						"type": "Feature",
						"properties": {
							"id": 2,
							"Name": "林场2",
							"x": 112.07522938646737,
							"y": 24.605875095013296
						},
						"geometry": {
							"type": "Point",
							"coordinates": [112.108268016505761, 24.462888237142177]
						}
					},
					{
						"type": "Feature",
						"properties": {
							"id": 3,
							"Name": "林场3",
							"x": 112.04219963539431,
							"y": 24.549252664602339
						},
						"geometry": {
							"type": "Point",
							"coordinates": [112.017285258644051, 24.527587989167323]
						}
					},
					{
						"type": "Feature",
						"properties": {
							"id": 4,
							"Name": "石公山保护区",
							"x": 112.05045707316258,
							"y": 24.469037554853479
						},
						"geometry": {
							"type": "Point",
							"coordinates": [112.050457073162576, 24.469037554853479]
						}
					},
					{
						"type": "Feature",
						"properties": {
							"id": 5,
							"Name": "林场5",
							"x": 112.09528316390458,
							"y": 24.40769658857494
						},
						"geometry": {
							"type": "Point",
							"coordinates": [112.031913988257159, 24.421237010721825]
						}
					},
					{
						"type": "Feature",
						"properties": {
							"id": 6,
							"Name": "林场6",
							"x": 112.07051085059979,
							"y": 24.544534128734757
						},
						"geometry": {
							"type": "Point",
							"coordinates": [112.10138301309469, 24.534785024788999]
						}
					}
				]
			}
		}
	},
	mounted(){
		this.buildOlMap();
	},
	methods: {
		buildOlMap() {
			const _this = this;
			
			const TileLayer = _this.mapTileLayer = new ol.layer.Tile({
				preload: 4,
				source: new ol.source.XYZ({
					url : _this.tileSourceUrl
				})
			})

			const vectorSource = new ol.source.Vector({
        		features: (new ol.format.GeoJSON({featureProjection: 'EPSG:3857'})).readFeatures(_this.geoJson),
			});

			const vectorStyle = function(feature){
				return new ol.style.Style({
					image: new ol.style.Icon({
						src : icon
					}),
					text: new ol.style.Text({
						text : feature.getProperties().Name,
						offsetY: -30,
						fill: new ol.style.Fill({
							color: "#fffc00"
						})
					})
				})
			}

			const VectorLayer = _this.VectorLayer = new ol.layer.Vector({
				source: vectorSource,
				style: vectorStyle
			})

			const mapView = new ol.View({
				center: _this.center,
				zoom: 11
			})

			window.olMap = _this.olMap = new ol.Map({
				target: "mapEle",
				layers: [
					TileLayer,
					VectorLayer
				],
				view: mapView,

			});
			_this.createControl();
			_this.createMakerVector();
			_this.createOverlay();
			_this.bindMapEvent();
		},
		// 返回中心点控件
		backToCenterControl(ele) {
			const _this = this
			_this.olMap.getView().animate({
				zoom: 11,
				center : _this.center,
				duration: 1000
			})
		},
		// 地图标注控件
		editMapControl(drawType) {
			const _this = this;
			_this.canMaker = !_this.canMaker;

			_this.drawInteraction = new ol.interaction.Draw({
          		source: _this.makerSource,
          		type: drawType
        	});
			_this.olMap.addInteraction(_this.drawInteraction);
			
            _this.snapInteraction = new ol.interaction.Snap({
				source: _this.makerSource
			});
			_this.olMap.addInteraction(_this.snapInteraction);
		},
		// 缩放控件
		mapZoomChange(zoom) {
			this.olMap.getView().setZoom(zoom);
		},
		// 创建控件
		createControl() {
			const _this = this;
			const Control = new ol.control.Control({
				//element : element
			});
		},
		// 添加tips弹窗-Overlay
		createOverlay() {
			this.popupOverlay = new ol.Overlay({
        		element: document.getElementById("popup-content")
			});
			this.olMap.addOverlay(this.popupOverlay);
		},

		// 底图切换控件
		changeTileServer(cmd) {
			const _this = this;
			let source = new ol.source.XYZ({
					url : _this.tileSourceUrl
				});
			switch (cmd) {
				case "OSM":
					source = new ol.source.OSM();
					break;
				case "Bing":
					source = new ol.source.BingMaps({
						key: "As1HiMj1PvLPlqc_gtM7AqZfBL8ZL3VrjaS3zIb22Uvb9WKhuJObROC-qUpa81U5",
						imagerySet: "AerialWithLabels"
					});
					break;
				case "Google":
					source = new ol.source.XYZ({
						//url : "http://mt3.google.cn/vt/lyrs=s&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}" // 卫星图
						//url : "http://mt0.google.cn/vt/lyrs=t&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}" // 地形图
						url: "http://mt2.google.cn/vt/lyrs=m&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}" //全地图
					});
					break;
			}
			_this.mapTileLayer.setSource(source);
		},
		// 创建标注所需图层
		createMakerVector() {
			const _this = this;
			_this.makerSource = new ol.source.Vector();
			const makerVector = this.makerVector = new ol.layer.Vector({
				source: _this.makerSource,
				style: new ol.style.Style({
					fill: new ol.style.Fill({
						color: "rgba(64, 158, 255, 0.2)"
					}),
					stroke: new ol.style.Stroke({
						color: "#6bb4ff",
						width: 2
					}),
					image: new ol.style.Circle({
						radius: 7,
						fill: new ol.style.Fill({
							color: "#409eff"
						})
					})
				})
			});

			_this.olMap.addLayer(makerVector);
			const modify = new ol.interaction.Modify({source: _this.makerSource});
      		_this.olMap.addInteraction(modify);
		},
		// 事件绑定
		bindMapEvent() {
			const _this = this;
			
			const selectClick = new ol.interaction.Select({
				condition: ol.events.condition.click,
				layers:[_this.VectorLayer],
				style: function(feature){
					return new ol.style.Style({
						image: new ol.style.Icon({
							src : iconActive
						}),
						text: new ol.style.Text({
							text : feature.getProperties().Name,
							offsetY: -30,
							fill: new ol.style.Fill({
								color: "#ff00d6"
							})
						})
					})
				}
			});
			selectClick.on("select",function(evt){
				const selectData = evt.selected;
				
				if(selectData.length > 0){
					_this.popupOverlay.setPosition(evt.mapBrowserEvent.coordinate);
					_this.popupData.isShow = true;
					_this.popupData.name = selectData[0].get("Name");
					_this.popupData.hdms = ol.coordinate.toStringHDMS(ol.proj.transform(evt.mapBrowserEvent.coordinate, 'EPSG:3857', 'EPSG:4326'));
					_this.popupData.type = selectData[0].getGeometry().getType()
				}else{
					_this.popupData.isShow = false;
				}
			})
			_this.olMap.addInteraction(selectClick);

			// 绑定键盘事件
			document.addEventListener("keyup",function(evt){
				if(evt.keyCode == 27){ // esc键关闭地图绘制功能
					_this.canMaker = false;
					_this.olMap.removeInteraction(_this.drawInteraction);
					_this.olMap.removeInteraction(_this.snapInteraction);
				}
				console.log(evt);
			})

			// 监听地图像素大小变化，同步更新地图Zoom控件
			_this.olMap.getView().addEventListener("change:resolution",function(evt){
				_this.mapZoom = evt.target.getZoom();
			})
		}
	}
}
</script>
<style>
	.openlayer{
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}
	#mapEle{
		width: 100%;
		height: 100%;
	}
	#popup-content{
		width: 200px;
		height: 100px;
		margin-left: -113px;
		margin-top: -142px;
	}
	#popup-content.hidden{
		display: none;
	}
	.custom-control{
		position: absolute;
		top: 200px;
		right: 10px;
		cursor: pointer;
		z-index: 3000;
	}
	.custom-control button{
		display: block;
		cursor: inherit;
		padding: 6px 8px;
	}
	.el-slider.is-vertical.zoomControl{
		position: absolute;
		right:10px;
		top: 10px;
	}
	.el-slider.is-vertical.zoomControl .el-slider__runway{
		margin: 0 12px;
	}
	.openlayer .custom-control .el-tooltip{
		margin-top: 10px;
		display: block;
	}
	.openlayer .el-button+.el-button{
		margin: 0;
	}
</style>


