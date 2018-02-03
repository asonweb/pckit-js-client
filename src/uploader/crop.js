/**
 * Created by mac on 2018/1/20.
 */


define(function (require) {
    var $ = require('jquery');
    require('lib/uploader/Jcrop.min.js');
    require('lib/uploader/Jcrop.min.css');

    return {
        crop:function (el,w,h,cb) {
            $('#'+el).Jcrop({
                bgColor:'#333',   //选区背景色
                bgFade:true,      //选区背景渐显
                fadeTime:1000,    //背景渐显时间
                allowSelect:false, //是否可以选区，
                allowResize:true, //是否可以调整选区大小
                aspectRatio: 1,     //约束比例
                minSize : [160,160],
                boxWidth : w,
                boxHeight : h,
                onChange: cb,
                onSelect: cb,
                setSelect:[ 0, 0, 200, 200],
            });
        }
    }
})