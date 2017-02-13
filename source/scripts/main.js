/*!
 * main.js
 * Author: Habanero Consulting Group
 */

(function () {
	'use strict';

	$(function () {
		// Check for fhb-of-age cookie
		var ofAge = window.Cookies.get('fhb_of_age');

		if (!!!ofAge) { // If they answered YES previously, do nothing
			$('body').addClass('bouncer--card-em');
		}

		// https://css-tricks.com/snippets/jquery/smooth-scrolling/
		$('a[href*="#"]:not([href="#"])').click(function () {
			if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

				if (target.length) {
					$('html, body').animate({
						scrollTop: target.offset().top
					}, 1000);

					return false;
				}
			}
		});
	});

	window.gtmEventHelper = function (category, action, label, value, noninteraction) {
		return window.dataLayer && window.dataLayer.push({
			event: 'GAevent',
			eventAction: action || '',
			eventCategory: category || '',
			eventLabel: label || '',
			eventNonInteraction: noninteraction || !1,
			eventValue: value });
	};

	window.handleBouncerResponse = function (isAllowedAccess) {
		// If YES, store cookie, dismiss modal
		if (isAllowedAccess) {
			window.Cookies.set('fhb_of_age', 'true', { expires: 365 * 2 });
			$('body').removeClass('bouncer--card-em');
			window.gtmEventHelper('bouncer', 'of-age', 'yes');
		} else {
			// If NO, (store cookie?) redirect to AARCS
			$('body').addClass('bouncer--offer-suggestion');
			window.gtmEventHelper('bouncer', 'of-age', 'no');
		}
	};
})();