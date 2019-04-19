<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>安智市场</title>
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no minimal-ui">
    <link rel="stylesheet" href="./out_files/header_include.min.css">
    <link rel="stylesheet" href="./out_files/appView.css">
    <link rel="stylesheet" href="./out_files/viewColorful.css">
    <style>

        table.app_view_history td {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            word-wrap: break-word;
            text-align: center;
        }
    </style>
    <style type="text/css">
        @keyframes animate_dots{
            0%{opacity:1}to{opacity:0}
        }
        @-webkit-keyframes animate_dots{
            0%{opacity:1}to{opacity:0}
        }
        .dot0,.dot1{
            animation:animate_dots .9s infinite;
            -moz-animation:animate_dots .9s infinite;
            -webkit-animation:animate_dots .9s infinite;
            -o-animation:animate_dots .9s infinite
        }
        .dot1{
            animation-delay:.2s;
            -webkit-animation-delay:.2s
        }
        .dot2{
            animation:animate_dots .9s infinite;
            -moz-animation:animate_dots .9s infinite;
            -webkit-animation:animate_dots .9s infinite;
            -o-animation:animate_dots .9s infinite;
            animation-delay:.4s;
            -webkit-animation-delay:.4s
        }
        .dots_item{
            display:inline-block;
            margin-right:5px;
            width:10px;
            height:10px;
            border-radius:50%;
            background:#4886ff
        }
        .verify-icon{
            position:absolute;
            width:100%;
            margin-top:70px;
            text-align:center
        }
        .t-mask{
            width:100%;
            height:100%;
            position:fixed;
            _position:absolute;
            left:0;
            top:0;
            background:#000;
            opacity:.5;
            filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);
            z-index:2000000000
        }
    </style>
    <style type="text/css">._th-container ._th-item{margin-bottom:3px;position:relative;width:30px;height:30px;cursor:pointer;opacity:.3;background-color:aquamarine;border-radius:100%;text-align:center;line-height:30px;-webkit-transition:all .5s;-o-transition:all .5s;transition:all .5s;right:30px}._th-container ._th-item._item-x2{margin-left:18px;width:40px;height:40px;line-height:40px}._th-container ._th-item._item-x-2{margin-left:17px;width:38px;height:38px;line-height:38px}._th-container ._th-item._item-x4{width:36px;height:36px;margin-left:16px;line-height:36px}._th-container ._th-item._item-x-4{width:32px;height:32px;line-height:32px;margin-left:14px}._th-container ._th-item._item-reset{width:30px;line-height:30px;height:30px;margin-left:10px}._th-click-hover{position:relative;-webkit-transition:all .5s;-o-transition:all .5s;transition:all .5s;height:50px;width:50px;cursor:pointer;opacity:.3;border-radius:100%;background-color:aquamarine;text-align:center;line-height:50px;right:0}._th-container:hover{left:-10px}._th-container{font-size:12px;-webkit-transition:all .5s;-o-transition:all .5s;transition:all .5s;left:-40px;top:20%;position:fixed;-webkit-box-sizing:border-box;box-sizing:border-box;z-index:100000}._th-container ._th-item:hover{opacity:.8;background-color:#5fb492;color:aliceblue}._th-container:hover ._th-click-hover{opacity:.8}._th-container:hover ._th-item{opacity:.6;right:0}._th-container ._th-click-hover:hover{opacity:.8;background-color:#5fb492;color:aliceblue}._th_cover-all-show-times{position:fixed;top:0;right:0;width:100%;height:100%;z-index:99999;opacity:1;font-weight:900;font-size:30px;color:#4f4f4f;background-color:rgba(0,0,0,0.1)}._th_cover-all-show-times._th_hidden{z-index:-1;opacity:0;-webkit-transition:1s all;-o-transition:1s all;transition:1s all}._th_cover-all-show-times ._th_times{width:80px;height:80px;border-radius:80px;background-color:rgba(127,255,212,0.51);text-align:center;line-height:80px;position:absolute;top:50%;right:50%;margin-top:-40px;margin-right:-40px}
    </style>
</head>

<body style="" class="">
<!--=== BG ===-->
<div class="row-fluid  margin-bottom-20" style="z-index:-2;">
    <div id="header"></div>
</div>

<!--=== Content Part ===-->
<div class="container content">
    <div class="view row">
        <div class="span12 margin-bottom-30 " id="appicon-bg">
            <img src="{{ $app->image }}" class="appicon" onerror="javascript:this.src=&#39;https://static.pgyer.com/static-20190415/assets/img/default-icon.png&#39;;">
        </div>
        <div class="span12" style="text-align:center;padding-top:10px;">
            <h2 style="color:#333;size:24px;margin-bottom: -5px;">
                {{ $app->name }}
            </h2>
        </div>

        <div class="span12 gray-text " style="text-align:center;margin-bottom: 20px;">
        </div>
    </div>

    <div id="" class="view row margin-bottom-30 col-md-6 col-md-offset-3" style="padding-top:26px;">
        <div class="col-md-12">
            <div class="span12 gray-text" style="text-align:center;">
                <img src="data:image/png;base64, {!! base64_encode( $app->union ) !!}" class="qrcode ">
            </div>
        </div>
        <div class="col-md-12" style="margin-top:20px;">
            <div class="row mb-10 install-btn">
                <div class="span12 margin-bottom-20" style="text-align:center;">
                    <div class="spinner">
                        <a href=" {{ $app->path }}" id="down_load" class="btn-u btn-u-lg ">
                            <img src="./out_files/dl.png" class="hide">
                            点击安装
                        </a>
                    </div>
                </div>
            </div>

            <div class="span12 gray-text" style="text-align:center; ">
                <p style="padding-top:10px;color:#969b9d;">或者用手机扫描二维码安装</p>
            </div>
        </div>
    </div>
</div>
</body>
</html>