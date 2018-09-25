<template>
	<div id="openlayer"></div>
</template>

<script>
import ol from 'openlayers'
import icon from '@/assets/01.png'
export default {
	name: "openlayer",
	data() {
		return {
			olMap: null,
			center: [12473897.880706105,2811920.244959629], // 中心点
			tileSourceUrl: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
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
				style: vectorStyle,
				on: function(fe){
					debugger
				}
			})

			const mapView = new ol.View({
				center: _this.center,
				zoom: 11
			})

			window.olMap = _this.olMap = new ol.Map({
				target: "openlayer",
				layers: [
					TileLayer,
					VectorLayer
				],
				view: mapView
			});

			_this.createControl();
			_this.bindMapEvent();
		},
		// 返回中心点控件
		backToCenter() {
			const _this = this;
			_this.olMap.getView().animate({
				zoom: 11,
				center : _this.center,
				duration: 1000
			})
		},
		// 创建一个控件
		createControl() {
			const _this = this;
			const button = document.createElement("button");
			button.innerHTML = "C";
			const element = document.createElement("div");
			element.className = "custom-control ol-unselectable ol-control";
			element.style.top = "0.5em";
			element.title = "返回图层中心";
			element.appendChild(button);

			element.addEventListener("click",function(){
				_this.backToCenter();
			})

			const Control = new ol.control.Control({
				element : element
			});
			_this.olMap.addControl(Control)
		},
		// 事件绑定
		bindMapEvent() {
			const _this = this;
			_this.olMap.on("click",function(evt){
				const feature = _this.olMap.getFeaturesAtPixel(evt.pixel);
				if(feature){
					console.log(feature[0].get("Name"));
				}
			})
		}
	}
}
</script>
<style scoped>
	#openlayer{
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}
</style>


