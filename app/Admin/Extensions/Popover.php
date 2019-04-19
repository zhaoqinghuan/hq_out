<?php

namespace App\Admin\Extensions;

use Encore\Admin\Admin;
use Encore\Admin\Grid\Displayers\AbstractDisplayer;

class Popover extends AbstractDisplayer
{
    public function display($path='')
    {
        $path = config('app.url');
        $href= $path.'/'.$this->value;
        return <<<EOT
        
        <a href="{$href}" target="_blank">$href</a>
EOT;

    }
}