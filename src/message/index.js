/**
 * 全局消息提示
 */
define(function (require) {
    var layer = require('layer'),
        loading;

    return {
        /**
         * 成功提示
         * @param string msg
         * @param Function cb  确定按钮的回调
         */
        success:function (msg,cb) {
            layer.alert(msg, {icon: 1},function (index) {
                layer.close(index);
                cb && cb(index);
            })
        },
        error:function (msg) {
            layer.alert(msg, {icon: 2},function (index) {
                layer.close(index);
            })
        },
        toast:function (msg) {
            layer.msg(msg)
        },
        confirm:function (title,btns,cb) {
            layer.confirm(title,btns, function(index){
                cb && cb()
                layer.close(index);
            });
        },
        fail:function () {
            layer.alert('错误或暂不可用', {icon: 2})
        },
        loading:function (state) {
            if(!state){
                layer.close(loading);
                loading = null;
            }else{
                if(loading){
                    layer.close(loading)
                }
                loading = layer.load(1);
            }
        }
    }
})