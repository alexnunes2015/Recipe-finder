<?php
    header("Access-Control-Allow-Origin: *");
    $inputIngredientsId=explode('|',$_GET['ing']);

    $resultRecipesId="{ \"data\":[";

    $servername = "127.0.0.1";
    $username = "root";
    $password = "";
    

    $conn = mysqli_connect($servername, $username, $password,"recipefinder");

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $sql = "SELECT * FROM recipes";

    if ($result = mysqli_query($conn, $sql)) {
      while ($row = mysqli_fetch_row($result)) {
        $ingredientsId=explode("|",$row[2]);
        $isPossible=false;

        foreach ($ingredientsId as $ingId) {
            $ingId=strtolower($ingId);
            $key = in_array($ingId, $inputIngredientsId);
            if($key != null){
              $isPossible=true;
            }else{
              $isPossible=false;
              break;
            }
        }

        if($isPossible){
            $resultRecipesId=$resultRecipesId."{\"name\":\"".$row[1]."\",\"file\":\"".$row[3]."\"},";
        }
      }
      mysqli_free_result($result);
    }
    $resultRecipesId=$resultRecipesId."]}";
    echo json_encode($resultRecipesId);
    //printf($resultRecipesId);

    mysqli_close($conn);
?>