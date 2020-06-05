<?php
    header("Access-Control-Allow-Origin: *");
    $ingredientsList = $_GET['ing'];


    $string = file_get_contents("receitas.json");
    $json_a = json_decode($string, true);

    $arr_input=explode("|", $ingredientsList);

    for ($i=0; $i < count($json_a["receitas"]); $i++) { 
        $json_a["receitas"][$i]['ingredients'];
    }
    foreach ($arr_input as $value) {
        $pos = strpos($mystring, $value);
    }

    //echo($json_a["receitas"][0]['ingredients'])

    //echo($ingredientsList);
?>