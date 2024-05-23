<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\PeopleResource;
use App\Models\People;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PeopleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $people = People::orderBy('id','desc')->paginate(10);

        return  [
            'data'=>PeopleResource::collection($people->load('peopleCategory')),
            'link'=>PeopleResource::collection($people)->response()->getData()->links,
            'meta'=>PeopleResource::collection($people)->response()->getData()->meta,
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
            'name' => 'required|max:125|unique:people,name',
            'people_category_id' => 'required|numeric|exists:people_categories,id',
                "people_type"=>"required|numeric|in:0,1"
        ]);
        if ($validate->fails()) {
            return response()->json(['status'=>'error','messages' => $validate->messages()], 403);
        }

       try{
        $pepoleCreate=People::create([
            "people_category_id"=>$request->people_category_id,
            "name"=>$request->name,
            "family"=>$request->family,
            "father_name"=>$request->father_name,
            "postal_code"=>$request->postal_code,
            "people_type"=>$request->people_type,
            "phone"=>$request->phone,
            "email"=>$request->email,
            "address"=>$request->address,

        ]);
       }
       catch(Exception $e){
        return response()->json(['status'=>'error','message'=>$e->getMessage()],403);
       }

        return response()->json(['status'=>'success','message'=>'شخص مورد نظر با موفقیت ایجاد شد','data'=>$pepoleCreate],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($person)
    {
        try{
            $personData=People::findOrFail($person);
          return new PeopleResource($personData->load('peopleCategory'));
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
    public function update(Request $request,$person)
    {
        $validate = Validator::make($request->all(), [
            'name' => 'required|max:125',
            'people_category_id' => 'required|numeric|exists:people_categories,id',
                "people_type"=>"required|numeric|in:0,1"
        ]);
        if ($validate->fails()) {
            return response()->json(['status'=>'error','messages' => $validate->messages()], 403);
        }
       

        try{
          
            $personData=People::findOrFail($person);
            $personData->name=$request->name;
            $personData->people_category_id=$request->people_category_id;
            $personData->family=$request->family;
            $personData->father_name=$request->father_name;
            $personData->postal_code=$request->postal_code;
            $personData->people_type=$request->people_type;
            $personData->phone=$request->phone;
            $personData->email=$request->email;
            $personData->address=$request->address;
            $personData->save();
          return response()->json(['status'=>'success','message'=>'شخص مورد نظر با موفقیت آپدیت شد','data'=>new PeopleResource($personData->load('peopleCategory'))],200);
        }catch(Exception $e){
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
        if($people=People::find($id)){
            $people->delete();
        }
        else
        {
            return ['not find'];
        }
    }

    public function search($query){
        $people=People::where('name','like',"%{$query}%")->paginate(10);
        return  [
            'data'=>PeopleResource::collection($people->load('peopleCategory')),
            'link'=>PeopleResource::collection($people)->response()->getData()->links,
            'meta'=>PeopleResource::collection($people)->response()->getData()->meta,
        ];
    }
}
