$(document).ready(function() {
    $(".twitter-link").click(function(){
        activateTwitter();
    });

    $(".facebook-link").click(function(){
        activateFacebook();
    });
});

function activateTwitter() {
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

    if(isAndroid) {
        twitterCheck = function(){
            appAvailability.check('com.twitter.android', function(availability) {
                // availability is either true or false
                if(availability) {window.open('twitter://user?screen_name=prontatres', '_system', 'location=no');}
                else{window.open('https://play.google.com/store/apps/details?id=com.twitter.android', '_system', 'location=no');};
            });
        };
    };
}

function activateFacebook() {

}