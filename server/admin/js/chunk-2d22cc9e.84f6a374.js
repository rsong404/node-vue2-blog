(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22cc9e"],{f570:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("button",{attrs:{id:"button"},on:{click:e.AddWebsite}},[e._v("新增站点")]),n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData}},[n("el-table-column",{attrs:{label:"类型",width:"280"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.type))])]}}])}),n("el-table-column",{attrs:{label:"网站名称",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.websiteName))])]}}])}),n("el-table-column",{attrs:{label:"网址",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.website))])]}}])}),n("el-table-column",{attrs:{label:"时间",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",{staticStyle:{"margin-left":"10px"}},[e._v(e._s(t.row.time))])]}}])}),n("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{size:"mini",type:"danger"},on:{click:function(n){return e.handleDelete(t.row._id)}}},[e._v("删除")])]}}])})],1)],1)},r=[],s=n("1da1"),c=(n("96cf"),{name:"CateList",inject:["reload"],data:function(){return{tableData:[]}},methods:{GetDate:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("/website");case 2:n=t.sent,e.tableData=n.data.reverse();case 4:case"end":return t.stop()}}),t)})))()},AddWebsite:function(){this.$router.push({name:"createWebsite"})},handleDelete:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:t.$confirm("确定删除该站点吗？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(s["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$http.delete("/website",{params:{_id:e}});case 2:t.$message({type:"success",message:"删除成功!"}),t.reload();case 4:case"end":return n.stop()}}),n)})))).catch((function(){t.$message({type:"info",message:"已取消删除"})}));case 1:case"end":return n.stop()}}),n)})))()}},created:function(){this.GetDate()}}),i=c,u=n("2877"),l=Object(u["a"])(i,a,r,!1,null,null,null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d22cc9e.84f6a374.js.map