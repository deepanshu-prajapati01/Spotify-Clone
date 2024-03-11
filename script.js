console.log("Welcome to Spotify!");


// Initialise the variables;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let songIndex = 0;
let songItems = Array.from(document.getElementsByClassName("SongItem"));
let previous = document.getElementById("previous-button");
let next = document.getElementById("next-button");
let container = document.getElementsByClassName('container')
let start_time = document.getElementsByClassName('duration-start');
let total_time = document.getElementsByClassName('duration-end');

// let songNames = Array.from(document.getElementsByClassName("spaces-1"));

let songs = [
    { songName: "Apocalypse", songPath: "songs/1.mp3", coverPath: "covers/1.jpg", duration: "04:50" },
    { songName: "As it was", songPath: "songs/2.mp3", coverPath: "covers/2.jpg", duration: "02:45" },
    { songName: "Daddy Issues", songPath: "songs/3.mp3", coverPath: "covers/3.jpg", duration: "03:41" },
    { songName: "Die for you", songPath: "songs/4.mp3", coverPath: "covers/4.jpg", duration: "04:40" },
    { songName: "Heat waves", songPath: "songs/5.mp3", coverPath: "covers/5.jpg", duration: "03:55" },
    { songName: "Summertime Sadness", songPath: "songs/6.mp3", coverPath: "covers/6.jpg", duration: "04:54" },
    { songName: "Let it happen", songPath: "songs/7.mp3", coverPath: "covers/7.jpg", duration: "04:16" },
    { songName: "Soft Core", songPath: "songs/8.mp3", coverPath: "covers/8.jpg", duration: "03:30" },
    { songName: "Sunflower - Spider man", songPath: "songs/9.mp3", coverPath: "covers/9.jpg", duration: "02:41" },
    { songName: "The less i know the better", songPath: "songs/10.mp3", coverPath: "covers/10.jpg", duration: "03:37" }
]


// By default texts
document.getElementsByClassName("currentSong")[0].textContent = songs[songIndex].songName;



// Listening to events

// for changing the thumbnails of the songs.
songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByClassName("cover-image")[0].src = songs[i].coverPath;
})

// for changing the name of the song.
songItems.forEach((element, i) => {
    element.getElementsByClassName('spaces-1')[0].textContent = songs[i].songName;
})

// for changing the durations of the song.
songItems.forEach((element, i) => {
    element.getElementsByClassName('duration')[0].textContent = songs[i].duration;
})


// start time func -> made to show the duration of the song
const start_time_func = () => {
    let duration = audioElement.currentTime;
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}





// function to animate what should happen when a song is running.
const play_song = ()=>{
    if (audioElement.paused || audioElement.currentTime <= 0) {
        myProgressBar.value = "0"
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
    }

    else {
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
    }

    document.getElementsByClassName("currentSong")[0].textContent = songs[songIndex].songName;
    total_time[0].textContent = songs[songIndex].duration;
}


// Play pause of song
const updateSongFromList = ()=>{
    element = document.getElementById(songIndex+1);
    element.classList.remove("fa-circle-play");
    element.classList.add("fa-circle-pause");
}

masterPlay.addEventListener('click', () => {
    if (songIndex==0){
        updateSongFromList();
    }
    play_song();
})


audioElement.addEventListener('timeupdate', () => {
    // Update seek bar with song.
    progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
    
    // play next song automatically -> when current song completes.
    if (progress == 100){
        next.click();
    }
    start_time[0].textContent = start_time_func();
    console.log(progress)
})

myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;

})


// function to convert all pause > play
const makeAllPlayes = ()=>{
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
})}


// to convert play > pause
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener("click", (e) => {
        makeAllPlayes();
        songIndex = parseInt(e.target.id-1);
        console.log(e.target.id);
        e.target.classList.add("fa-circle-pause");
        e.target.classList.remove("fa-circle-play");
        audioElement.src = songs[songIndex].songPath;
        audioElement.currentTime = 0;
        play_song();
        

    })
})


// if clicked previous-button
previous.addEventListener("click", (e) =>{
    if (songIndex == 0){
        songIndex = 10;
    }
    else if(songIndex != 0){
        songIndex -= 1;
    }

    audioElement.src = songs[songIndex].songPath;
    makeAllPlayes();

    // Code to denote that this music from the list is playing.
    updateSongFromList();
    // code to play the music
    audioElement.currentTime = 0;
    play_song();
})


// if clicked next-button
next.addEventListener("click", (e) =>{
    if (songIndex == 10){
        songIndex = 0;
    }
    else if(songIndex != 10){
        songIndex += 1;
    }

    audioElement.src = songs[songIndex].songPath;
    makeAllPlayes();

    // Code to denote that this music from the list is playing.
    updateSongFromList();
    // code to play the music
    audioElement.currentTime = 0;
    play_song();
})