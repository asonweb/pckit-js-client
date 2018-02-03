/**
 * 表格
 *
 * 基于 bootstraptable
 * 建议使用这个表格模块，datatable感觉不好用，配置复杂不灵活太臃肿不够简洁
 * bootstraptable 简洁文件小，更合适
 *
 * 基于 bootstrap table
 */
define(function (require,exports,module) {
    var $ = require('jquery');
    require('./bootstraptable/bootstrap-table.min');

    return {
        create:function (id,api,query,btns) {  //客户端 xhr api 拉数据生成表格
            if(btns){
                this.btns(btns)
            }

            if(!api){
                api = $('#'+id).data('url');
            }

            return $('#'+id).bootstrapTable({
                url:api,
                sidePagination:'server',
                totalField:'total',
                dataField:'list',
                queryParams:function (params) {
                    return $.extend({offset:params.offset},query)
                },
                pagination:true,
            })
        },
        btns:function (btns) {
            var el = btns.el,
                evetns = btns.events,
                actions = btns.btns;

            $("#"+el).data('events',btns.events);

            $("#"+el).data('formatter',function (value,row,index) {
                list = [];
                for(var i in actions){
                    list.push(actions[i].formatter(row));
                }
                return list.join(' ');
            })
        },
        render:function (id) {  //todo 渲染服务器已输出的表格

        }
    }
})