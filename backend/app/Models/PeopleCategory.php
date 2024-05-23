<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PeopleCategory extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function people(){
        return $this->hasMany(People::class);
    }
}
