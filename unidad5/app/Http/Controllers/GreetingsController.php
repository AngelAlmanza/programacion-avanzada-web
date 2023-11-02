<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GreetingsController extends Controller
{
    function index ($name, $lastname) {
        if (is_numeric($name) || is_numeric($lastname)) {
            return view('error', ['message' => 'Parametros no validos']);
        }
        $name = ucwords(strtolower($name));
        $lastname = ucwords(strtolower($lastname));
        return view('greeting', ['name' => $name, 'lastname' => $lastname, 'controller' => true]);
    }
}
