(function(e){function t(t){for(var o,i,l=t[0],p=t[1],c=t[2],s=0,d=[];s<l.length;s++)i=l[s],a[i]&&d.push(a[i][0]),a[i]=0;for(o in p)Object.prototype.hasOwnProperty.call(p,o)&&(e[o]=p[o]);u&&u(t);while(d.length)d.shift()();return r.push.apply(r,c||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],o=!0,l=1;l<n.length;l++){var p=n[l];0!==a[p]&&(o=!1)}o&&(r.splice(t--,1),e=i(i.s=n[0]))}return e}var o={},a={app:0},r=[];function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=o,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)i.d(n,o,function(t){return e[t]}.bind(null,o));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],p=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var u=p;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},1945:function(e,t,n){},"557b":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var o=n("a026"),a=n("5c96"),r=n.n(a),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"container"}},[n("router-view")],1)},l=[],p=n("2877"),c={},u=Object(p["a"])(c,i,l,!1,null,null,null);u.options.__file="App.vue";var s=u.exports,d=n("8c4f"),m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"openlayer"},[n("div",{attrs:{id:"mapEle"}}),n("div",{staticClass:"el-popover el-popper",class:e.popupData.isShow?"":"hidden",attrs:{id:"popup-content","x-placement":"top"}},[n("div",{staticClass:"el-popover__title"},[e._v(e._s(e.popupData.name))]),n("p",[e._v("经纬度："+e._s(e.popupData.hdms))]),n("P",[e._v("geoType: "+e._s(e.popupData.type))]),n("div",{staticClass:"popper__arrow",staticStyle:{left:"107px"},attrs:{"x-arrow":""}})],1),n("el-slider",{staticClass:"zoomControl",attrs:{vertical:"",min:1,max:18,step:1,"show-step":"",height:"180px"},on:{change:e.mapZoomChange},model:{value:e.mapZoom,callback:function(t){e.mapZoom=t},expression:"mapZoom"}})],1)},y=[],A=n("0038"),g=n.n(A),v=(n("50ce"),n("8439")),b=n.n(v),f=n("bad7"),w=n.n(f),h={name:"openlayer",data:function(){return{olMap:null,center:[12473897.880706105,2811920.244959629],mapZoom:11,popupOverlay:null,popupData:{isShow:!1,name:"",hdms:"",type:""},tileSourceUrl:"http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",geoJson:{type:"FeatureCollection",name:"LZ",crs:{type:"name",properties:{name:"urn:ogc:def:crs:OGC:1.3:CRS84"}},features:[{type:"Feature",properties:{id:1,Name:"林场1",x:112.0209662239902,y:24.62356960451672},geometry:{type:"Point",coordinates:[111.97005423671791,24.4740833440151]}},{type:"Feature",properties:{id:2,Name:"林场2",x:112.07522938646737,y:24.605875095013296},geometry:{type:"Point",coordinates:[112.10826801650576,24.462888237142177]}},{type:"Feature",properties:{id:3,Name:"林场3",x:112.04219963539431,y:24.54925266460234},geometry:{type:"Point",coordinates:[112.01728525864405,24.527587989167323]}},{type:"Feature",properties:{id:4,Name:"石公山保护区",x:112.05045707316258,y:24.46903755485348},geometry:{type:"Point",coordinates:[112.05045707316258,24.46903755485348]}},{type:"Feature",properties:{id:5,Name:"林场5",x:112.09528316390458,y:24.40769658857494},geometry:{type:"Point",coordinates:[112.03191398825716,24.421237010721825]}},{type:"Feature",properties:{id:6,Name:"林场6",x:112.07051085059979,y:24.544534128734757},geometry:{type:"Point",coordinates:[112.10138301309469,24.534785024789]}}]}}},mounted:function(){this.buildOlMap()},methods:{buildOlMap:function(){var e=this,t=new g.a.layer.Tile({preload:4,source:new g.a.source.XYZ({url:e.tileSourceUrl})}),n=new g.a.source.Vector({features:new g.a.format.GeoJSON({featureProjection:"EPSG:3857"}).readFeatures(e.geoJson)}),o=function(e){return new g.a.style.Style({image:new g.a.style.Icon({src:b.a}),text:new g.a.style.Text({text:e.getProperties().Name,offsetY:-30,fill:new g.a.style.Fill({color:"#fffc00"})})})},a=new g.a.layer.Vector({source:n,style:o}),r=new g.a.View({center:e.center,zoom:11});window.olMap=e.olMap=new g.a.Map({target:"mapEle",layers:[t,a],view:r}),e.olMap,e.createControl(),e.createOverlay(),e.bindMapEvent()},backToCenterControl:function(e){var t=this,n=document.createElement("i");n.className="el-icon-search";var o=document.createElement("button");o.setAttribute("type","button"),o.className="el-button el-button--default el-button--mini",o.title="返回图层中心",o.appendChild(n),e.appendChild(o),o.addEventListener("click",function(){t.olMap.getView().animate({zoom:11,center:t.center,duration:1e3})})},editMapControl:function(e){var t=document.createElement("i");t.className="el-icon-edit-outline";var n=document.createElement("button");n.setAttribute("type","button"),n.className="el-button el-button--primary el-button--mini",n.title="绘制图层",n.appendChild(t),e.appendChild(n),n.addEventListener("click",function(){})},createControl:function(){var e=this,t=document.createElement("div");t.className="custom-control",e.backToCenterControl(t);new g.a.control.Control({element:t})},createOverlay:function(){this.popupOverlay=new g.a.Overlay({element:document.getElementById("popup-content")}),this.olMap.addOverlay(this.popupOverlay)},mapZoomChange:function(e){this.olMap.getView().setZoom(e)},bindMapEvent:function(){var e=this,t=new g.a.interaction.Select({condition:g.a.events.condition.click,style:function(e){return new g.a.style.Style({image:new g.a.style.Icon({src:w.a}),text:new g.a.style.Text({text:e.getProperties().Name,offsetY:-30,fill:new g.a.style.Fill({color:"#ff00d6"})})})}});t.on("select",function(t){var n=t.selected;n.length>0?(e.popupOverlay.setPosition(t.mapBrowserEvent.coordinate),e.popupData.isShow=!0,e.popupData.name=n[0].get("Name"),e.popupData.hdms=g.a.coordinate.toStringHDMS(g.a.proj.transform(t.mapBrowserEvent.coordinate,"EPSG:3857","EPSG:4326")),e.popupData.type=n[0].getGeometry().getType()):e.popupData.isShow=!1}),e.olMap.addInteraction(t)}}},E=h,I=(n("b213"),Object(p["a"])(E,m,y,!1,null,"00c47968",null));I.options.__file="index.vue";var S=I.exports;o["default"].use(d["a"]);var Z=new d["a"]({routes:[{path:"/ol",name:"ol",component:S,meta:{title:"openlayers"}}]});Z.beforeEach(function(e,t,n){e.meta.title&&(document.title=document.title+"-"+e.meta.title),n()});var N=Z;n("0fae"),n("557b");o["default"].use(r.a,{size:"small",zIndex:3e3}),o["default"].config.productionTip=!1,new o["default"]({router:N,render:function(e){return e(s)}}).$mount("#app")},8439:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAhCAYAAADH97ugAAABS2lUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIi8+CiA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSJyIj8+IEmuOgAAA19JREFUSImt1W9oVXUcx/HXPZtTp4hFTZ1SlJCpPUkIelxBQSKd81AowihDyHpgRRBUBEXQs4wKgh4UCC3vCiKsJwmSzuYf1NBtl/y3uaVjm45td7v/Tg/mrbHuOfdq+8IPDr/v5/t9f7/fc87vl4lLUm1mxn3Xr9sTBB4PmrRnWJLPWzRTMDU2ZnhoSHeh4Cdko9CNpDyZJFAce6ZQ8PHixdanFVKpMDhET4/J8XGf4v0oNNEI6M5yWUdTk8fSe/1PYfpynDvncqViexT6LQ20sVJxIAjccyuQuXb1Kl1HzZTLtkehbC3Qqjh2IpPRfruQqg0O0dWlgCei0CEIbvqa8f1CQKB9DRs3asG+bKeVc0Gv4NGFgFTtwQ2sWGEt3mF2dEtwCW1pgcUiIyOmgkBf6zJx61Kbg0BLWkz/AN3d8lgbYFs9SF+On3/x2eEj7mhr8/DyZbYEgVX4Ii1ubTstLZZiazO2ponPnqOnx74otGue6zpevvm8s1ZsENDWxsCAbQG2JEEmp+jtVcGbKbXswUiSc+VK8EiAe5NEQ4PEsbNRqD8FNIEDSc7WpaAtwPIkUX4ajKdAqnYlydHcDBYFGE0SLVkM7s92ytQBJf5/hQIYC3AxSbSmnUzGajyZAmnFU0nOqTzoDXAkSbR8GRseAHuznYm/wAe4KynH6Oy8DgX4IaVamzaxebP1TU1+z3Z6Otv5z2myolTyJV5Nii0WGR4G34pLgrikJy6J09bMlLj/ovjPnMmrg4aL00r1YnI94v0dDsal2cO0grfRkdZZSwvr1mH2nbSmaavd9OWU8Tr/Hqrf4Zt6wbdip88wPe3DKNQ9FwQv4ehCQC5c4NIlP+Ld6t78G/ZunMbq24WMj/PrQSPlsoei0F/V/WCebhgv3i6kUqH7GOWynXMhIC7VXF/V+6JqrT9Oi/d3+LpWzvkdVe01DNxKN6Oj9PUZwO5a/iTQDbyAuBFIqcyx4+I4tiMKjdUUJYyuuj5vZGQnj4v3d9ibliupo6rtwYU0wbVrnD8vJ/1yrAuawA4JIywWOX5CGc9Focn/A4KD+KSW49Qp8nkfRaGuekkaAcFbyM3duDLI5X6n8F4jCRoFTeF5lGF6mpMnFfBsFCosJAgO4w1M9PbqKhTsjkJnGg3+G+c10zgSGakBAAAAAElFTkSuQmCC"},b213:function(e,t,n){"use strict";var o=n("1945"),a=n.n(o);a.a},bad7:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAhCAYAAADH97ugAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggV2luZG93cyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowRjU2OUREQUMxNEYxMUU4OEEzQzkxNEIyMzRFOTRENSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowRjU2OUREQkMxNEYxMUU4OEEzQzkxNEIyMzRFOTRENSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBGNTY5REQ4QzE0RjExRTg4QTNDOTE0QjIzNEU5NEQ1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBGNTY5REQ5QzE0RjExRTg4QTNDOTE0QjIzNEU5NEQ1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YBSphgAAA3VJREFUeNqslltIVFEUhv85o6NOg3kJLY0iDcp8ShB6CaKIgkyix6AIo4wg68GKIKgIiqC3bhQ99CAIWVIQYdlDUZllIZZpjuY9b5OOeRlzdJz+NTjgZfaeUWcdFmdx9uXba++91jomL+qgk3G41w1iuNCAscMAUkwwosfwL5LfXU4MObrhqHJj4gW7lu7Hzr+qeUwqkBfefZzgRhQs6bqFTPHpQh9+omV0CCO3+ekKgSOhgBI8mCoxw9iOBQgXBjtaUY/mdsIPEPZBB8pgpzJu0xosUnrRj0rUjHvgEVip/7sxo08yV/V6KRDfJEhENjKjaBaXonzrXFAE9akJphSEQVKIy0CaZRoWNxN0kroFYZSNSEMsbKk0L/rPKJrvNmqSbuAEJrn7gy5urd2KKK8VMZm0LboxHehGFWrHaKaKR7nBIHa04CXe361AdXwSEjbbsCyLkGQ23dONS+UWWhAZQzNHziZH17kOTRIjxbxBJ+Y0DVKPT9v5gcZyMfQgEZ3oyRWPslSQUbjQgNYpmuc0aymk9qsa42CTV7aA1qo6deOPBGIdvenQgCQLlKkarXzkaARkU3ViTpPXUAiX7LeqIQJmeUUKaEDVKRpyIZHGWDAFDR2FMF/KyymgVlWnVTxIBvFKmrs0ENmb3apGF+R2o0FAH1WdeI2xgYFHuUWvVCFwlbpCNccAfJXjnYCe6fZkE0GZWJ9uhvkzYXuo/mwSOwnPA75P6YLcAaeYjyQzGL5wARevEdnrPq7PzYJHT10JWB7PgzbrxjShHd/Q8Ja3dluEr3YBF6glukGMcKxGsv9MrMGuoXjD+uSheWZmUn1MLQpnUqUnDI7xa/Smam49Okb9FA5IC5NOG7qe07wUqPDJPdxL7VkKhP8N9MYuKekovfEEAok4pMNiIfKjwrIAlvF8QnpmJ9j5Ii4/XAyoHr8YNcNFhDyZn8kDy2lq50IgEph2tMmYgsAlI7BIOB/x/UWFIJN8vqDWy0yfR2+cCwGJvKLeDwVUi0ZeAdcdQspVfYwgcxT6bqtGJFs0o7MxSHEMCpKilqfaQon+r/ghV/gQvRldCkjkDfVmoIYaRj+L43VCKoNNYoR4qc5TG2eX1F6mzK4ampdDmSBUkIt6mOqLdOYwVKPeTfMgvXGHEyRSQT0r58Y/o0qWjQJCvoc6+L8AAwC0hyAnCFCR4AAAAABJRU5ErkJggg=="}});