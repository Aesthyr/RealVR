<?php 
    
    $sPostGenres = $_POST['sPostSearchString'];
    //$iLastPropertyId = $_GET['lastId']; // get this from the url
    $iLoopIdCheck = 0; 
    // get content of the file
    $sajGames = file_get_contents( "../../JSON/games.txt" );
    // convert the string to an object
    $ajGames = json_decode( $sajGames );

    // Create am empty array that will contain the properties
    // that need to be passed to the client and are above
    // $iLastPropertyId
    $ajGamesToClient = [];
    // loop trough all the properties in the database

     foreach( $ajGames as $jGame ){ // each element as a json object
            
        if($sPostGenres == ""){
            
             array_push( $ajGamesToClient , $jGame );
        }
         for ($x = 0; $x < count($jGame->sGameGenre); $x++) {
             
             if( $sPostGenres == $jGame->sGameGenre[$x] ){
             
                    array_push( $ajGamesToClient , $jGame );
            }
             
         }
     }
         
    
    // convert the object/array/json to string
    $sajGamesToClient = json_encode( $ajGamesToClient );
    // pass the list
    echo $sajGamesToClient;



?>