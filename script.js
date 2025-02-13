document.addEventListener("DOMContentLoaded", () => {
	const soundButtons = document.querySelectorAll('.sound-button');

	soundButtons.forEach(button => {
		document.addEventListener("visibilitychange", (e) => {
			if (document.hidden) {
				if (button._audioInstance) {
					button._audioInstance.pause();
					button._audioInstance.currentTime = 0;
					button._audioInstance = null;
				}

				if (button._mediaInstance && button._mediaInstance.tagName.toLowerCase() === 'video') {
					button._mediaInstance.pause();
					button._mediaInstance.currentTime = 0;
					button._mediaInstance = null;
				}
			}
		})

		button.addEventListener('click', () => {
			const audioSrc = button.getAttribute('data-audio-src');
			// Check if this button already has a playing audio instance.
			let audio = button._audioInstance;
			if (audio && !audio.paused) {
				// If it's already playing, stop it.
				audio.pause();
				audio.currentTime = 0;
				if (button._mediaInstance && button._mediaInstance.tagName.toLowerCase() === 'video') {
					button._mediaInstance.pause();
					button._mediaInstance.currentTime = 0;
				}
				button._audioInstance = null;
				button._mediaInstance = null;
				return;
			}

			// Create a new audio instance and store it on this button.
			audio = new Audio(audioSrc);
			button._audioInstance = audio;

			// If there's a media element (like a video) inside the button, play it too.
			const mediaEl = button.querySelector('video') || button.querySelector('img');
			if (mediaEl && mediaEl.tagName.toLowerCase() === 'video') {
				mediaEl.currentTime = 0;
				mediaEl.play();
				button._mediaInstance = mediaEl;
			}

			audio.play();

			// When the audio ends, clear the stored instances.
			audio.addEventListener('ended', () => {
				if (button._audioInstance === audio) {
					button._audioInstance = null;
				}
				if (button._mediaInstance && button._mediaInstance.tagName.toLowerCase() === 'video') {
					button._mediaInstance.pause();
					button._mediaInstance.currentTime = 0;
					button._mediaInstance = null;
				}
			});
		});
	});
});
