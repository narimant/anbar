<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductCategoryResource;
use App\Models\ProductCategory;
use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $productCategory=ProductCategory::orderBy('id','desc')->paginate(10);
   
        return  [
            'data'=>ProductCategoryResource::collection($productCategory),
            'link'=>ProductCategoryResource::collection($productCategory)->response()->getData()->links,
            'meta'=>ProductCategoryResource::collection($productCategory)->response()->getData()->meta,
        ];
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       
        $validate = Validator::make($request->all(), [
             'name' => 'required|max:125|unique:product_categories,name',
        ]);
        if ($validate->fails()) {
            
            return response()->json(['status'=>'error','messages' => $validate->messages()], 403);
        }

       try{
        $productCategoryCreate=ProductCategory::create([
            "name"=>$request->name,
        ]);
        return response()->json(['status'=>'success','message'=>"گروه مورد نظر با موفقیت ایجاد شد"],201);
       }
       catch(Exception $e){
        return response()->json(['status'=>'error','message'=>$e->getMessage()],403);
       }

        return response()->json(['status'=>'success','message'=>'گروه مورد نظر با موفقیت ایجاد شد','data'=>$productCategoryCreate],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try{
            $peopleCategory=ProductCategory::findOrFail($id);
          return new ProductCategoryResource($peopleCategory);
        }catch(Exception $e){
            return response()->json(['status'=>'error','message'=>'گروه مورد نظر یافت نشد'],404);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required|max:125|unique:product_categories,name',
        ]);
        if ($validate->fails()) {
            return response()->json(['status'=>'error','messages' => $validate->messages()], 403);
        }

        try{
          
            $productCategory=ProductCategory::findOrFail($id);
            $productCategory->name=$request->name;
            $productCategory->save();
            return response()->json(['status'=>'success','message'=>'گروه مورد نظر با موفقیت آپدیت شد','data'=>new ProductCategoryResource($productCategory)],200);
        }
        catch(Exception $e){
            return response()->json(['status'=>'error','message'=>$e->getMessage()],404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try{
            if($productCategory=ProductCategory::find($id)){
                $productCategory->delete();
            }
            return response()->json(['status'=>'success','message'=>'گروه مورد نظر با موفقیت حذف شد','data'=>new ProductCategoryResource($productCategory)],200);
        }catch(QueryException $e){
            return response()->json(['status'=>'error','message'=>"شما نمیتوانید این گروه را حذف کنید چون برای این گروه کالاهایی تعریف شده است"],404);
        }
    }


    public function search($query){
        $productCategory=ProductCategory::where('name','like',"%{$query}%")->paginate(10);
        return  [
            'data'=>ProductCategoryResource::collection($productCategory),
            'link'=>ProductCategoryResource::collection($productCategory)->response()->getData()->links,
            'meta'=>ProductCategoryResource::collection($productCategory)->response()->getData()->meta,
        ];
    }
}
