<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'category';

    protected $guarded = array('id', 'created_at','updated_at');
}
