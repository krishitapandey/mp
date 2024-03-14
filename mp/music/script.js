//html element selection 

let now_playing = document.querySelector('.now_playing');
let track_art = document.querySelector('.track_art');
let track_name = document.querySelector('.track_name');
let track_artist = document.querySelector('.track_artist');

let playpause_btn = document.querySelector('.playpause_track');
let next_btn = document.querySelector('.next_track');
let prev_btn = document.querySelector('.prev_track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current_time');
let total_duration = document.querySelector('.total_duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index= 0;
let isPlaying =false;
let isRandom= false;
let updateTimer;

const music_list=[
{
    img:'./music/cheapthrills.png',
    name:'Cheap Thrills',
    artist:'Sia',
    music:'./music/Sia-cheap.mp3'
},
{
    img:'./music/lover.jpeg',
    name:'Lover ',
    artist:'Taylor Swift',
    music:'./music/TaylorSwift-lover.mp3'
}
]


loadTrack(track_index);

function loadTrack(track_index)
{
    clearInterval (updateTimer);
    reset();

    curr_track.src =music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img+")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent=music_list[track_index].artist;
    now_playing.textContent="Playing music "+(track_index +1 ) + " of " +music_list.length;

    updateTimer = setInterval(setUpdate,1000);
    curr_track.addEventListener('ended',nextTrack);

}

function reset()
{
    curr_time.textContent="00:00";
    total_duration.textContent ="00:00";
    seek_slider.value = 0;
}

function repeatTrack()
{
    let current_index =track_index;
    loadTrack(current_index);
    playTrack();
}

function playpauseTrack(){
    isPlaying? pauseTrack():playTrack();

}

function playTrack()
{
    curr_track.play();
    isPlaying=true;
    track_art.classList.add('rotate');
    playpause_btn.innerHTML = '<i class="fa  fa-pause-circle fa-4x"></i>'
}

function pauseTrack()
{
    curr_track.pause();
    isPlaying=false;
    track_art.classList.remove('rotate');
    playpause_btn.innerHTML = '<i class="fa  fa-play-circle fa-4x"></i>'
}

function nextTrack()
{
    if (track_index < music_list.length - 1 )
    {
        track_index += 1;
    }
    else if (track_index > music_list.length - 1  )
    {
        let random_index =Number.parseInt(Math.random()*music_list.length);
        track_index =random_index;
    }
    else{
        track_index=0;
    }

    loadTrack(track_index);
    playTrack();
}

function prevTrack()
{
    if(track_index > 0)
    {
        track_index -=1;
    }

    else{
        track_index=music_list.length-1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo()
{
    let seekTo =curr_track.duration*(seek_slider.value/100);
    curr_track.currentTime=seekTo;
}


function setVolume()
{
    curr_track.volume=volume_slider.value/100;
}
function setUpdate() {
    let seekPosition = 0;

    let currentMinute = 0;
    let currentSeconds = 0;
    let durationMinute = 0;
    let durationSeconds = 0;
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        currentMinute = Math.floor(curr_track.currentTime / 60);
        currentSeconds = Math.floor(curr_track.currentTime - currentMinute * 60);
        durationMinute = Math.floor(curr_track.duration / 60);
        durationSeconds = Math.floor(curr_track.duration - durationMinute * 60);

        if (currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds;
        }
        if (durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }
        if (currentMinute < 10) {
            currentMinute = "0" + currentMinute;
        }
        if (durationMinute < 10) {
            durationMinute = "0" + durationMinute;
        }
    }

    curr_time.textContent = currentMinute + ":" + currentSeconds;
    total_duration.textContent = durationMinute + ":" + durationSeconds;
}
