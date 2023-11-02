<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::view('/', 'home')->name('home');

Route::get('/operacion/{operacion}/{num1}/{num2}', function ($operacion, $num1, $num2) {
    if (!is_numeric($num1) || !is_numeric($num2)) {
        return view('error', ['message' => 'Parámetros no válidos']);
    }

    switch ($operacion) {
        case 'suma':
            $result = $num1 + $num2;
            return view('operaciones', ['operation' => 'Suma', 'result' => $result]);
        case 'resta':
            $result = $num1 - $num2;
            return view('operaciones', ['operation' => 'Resta', 'result' => $result]);
        case 'division':
            $result = $num1 / $num2;
            return view('operaciones', ['operation' => 'Division', 'result' => $result]);
        case 'multiplicacion':
            $result = $num1 * $num2;
            return view('operaciones', ['operation' => 'Multiplicacion', 'result' => $result]);
        default:
            return view('error', ['message' => 'Operación no válida']);
    }
});

Route::get('/saludo/{name}/{lastname}', function ($name, $lastname) {
    if (is_numeric($name) || is_numeric($lastname)) {
        return view('error', ['message' => 'Parametros no validos']);
    }
    return view('greeting', ['name' => ucwords(strtolower($name)), 'lastname' => ucwords(strtolower($lastname))]);
})->name('greeting');
