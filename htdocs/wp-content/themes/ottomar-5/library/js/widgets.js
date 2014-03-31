/* SPLASH SLIDESHOW ************************************/
;(function(window, $){
    window.SPLASH = {
    	active: true,
		index : 0,
		_loaded : [],
		slides: [],
		captions: [],
		time: 4000,
		timeTransition: 1377,
		n: 0,
		timeout:-1,
		autoplay: true,
		
		controller: undefined,
		callbacks: {},
		
		
		init:function( controller, callbacks){
			this.active = true;
			this.controller = controller;
			this.callbacks = callbacks;
			this.n = $('.slide').length;
			$('.slide').each( function( i, e ){
				var $slide = $(this);
				SPLASH.slides[i] = $slide;
				SPLASH.captions[i] = $slide.find('img').attr('data-caption') || '';
			});
			
			// loaded the first --> start --> load others
			$('#bg-slideshow').imagesLoaded().done(function(){
				var $slide = SPLASH.slides[0];
				var $img = $slide.find('.bg');
				$slide.css( {'background-image': 'url(' + $img.attr('src') + ')' , 'z-index' : 0 } );
				$img.remove();
				SPLASH._loaded[0] = true;
				SPLASH.rearrangeThumbs( $slide );
				SPLASH.loadImages();			
			});			
			// resize
			$(window).on( 'resize', this.onResize );
			// key nav
			$(document).on( 'keydown', this.onKeyPress );
			this.onResize();

			//$('#bg-slideshow').transition({rotateY:25, rotateX:25, rotateZ: 35 }, 277 , 'linear')
<<<<<<< HEAD
			$('#bg-slideshow').transition({ perspective: 100 }, 1000 , 'linear')
=======
			//$('#bg-slideshow').transition({ perspective: 100 }, 1000 , 'linear')
>>>>>>> FETCH_HEAD
		}
		,loadImages: function(){
			// load all the other images
			for ( var i=1; i<this.n; i++ ){
				this._loaded[i] = false;
				var $slide = this.slides[i];
				var $img = $slide.find('.bg');
				$img.attr('src', $img.attr('data-src'));				
				$slide.imagesLoaded().done( function( img ){
					var ind = parseInt( $(img).attr('data-rel'), 10 );
					var $slide = SPLASH.slides[ind];
					var $img = $slide.find('.bg');
					$slide.css( {'background-image': 'url(' + $img.attr('src') + ')' , 'z-index' : ind, opacity: 0 } );
					$img.remove();
					SPLASH.rearrangeThumbs( $slide );
					SPLASH._loaded[ind] = true;
				});
			}
			this.start();
		}
		,rearrangeThumbs: function( $slide ){
			$slide.find('.thumb').each( function(i,el){
				$(this).attr('src', $(this).attr('data-src'));
				$(this).css({
					//right: 50 //+ Math.floor(Math.random()*($(window).width()/2-300))
					//,bottom: 50 //+ Math.floor(Math.random()*($(window).height()/2-200))
					opacity: i==0? 1 : 0
				});
			});
			$slide.data('index_thumb', 0 );
			$slide.data('index_max', $slide.find('.thumb').length );
		}
		,moveThumbs: function( $slide, b ){
			var id = $slide.data('interval');
			if ( !b ){
				clearInterval( id );
				$slide.data('interval', null );
				return;
			}
			if ( id ) return;
			id = setInterval( function(){
				var j = $slide.data('index_thumb');
				j++;
				if ( j >= $slide.data('index_max') ) j = 0;
				$slide.data('index_thumb', j );
				$slide.find('.thumb').each( function(i,el){
					$(this).transitionStop();
					j == i ? $(this).transition({opacity:1}, 0 ) : $(this).transition({opacity:0}, 0 );
				});
			}, 1000 );
			$slide.data('interval', id)
		}
		,start:function(){
			if ( this.callbacks.onReady ){
				this.controller[this.callbacks.onReady]();
			}
			this.setImage( 0, 1 );
			//$('.arrow').transition({opacity:1, delay:1000}, this.timeTransition, 'easeOutCirc' );
			// arrows nav
			$('.arrow').click( function(e){
				$(this).hasClass( 'aleft' ) ? SPLASH.prev() : SPLASH.next();
			} );
			$('.arrow').css({'z-index':this.n + 2 });
			$('#caption').css({'z-index':this.n + 1 });
			
			// iphone/ ipad
			$('#bg-slideshow').swipe( {
				//Generic swipe handler for all directions
				swipe:function(event, direction, distance, duration, fingerCount) {
				   	if ( direction === 'left' ) SPLASH.next();
					if ( direction === 'right' ) SPLASH.prev();  
				},
				//Default is 75px, set to 0 for demo so any distance triggers swipe
				 threshold: 10
			  });

			this.initCaption()
		}
		,next: function(){
			var i = SPLASH.index + 1;
			if ( i >= SPLASH.n ) {
				i = 0;
			}
			SPLASH.setImage( i, 1 );
		}
		,prev: function(){
			var i = SPLASH.index - 1;
			if ( i < 0 ) {
				i = SPLASH.n - 1;
			}
			SPLASH.setImage( i, -1 );
		}
		,setImage: function( i, inc ){
			if ( ! this.active ) return;
			clearTimeout( this.timeout );
			if ( this._loaded[i] ){
				var j = this.n;
				var $slide;
				var z = 1;
				//console.log( 'inc = ' + inc + ', next index = ' + i + ', current index = ' + this.index );
				while( j-- ){
					$slide = this.slides[j];
					$slide.transitionStop();					
					if ( j === i ){
						// top next slide
						$slide.css( {'z-index': this.n } );
						$slide.css({opacity:0}); 
					}
					else if ( j === this.index ){
						// below top actual slide
						$slide.css( {'z-index': this.n - 1 } );
						$slide.css({opacity:1}); 
						this.moveThumbs($slide, false );
					}
					else{
						//$slide.transitionStop();
						$slide.css( { 'z-index': inc > 0 ? this.n - 1 - z : z } );
						z++;
					}
				}
				$slide = this.slides[i];			
				$slide.transition({opacity: 1 }, this.timeTransition, 'easeOutQuad');
				this.moveThumbs($slide, true );
				this.index = i;
				this.setCaption();				
			}
			this.timeout = setTimeout( this.next, this.time + this.timeTransition );
		}
		,setCaption: function(){
			$('#caption #int').html( this.slides[this.index].find('.caption').html() );
		}
		,initCaption: function(){
			var $cl = $('#caption #close');
			$cl.data('x', $cl.position().left)
			$cl.click( function(e){
				var $vent = $('#caption #int');
				var toclose = $vent.position().left == 0;
				$vent.transition({x: toclose ? - $vent.outerWidth() : 0 }, 377, 'easeOutQuad' );
				$(this).transition({x: toclose ? - $cl.data('x') + 20 : 0, delay: 77 }, 377, 'easeOutQuad' );
				if ( toclose ){
					$(this).find('.icon').addClass('invert skew');
				}
				else{
					$(this).find('.icon').removeClass('invert skew');
				}
			}); 
		}
		,onKeyPress: function(e){
			if ( e.keyCode === 39 ){
				//SPLASH.next();
				$('.aright').mouseover(); $('.aright').click();
			}
			if ( e.keyCode === 37 ){
				//SPLASH.prev();
				$('.aleft').mouseover(); $('.aleft').click();
			}
		}
		,onResize: function( ){
<<<<<<< HEAD
			var w = $(window).width();
=======
			var w = $(window).width();//-$('#content').position().left;
>>>>>>> FETCH_HEAD
			var h = $(window).height();
			var border = parseInt( $('#bg-slideshow').css('border-width'), 10 ); 
			if ( $('#wpadminbar').length > 0 ) h -= $('#wpadminbar').height();
			$('#bg-slideshow').width(w-border*2);
			$('#bg-slideshow').height(h-border*2);
			$('.slide').width(w-border*2);
			$('.slide').height(h-border*2);				
			$('.slide').css({'background-position': h < 1040 ? 'top center' : 'center center' }); 
<<<<<<< HEAD
		} 
=======
		},end:function(){
			this.active = false;

			clearTimeout( this.timeout );
			// resize
			$(window).off( 'resize', this.onResize );
			// key nav
			$(document).off( 'keydown', this.onKeyPress );

		}
>>>>>>> FETCH_HEAD
	};
	
})(this, jQuery);


/* WORK SLIDESHOW ************************************/
;(function(window, $){
    window.AL_SLIDESHOW = {
		index : 0,
		_loaded : [],
		or_sizes: [],
		slides: [],
		time: 4000,
		timeTransition: 1377,
		n: 0,
		timeout:-1,
		autoplay: true,
		backTofirst: true,
		
		
		controller: undefined,
		callbacks: {},
		post: {},
		firstTime: true,
		m_top: 120,
		m_left: 0,
		
		uniform_high: true,
		average_hight: 0,
		
		init:function( controller, callbacks, post ){
			this.controller = controller;
			this.callbacks = callbacks;
			this.post = post;
			
			// init
			this.n = $('.slide-work').length;
			$('.slide-work').each( function( i, e ){
				var $slide = $(this);
				var $img = $slide.find('img');
				$img.css({ opacity: i===0? 1 : 0 });
				/*
				if ( i > 0 ){
					$slide.addClass('img_loading');
				}
				*/
				AL_SLIDESHOW.slides[i] = $slide;
				AL_SLIDESHOW.average_hight += parseInt( $img.attr('height'), 10 );
				if ( i === AL_SLIDESHOW.n - 1 ){
					AL_SLIDESHOW.average_hight = Math.round( AL_SLIDESHOW.average_hight/AL_SLIDESHOW.n ); //Math.min( 670, Math.round( AL_SLIDESHOW.average_hight/AL_SLIDESHOW.n ) );
					//console.log( '>>> AL_SLIDESHOW.average_hight = ' + AL_SLIDESHOW.average_hight );
					AL_SLIDESHOW.onResize();
				}
			});
			// first image load and setup		
			$('#slideshow-work').imagesLoaded().done( function( img ){
				AL_SLIDESHOW._loaded[0] = true;
				AL_SLIDESHOW.or_sizes[0] = [$(img).attr('width'), $(img).attr('height')];
				AL_SLIDESHOW.setPostOverlay( true );
				AL_SLIDESHOW.loadImages();
				if ( AL_SLIDESHOW.callbacks.onReady ){
					AL_SLIDESHOW.controller[AL_SLIDESHOW.callbacks.onReady]();
				}
			});
			// resize
			$(window).on( 'resize', this.onResize );
			//this.onResize();
			
		}
		,setPostOverlay: function(b){
			//console.log( "setPostOverlay, b = " + b )		
			var $slide = this.slides[0];
			if ( b ){
				var html = 	'<div id="post">';
					html += 	'<div class="int">';
					html += 		'<div class="tit">';
					html += 		    this.post.title;
					html += 		'</div>';
					html += 		'<div class="loc">';
					html += 		    this.post.location;
					html += 		'</div>';
					html += 	'</div>';
					html += '</div>';
				$slide.append( html );
				this.onResize();
				this.setClickSlideShow( true );
			}
			else{
				$('#post').remove();		
			}
		}
		,loadImages: function(){			
			// load all the other images
			for ( var i=1; i<this.n; i++ ){
				this._loaded[i] = false;
				var $slide = this.slides[i];
				var $img = $slide.find('img');
				$img.attr('src', $img.attr('data-src'));
				
				// photo flickr broken
				if ( !$img.attr('data-src') ){
					$slide.addClass('img-broken');
					this._loaded[i] = true;
				}			
				$slide.imagesLoaded().done( function( img ){
					var ind = parseInt( $(img).attr('data-rel'), 10 );
					AL_SLIDESHOW._loaded[ind] = true;
					var $s = AL_SLIDESHOW.slides[ind];
					$s.removeClass('img-loading')
					$s.find('img').transition({opacity:1}, 777, 'easeOutCirc'); 
					AL_SLIDESHOW.or_sizes[ind] = [$(img).attr('width'), $(img).attr('height')];
				});
			}
			// key nav
			$(document).on( 'keydown', this.onKeyPress );
			// arrows nav
			$('.arrow').click( function(e){
				$(this).hasClass( 'aleft' ) ? AL_SLIDESHOW.prev() : AL_SLIDESHOW.next();
			} );
			// put on top of the slides
			$('.arrow').css({ 'z-index': this.n +1  });
			// revel only the right( firstTime )
			$('.aright').transition({opacity:1}, 777, 'easeOutExpo' );
			
			// iphone
			$('#slideshow-work img, #post').swipe( {
				//Generic swipe handler for all directions
				swipe:function(event, direction, distance, duration, fingerCount) {
				   	if ( direction === 'left' ) AL_SLIDESHOW.next();
					if ( direction === 'right' ) AL_SLIDESHOW.prev();  
				},
				//Default is 75px, set to 0 for demo so any distance triggers swipe
				 threshold: 10
			  });
			
		}
		,start:function(){
		}
		,next: function(){
			var i = AL_SLIDESHOW.index + 1;
			if ( i >= AL_SLIDESHOW.n ) {
				i = 0;
			}
			AL_SLIDESHOW.setImage( i, 1 );
		}
		,prev: function(){
			var i = AL_SLIDESHOW.index - 1;
			if ( i < 0 ) {
				i = AL_SLIDESHOW.n - 1;
			}
			AL_SLIDESHOW.setImage( i, -1 );
		}
		,setClickSlideShow: function(b){
			if ( b ){
				$('#slideshow-work').click(function(e) {
                   	var x = e.clientX;
					var y = e.clientY;
					var $img = AL_SLIDESHOW.slides[AL_SLIDESHOW.index].find('img');
					//console.log( x + ', img x = ' + $img.offset().left )
					if ( x >= $img.offset().left && x <= $img.offset().left + $img.width() && y >= $img.offset().top && y <= $img.offset().top + $img.height() ){
						
						if ( AL_SLIDESHOW.firstTime && ! AL_SLIDESHOW.backTofirst ){
							AL_SLIDESHOW.next();
							return;
						}
						
						if ( x < $(window).width() / 2 ){
							AL_SLIDESHOW.prev()
						}
						else{
							AL_SLIDESHOW.next()
						}
					}
                });
			}
		}
		,setImage: function( i, inc ){
			if ( this.firstTime && inc < 0 /*&& ! this.backTofirst*/ ) {
				$('.aleft').transition({opacity:0}, 377, 'easeOutExpo' );
				return;
			}
			clearTimeout( this.timeout );
			
			var w = $(window).width();
			
			//console.log( this.firstTime + ', i= ' + i + ', inc = ' + inc )
			
			if ( this.firstTime ){
				this.firstTime = false;	
				var $post = this.slides[0].find('#post');
				var x = $post.position().left;
				$post.data('x', x );
				$post.transition( { left:inc > 0 ? x-2*w : x+2*w }, 477, 'easeInExpo', function(){
					if ( ! AL_SLIDESHOW.backTofirst ) AL_SLIDESHOW.setPostOverlay( false );
				});
				$('.aleft').transition({opacity:1}, 777, 'easeOutExpo' );
			}
			else if ( !this.firstTime && i == this.slides.length - 1 && inc < 0 ){
				this.firstTime = true;	
				$('.aleft').transition({opacity:0}, 477, 'easeOutExpo' );
				var $post = this.slides[0].find('#post');
				$post.transition( { left:$post.data('x') }, 477, 'easeInExpo', function(){
				});
			}
			else{
				var j = this.n;
				var $slide;
				var $next = this.slides[i];
				var z = 1;
				// z-index
				while( j-- ){
					$slide = this.slides[j];
					if ( j === i ){
						// top next slide
						$slide.css( {'z-index': this.n } );
					}
					else if ( j === this.index ){
						// below top actual slide
						$slide.css( {'z-index': this.n - 1 } );
					}
					else{
						//$slide.transitionStop();
						$slide.css( { 'z-index': inc > 0 ? this.n - 1 - z : z } );
						z++;
					}
				}
				// transition
				$slide = this.slides[this.index];
				if ( inc > 0 ){
					$next.css({left:w});				
				}
				else{
					$next.css({left:-w});				
				}
				
				// reset title first slide before first slide enter
				if ( i === 0 && this.backTofirst ){
					this.firstTime = true;
					var $post = this.slides[0].find('#post');
					$post.css({left: '50%' });
					this.onResize( null );
					if ( inc < 0 ){
						this.slides[0].css({left:-w});
					}
				}
				
				// actual slide
				$slide.transition( {left:inc > 0 ? -w : w }, 577, 'easeInExpo' );
				// next slide
				$next.transition({left:0}, 777, 'easeOutExpo' );
				this.index = i;		
			}
			//this.timeout = setTimeout( this.next, this.time + this.timeTransition );
		}
		,onKeyPress: function(e){
			if ( e.keyCode === 39 ){
				//AL_SLIDESHOW.next();
				$('.aright').mouseover(); $('.aright').click();
			}
			if ( e.keyCode === 37 ){
				//AL_SLIDESHOW.prev();
				$('.aleft').mouseover(); $('.aleft').click();
			}
		}
		,onResize: function(e){
			//console.log( '>>> onResize!!!!!!!!!' )
			var $this = AL_SLIDESHOW; 	
			//console.log( $this );	
			var w = $(window).width();
			var h = $(window).height();
			// resize containers
			$( '#slideshow-work' ).width( w );
			$( '#slideshow-work' ).height( h );
			$('.slide-work').width( w );
			$('.slide-work').height( h );
			// center every image insize the slide
			var j = $this.n;
			while ( j-- ){
				var $slide = $this.slides[j];
				var $img = $slide.find('img');
				// resize image if necessary
				$this.resizeImg( j, $img, w, h );
				// center image
				$img.css( { 
					'margin-left' : - $img.width()/2 , 
					'margin-top': - $img.height()/2 
				} ); 
				// position
				if ( j === $this.index ){
					$slide.css({left:0});
				}
				else{
					$slide.css({left:w});
				}
				// center the overlay on the first image
				if ( j === 0 && $this.firstTime ){
					var $post = $slide.find('#post')
					if (  $post ){
						$post.width( $img.width() );
						$post.height( $img.height() );
						$post.css({ 
							'margin-left' : - $img.width()/2 , 
							'margin-top': - $img.height()/2 
						});
						// center internal text
						var $int = $post.find('.int');
						$int.css({ 
							'margin-left' : - $int.width()/2 , 
							'margin-top': - $int.height()/2 + 30
						});
					}	
				};				
			}
		},
		resizeImg: function( i , $img, ww, hh ){
			//console.log( 'resizeImg' )
			var w = $img.attr('width');
			var h = $img.attr('height');
			var max_w = ww - this.m_left*2;
			var max_h = hh - this.m_top*2;	
			
			if (max_h < 240 ){
				max_h = hh - 120;
			}		
			
			if ( this.uniform_high ){
				var toh = this.average_hight < max_h ? this.average_hight : max_h;
				//console.log('this.average_hight = ' + this.average_hight + ', toh = ' + toh + ', h = ' + h )
				$img.width( w*toh/h );			
				$img.height( toh );
			}
			else{
				if ( h > max_h || w > max_w ){
					// if height of the image > window height - margins
					if ( h > max_h ){
						$img.height( max_h );
						$img.width( w*max_h/h );
					}
					// if width of the image > window width - margins
					if ( w > max_w ){
						$img.width( max_w );
						$img.height( h*max_w/w );
					}
				}
				else{
					// original
					$img.width(w);
					$img.height(h);
				}
			}
		} 
	};
	
})(this, jQuery);