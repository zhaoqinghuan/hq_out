var countdown = 60;
function initGetCode() {
    var tel = $('#tel').val();
    var callingCode = $('#callingCode').val();
    var isValidateTel = validateTel(tel, callingCode);
    if(isValidateTel) {
        getCode(tel, callingCode);
    } else {
        $('em.invalid').text('');
        $('em[for="tel"]').css('display','block');
        $('em[for="tel"]').text(telErrorTips);
    }
}

function validateTel(tel, callingCode) {
    tel = tel.replace(/ /g, '');
    var length = tel.length;
    if (callingCode == CNCALLINGCODE) {
        var mobile = mobileRegCN;
        if (length == 11 && mobile.test(tel)) {
            return true;
        } else {
            return false;
        }
    } else {
        var mobile = mobileRegEN;
        if (mobile.test(tel)) {
            return true;
        } else {
            return false;
        }
    }
}

var timerList = [];
function settime(obj) {
    var ele = typeof obj === "undefined" ? $("#getCode") : obj;
    var id = ele.attr('id');
    timerList[id] == undefined ? (timerList[id] = 60) : '';
    if (timerList[id] == 0 || countdown == 0) {
        ele.text(codeRegain).removeClass('btn-u-default').removeAttr('disabled');
        timerList[id] = 60;
        countdown = 60;
    } else {
        ele.text(codeRegain + timerList[id] + second).addClass('btn-u-default').attr('disabled', 'disabled');
        timerList[id]--;
        countdown--;
        countTimers = setTimeout(function() {
            settime(ele);
        },1000);
    }
}

$(".countryItem").click(function () {
    var tel = $('#tel').val();
    var callingCode = $(this).parent().attr('data-calling-code');
    $('#callingCode').val(callingCode);
    $('#selectedCallingCode').html('+' + callingCode + '<span class="caret"></span>');
});

// 手机输入框添加统一的国家编码选择框样式,同时选择结果绑定给callingCode隐藏框
function telInput(id, callingCodeId)
{
    var intltelInput = document.querySelector(id);
    var intlSetedObj = null;
    if (intltelInput) {
        var intlSetedObj = window.intlTelInput(intltelInput, {
            // 默认选择
            initialCountry: 'cn',
            // 选择框顶部常用
            preferredCountries: ['cn', 'au', 'us'],
            // 显示编码
            separateDialCode: true,
            dropdownContainer: document.body,
            search: true,
        });

        // 选择callingCodeId已确定
        var countryData = window.intlTelInputGlobals.getCountryData();
        var defaultCode = $(callingCodeId).val();
        if (defaultCode) {
            for (var i in countryData) {
                if (countryData[i]['dialCode'] == defaultCode) {
                    intlSetedObj.setCountry(countryData[i]['iso2']);
                    break;
                }
            }
        }

        // 选择结果绑定到隐藏框
        intltelInput.addEventListener('countrychange', function() {
            $(callingCodeId).val(intlSetedObj.getSelectedCountryData().dialCode);
        });
        intltelInput.style = 'padding-left: 83px';
    }
}

$(function() {
    $('.telInput').each(function() {
        var id = '#' + $(this).attr('id');
        var callingCodeId = '#' + $(this).data('cc');
        telInput(id, callingCodeId);
    });
});
