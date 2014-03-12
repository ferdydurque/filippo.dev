/*
Bones Scripts File
Author: Filippo Della Casa

This file should contain any js scripts you want to add to the site.
Instead of calling it in the header or throwing it inside wp_head()
this file will be called automatically in the footer so as not to
slow the page load.

*/

// IE8 ployfill for GetComputed Style (for Responsive Script below)
if (!window.getComputedStyle) {
	window.getComputedStyle = function(el, pseudo) {
		this.el = el;
		this.getPropertyValue = function(prop) {
			var re = /(\-([a-z]){1})/g;
			if (prop == 'float') prop = 'styleFloat';
			if (re.test(prop)) {
				prop = prop.replace(re, function () {
					return arguments[2].toUpperCase();
				});
			}
			return el.currentStyle[prop] ? el.currentStyle[prop] : null;
		}
		return this;
	}
}
/*! A fix for the iOS orientationchange zoom bug.
 Script by @scottjehl, rebound by @wilto.
 MIT License.
*/
(function(w){
	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	if( !( /iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ) ){ return; }
	var doc = w.document;
	if( !doc.querySelector ){ return; }
	var meta = doc.querySelector( "meta[name=viewport]" ),
		initialContent = meta && meta.getAttribute( "content" ),
		disabledZoom = initialContent + ",maximum-scale=1",
		enabledZoom = initialContent + ",maximum-scale=10",
		enabled = true,
		x, y, z, aig;
	if( !meta ){ return; }
	function restoreZoom(){
		meta.setAttribute( "content", enabledZoom );
		enabled = true; }
	function disableZoom(){
		meta.setAttribute( "content", disabledZoom );
		enabled = false; }
	function checkTilt( e ){
		aig = e.accelerationIncludingGravity;
		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );
		// If portrait orientation and in one of the danger zones
		if( !w.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ){
			if( enabled ){ disableZoom(); } }
		else if( !enabled ){ restoreZoom(); } }
	w.addEventListener( "orientationchange", restoreZoom, false );
	w.addEventListener( "devicemotion", checkTilt, false );
})( this );



/**************  MAIN CLASS ***********************/
var FDC = {};
(function(window){

    window.FDC = {   
		
		site_title : 'FDC',		
		menu_lock: false,
		user_click: false,
		history_step: 0,
		is_scrolling: false,
		is_ajax: false,
		
		
        init: function($){
            window.$ = $;
			
			// vars ///////////////////////////////////////////////
            this.$win = $(window);
            this.$doc = $(document);
	

			this.notouch = $('html').hasClass('no-touch');
            this.is_home = $('body').hasClass('home');
			this.is_single_work = $('body').hasClass( 'single-work' );
			
			this.site_url = $('#container').attr('data-site-url');
			this.base_url = $('#container').attr('data-base-url');
            this.is_mobile = $('#container').attr('data-mobile') == 'mobile';
            this.is_desktop = $('#container').hasClass('desktop');
			
			this.obj_selected = {};
						
									
            // events //////////////////////////////////////////////
			this.$win.on( 'scroll', function(e){ FDC.onScroll(e); } );
            this.$win.on( 'resize', function(e){ FDC.onResize(e); } );

			// init FUNCTIONS //////////////////////////////////////
			// splash home page slideshow
			if ( this.is_home ){
				this.initHome();
			}
			this.initMenu();
			//////////////////////////////////////
			
            this.$win.trigger('resize');
        }
		
		// EVENTS
        ,onScroll: function(e){
			FDC.is_scrolling = true;
        }
        ,onResize: function(e){			
            var w = this.$win.width();
            var h = this.$win.height();
			
			/* if is below 481px */
			if (w < 481) {
			
			} /* end smallest screen */
			/* if is larger than 481px */
			if (w > 481) {
			
			} /* end larger than 481px */
			/* if is above or equal to 768px */
			if (w >= 768) {
			}
			/* off the bat large screen actions */
			if (w > 1030) {
			
			}

			// main content (overflow hidden)
			$('#container').width(w);
			$('#container').height(h);
				// make the content the width of the browser (user scroll right as if the whole page)
				$('#content').width(w);

        }		
		
		/* MENU FUNCTIONS **************************************/
		,initMenu: function(){
		}
		/* SPLASH HOME **************************************************/
		,initHome: function(){
			SPLASH.init( this, 'onSPLASHReady' );
		}
		,onSPLASHReady: function(){
			console.log( 'onSPLASHReady' )
		}
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		// AJAX *******************************************************************************/		
		,onLoadHome: function(){	
			if ( this.is_ajax ){
				// if the url is not the home --> route it!!!!!!
				var initUrl = this.initHistory();
				
				console.log( 'initUrl = ' + initUrl + ', base_url = ' + this.base_url )
	
				if ( initUrl != this.base_url ){				
					//this.setHome(true);
					this.routePage( initUrl );
					return;
				}
				else{
					this.obj_selected.href = this.base_url;
				}
			}
			else{
			}
		}
		,loadPage:function( $a, post_type ){			
			if ( this.obj_selected ){
				if ( this.obj_selected.href == $a.attr('href') ) return;
			}
			this.obj_selected = { 
				action: 'ajax' 
				,href: $a.attr('href')
				,is_mobile: this.is_mobile
				,post_type: post_type
				,$a: $a
			}
			this.loadAJAX( this.obj_selected );
		}
		,onKeyPress:function(e){
		}
		,addContent: function( b, content ){
		}
		,initAjaxContent:function( b, action ){				
		}
		,loadAJAX: function(object ){
			$.ajax({
				url: this.site_url + '/wp-admin/admin-ajax.php',
				type: 'POST',
				dataType: 'html',
				cache: false,
				data: {
					action: object.action,
					href: object.href,
					is_mobile: object.is_mobile,
					post_type: object.post_type
				},
				success: function( content ) {
					FDC.addContent( true, content );
				}
			});			
			this.updateHistory( object.href, object.$a.text() );
		}
		// HISTORY !!!!!!!!!!!!!!!!!!!!!!!!!!!!
		,initHistory:function(){
			// Check Initial State!!!!!			
			this.history_step = 0;
			var State = History.getState();
			//History.log('initial:', State.data, State.title, State.url);
			// Bind to State Change
			History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
				// Log the State
				var State = History.getState(); // Note: We are using History.getState() instead of event.state
				//History.log('statechange:', State.data, State.title, State.url);
				if ( FDC.user_click ){
					FDC.user_click = false;
				}
				else{
					FDC.routePage( State.url );
				}
			});	
			return State.url;		
		}
		,updateHistory:function( href, page_title ){
			var State = History.getState();
			this.user_click = true;
			if ( href === '' ){
				href = this.base_url;
			}
			if ( State.url === href ) return;
			this.history_step++;
			History.pushState( {state:this.history_step, rand:Math.random()} , this.site_title + ' - ' + (page_title) , href );			
		}
		/* ROUTE STATES DEPENDING ON URL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
		,routePage:function(href){
			console.log('>>>> routePage, href = ' + href );
			var found = false;
			$('a').each(function(index, element) {
				var $a = $(this);
                if ( $a.attr('href') === href && !found ){
					found = true;					
					setTimeout( function(){
						$a.trigger( 'mouseover' );
						setTimeout( function(){
							$a.click();
						}, 177 );
					}, 177 )
				}
            });
			if ( !found ){
			}
		}
    };

})(this);







// INIT JQUERY AND LOADING ***********************************************/
// as the page loads, call these scripts
var NProgress = NProgress || {};
var History = History || {};
 
jQuery(document).ready(function($) {
	NProgress.configure({ 
		minimum: 0.3 
		,trickleRate: 0.1 
		,trickleSpeed: 377
	});
	NProgress.start();	
	FDC.init($); 
}); /* end of as page load scripts */

jQuery(window).load(function(e) {
	NProgress.done(true);
});
