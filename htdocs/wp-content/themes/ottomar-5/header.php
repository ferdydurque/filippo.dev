<!doctype html>

<?php if ( isset($_GET["ajaxreq"]) ) : ?>

<html>
	<head>
		<meta charset="utf-8">
	</head>
	<body>
		<div id="container">
			<div id="body-injected" data-title="<?php echo get_bloginfo('name'); ?><?php wp_title('/'); ?>" <?php body_class(); ?> ></div>

<?php else: ?>


<!--[if lt IE 7]><html <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8 lt-ie7"><![endif]-->
<!--[if (IE 7)&!(IEMobile)]><html <?php language_attributes(); ?> class="no-js lt-ie9 lt-ie8"><![endif]-->
<!--[if (IE 8)&!(IEMobile)]><html <?php language_attributes(); ?> class="no-js lt-ie9"><![endif]-->
<!--[if gt IE 8]><!--> <html <?php language_attributes(); ?> class="no-js"><!--<![endif]-->

	<head>
		<meta charset="utf-8">

		<?php // Google Chrome Frame for IE ?>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

		<title><?php echo get_bloginfo('name'); ?><?php wp_title('/'); ?></title>

		<?php // mobile meta (hooray!) ?>
		<meta name="HandheldFriendly" content="True">
		<meta name="MobileOptimized" content="320">
		<meta name="viewport" content="width=device-width, initial-scale=1.0"/>

		<?php // icons & favicons (for more: http://www.jonathantneal.com/blog/understand-the-favicon/) ?>
		<link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/library/images/apple-icon-touch.png">
		<link rel="icon" href="<?php echo get_template_directory_uri(); ?>/favicon.png">
		<!--[if IE]>
			<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico">
		<![endif]-->
		<?php // or, set /favicon.ico for IE10 win ?>
		<meta name="msapplication-TileColor" content="#f01d4f">
		<meta name="msapplication-TileImage" content="<?php echo get_template_directory_uri(); ?>/library/images/win8-tile-icon.png">

		<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

		<?php // wordpress head functions ?>
		<?php wp_head(); ?>
		<?php // end of wordpress head ?>

		<?php // drop Google Analytics Here ?>
		<?php // end analytics ?>

	</head>

	<body <?php body_class(); ?>>

		<?php
		// mobile detection plugin hook
		function get_device_class(){
			if (wpmd_is_notdevice()): 
				return 'desktop '; 
			elseif (wpmd_is_phone()): 
				return 'mobile '; 
			else: 
				return 'tablet '; 
			endif;
		}
		?>

		<div id="container" class="<?php echo get_device_class(); ?>">

			<div id="body-injected" data-title="<?php echo get_bloginfo('name'); ?><?php wp_title('/'); ?>" <?php body_class(); ?> ></div>

			<header class="header" role="banner">

				<div id="inner-header" class="clearfix">

					<div id="mnu-icon" class="icon"><i class="fa fa-bars"></i></div>
					<a href="<?php echo home_url(); ?>/info" class="ajax"><div id="info-icon" class="icon"><i class="fa fa-file"></i></div></a>

				</div>

			</header>

			
			<div id="drawer">
				
				<header class="header-drawer">
					<a href="<?php echo home_url(); ?>" rel="nofollow" class="ajax"><img src="<?php echo get_gravatar('filippo@filippodellacasa.com', 64 ); ?>" id="gravatar"></a>
				</header>

				<div id="inner-drawer">
	               	<nav role="navigation">
	                    <?php bones_main_nav(); ?>
	                </nav>
	                
	                <h4><i>Works</i></h4>

					<ul class="works">
						<?php 
						$the_query = new WP_Query( array(
							'post_type' => 'work'
							,'nopaging' => true
						)); 
						$html = '';
						if ($the_query -> have_posts()) : $i = 0; while ( $the_query -> have_posts()) : $the_query -> the_post(); 
							$images = get_field('gallery');
							shuffle( $images );
							$image = $images[0];
							$html .= '<li><a href="'. get_permalink() .'" class="ajax">';
								$html .= '<div class="thumb"><img src="'. $image['sizes']['thumb-drawer'] . '" width="' . $image['sizes']['thumb-drawer-width'] .'" height="' . $image['sizes']['thumb-drawer-height'] . '"></div>';
								$html .= '<div class="text">';
									$html .= '<div>' . get_the_title() . '</div>';
									$html .= '<div><i>Year ' . get_field('year') . '</i></div>';
								$html .= '</div>';
							$html .= '</a></li>';
						$i++; endwhile; endif;
						wp_reset_postdata();
						echo $html;
						?>
					</ul>						

                </div>
			</div>

<?php endif; ?>

			<div id="content">

				
