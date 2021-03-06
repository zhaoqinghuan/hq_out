<?php

use Illuminate\Routing\Router;

Admin::registerAuthRoutes();

Route::group([
    'prefix'        => config('admin.route.prefix'),
    'namespace'     => config('admin.route.namespace'),
    'middleware'    => config('admin.route.middleware'),
], function (Router $router) {
    $router->get('/', 'HomeController@index');
    $router->get('apps', 'AppsController@index');
    $router->get('apps/create', 'AppsController@create');
    $router->post('apps', 'AppsController@store');
    $router->delete('apps/{id}', 'AppsController@destroy');
});
