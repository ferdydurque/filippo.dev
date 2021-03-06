<?php
/*
Template Name: Slideshow Works
*/
?>
<?php get_header(); ?>

			<div id="inner-content">

                <div id="bg-slideshow">
                
	                <div class="arrow aleft">
	                	<div class="aint"></div>
	                </div>
	                <div class="arrow aright">
	                	<div class="aint"></div>
	                </div>



					<?php $the_query = new WP_Query( array(
						'post_type' => 'work'
						,'nopaging' => true
					) ); 
					if ($the_query -> have_posts()) : $i = 0; while ( $the_query -> have_posts()) : $the_query -> the_post(); 
					$images = get_field('gallery');
					shuffle( $images );
					$image = $images[0];
					?>

 					<div class="slide">            
                        <!--<img data-caption="<?php echo $image['caption']; ?>" data-rel="<?php echo $i; ?>" src="<?php echo $i === 0 ? $image['sizes']['big'] : get_template_directory_uri() . '/library/images/empty.png' ; ?>" data-src="<?php echo $image['sizes']['big']; ?>" alt="<?php echo $image['alt']; ?>" width="<?php echo $image['sizes']['big-width']; ?>" height="<?php echo $image['sizes']['big-height']; ?>"/>-->
                        <img class="bg" data-caption="<?php the_title(); ?>" data-rel="<?php echo $i; ?>" src="<?php echo $i === 0 ? $image['url'] : get_template_directory_uri() . '/library/images/empty.png' ; ?>" data-src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" width="<?php echo $image['width']; ?>" height="<?php echo $image['height']; ?>"/>
                    	
                        <?php $j = 0; foreach ( $images as $image ): /*if ( $j > 0 ) :*/ ?>
                        	<img class="thumb" data-rel="<?php echo $j; ?>" src="<?php echo $j === 1 ? $image['sizes']['thumbnail'] : get_template_directory_uri() . '/library/images/empty.png' ; ?>" data-src="<?php echo $image['sizes']['thumbnail']; ?>" alt="<?php echo $image['alt']; ?>" width="<?php echo $image['sizes']['thumbnail-width']; ?>" height="<?php echo $image['sizes']['thumbnail-height']; ?>"/>
                        <?php /*endif;*/ $j++; endforeach; ?>

                        <div class="caption">
                        	<h2><?php the_title(); ?></h2>
                        	<h4>Year: <span><?php echo get_field('year'); ?></span></h4>
                        	<a class="btn visit" href="<?php echo get_field('url'); ?>" target="_blank">Visit<i class="fa fa-external-link right"></i></a> 
                        </div>

                    </div>

					<?php $i++; endwhile; endif; ?>
				
				</div>
				<div id="caption"> 
					<div id="int"></div>
					<div id="close"><div class="icon"><i class="fa fa-chevron-left"></i></div></div>
				</div>

			</div>
<?php get_footer(); ?>
