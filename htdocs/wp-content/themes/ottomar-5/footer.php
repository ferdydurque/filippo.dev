<?php if ( isset($_GET["ajaxreq"]) ) : ?>

			</div> <!-- content -->
		</div><!-- container -->

<?php else: ?>

			</div> <!-- content -->

				<footer class="footer" role="contentinfo">

					<div id="inner-footer" class="wrap clearfix">

						<nav role="navigation">
								<?php /*bones_footer_links();*/ ?>
						</nav>

						<!--<p class="source-org copyright">&copy; <?php echo date('Y'); ?> <?php bloginfo( 'name' ); ?>.</p>-->

					</div>

				</footer>

		</div><!-- container -->

		<?php // all js scripts are loaded in library/bones.php ?>
		<?php wp_footer(); ?>

<?php endif; ?>

	</body>

</html>
