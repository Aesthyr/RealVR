fnGetGames("", "php/API/api-get-games.php");
// code which switches between the screens depending on the attr of link which was clicked            
$(document).ready(function () {
    $(".link").click(function () {
        var sIdWindowToShow = $(this).attr("data-go-to"); // wdw-welcome


        $(".wdw").hide(); // hide all the windows
        $("#" + sIdWindowToShow).css({
            "display": "flex"
        });
        if (sIdWindowToShow == "wdw-location-reservation-page") {

            google.maps.event.trigger(map, 'resize');
        }
        if (sIdWindowToShow == "wdw-games-page") {

            fnGetGames("", "php/API/api-get-games.php");
        }
    });
});
// hide the back arrow after loading
$(".showAllContent").hide();
//  ***************************Toggle Navigation Menu**********************************
// show and hides menu if clicked on menu icon            
$(document).on('click', '.hiddenMenu', function () {

    $(".navMenuWrapper").toggleClass("menuHide");
    //                $(".menu").css("visibility", "visible"); 

});

//  **********************Game Picture Viewer************************************
// switches the pictures in the thumbnail            

$(document).on('click', '.game-picture-viewer', function () {
    var sIdPictureToShow = $(this).attr("picture-to-go");

    $(".game-img").hide(); // hide all the windows
    $("#" + sIdPictureToShow).css({
        "display": "flex"
    });

});

//  **********************All games show************************************
// shows all games on the page            
$("#allGames").click(function () {
    var sAllUrl = "php/API/api-get-games.php";
    fnGetGames("", sAllUrl);
    showMainGameScreen();

});

//  ***************************Inner games screen Menu**********************************
// loads specific games clicked depending on the name of the game            
$(document).on('click', '.gameEntry', function () {

    var sGameNameToShow = $(this).attr("game-go-to"); // get a name of the game

    var sUrl = "php/API/api-get-specific-game.php";

    $.post(sUrl, {

        "postGameName": sGameNameToShow // request data from server

    }, function (sData) {

        //reset all fields
        $(".game-picture").empty();
        $(".game-header").empty();
        $(".game-text").empty();
        $(".game-genre").empty();

        // populate description data --> text,picture,genre...
        $(".game-picture").prepend('<img id="mainImage" src="Images/games/' + sData[0].sGameName + '/' + sData[0].sGameMainPicture + '">');
        //                        $( ".game-picture" ).html( sData[0].sGameMainPicture );
        $(".game-header").html(sData[0].sGameName);
        $(".game-text").html(sData[0].sGameDescription);

        // creating bluePrint for genres
        var sGenreBlueprint = "";
        // getting all genres with comas into bluenprint, last genre is without coma 
        for (i = 0; i < sData[0].sGameGenre.length - 1; i++) {

            sGenreBlueprint = sGenreBlueprint + sData[0].sGameGenre[i] + ", "

        }
        sGenreBlueprint = sGenreBlueprint + sData[0].sGameGenre[sData[0].sGameGenre.length - 1];
        // append genres
        $(".game-genre").html(sGenreBlueprint);
        // reset game viewer
        $(".game-viewer").empty();
        // put all pictures into main viewer window... they are hidden
        for (i = 0; i < sData[0].sGameImages.length; i++) {

            $(".game-viewer").append('<img src="Images/games/' + sData[0].sGameName + '/Pictures/' + sData[0].sGameImages[i] + '" id="picture' + [i] + '" class="game-img">');
        }
        // add all videos to the main viewer .. they are hidden
        for (j = 0; j < sData[0].sGameVideos.length; j++) {

            $(".game-viewer").append('<iframe src="https://www.youtube.com/embed/' + sData[0].sGameVideos[j] + '" id="video' + [j] + '" class="game-img"></iframe>');
        }
        //'+sData[0].sGameVideos[j]+'
        // reset slider
        $(".game-slider").empty();
        //  populate slider with all pictures , give them attribute which is then used for switching images depending on which slider image was clicked
        for (i = 0; i < sData[0].sGameImages.length; i++) {

            $(".game-slider").append('<div class="image-slider-holder"><img src="Images/games/' + sData[0].sGameName + '/ThumbnailSmall/' + sData[0].sGameImages[i] + '" picture-to-go="picture' + [i] + '" class="game-picture-viewer"></div>');
        }
        // problem.. names cannot be with . otherwise it cannot find IDs
        // add all video to the slider with attribute which switched videos depending on the slider video which was clicked.
        for (j = 0; j < sData[0].sGameVideos.length; j++) {

            $(".game-slider").append('<div class="image-slider-holder"><img src="Images/Video.png" picture-to-go="video' + [j] + '" class="game-picture-viewer"></div>');
        }
    }, "json");

    $("#gamesDisplay").hide(); // hide all the windows
    $("#game-single-game-page").css({
        "display": "flex"
    });
    $(".showAllContent").show();
    // after all pictures has been loaded display the first image
    setTimeout(function () {
        $("#picture0").css({
            "display": "flex"
        });
    }, 100);
});

//  ***************************GOOGLE MAP****************************************   
function initMap() {
    var kosice = {
        lat: 48.70211834,
        lng: 21.2554578
    };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: {
            lat: 48.70211834,
            lng: 21.2554578
        }
    });
    var marker = new google.maps.Marker({
        position: kosice,
        map: map
    });
}
// slight delay for map to show
setTimeout(function () {
    initMap();
}, 1000);

//**********************Get games by genre *********************               

$(".categoryItem").click(function () {
    var sGenreName = $(this).attr("genre-to-show");
    var sGenreUrl = "php/API/api-get-games.php";
    fnGetGames(sGenreName, sGenreUrl);
    showMainGameScreen();

});
//********************** Search function *********************                

$('#search').keypress(function (e) {
    if (e.which == 13) { //Enter key pressed
        getGameByName();
    }
});

$(".fa-search").click(function () {
    getGameByName();
});

$(".showAllContent").click(function () {
    showMainGameScreen();
});

function showMainGameScreen() {

    $("#game-single-game-page").hide(); // hide all the windows
    $("#gamesDisplay").css({"display": "flex"});
    $(".showAllContent").hide();

}

function getGameByName() {

    var sNameOfThegame = $('#search').val();

    if (sNameOfThegame == " " || sNameOfThegame == "") {
        fnGetGames("", "php/API/api-get-games.php");
        showMainGameScreen();
    } else {

        var sNameUrl = "php/API/api-get-game-by-name.php";
        fnGetGames(sNameOfThegame, sNameUrl);
        showMainGameScreen();
    }
}


//**********************Get all games*********************   
function fnGetGames(sSearchString, Url) {

    $("#gamesDisplayInner").empty();
    var postSearchString = sSearchString;
    var sUrl = Url;
    $.post(sUrl, {
        "sPostSearchString": postSearchString
    }, function (sData) {

        // creating blueprint for every game entry
        var sGameBluePrint = '<div id="game{{gameName}}" class="gameEntry" game-go-to="{{gameName}}"><div class="gameEntryMainPictureDiv"><img src="Images/games/{{gameName}}/{{gamePicture}}"  class="gameEntryMainPicture" alt="{{gameName}}VR"></div><div class="gameEntryInfoWrapper"><div class="gameEntryName">{{gameName}}</div><div id="Genre{{position}}" class="gamEntryGenre"></div></div></div>';

        for (i = 0; i < sData.length; i++) {
            // preparing variable for game at position "i"
            var sGameName = sData[i].sGameName;
            var sGamePicture = sData[i].sGameMainPicture;
            var sGameGenre = sData[i].sGameGenre;
            var sTempGameBluePrint = sGameBluePrint;
            // replace all values in temporary blueprint 
            sTempGameBluePrint = sTempGameBluePrint.replace(/{{gameName}}/g, sGameName);
            sTempGameBluePrint = sTempGameBluePrint.replace("{{gamePicture}}", sGamePicture);
            //sTempGameBluePrint = sTempGameBluePrint.replace("{{gameGenre}}",sGameGenre);
            sTempGameBluePrint = sTempGameBluePrint.replace("{{position}}", i);
            //append game display with all the games
            $("#gamesDisplayInner").append(sTempGameBluePrint);
            // add genres to the div with id so they have space between them and do not mess up the search 
            for (j = 0; j < sGameGenre.length; j++) {
                var sGenre = sGameGenre[j];
                if (j == sGameGenre.length - 1) {
                    $("#Genre" + i).append(" " + sGenre);
                } else {
                    $("#Genre" + i).append(" " + sGenre + ",");
                }

            }
        }

    }, "json");
}
