/**
 * 全局消息提示
 */
define(function (require) {
    var layer = require('layer')

    return {
        popupForm:function (title,content,yes,no) {
            layer.open({
                type: 1,
                title:title,
                content:content,
                area: ['500px'],
                btn:['提交','取消'],
                yes:yes,
                cancel:no,
                move:false,
            })
        },
        open:function (title,content,w) {
            var type;

            if(!w){
                w='500px';
            }

            if(typeof content =='string' &&content.indexOf('/')==0){
                type=2;
                content = [content,'no'];
            }else{
                type=1;
            }

            return layer.open({
                type: type,
                title:title,
                content:content,
                area: [w],
                move:false,
                success:function (current,index) {
                    if(type==2){
                        layer.iframeAuto(index);
                        var top = parseInt((document.documentElement.clientHeight - current.height())/2) + 'px'
                        layer.style(index,{
                            top:top,
                        })
                    }
                }
            })
        },
        close:function (index) {
            layer.close(index)
        }
    }
})