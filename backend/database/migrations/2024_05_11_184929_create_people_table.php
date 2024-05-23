<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('people', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('people_category_id');
            $table->string('name',125)->unique();
            $table->string('family',125)->nullable();
            $table->string('father_name',125)->nullable();
            $table->string('postal_code',25)->nullable();
            $table->tinyInteger('people_type')->comment("0=>حقیقی . 1=> حقوقی")->default(0);
            $table->string('phone',20)->nullable();
            $table->string('email',50)->nullable();
            $table->string('address',250)->nullable();
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('people_category_id')->references('id')->on('people_categories')->restrictOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('people');
    }
};
