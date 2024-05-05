/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$main = $('#main');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

		document.addEventListener('DOMContentLoaded', function() {
			// Select all the carousel containers
			const carousels = document.querySelectorAll('.project-card .image-carousel');
		
			carousels.forEach(carousel => {
				const images = carousel.querySelectorAll('.carousel-image');
				let currentIndex = 0; // Start with the first image in each carousel
		
				function nextImage() {
					const nextIndex = (currentIndex + 1) % images.length; // Calculate the next index, wrapping around
		
					images[currentIndex].classList.remove('visible'); // Remove visibility from current image
					images[nextIndex].classList.add('visible'); // Add visibility to next image
		
					currentIndex = nextIndex; // Update the current index to the new image
				}
		
				setInterval(nextImage, 3000); // Change image every 3000 milliseconds (3 seconds) for this carousel
			});
		});
		
		document.addEventListener('DOMContentLoaded', function () {
			var buttons = document.querySelectorAll('.project-card button');
		
			buttons.forEach(function(button, index) {
				button.addEventListener('click', function() {
					toggleText(index + 1);
				});
			});
		});

		document.addEventListener('DOMContentLoaded', function() {
			const roleSpan = document.getElementById('role');
			const roles = ['Engineer', 'Analyst'];
			let currentRole = 0;
			let currentChar = 0;
			let currentText = '';
			let deleting = false;
		
			function typeEffect() {
				if (deleting) {
					if (currentText.length > 0) {
						// Remove character
						currentText = currentText.substring(0, currentText.length - 1);
						roleSpan.textContent = "Aspiring Data " + currentText;
					} else {
						// Once text is deleted, switch to typing mode
						deleting = false;
						currentRole = (currentRole + 1) % roles.length;
						currentChar = 0;
					}
				} else {
					if (currentChar < roles[currentRole].length) {
						// Add character
						currentText += roles[currentRole][currentChar];
						roleSpan.textContent = "Aspiring Data " + currentText;
						currentChar++;
					} else {
						// Once text is complete, switch to deleting mode
						deleting = true;
					}
				}
			}
		
			// Start the typewriter effect, adjust interval to speed up or slow down the effect
			setInterval(typeEffect, 200); // Speed of typing
		});
		
		
		function toggleText(id) {
			var moreText = document.getElementById('more' + id);
			var btnText = document.getElementById('button' + id);
		
			if (moreText.style.display === "none" || moreText.style.display === "") {
				moreText.style.display = "inline"; // Shows the extended content
				btnText.textContent = 'Read Less'; // Changes button text to 'Read Less'
			} else {
				moreText.style.display = "none"; // Hides the extended content
				btnText.textContent = 'Read More'; // Changes button text back to 'Read More'
			}
		}
		
		
		

	// Nav.
		var $nav = $('#nav');

		if ($nav.length > 0) {

			// Shrink effect.
				$main
					.scrollex({
						mode: 'top',
						enter: function() {
							$nav.addClass('alt');
						},
						leave: function() {
							$nav.removeClass('alt');
						},
					});

			// Links.
				var $nav_a = $nav.find('a');

				$nav_a
					.scrolly({
						speed: 1000,
						offset: function() { return $nav.height(); }
					})
					.on('click', function() {

						var $this = $(this);

						// External link? Bail.
							if ($this.attr('href').charAt(0) != '#')
								return;

						// Deactivate all links.
							$nav_a
								.removeClass('active')
								.removeClass('active-locked');

						// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
							$this
								.addClass('active')
								.addClass('active-locked');

					})
					.each(function() {

						var	$this = $(this),
							id = $this.attr('href'),
							$section = $(id);

						// No section for this link? Bail.
							if ($section.length < 1)
								return;

						// Scrollex.
							$section.scrollex({
								mode: 'middle',
								initialize: function() {

									// Deactivate section.
										if (browser.canUse('transition'))
											$section.addClass('inactive');

								},
								enter: function() {

									// Activate section.
										$section.removeClass('inactive');

									// No locked links? Deactivate all links and activate this section's one.
										if ($nav_a.filter('.active-locked').length == 0) {

											$nav_a.removeClass('active');
											$this.addClass('active');

										}

									// Otherwise, if this section's link is the one that's locked, unlock it.
										else if ($this.hasClass('active-locked'))
											$this.removeClass('active-locked');

								}
							});

					});

		}

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000
		});

})(jQuery);