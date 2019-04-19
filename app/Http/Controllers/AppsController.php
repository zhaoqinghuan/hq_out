<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\App;
use QrCode;

class AppsController extends Controller
{
    public function index(App $app, Request $request)
    {
        $app = $app->where('union', $request->union)->first();

        if(!is_null($app)){
            $url = getenv('APP_URL');
            $app->image = $url.'/uploads/'.$app->image;
            $app->path = $url.'/uploads/'.$app->path;
            $app->union =  QrCode::format('png')
                ->size(300)
                ->margin(0)
                ->generate($url.'/'.$app->union);
            return view('apps.index',compact('app'));
        }else{
            echo '<h1>不存在该应用</h1>';
        }

    }
}
