(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6d5fb1d4"],{"3ad6":function(t,e,i){"use strict";i.r(e);var c=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"articleContainer"}},[i("div",{attrs:{id:"articleContent"},domProps:{innerHTML:t._s(t.GetArticleItem.contents)}}),i("div",{attrs:{id:"foot"}},[i("div",{on:{click:function(e){return t.NextOrLast(!1)}}},[t._v("上一篇")]),i("div",{on:{click:function(e){return t.NextOrLast(!0)}}},[t._v("下一篇")])])])},a=[],r=i("5530"),n=(i("d3b7"),i("159b"),i("ac1f"),i("5319"),i("2f62")),o={data:function(){return{articleElement:NodeList,titleList:["h1","h2","h3","h4","h5","h6"],articleTittleList:[],catalog:[]}},computed:Object(r["a"])({},Object(n["b"])({GetArticleItem:"checkArticle"})),methods:{CreateCatalog:function(){var t=this;this.articleElement=document.querySelector("#articleContent");var e=this.articleElement.querySelectorAll("h1,h2,h3,h4,h5,h6");e.forEach((function(e,i){var c=e.innerHTML.replace(/&nbsp;/gi,"").replace(/<[^>]+>/g,""),a=parseInt(e.tagName.replace("H","")),r="catalog_".concat(i),n=e.tagName.toLocaleLowerCase();e.setAttribute("id",r),t.catalog.push({title:c,id:r,level:a,key:n})})),this.$store.commit("CATALOG",this.catalog)},NextOrLast:function(t){var e=this.$store.state.totalArticle,i=this.$store.state.checkArticle,c=0;e.forEach((function(t,e){t._id===i._id&&(c=e)})),t?(c===e.length-1?c=0:c+=1,this.$store.dispatch("checkArticle",e[c])):(0===c?c=e.length-1:c-=1,this.$store.dispatch("checkArticle",e[c]))}},updated:function(){this.catalog=[],this.CreateCatalog()},mounted:function(){this.$store.dispatch("bulletin",this.GetArticleItem),this.CreateCatalog(),this.$store.commit("ISCATALOG",!0)},beforeDestroy:function(){this.$store.commit("ISCATALOG",!1)}},s=o,l=(i("a0bb"),i("2877")),h=Object(l["a"])(s,c,a,!1,null,"e53eed2e",null);e["default"]=h.exports},a0bb:function(t,e,i){"use strict";i("e35c")},e35c:function(t,e,i){}}]);
//# sourceMappingURL=chunk-6d5fb1d4.14ed63ab.js.map