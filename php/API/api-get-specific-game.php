<?php 

	$sPostGameName = $_POST['postGameName']; 
	// get content of files
    $sajGames = file_get_contents( "../../JSON/games.txt" );
    
    // convert the text into an object
    $ajGames = json_decode( $sajGames );
    // loop through each property and see if the id matches
    
    $ajGameToClient = [];
    foreach ( $ajGames as $jGame ){
        
    
        if( $sPostGameName == $jGame->sGameName ){
            // delete proeprty id match found
           
            array_push( $ajGameToClient , $jGame );
            // stop looping, the match was found already
            break;
        }
        
    }
    // convert the array back to text 
    $sajGames = json_encode( $ajGameToClient , JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE );
    //echo $sajProperties;
    // save the RAM text in the file
    
    echo $sajGames;

?>