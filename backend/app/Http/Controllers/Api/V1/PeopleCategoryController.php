<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\PeopleCategoryResource;
use App\Models\PeopleCategory;

use Exception;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator ;

class PeopleCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $peopleCategory=PeopleCategory::orderBy('id','desc')->paginate(10);

        
        return  [
            'data'=>PeopleCategoryResource::collection($peopleCategory),
            'link'=>PeopleCategoryResource::collection($peopleCategory)->response()->getData()->links,
            'meta'=>PeopleCategoryResource::collection($peopleCategory)->response()->getData()->meta,
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
            'name' => 'required|max:125|unique:people_categories,name',


        ]);
        if ($validate->fails()) {
            return response()->json(['status'=>'error','messages' => $validate->messages()], 403);
        }

       try{
        $pepoleCreate=PeopleCategory::create([
            "name"=>$request->name,
        ]);
       }
       catch(Exception $e){
        return response()->json(['status'=>'error','message'=>$e],403);
       }

        return response()->json(['status'=>'success','message'=>'گروه مورد نظر با موفقیت ایجاد شد','data'=>$pepoleCreate],200);
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
            $peopleCategory=PeopleCategory::findOrFail($id);
          return new PeopleCategoryResource($peopleCategory);
        }catch(Exception $e){
            return response()->json(['status'=>'error','message'=>'شخص مورد نظر یافت نشد'],404);
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
            'name' => 'required|max:125',
        ]);
        if ($validate->fails()) {
            return response()->json(['status'=>'error','messages' => $validate->messages()], 403);
        }

        try{
          
            $peopleCategory=PeopleCategory::findOrFail($id);
            $peopleCategory->name=$request->name;
            $peopleCategory->save();
            return response()->json(['status'=>'success','message'=>'گروه مورد نظر با موفقیت آپدیت شد','data'=>new PeopleCategoryResource($peopleCategory)],200);
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
            if($peopleCategory=PeopleCategory::find($id)){
                $peopleCategory->delete();
            }
            return response()->json(['status'=>'success','message'=>'گروه مورد نظر با موفقیت حذف شد','data'=>new PeopleCategoryResource($peopleCategory)],200);
        }catch(QueryException $e){
            return response()->json(['status'=>'error','message'=>"شما نمیتوانید این گروه را حذف کنید چون برای این گروه اشخاصی تعریف شده است"],404);
        }
    }


    public function search($query){
        $peopleCategory=PeopleCategory::where('name','like',"%{$query}%")->paginate(10);
        return  [
            'data'=>PeopleCategoryResource::collection($peopleCategory),
            'link'=>PeopleCategoryResource::collection($peopleCategory)->response()->getData()->links,
            'meta'=>PeopleCategoryResource::collection($peopleCategory)->response()->getData()->meta,
        ];
    }
}
