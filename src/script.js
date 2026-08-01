document.addEventListener('DOMContentLoaded', function () {
  var overlay = document.getElementById('enter-overlay');
  var audio = document.getElementById('bg-audio');
  var volumeControl = document.getElementById('volume-control');
  var volumeSlider = document.getElementById('volume-slider');
  var volumeToggle = document.getElementById('volume-toggle');

  var lastVolume = 0.2;
  audio.volume = lastVolume;

  if (overlay) {
    overlay.addEventListener('click', function () {
      overlay.classList.add('hidden');
      audio.play().catch(function () {});
      if (volumeControl) {
        volumeControl.classList.remove('hidden');
      }
    }, { once: true });
  }

  if (volumeSlider) {
    volumeSlider.addEventListener('input', function () {
      var value = Number(volumeSlider.value) / 100;
      audio.volume = value;
      audio.muted = value === 0;
      if (value > 0) {
        lastVolume = value;
      }
    });
  }

  if (volumeToggle) {
    volumeToggle.addEventListener('click', function () {
      if (audio.muted || audio.volume === 0) {
        audio.muted = false;
        audio.volume = lastVolume;
        volumeSlider.value = String(Math.round(lastVolume * 100));
      } else {
        lastVolume = audio.volume;
        audio.muted = true;
        volumeSlider.value = '0';
      }
    });
  }
});
