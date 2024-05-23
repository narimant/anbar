<?php

namespace App\Http\Resources;

use App\Models\PeopleCategory;
use Illuminate\Http\Resources\Json\JsonResource;

class PeopleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        // return parent::toArray($request);
        return [
            'id'=>$this->id,
            'peopleCategoryName'=>new PeopleCategoryResource($this->whenLoaded('peopleCategory')),
            'peopleCategoryId'=>$this->people_category_id,
            'name'=>$this->name ,
            'family'=>$this->family ,
            'father_name'=>$this->father_name,
            'postal_code'=>$this->postal_code,
            'people_type'=>$this->people_type,
            'phone'=>$this->phone,
            'email'=>$this->email,
            'address'=>$this->address,
        ];
    }
}
