
        <div id="header">
                <div class="headerWrapper">
                    <div id="menuDiv">Menu</div>
                    <div id="menuIcon">
                        <div class="menuLine"></div>
                        <div class="menuLine"></div>
                        <div class="menuLine"></div>
                    </div>
                </div>      
                <div class="heading">REAL Club Virtualna Realita</div>
                  
             </div>
            <div  id="mainMenu" class="menu">
                <div class="link" data-go-to="wdw-main-page">Virtualna Realita</div>
                <div class="link" data-go-to="wdw-prices-page">Cennik</div>
                <div class="link" data-go-to="wdw-location-reservation-page">Informacie</div>
                <div class="link" data-go-to="wdw-games-page">Ponuka Hier</div>
            </div>



<script>

// Blue print
var sPropertyBluePrint =    '<div class="lblProperty">\
                                <div>{{address}}</div>\
                                <div>{{color}}</div>\
                            </div>';

// data from server
var ajProperties =  [
                        {"address":"Nørrebrogade", "color":"black"},
                        {"address":"Lygten 37", "color":"white"}
                    ];
for(var i = 0; i < ajProperties.length; i++){
    var sAddress = ajProperties[i].address;
    var sColor = ajProperties[i].color;
    // replace the place holder with the real data
    var sTempProperty = sPropertyBluePrint; // copy
    sTempProperty = sTempProperty.replace("{{address}}",sAddress);
    sTempProperty = sTempProperty.replace("{{color}}",sColor);

    $("#wdw-properties").append( sTempProperty );
}