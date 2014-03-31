<?php
/*
Template Name: Bio Page Example
*/
?>
<?php get_header(); ?>
			
				<div id="inner-content" class="wrap clearfix">

					<ul class="mnu">
					<?php
					$blocks = get_field('blocks');
					$i = 0;
					foreach( $blocks as $block ):
						echo '<li><a href="#" class="'. ($i==0 ? 'selected' : '' ) .'">' . $block['block_title'] . '</a></li>'; 
						$i++;
					endforeach;
					?>
					</ul>

					<img src="<?php echo get_gravatar('filippo@filippodellacasa.com', 64 ); ?>" class="gravatar">

					<ul class="blocks">
                     <?php
					 $html = '';
					 $blocks = get_field('blocks');
					 foreach( $blocks as $block ):
					 	$html .= '<li id="'. $block['block_title'] .'">';
							$html .= '<h1 class="text-center">' . $block['block_title'] . '</h1>';  
							
							$ps = $block['paragraphs'];
							$html .= '<ul class="paragraphs clearfix">';
							foreach( $ps as $p ):
								$html .= '<li>';
									$html .= '<div class="item">';
										$html .= '<h2>' . $p['year'] . '</h2>';
										$html .= '<h4>' . $p['title'] . '</h4>';
										$html .= '<div>' . $p['text'] . '</div>';
									$html .= '</div>';
								$html .= '</li>';
							endforeach;
							$html .= '</ul>';
						$html .= '</li>';
 					 endforeach;
					 echo $html;
					 ?>
					 </ul>

				</div>


<?php get_footer(); ?>
