<?php
/*
Template Name: Slideshow Works
*/
?>
<?php get_header(); ?>

			<div id="content">

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
                        <img data-caption="<?php echo $image['caption']; ?>" data-rel="<?php echo $i; ?>" src="<?php echo $i === 0 ? $image['url'] : get_template_directory_uri() . '/library/images/empty.png' ; ?>" data-src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" width="<?php echo $image['width']; ?>" height="<?php echo $image['height']; ?>"/>
                    </div>
                    <div class="caption">              	
                    </div>

					<?php $i++; endwhile; endif; ?>
				
				</div>

			</div>

<?php get_footer(); ?>
