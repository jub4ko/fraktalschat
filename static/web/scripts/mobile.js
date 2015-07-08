var ios = (navigator.userAgent.match(/iPad|iPhone|iPod/g) ? true : false);
var fromHomescreen = window.navigator.standalone;

if(!fromHomescreen && ios) {
    window.addEventListener("load", function(){
           if(document.height <= window.outerHeight) {
               document.body.style.height = (window.outerHeight + 50) + 'px';
               setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
           } else {
               setTimeout( function(){ window.scrollTo(0, 1); }, 0 );
           }
       }
    );

    /* MOBILE WEBAPP */
    function hideAddressBar() {
        if(!window.location.hash) {
            if(document.height < window.outerHeight) {
                document.body.style.height = (window.outerHeight + 50) + 'px';
            }
            setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
        }
    }

    window.addEventListener("load", function(){ if(!window.pageYOffset){ hideAddressBar(); } } );
    window.addEventListener("orientationchange", hideAddressBar );

    $('.home-screen').show();
  }
