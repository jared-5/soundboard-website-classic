document.addEventListener("DOMContentLoaded", () => {
	const soundButtons = document.querySelectorAll('.sound-button');
	let currentAudio = null;
	let currentMedia = null;

	document.addEventListener("visibilitychange", () => {
		if (currentAudio && !currentAudio.paused) {
			currentAudio.pause();
			currentAudio.currentTime = 0;
			if (currentMedia && currentMedia.tagName.toLowerCase() === "video") {
				currentMedia.pause();
				currentMedia.currentTime = 0;
			}
		}
	})

	soundButtons.forEach(button => {
		button.addEventListener('click', () => {
			const audioSrc = button.getAttribute('data-audio-src');
			const mediaEl = button.querySelector('video') || button.querySelector('img');

			const absoluteAudioSrc = new URL(audioSrc, location.href).href;

			if (
				currentAudio &&
				currentAudio.src === absoluteAudioSrc &&
				!currentAudio.paused
			) {
				currentAudio.pause();
				currentAudio.currentTime = 0;
				if (currentMedia && currentMedia.tagName.toLowerCase() === 'video') {
					currentMedia.pause();
					currentMedia.currentTime = 0;
				}
				currentAudio = null;
				currentMedia = null;
				return;
			}

			if (currentAudio && !currentAudio.paused) {
				currentAudio.pause();
				currentAudio.currentTime = 0;
				if (currentMedia && currentMedia.tagName.toLowerCase() === 'video') {
					currentMedia.pause();
					currentMedia.currentTime = 0;
				}
			}

			const audio = new Audio(audioSrc);
			currentAudio = audio;
			currentMedia = mediaEl;

			if (mediaEl && mediaEl.tagName.toLowerCase() === 'video') {
				mediaEl.currentTime = 0;
				mediaEl.play();
			}

			audio.play();

			audio.addEventListener('ended', () => {
				if (currentAudio === audio) {
					currentAudio = null;
					if (currentMedia && currentMedia.tagName.toLowerCase() === 'video') {
						currentMedia.pause();
						currentMedia.currentTime = 0;
						currentMedia = null;
					}
				}
			});
		});
	});
});
