(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-cba6a6fa"],{"3ad6":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"articleContainer"}},[i("div",{attrs:{id:"articleContent"},domProps:{innerHTML:t._s(t.GetArticleItem.contents)}}),i("div",{attrs:{id:"foot"}},[i("div",{on:{click:function(e){return t.NextOrLast(!1)}}},[t._v("上一篇")]),i("div",{on:{click:function(e){return t.NextOrLast(!0)}}},[t._v("下一篇")])])])},c=[],r=i("2909"),n=(i("d3b7"),i("159b"),i("4de4"),i("a630"),i("3ca3"),i("caad"),i("2532"),i("ac1f"),i("5319"),{data:function(){return{articleElement:NodeList,titleList:["h1","h2","h3","h4","h5","h6"],articleTittleList:[],catalog:[]}},computed:{GetArticleItem:function(){return this.$store.state.checkArticle}},methods:{CreateCatalog:function(){var t=this,e=document.querySelectorAll("h1,h2,h3,h4,h5,h6");this.articleElement=document.querySelector("#articleContent"),this.titleList.forEach((function(e){var i,a=t.articleElement.getElementsByTagName(e);(i=t.articleTittleList).push.apply(i,Object(r["a"])(a))}));var i=Array.from(e).filter((function(e){return Array.from(t.articleTittleList).includes(e)}));i.forEach((function(e,i){var a=e.innerHTML,c=parseInt(e.tagName.replace("H","")),r="catalog_".concat(i),n=e.tagName.toLocaleLowerCase();e.setAttribute("id",r),t.catalog.push({title:a,id:r,level:c,key:n})})),this.$store.commit("CATALOG",this.catalog)},NextOrLast:function(t){var e=this.$store.state.totalArticle,i=this.$store.state.checkArticle,a=0;e.forEach((function(t,e){t._id===i._id&&(a=e)})),t?(a===e.length-1?a=0:a+=1,this.$store.dispatch("checkArticle",e[a])):(0===a?a=e.length-1:a-=1,this.$store.dispatch("checkArticle",e[a]))}},updated:function(){this.catalog=[],this.CreateCatalog()},mounted:function(){this.CreateCatalog(),this.$store.commit("ISCATALOG",!0)},beforeDestroy:function(){this.$store.commit("ISCATALOG",!1)}}),o=n,s=(i("65da"),i("2877")),l=Object(s["a"])(o,a,c,!1,null,"0b5cb94b",null);e["default"]=l.exports},"65da":function(t,e,i){"use strict";i("cf2e")},cf2e:function(t,e,i){}}]);
//# sourceMappingURL=chunk-cba6a6fa.24dfdfc6.js.map