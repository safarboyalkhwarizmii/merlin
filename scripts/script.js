let submitBtn = document.getElementById("submit");
submitBtn.addEventListener("click", (e) => {
    let urlInput = document.getElementById("urlInput").value;   
    document.querySelector(".container").innerHTML = `
   
    <div id="video_player">
        <video src="http://fayllar1.ru/15/hdd2/kinolar/seriallar/Merlin/Merlin - Мерлин (O'zbek tilida) HD ${urlInput} - Qism.mp4" id="main-video"></video>
        
        <div class="progressAreaTime">0:00</div>
        <div class="controls">
        <a class="glow-on-hover" href="http://fayllar1.ru/15/hdd2/kinolar/seriallar/Merlin/Merlin - Мерлин (O'zbek tilida) HD ${urlInput} - Qism.mp4" download>
        <i class="fa fa-download" aria-hidden="true"></i>
     </a>
            <div class="progress-area">
                <div class="progress-bar">
                    <span></span>
                </div>
            </div>
            <div class="controls-list">
                <div class="controls-left">
                    <span class="icon">
                        <i class="material-icons fast-rewind">replay_10</i>
                    </span>
                    <span class="icon">
                        <i class="material-icons play_pause">play_arrow</i>
                    </span>
                    <span class="icon">
                        <i class="material-icons fast-forward">forward_10</i>
                    </span>
                    <span class="icon">
                        <i class="material-icons volume">volume_up</i>
                        <input type="range" min="0" max="100" class="volume_range">
                    </span>
                    <div class="timer">
                        <span class="current">0:00</span> / <span class="duration">0:00</span>
                    </div>
                </div>
                <div class="controls-right">
                    <span class="icon">
                        <i class="material-icons auto-play"></i>
                    </span>
                    <span class="icon">
                        <i class="material-icons settingsBtn">settings</i>
                    </span>
                    <span class="icon">
                        <i class="material-icons picture_in_picutre">picture_in_picture_alt</i>
                    </span>
                    <span class="icon">
                        <i class="material-icons fullscreen">fullscreen</i>
                    </span>
                </div>
            </div>
        </div>
        <div id="settings">
            <div class="playback">
                <span>Playback Speed</span>
                <ul>
                    <li data-speed="0.25">0.25</li>
                    <li data-speed="0.5">0.5</li>
                    <li data-speed="0.75">0.75</li>
                    <li data-speed="1"  class="active">Normal</li>
                    <li data-speed="1.25">1.25</li>
                    <li data-speed="1.5">1.5</li>
                    <li data-speed="1.75">1.75</li>
                    <li data-speed="2">2</li>
                </ul>
            </div>
        </div>
    </div>
    `

    // let's select all required tags or elements
const video_player = document.querySelector('#video_player'),
mainVideo = video_player.querySelector('#main-video'),
progressAreaTime = video_player.querySelector('.progressAreaTime'),
controls = video_player.querySelector('.controls'),
progressArea = video_player.querySelector('.progress-area'),
progress_Bar = video_player.querySelector('.progress-bar'),
fast_rewind = video_player.querySelector('.fast-rewind'),
play_pause = video_player.querySelector('.play_pause'),
fast_forward = video_player.querySelector('.fast-forward'),
volume = video_player.querySelector('.volume'),
volume_range = video_player.querySelector('.volume_range'),
current = video_player.querySelector('.current'),
totalDuration = video_player.querySelector('.duration'),
auto_play = video_player.querySelector('.auto-play'),
settingsBtn = video_player.querySelector('.settingsBtn'),
picture_in_picutre = video_player.querySelector('.picture_in_picutre'),
fullscreen = video_player.querySelector('.fullscreen'),
settings = video_player.querySelector('#settings'),
playback = video_player.querySelectorAll('.playback li');



// Play video function
function playVideo() {
    play_pause.innerHTML = "pause";
    play_pause.title = "pause";
    video_player.classList.add('paused')
    mainVideo.play();
}

// Pause video function
function pauseVideo() {
    play_pause.innerHTML = "play_arrow";
    play_pause.title = "play";
    video_player.classList.remove('paused')
    mainVideo.pause();
}

play_pause.addEventListener('click',()=>{
    const isVideoPaused = video_player.classList.contains('paused');
    isVideoPaused ? pauseVideo() : playVideo();
})

mainVideo.addEventListener('play',()=>{
    playVideo();
})

mainVideo.addEventListener('pause',()=>{
    pauseVideo();
})

// fast_rewind video function
fast_rewind.addEventListener('click',()=>{
    mainVideo.currentTime -= 10;
})

// fast_forward video function
fast_forward.addEventListener('click',()=>{
    mainVideo.currentTime += 10;
})


// Load video duration
mainVideo.addEventListener("loadeddata",(e)=>{
    let videoDuration = e.target.duration;
    let totalMin = Math.floor(videoDuration / 60);
    let totalSec = Math.floor(videoDuration % 60);

    // if seconds are less then 10 then add 0 at the begning
    totalSec < 10 ? totalSec = "0"+totalSec : totalSec;
    totalDuration.innerHTML = `${totalMin} : ${totalSec}`;
})

// Current video duration
mainVideo.addEventListener('timeupdate',(e)=>{
    let currentVideoTime = e.target.currentTime;
    let currentMin = Math.floor(currentVideoTime / 60);
    let currentSec = Math.floor(currentVideoTime % 60);
   // if seconds are less then 10 then add 0 at the begning
    currentSec < 10 ? currentSec = "0"+currentSec : currentSec; 
    current.innerHTML = `${currentMin} : ${currentSec}`;

    let videoDuration = e.target.duration
    // progressBar width change
    let progressWidth = (currentVideoTime / videoDuration) * 100;
    progress_Bar.style.width = `${progressWidth}%`;
})

// let's update playing video current time on according to the progress bar width

progressArea.addEventListener('click',(e)=>{
    let videoDuration = mainVideo.duration;
    let progressWidthval = progressArea.clientWidth;
    let ClickOffsetX = e.offsetX;
    mainVideo.currentTime = (ClickOffsetX / progressWidthval) * videoDuration;
})

// change volume
function changeVolume() {
    mainVideo.volume = volume_range.value / 100;
    if (volume_range.value == 0) {
        volume.innerHTML = "volume_off";
    }else if(volume_range.value < 40){
        volume.innerHTML = "volume_down";
    }else{
        volume.innerHTML = "volume_up";
    }

}

function muteVolume() {
    if (volume_range.value == 0) {
        volume_range.value = 80;
        mainVideo.volume = 0.8;
        volume.innerHTML = "volume_up";
    }else{
        volume_range.value = 0;
        mainVideo.volume = 0;
        volume.innerHTML = "volume_off";
    }
}


volume_range.addEventListener('change',()=>{
    changeVolume();
})

volume.addEventListener('click',()=>{
    muteVolume();
})


// Update progress area time and display block on mouse move
progressArea.addEventListener('mousemove',(e)=>{
    let progressWidthval = progressArea.clientWidth;
    let x = e.offsetX;
    progressAreaTime.style.setProperty('--x',`${x}px`);
    progressAreaTime.style.display = "block";
    let videoDuration = mainVideo.duration;
    let progressTime = Math.floor((x/progressWidthval)*videoDuration);
    let currentMin = Math.floor(progressTime / 60);
    let currentSec = Math.floor(progressTime % 60);
   // if seconds are less then 10 then add 0 at the begning
    currentSec < 10 ? currentSec = "0"+currentSec : currentSec; 
    progressAreaTime.innerHTML = `${currentMin} : ${currentSec}`;

})

progressArea.addEventListener('mouseleave',()=>{
    progressAreaTime.style.display = "none";
})



// Auto play
auto_play.addEventListener('click',()=>{
    auto_play.classList.toggle('active')
    if(auto_play.classList.contains('active')){
        auto_play.title = "Autoplay is on";
    }else{
        auto_play.title = "Autoplay is off";
    }
});

mainVideo.addEventListener("ended",()=>{
    if (auto_play.classList.contains('active')) {
        playVideo();
    }else{
        play_pause.innerHTML = "replay";
        play_pause.title = "Replay";
    }
});

// Picture in picture

picture_in_picutre.addEventListener('click',()=>{
    mainVideo.requestPictureInPicture();
})


// Full screen function

fullscreen.addEventListener('click',()=>{
    if (!video_player.classList.contains('openFullScreen')) {
        video_player.classList.add('openFullScreen');
        fullscreen.innerHTML = "fullscreen_exit";
        video_player.requestFullscreen();
    }else{
        video_player.classList.remove('openFullScreen');
        fullscreen.innerHTML = "fullscreen";
        document.exitFullscreen();
    }
});


// Open settings
settingsBtn.addEventListener('click',()=>{
    settings.classList.toggle('active');
    settingsBtn.classList.toggle('active');
})

// Playback Rate

playback.forEach((event)=>{
    event.addEventListener('click',()=>{
        removeActiveClasses();
        event.classList.add('active');
        let speed = event.getAttribute('data-speed');
        mainVideo.playbackRate = speed;
    })
})



function removeActiveClasses() {
    playback.forEach(event => {
        event.classList.remove('active')
    });
}


// Store video duration and video path in local storage

window.addEventListener('unload',()=>{
    let setDuration = localStorage.setItem('duration',`${mainVideo.currentTime}`);
    let setSrc = localStorage.setItem('src',`${mainVideo.getAttribute('src')}`);
})

window.addEventListener('load',()=>{
    let getDuration = localStorage.getItem('duration');
    let getSrc = localStorage.getItem('src');
    if (getSrc) {
        mainVideo.src = getSrc;
        mainVideo.currentTime = getDuration;
    }
})


mainVideo.addEventListener('contextmenu',(e)=>{
    e.preventDefault();
})


// Mouse move controls
video_player.addEventListener('mouseover',()=>{
    controls.classList.add('active');
})

video_player.addEventListener('mouseleave',()=>{
    if (video_player.classList.contains('paused')) {
        if (settingsBtn.classList.contains('active')) {
            controls.classList.add('active');
        }else{
            controls.classList.remove('active')
        }
    }else{
        controls.classList.add('active')
    }
})

if (video_player.classList.contains('paused')) {
    if (settingsBtn.classList.contains('active')) {
        controls.classList.add('active');
    }else{
        controls.classList.remove('active')
    }
}else{
    controls.classList.add('active')
}

// mobile touch controls
video_player.addEventListener('touchstart',()=>{
    controls.classList.add('active');
    setTimeout(() => {
        controls.classList.remove('active')
    }, 8000);
})

video_player.addEventListener('touchmove',()=>{
    if (video_player.classList.contains('paused')) {
        controls.classList.remove('active')
    }else{
        controls.classList.add('active')
    }
})
})