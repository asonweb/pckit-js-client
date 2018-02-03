/**
 * Created by mac on 2018/1/15.
 */

define(function (require,exports,module) {
    var $ = require('jquery'),currentPay,channel,currentPayName,popupWindow,timer,check_url,back_url;

    var message = require('message');
    var popup = require('popup');

    return {
        url:'',
        form:'',
        number:'',
        transNumber:'',
        main:function (el) {
            window.payModule = this;
            var self=this,
                $form = $("#" + el),
                url = $form.attr('action');

            self.url = url;
            self.form = $form;
            check_url = $form.find('[name=check_url]').val();
            back_url = $form.find('[name=back_url]').val();
            self.number = $form.find('[name=id]').val();

            $(".closeBtn").on('click',function () {
                popup.close(popupWindow);
                if(timer){
                    clearInterval(timer)
                }
            })

            $(".comPay").on('click',function () {
                self.onPaySuccessCheck();
            })

            $('.payment-area').on('click',function () {
                $(this).find(":radio").prop('checked',true);
                currentPay = $(this).find(":radio").val();
                currentPayName = '正在支付...';
                $("#channel").val($(this).data('channel'))
            })

            $('#goPay').on('click',function () {
                //没有选择，点击确认支付方式
                if(typeof currentPay == 'undefined'){
                    message.error('请选择支付方式');
                    return false;
                }

                message.loading(true)

                //微信直接显示二维码
                if(currentPay == 'wx.scan'){
                    self.popupCode(currentPayName,$('#wchatQrcodeDlg'),function (res) {
                        self.transNumber = res.id;
                        $('#wchatQrcodeDlg .erweima')
                            .attr('src',res.pay_code);
                        self.getPayResult()
                    },'700px');
                    return false;
                }

                //转账直接显示转账信息
                if(currentPay=='transfer'){
                    self.onTransfer(url,$form.serialize());
                }

                if(currentPay=='alipay.web'){
                    message.loading(false);
                    popupWindow = popup.open(currentPayName,$('#confirm_pay'));
                    self.form.submit();
                    self.getPayResult();
                    return false;
                }

                return false;
            })
        },
        run:function (el) {
            window.payModule = this;
            var self=this,
                $form = $("#" + el),
                url = $form.attr('action');

            self.url = url;
            self.form = $form;
            check_url = $form.find('[name=check_url]').val();
            back_url = $form.find('#pay_back_url').val();

            $(".closeBtn").on('click',function () {
                popup.close(popupWindow);

                if(timer){
                    clearInterval(timer)
                }
            })

            $(".comPay").on('click',function () {
                self.onPaySuccessCheck();
            })

            $('.payment-area').on('click',function () {
                $(this).find(":radio").prop('checked',true);
                currentPay = $(this).find(":radio").val();
                currentPayName = '正在支付...';
                channel = $(this).data('channel');
                $("#channel").val(channel)
            })

        },
        add:function (form) {
            var self = this,
                metadata = $("#metadata"),
                query_str = $(form).serialize(),
                url = metadata.find('[name=url]').val();

            if(currentPay =='wx.scan'){
                this.onWxScan(url,query_str);
                return;
            }

            if(currentPay=='transfer'){
                this.onTransfer(url,query_str);
                return ;
            }

            popupWindow = popup.open(currentPayName,$('#confirm_pay'))
            form.submit();
            self.getPayResult();
            return false;
        },
        isValid:function () {
            //没有选择，点击确认支付方式
            if(typeof currentPay == 'undefined'){
                message.error('请选择支付方式');
                return null;
            }else{
                return true;
            }
        },
        popupCode:function (title,content,success,w) {
            $.post(this.url,this.form.serialize())
                .done(function (res) {
                    message.loading(false);

                    if(res.hasOwnProperty('pay_code')){
                        popupWindow = popup.open(title,content,w)
                        success && success(res)
                        return;
                    }

                    if(res.hasOwnProperty('code') && res.code >0){
                        message.error(res.message)
                    }
                })
                .fail(function () {
                    message.fail()
                })
        },
        getPayResult:function(){
            var self = this
            timer = setInterval(function () {
                $.get(check_url,{id:self.transNumber},function (res) {
                    if(res.hasOwnProperty('payed')){
                        if(res.message=='success'){
                            self.onPaySuccess();
                        }
                    }
                })
            },3000);
        },
        onPaySuccess:function () {
            if(timer){
                clearInterval(timer)
            }
            location.href = back_url;
        },
        onPaySuccessCheck:function () {
            if(timer){
                clearInterval(timer)
            }

            location.href = back_url;
        },
        onWxScan:function (url,query_str) {
            var self = this;

            message.loading(true);

            $.post(url,query_str)
                .done(function (res) {
                    //保存交易单号id
                    self.transNumber = res.id;
                    self.getPayResult();

                    $('#wchatQrcodeDlg .erweima')
                        .attr('src',res.pay_code);
                    popupWindow = popup.open(currentPayName,$('#wchatQrcodeDlg'),'700px');

                    return false;
                })
                .always(function () {
                    message.loading(false);
                })
        },
        onTransfer:function (url,data) {
            var self = this;
            message.loading(true);
            $.post(url,data)
                .done(function (res) {
                    message.loading(false);

                    if(res.hasOwnProperty('type')){
                        popupWindow = popup.open('银行转账',$('#transferContentView'));
                        return;
                    }

                    if(res.hasOwnProperty('code') && res.code >0){
                        if(res.message =='exist'){
                            popupWindow = popup.open('银行转账',$('#transferContentView'));

                        }else{
                            message.error(res.message)
                        }
                    }
                })
                .fail(function () {
                    message.fail()
                })
        }
    }
})