var isNeedLoginCaptcha = undefined;
var clickAble = true;
var countTimers = undefined;
var verifyBtnList = {};
var verifyObjList = {};
var eleParams = [];

var bindFun = function(e) {
    // 获取当前btn的id
    var currentBtn = $(e.currentTarget).attr('id');
    var action = $(e.currentTarget).attr('data-action');
    eleParams = [];

    if (!clickAble) {
        return false;
    }

    /*** 登录 ***/
    var pathname = window.location.pathname;
    var needVerifyEmail = false;
    if(pathname.indexOf('/user/login') != -1) {
        if(!$("#loginByTel").hasClass('hide') && !$("#tel").val()) {
            $('em[for="tel"]').css('display', 'block').text(telHolder);
            return false;
        }
    }
    /*** 登录 ***/

    /*** 注册 ***/
    if(pathname.indexOf('/user/register') != -1) {
        if($("#tel-register").hasClass('active') && !$("#tel").val()) {
            $('em[for="tel"]').css('display', 'block').text(telHolder);
            return false;
        }

        if($("#tel-register").hasClass('active')) {
            var tel = $('#tel').val();
            var callingCode = $('#callingCode').val();
            var isValidateTel = validateTel(tel, callingCode);
            if(!isValidateTel) {
                return false;
            }
        }

        if($("#email-register").hasClass('active') && !$("#email").val()) {
            $('em[for="email"]').css('display', 'block').text(emailHolder);
            return false;
        }

        if($("#email-register").hasClass('active') && $("#email").val()) {
            needVerifyEmail = true;
        }
    }
    /*** 注册 ***/

    /*** 认证 ***/
    if(pathname.indexOf('/account/certification') != -1) {
        var isValidateTel = true;

        if(currentBtn == 'getCode') {
            var tel = $('#tel').val();
            var callingCode = $('#callingCode').val();
            isValidateTel = validateTel(tel, callingCode);
            var errorEm = $('em[for="tel"]');
        } else if(currentBtn == 'editTelGetCode') {
            var tel = $('#telNew').val();
            var callingCode = $('#callingCodeChange').val();
            isValidateTel = validateTel(tel, callingCode);
            var errorEm = $('em[for="telNew"]');
        } else if(currentBtn == 'getEmailCode') {
            needVerifyEmail = true;
            if(!$('#email').val()) {
                var errorEm = $('em[for="email"]');
                errorEm.css('display','block').text(emailHolder);
                return false;
            }
        }

        if(!isValidateTel) {
            $('em.invalid').text('');
            errorEm.css('display','block').text(telErrorTips);
            return false;
        }
    }
    /*** 认证 ***/

    /*** 修改资料前验证 ***/
    if(pathname.indexOf('/account/verifyIdentity') != -1) {
        if(!$("#tel").val()) {
            $('em[for="tel"]').css('display', 'block').text(telHolder);
            return false;
        }

        var isCorrectTel = true;
        var form = $('#verifyForm');
        var flag = 'verify';
        eleParams.push(form, flag);

        $.ajax({
            // 获取id，challenge，success（是否启用failback）
            url: "/account/verifyInfo",
            type: "post",
            async: false,
            dataType: "json",
            data: {value: $("#tel").val(),
                   flag:'tel',
                   callingCode:$("#callingCode").val()},
            success: function (result) {
                if(!result) {
                    $("em.invalid").text('');
                    $('em[for="tel"]').css('display', 'block').text(telIncorrectTips);
                    isCorrectTel = false;
                }
            }
        });

        if(!isCorrectTel) {
            return false;
        } else {
            $("#getCode").attr('disabled', false);
        }
    }
    /*** 修改资料前验证 ***/

    /*** 修改email ***/
    if(pathname.indexOf('/account/editEmail') != -1) {
        if(!$("#pwdforemail").val()) {
            $('label[for="pwdforemail"]').css('display', 'block').text(pwdHolder);
        }

        if(!$("#email").val()) {
            $('label[for="email"]').css('display', 'block').text(emailHolder);
            return false;
        }

        needVerifyEmail = true;
    }
    /*** 修改email ***/

    /*** 修改手机***/
    if(pathname.indexOf('/account/editTel') != -1) {
        var form = $('#editTelForm');
        var flag = 'changeTel';
        eleParams.push(form, flag);

        if (!$('#tel').valid()) {
            return false;
        }

        if(!$("#tel").val()) {
            $('label[for="tel"]').css('display', 'block').text(telHolder);
            return false;
        }

        var tel = $('#tel').val();
        var callingCode = $('#callingCode').val();
        var isValidateTel = validateTel(tel, callingCode);
        if(!isValidateTel) {
            $('label.invalid').text('');
            $('label[for="tel"]').css('display','block');
            $('label[for="tel"]').text(telErrorTips);
            return false;
        }
    }
    /*** 修改手机***/

    /*** 修改认证资料 ***/
    if(pathname.indexOf('/account/index') != -1) {
        var form = $('#verifyUserTelForm');
        eleParams.push(form);
    }
    /*** 修改手机***/

    /*** 邮箱找回密码 ***/
    if(pathname.indexOf('/user/forgetPassword') != -1
       || pathname.indexOf('/user/activeEmail') != -1) {
        if(!$("#email").val()) {
            $('em[for="email"]').css('display', 'block').text(emailHolder);
            return false;
        }
        needVerifyEmail = true;
    }
    /*** 邮箱找回密码 ***/

    /*** 手机找回密码 ***/
    if(pathname.indexOf('/user/findPasswordByPhone') != -1) {
        if(!$("#tel").val()) {
            $('em[for="tel"]').css('display', 'block').text(telHolder);
            return false;
        }
    }
    /*** 手机找回密码 ***/

    /*** 外包 ***/
    if(pathname.indexOf('/outsource') != -1) {
        if(!$("#tel").valid()) {
            return false;
        }
        createCaptcha(currentBtn, action, false);
    }
    /*** 外包 ***/

    /*** 提现 ***/
    if(pathname.indexOf('/account/withdraw') != -1) {
        if(!$("#mobile").val()) {
            $('em[for="mobile"]').css('display', 'block').text(telErrorTips);
            return false;
        }
    }
    /*** 提现 ***/

    if(!validateEmail($("#email").val()) && needVerifyEmail) {
        $('em[for="email"]').css('display', 'block').text(emailErrorTips);
        return false;
    }

    if (!action) {
        alert('未找到方法');
        return false;
    }

    createCaptcha(currentBtn, action);
    return true;
};

function createCaptcha(currentBtn, action, display) {
    display = typeof display === "undefined" ? true : display;
    if (!currentBtn || !action) {
        alert('参数错误');
        return false;
    }

    var needCreate = true;
    if(verifyBtnList[currentBtn]) {
        needCreate = false;
    } else {
        verifyBtnList[currentBtn] = true;
    }

    if(needCreate) {
        var captcha = new TencentCaptcha(
            document.getElementById(currentBtn),
            TENCENT_CAPTCHA_APP_ID,
            function(res) {
                // 关闭验证弹窗
                if (res.ret == 2) {
                    return false;
                }

                var params = eleParams.length ? eleParams.slice() : [];
                var validate = {'ticket':res.ticket,
                                'controller': CONTROLLER,
                                'appID': TENCENT_CAPTCHA_APP_ID,
                                'randstr':res.randstr};
                params.unshift(validate);
                execFun(action, params);
            },
            { bizState: '自定义透传参数' }
        );
        verifyObjList[currentBtn] = captcha;
    }

    if (display && needCreate) {
        verifyObjList[currentBtn].show();
    }
}

$("#getCode, #getEmailCode, #editTelGetCode").unbind('click', bindFun).bind('click', bindFun);

function execFun(action, params, isNeedNVCVal) {
    isNeedNVCVal = typeof isNeedNVCVal === "undefined" ? true : isNeedNVCVal;
    window[action].apply(this, params);
}

function validateEmail(email) {
    var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
}
