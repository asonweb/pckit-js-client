/**
 * Created by mac on 2018/1/14.
 */

/**
 * 上传图片模块
 * ---
 * 基于webuploader
 */
define(function (require,exports,module) {
    var $ = require('jquery'),
        BASE_URL='';

    require('./webuploader/webuploader.min.js');

    exports.create = function (url,element,data,success) {
        var ui = $('#'+element);

        var uploader = WebUploader.create({
            auto:true,
            // swf文件路径
            swf: BASE_URL + '/webuploader/Uploader.swf',

            // 文件接收服务端。
            server: url,

            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: ui.find('.picker'),

            // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
            resize: false,
            thumb:{
                width:200,
                height:200,
                quality: 100,
                // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
                allowMagnify: false,
                // 是否允许裁剪。
                crop: false,
                // 为空的话则保留原有图片格式。
                // 否则强制转换成指定的类型。
                type: 'image/jpeg'
            },
            formData:data,
        });

        uploader.on( 'fileQueued', function( file ) {
            var $img = ui.find('img');
            // 创建缩略图
            // 如果为非图片文件，可以不用调用此方法。
            // thumbnailWidth x thumbnailHeight 为 100 x 100
            uploader.makeThumb( file, function( error, src ) {
                if ( error ) {
                    $img.replaceWith('<span>不能预览</span>');
                    return;
                }

                $img.attr( 'src', src );
            });
        });

        uploader.on( 'uploadSuccess', function( file,response ) {
            ui.find('[type=hidden]').val(response.path);
            success && success(response.path);
        });

        return uploader
    }
})