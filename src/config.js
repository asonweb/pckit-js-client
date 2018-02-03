
var alias = {
    "jquery": "lib/jquery1.10.js",
    "layer": "lib/layer/layer.js",
    "layer.css": "lib/layer/theme/default/layer.css",
    "message": "lib/message/index.js",
    "validator.css": "lib/validator/form.validator.css",
    "validator": "lib/validator/form.validator.js",
    "popup": "lib/popup/index.js",
    "table": "lib/table/table.js",
    "uploader.css": "lib/uploader/webuploader/webuploader.css",
    'uploader':'lib/uploader/image.js',
}

if(typeof sea_alias!='undefined'){
    for(var i in sea_alias){
        alias[i] = sea_alias[i]
    }
}

seajs.config({
    base: "/static",
    alias:alias,
});

seajs.use(['jquery'],function ($) {
    $(document).ajaxComplete(function (e,xhr) {
        if(xhr.responseText.indexOf('10005')>0){
            location.href ='';
        }
    })
})

//app全局对象
define('wxmall',function () {
    window.wxmall =  {
        token:'__token__',
    }
    return window.wxmall;
})
seajs.use(['validator.css','layer.css'])