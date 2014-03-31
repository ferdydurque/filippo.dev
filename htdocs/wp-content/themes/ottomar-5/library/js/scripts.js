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
		
		menu_lock: false,
		user_click: false,
		history_step: 0,
		is_scrolling: false,
		is_ajax: true,
		
		
        init: function($){
            window.$ = $;
			
			// vars ///////////////////////////////////////////////
            this.$win = $(window);
            this.$doc = $(document);
	

			this.notouch = $('html').hasClass('no-touch');
 			//this.is_single_work = $('body').hasClass( 'single-work' );
			//this.site_url = $('#container').attr('data-site-url');
			//this.base_url = $('#container').attr('data-base-url');
            this.is_mobile = $('#container').hasClass('mobile');
            this.is_tablet = $('#container').hasClass('tablet');
            this.is_desktop = $('#container').hasClass('desktop');
									
									
            // events //////////////////////////////////////////////
			this.$win.on( 'scroll', function(e){ FDC.onScroll(e); } );
            this.$win.on( 'resize', function(e){ FDC.onResize(e); } );

			// init FUNCTIONS //////////////////////////////////////
			this.initMenu();
			this.initPageFunctions( $('body'), true );
			//////////////////////////////////////			
        }
		
		// EVENTS
        ,onScroll: function(e){
			FDC.is_scrolling = true;
        }
        ,onResize: function(e){			
            var w = this.$win.width();
            var h = this.$win.height();

            // if logged in, correct for the admin bar ...
            if ( $('#wpadminbar').length > 0 ){
            	var hh = $('#wpadminbar').height();
            	h -= hh;
            	var margin = parseInt($('.wrap').css('padding-right'),10);
             } 
			
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
				// make the content the width of the browser
				$('#content').width(w);
			$('#drawer').height(h);
				// scrollable container area of the drawer
				$('#inner-drawer').height(h-$('#inner-drawer').position().top);
        }		
		
		/* MENU FUNCTIONS **************************************/
		,initMenu: function(){
			$('#mnu-icon').data('open', false);
			$('#mnu-icon').click(function(e){
				FDC.toggleDrawer()
			});
			if ( this.notouch ) $(document).on( 'mousemove', this.interactiveDrawer )
			/*
			$('#mnu-icon').hover(function(e){
				$('#content').transition({x: $(this).data('open')?-40:40 }, 233, 'easeInOutQuint')
			}, function(e){
				$('#content').transition({x: $(this).data('open')?40:-40 }, 233, 'easeInOutQuint')
			})
			*/
			this.initAjax();
		}
		,openMenu: function(b){
			if ( $('#mnu-icon').data('open') == b ) return;
			$('#mnu-icon').data('open',b);

			var tox = b?$('#drawer').width():0;

			$('.header').transition({x:tox}, 333, 'easeInOutQuint')
			//$('#mnu-icon').transition({x:tox}, 333, 'easeInOutQuint');
			$('#content').transition({x:tox}, 333, 'easeInOutQuint');
			//$('#content').css({ transformOrigin: '0px '+ this.$win.height()/2 +'px', perspective: 1000 }).transition({x:tox,rotateY:b?'15deg':'0deg'}, 333, 'easeInOutQuint');
			//$('#drawer').css({ transformOrigin: $('#drawer').width()+'px '+ this.$win.height()/2 +'px', perspective: 1000 }).transition({x:0,rotateY:b?'-15deg':'0deg'}, 333, 'easeInOutQuint');
		}
		,toggleDrawer: function(){
			this.openMenu( !$('#mnu-icon').data('open') );
		}
		,interactiveDrawer: function(e){
			var x = e.clientX;
			var y = e.clientY;			
			if ( x < $('#drawer').width() && y < FDC.$win.height()/4 && !$('#mnu-icon').data('open') ){
				FDC.openMenu(true);
			}
			if ( x > $('#drawer').width() && $('#mnu-icon').data('open') ){
				FDC.openMenu(false);
			}
		}

		/* Page Functions ******************************/
		,initPageFunctions: function( $body, b ){
			var _class = '';
			if ( $body.hasClass('home') ) {
				this.initHome( b );
				_class = 'home';
			}
			if ( $body.hasClass('page-template-page-bio-php') ) {
				this.initBio( b );
				_class = 'page-template-page-bio-php';
			}
			if ( $body.hasClass('single-work') ) {
				this.initSingleWork( b );
				_class = 'single-work';
			}
			if ( _class != '' ){
				b ? $('body').addClass( _class ) : $('body').removeClass( _class );
			}
			if ( b ) this.$win.trigger('resize');
		}
		/* SPLASH HOME **************************************************/
		,initHome: function( b ){
			if ( b ) SPLASH.init( this, 'onSPLASHReady' );
			if ( !b ) SPLASH.end();
		}
		,onSPLASHReady: function(){
			console.log( 'onSPLASHReady' )
		}
		/* BIO PAGE *************************************/
		,initBio: function( b ){
			if ( b ){
				$('.mnu').appendTo('.header');
				$('.mnu a').on( 'click' , this.onClickMenuBio );
				$('#content').on( 'scroll', this.onScrollBio );
				this.onResize()
			}
			else{
				$('.mnu a').off( 'click' , this.onClickMenuBio );
				$('#content').off( 'scroll', this.onScrollBio );
				$('.mnu').remove();
			}
		}
		,onClickMenuBio: function(e){
			e.preventDefault();
			$('.mnu a').each(function(i,el){
				if ( $(this).hasClass('selected') ) $(this).removeClass('selected'); 
			});
			$(this).addClass('selected');
			var id = $(this).html();
			var pos = $('#'+id).offset().top - $('ul.blocks').position().top - 2*parseInt($('h1').css('margin-top'),10);
			$('#content').animate({scrollTop:pos}, 777, 'swing' );			
		}
		,onScrollBio: function(e){

			//$('.mnu').css({position: 'fixed' })

			return;

			// this == #content
			var top = $(this).scrollTop();
			var dif = 100000;
			var j = -1;
			var sel = -1;
			$('.mnu a').each(function(i,el){
				var $li = $('#'+$(this).html());
				var pos = $li.position().top;
				if ( i == 1 ){
					console.log( top + ',' + (pos) )
				}
				if ( pos - top < dif ){
					dif = pos - top;
					j = i;
				}
				if ( $(this).hasClass('selected') ) sel = i;
			});
			if ( j != -1 && sel != j ){
				$('.mnu a:eq('+sel+')').removeClass('selected');
				$('.mnu a:eq('+j+')').addClass('selected');
			}
		}
		/* BIO PAGE *************************************/	
		/* SINGLE WORK ********************************/
		,initSingleWork: function( b ){
			if ( b ){
				this.onResize()
			}
			else{
			}
		}

		
		
		
		
		
		
		// AJAX *******************************************************************************/		
		,initAjax: function(){	
			if ( !this.is_ajax ) return;
			$('a.ajax, li.menu-item ajax').click(function(e){
				e.preventDefault();
				var href = $(this).attr('href');
				var State = History.getState();
				// prevent reloading same page
				if ( State.url == href ) return;
				//console.log( State.url + ',' + href )
				FDC.user_click = true;
				FDC.loadAJAX( href );
			});
			this.initHistory();
		}
		,loadAJAX: function( href ){
			$('#inner-content').transition({opacity:0}, 333, 'easeOutQuint' );
			$('#content').animate({scrollTop:0}, 333, 'swing');
			NProgress.start();	
			$.ajax({
				url: href + '?ajaxreq=true', // load plain html without css and javascript for fast performance (modified header and footer)
				dataType: 'html',
				cache: true,
				success: function( content ) {
					FDC.addContentAJAX( content, href );
					NProgress.done(true);
				}
			});			
		}
		,addContentAJAX: function( content, href ){
			// old content
			this.initPageFunctions( $('body'), false );
			// new content
			var $content = $( content );
			var $body = $content.find('#body-injected');
			var $inner = $content.find('#inner-content');
			$('#inner-content').empty().html( $inner.html() );
			$('#inner-content').transition({opacity:1}, 777, 'easeOutQuint' );
			this.initPageFunctions( $body, true );	
			if ( this.user_click ) this.updateHistory( href, $body.attr('data-title') );
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
		,updateHistory:function( href, title ){
			var State = History.getState();
			this.history_step++;
			History.pushState( {state:this.history_step, rand:Math.random()} , title , href );			
		}
		/* ROUTE STATES DEPENDING ON URL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
		,routePage:function(href){
			//console.log('>>>> routePage, href = ' + href );
			this.loadAJAX( href );
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
