(function(){ 
    const VideoPlayer = {};

    window.addEventListener('load', () => {
        VideoPlayer.video = document.getElementById('video');
        VideoPlayer.playBtn = document.getElementById('playBtn');
        VideoPlayer.pBar = document.getElementById('pbar');
        VideoPlayer.pBarContainer = document.getElementById('progressbarContainer');
        VideoPlayer.timeField = document.getElementById('timeField');
        VideoPlayer.volumeBtn = document.getElementById('volumeBtn');
        VideoPlayer.sbarContainer = document.getElementById('sbarContainer');
        VideoPlayer.soundbar = document.getElementById('soundbar');
        VideoPlayer.fullscreenBtn = document.getElementById('fullscreenBtn');
        VideoPlayer.screenBtn = document.getElementById('screenBtn');
        VideoPlayer.screen = document.getElementById('screen');

        video.load();
        video.addEventListener('canplay', () => {
            VideoPlayer.playBtn.addEventListener('click', togglePlay, false);
            VideoPlayer.pBarContainer.addEventListener('click', skip, false);
            VideoPlayer.volumeBtn.addEventListener('click', toggleSound, false);
            VideoPlayer.sbarContainer.addEventListener('click', changeVolume, false);
            updatePlayer();
            VideoPlayer.fullscreenBtn.addEventListener('click', toggleFullScreen, false);
            VideoPlayer.screen.addEventListener('click', togglePlay, false);
        }, false);        

    }, false);

    function togglePlay() {
        if(video.paused) {
            video.play();
            VideoPlayer.playBtn.src = "assets/img/pause.png";
            VideoPlayer.update = setInterval(updatePlayer, 30);
            VideoPlayer.screen.style.display = "none";

        } else {
            video.pause();
            VideoPlayer.playBtn.src = "assets/img/play.png";
            window.clearInterval(VideoPlayer.update);
            VideoPlayer.screen.style.display = "block";
            VideoPlayer.screenBtn.src = "assets/img/play.png";
        }
    }

    function updatePlayer() {
        let percentage = (video.currentTime / video.duration) * 100;
        pbar.style.width = percentage + '%';
        VideoPlayer.timeField.innerHTML = getFormattedTime();

        if(video.ended) {
            window.clearInterval(VideoPlayer.update);
            VideoPlayer.playBtn.src = "assets/img/replay.png";
            VideoPlayer.screen.style.display = "block";
            VideoPlayer.screenBtn.src = "assets/img/replay.png";
        } else if (video.paused) {
            VideoPlayer.playBtn.src = "assets/img/play.png";
            VideoPlayer.screenBtn.src = "assets/img/play.png";
        }
    }

    function skip(event) {
        let mouseX = event.pageX - VideoPlayer.pBarContainer.offsetLeft;
        var barWidth = window.getComputedStyle(VideoPlayer.pBarContainer).getPropertyValue('width');

        barWidth = +barWidth.substr(0, barWidth.length - 2); // cut out the "px" from the original value
        video.currentTime = (mouseX / barWidth) * video.duration;
        updatePlayer();
    }

    function getFormattedTime() {
        let seconds = Math.round(video.currentTime);
        let minutes = Math.floor(seconds / 60);
        if (minutes > 0) seconds -= minutes * 60;
        if (seconds.toString().length === 1) seconds = '0' + seconds;

        let totalSeconds = Math.round(video.duration);
        let totalMinutes = Math.floor(totalSeconds/60);
        if (totalMinutes > 0) totalSeconds -= totalMinutes * 60;
        if (totalSeconds.toString().length === 1) totalSeconds = '0' + totalSeconds;

        return `${minutes}:${seconds} / ${totalMinutes}:${totalSeconds}`; 
    }

    function toggleSound() {
        if(!video.muted) {
            video.muted = true;
            VideoPlayer.volumeBtn.src = "assets/img/mute.png";
            VideoPlayer.soundbar.style.display = "none";
        } else {
            unMute();
        }
    }

    function unMute() {
        video.muted = false;
        VideoPlayer.volumeBtn.src = "assets/img/sound.png";
        VideoPlayer.soundbar.style.display = "block";
    }

    function changeVolume(event) {
        let mouseX = event.pageX - VideoPlayer.sbarContainer.offsetLeft;
        var barWidth = window.getComputedStyle(VideoPlayer.sbarContainer).getPropertyValue('width');
        barWidth = +barWidth.substr(0, barWidth.length - 2); 

        video.volume = mouseX / barWidth;
        VideoPlayer.soundbar.style.width = (mouseX / barWidth) * 100 + "%";
        unMute();
    }

    function toggleFullScreen() {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.mozRequestFullscreen) {
            video.mozRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    }

})();