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
			:step="1"
			show-step
			@change="mapZoomChange"
			class="zoomControl"
			height="180px">
		</el-slider>
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
			
			const TileLayer = new ol.layer.Tile({
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

			const VectorLayer = new ol.layer.Vector({
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
			_this.olMap
			_this.createControl();
			_this.createOverlay();
			_this.bindMapEvent();
		},
		// 返回中心点控件
		backToCenterControl(ele) {
			const _this = this;
			const icon = document.createElement("i");
			icon.className = "el-icon-search";
			const button = document.createElement("button");
			button.setAttribute("type","button");
			button.className = "el-button el-button--default el-button--mini";
			button.title = "返回图层中心";
			button.appendChild(icon);

			ele.appendChild(button);

			button.addEventListener("click",function(){
				_this.olMap.getView().animate({
					zoom: 11,
					center : _this.center,
					duration: 1000
				})
			})
		},
		// 绘图控件
		editMapControl(ele) {
			const _this = this;
			const icon = document.createElement("i");
			icon.className = "el-icon-edit-outline";
			const button = document.createElement("button");
			button.setAttribute("type","button");
			button.className = "el-button el-button--primary el-button--mini";
			button.title = "绘制图层";
			button.appendChild(icon);

			ele.appendChild(button);
			button.addEventListener("click",function(){

			})
		},
		// 创建控件
		createControl() {
			const _this = this;
			const element = document.createElement("div");
			element.className = "custom-control";
			_this.backToCenterControl(element);

			const Control = new ol.control.Control({
				element : element
			});
			//_this.olMap.addControl(Control)
			//_this.backToCenterControl();
		},
		// 添加tips弹窗-Overlay
		createOverlay() {
			this.popupOverlay = new ol.Overlay({
        		element: document.getElementById("popup-content")
			});
			this.olMap.addOverlay(this.popupOverlay);
		},
		// 缩放控件
		mapZoomChange(zoom) {
			this.olMap.getView().setZoom(zoom);
		},
		// 事件绑定
		bindMapEvent() {
			const _this = this;

			const selectClick = new ol.interaction.Select({
				condition: ol.events.condition.click,
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


			/* _this.olMap.on("singleclick",function(evt){
				const feature = _this.olMap.getFeaturesAtPixel(evt.pixel);
				if(feature){
					_this.popupOverlay.setPosition(evt.coordinate);
					_this.popupData.isShow = true;
					_this.popupData.name = feature[0].get("Name");
					_this.popupData.hdms = ol.coordinate.toStringHDMS(ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'));
					_this.popupData.type = feature[0].getGeometry().getType()
				}else{
					_this.popupData.isShow = false;
				}
			}) */
		}
	}
}
</script>
<style scoped>
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

	.el-slider.is-vertical.zoomControl{
		position: absolute;
		right:10px;
		top: 20px;
	}
</style>


