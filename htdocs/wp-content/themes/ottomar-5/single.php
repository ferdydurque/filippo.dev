<?php get_header(); ?>


				<div id="inner-content" class="wrap clearfix">

					<div id="main" role="main">

						<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

							<article id="post-<?php the_ID(); ?>" <?php post_class('clearfix'); ?> role="article" itemscope itemtype="http://schema.org/BlogPosting">

								<header class="article-header">

									<h1 class="entry-title single-title" itemprop="headline"><?php the_title(); ?></h1>
								</header>

								<section class="entry-content clearfix" itemprop="articleBody">
									<?php /*the_content();*/ ?>
								</section>

								<footer class="article-footer">
									<?php /*the_tags( '<p class="tags"><span class="tags-title">' . __( 'Tags:', 'bonestheme' ) . '</span> ', ', ', '</p>' );*/ ?>
								</footer>

								<?php /*comments_template();*/ ?>

								<div class="text-center">
								<?php $images = get_field('gallery'); foreach ( $images as $image ):

									

								?>
		                        	<img src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt']; ?>" width="<?php echo $image['width']; ?>" height="<?php echo $image['height']; ?>"/>
		                        <?php endforeach; ?>
		                        </div>


							</article>

						<?php endwhile; ?>

						<?php else : ?>

							<article id="post-not-found" class="hentry clearfix">
									<header class="article-header">
										<h1><?php _e( 'Oops, Post Not Found!', 'bonestheme' ); ?></h1>
									</header>
									<section class="entry-content">
										<p><?php _e( 'Uh Oh. Something is missing. Try double checking things.', 'bonestheme' ); ?></p>
									</section>
									<footer class="article-footer">
											<p><?php _e( 'This is the error message in the single.php template.', 'bonestheme' ); ?></p>
									</footer>
							</article>

						<?php endif; ?>

					</div>

					<?php /*get_sidebar();*/ ?>

				</div>

<?php get_footer(); ?>
