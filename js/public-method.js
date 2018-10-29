/**
 * Created by xhgx on 2017/5/10.
 */

function Public(){
  return {
      view:function(){
          return{
              //w:可视区域的宽度    h:可视区域的高度
              w:document.documentElement.clientWidth,
              h1:document.documentElement.scrollHeight,
							h2:document.documentElement.clientHeight
          }
      }
  }
}



;(function(win){
    if(win["UDP"]){
        win["UDP"].Public = Public();
    }else{
        win.UDP = {Public:Public()};
    }
})(window);








































