function onDeviceReady() {
/*
----------------------------------------------------------------------------
cordova-plugin-media
https://www.npmjs.com/package/cordova-plugin-media
https://github.com/apache/cordova-plugin-media
License : Apache-2.0  Licensed on OSI-approved terms®
version 3.0.1
Music Player is copyright code
----------------------------------------------------------------------------
*/
    class MusicPlayer {

      constructor(url,progressbar,progressTime,durationTime,playIconReff) {
        this.url = url;
        this.progressbar = progressbar;
        this.progressTime = progressTime;
        this.durationTime = durationTime;
        const _thisMP = this;
        this.duration = 0;
        this.mediaStatusValue = 0;
        this.playIconReff = playIconReff;
        this.my_media = new Media(url,null,this.logerror,function(mediaStatus){

            _thisMP.mediaStatusValue = mediaStatus;
            switch(mediaStatus){
                case 4: // stop
                    clearTimeout(_thisMP.mediaTimer);
                    if (_thisMP.progressbar!=undefined)
                        _thisMP.progressbar.css("width","0px");

                    if (_thisMP.playIconReff!=undefined)
                        _thisMP.playIconReff.attr("class","ion-ios-play-outline");

                    if (_thisMP.progressTime!=undefined)
                        _thisMP.progressTime.text("00:00");

                    if (_thisMP.durationTime!=undefined)
                        _thisMP.durationTime.text("00:00");
                    break;

                 case 2: // running
                    _thisMP.duration = _thisMP.my_media.getDuration();
                    if (_thisMP.durationTime!=undefined)
                        _thisMP.durationTime.text(_thisMP.duration.toFixed(2));

                    _thisMP.monitorPlayPosition(_thisMP);
                    break;

                case 3: // paused
                    clearTimeout(_thisMP.mediaTimer);
                    break;

                case 1: // initiating
                    if (_thisMP.progressbar!=undefined)
                        _thisMP.progressbar.css("width","0px");

                    if (_thisMP.progressTime!=undefined)
                        _thisMP.progressTime.text("00:00");

                    if (_thisMP.durationTime!=undefined)
                        _thisMP.durationTime.text("00:00");
                    break;
            }
        });
      }

      logerror(err){
        console.log(err);
      }

      play(){
        this.my_media.play();
      }

      togglePlay(){
        var status = 0;
        switch(this.mediaStatusValue){
            case 2:
                this.my_media.pause();
                status = 0;
                break;

            default:
                this.my_media.play();
                status = 1;
                break;

        }

        return status;
      }

      stop(){
        this.my_media.stop();
      }

      release(){
        this.my_media.release();
      }

      pause(){
        this.my_media.pause();
      }

      monitorPlayPosition(_thisMP){
        _thisMP.mediaTimer = setInterval(function () {
            // get media position
            _thisMP.my_media.getCurrentPosition(
                // success callback
                function (position) {
                    if (position > -1) {
                        _thisMP.duration = _thisMP.my_media.getDuration();
                        _thisMP.durationTime.text(_thisMP.duration.toFixed(2));
                        var progress = (position / _thisMP.duration) * 100;
                        _thisMP.progressTime.text(position.toFixed(2));

                        if (_thisMP.progressbar!=undefined)
                            _thisMP.progressbar.css("width",progress+"%");
                    }
                },
                // error callback
                function (e) {
                    console.log("Error getting pos=" + e);
                }
            );
        }, 1000);
      }
    };

    $("a.playbtn").on("click",function(){

        var _this = $(this);
        var playIconReff = _this.find("i");
        var tobeInit = false;

        var container = $($(this).attr("data-widget-id"));
        var dataUri = container.attr("data-uri");
        var progressBar = container.find(".progressBar");
        var progressTime = container.find(".progressTime");
        var durationTime = container.find(".durationTime");

        var _playerActive = _this.attr("player-active");
        if (_playerActive==undefined || _playerActive==0){
            if (player!=undefined){
                player.stop();
                player.release();
            }
            tobeInit = true;
            $("a.playbtn").find("i").attr("class","ion-ios-play-outline");
            playIconReff.attr("class","ion-ios-play-outline");
            $("a.playbtn").attr("player-active",0);
            _this.attr("player-active",1);
        }
        else{
            if (player==undefined)
                tobeInit=true;
        }
        
        if (tobeInit){
            player = new MusicPlayer(
                dataUri,
                progressBar,
                progressTime,
                durationTime,
                playIconReff
            );
        }

        var mediaStatusValue = player.togglePlay();
        
        if (mediaStatusValue === 1){
            playIconReff.attr("class","ion-ios-pause");
        }
        else{
            playIconReff.attr("class","ion-ios-play-outline");
        }
    });


/*
------------------------------------------------------------------------
    cordova-plugin-streaming-media-ibby 
    https://www.npmjs.com/package/cordova-plugin-streaming-media-ibby
    https://github.com/nchutchind/Streaming-Media-Cordova-Plugin
    version 1.0.2
    MIT  Licensed on OSI-approved terms®
------------------------------------------------------------------------
*/
  $(".mobileui-video").on("click",function(){
    var _this = $(this);
    var videoUrl = _this.attr("data-url");
    var orientation = _this.attr("data-orientation");

    if (orientation!="portrait" || orientation!="landscape")
        orientation = "portrait";
        // Play a video with callbacks 
        var options = {
            successCallback: function() {
                console.log("Video was closed without error.");
            },
            errorCallback: function(errMsg) {
                console.log("Error! " + errMsg);
            },
            orientation: 'portrait'
        };

        window.plugins.streamingMedia.playVideo(videoUrl, options);
  });
}