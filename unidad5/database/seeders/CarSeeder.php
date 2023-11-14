<?php

namespace Database\Seeders;

use App\Models\Car;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $car = new Car();
        $car->name = 'Mamalona';
        $car->description = 'Troca bien pinshe mamalona pa irse a pistear';
        $car->year = 2023;
        $car->save();

        Car::factory(10)->create();
    }
}
