<?php

namespace App\Admin\Controllers;

use App\Models\App;
use App\Http\Controllers\Controller;
use Encore\Admin\Controllers\HasResourceActions;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Layout\Content;
use Encore\Admin\Show;
use QrCode;

class AppsController extends Controller
{
    use HasResourceActions;

    /**
     * Index interface.
     *
     * @param Content $content
     * @return Content
     */
    public function index(Content $content)
    {
        return $content
            ->header('应用列表')
            ->body($this->grid());
    }

    /**
     * Show interface.
     *
     * @param mixed $id
     * @param Content $content
     * @return Content
     */
    public function show($id, Content $content)
    {
        return $content
            ->header('Detail')
            ->description('description')
            ->body($this->detail($id));
    }

    /**
     * Edit interface.
     *
     * @param mixed $id
     * @param Content $content
     * @return Content
     */
    public function edit($id, Content $content)
    {
        return $content
            ->header('Edit')
            ->description('description')
            ->body($this->form()->edit($id));
    }

    /**
     * Create interface.
     *
     * @param Content $content
     * @return Content
     */
    public function create(Content $content)
    {
        return $content
            ->header('添加应用')
            ->body($this->form());
    }

    /**
     * Make a grid builder.
     *
     * @return Grid
     */
    protected function grid()
    {
        $path = config('app.url');

        $grid = new Grid(new App);

        $grid->id('Id')->sortable();
        $grid->image('Icon')->image($path.'/uploads/', 50, 50);
        $grid->name('应用名称');
        $grid->union('下载地址')->popover('right');
        $grid->created_at('创建时间');
        $grid->disableFilter();
        $grid->disableExport();

        $grid->actions(function ($actions) {
            $actions->disableView();
            $actions->disableEdit();
        });
        $grid->tools(function ($tools) {
            // 禁用批量删除按钮
            $tools->batch(function ($batch) {
                $batch->disableDelete();
            });
        });


        return $grid;
    }

    /**
     * Make a show builder.
     *
     * @param mixed $id
     * @return Show
     */
    protected function detail($id)
    {
        $show = new Show(App::findOrFail($id));

        $show->id('Id');
        $show->image('Image');
        $show->path('Path');
        $show->name('Name');
        $show->created_at('Created at');
        $show->updated_at('Updated at');

        return $show;
    }

    /**
     * Make a form builder.
     *
     * @return Form
     */
    protected function form()
    {
        $form = new Form(new App);

        $form->image('image', '应用ICON')->uniqueName()->rules('required|image');
        $form->file('path', '应用上传')->uniqueName()->rules('required');
        $form->text('name', '应用名称')->rules('required');


        //  自定义事件
        $form->saving(function (Form $form) {

            $form->model()->union = str_random(4);
        });
        return $form;
    }
}
