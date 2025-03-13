document.addEventListener('DOMContentLoaded', function() {
    // Music player elements
    const playPauseBtn = document.querySelector('.play-pause');
    const prevBtn = document.querySelector('.previous');
    const nextBtn = document.querySelector('.next');
    const songName = document.querySelector('.song-name');
    const artistName = document.querySelector('.artist-name');
    const albumCover = document.querySelector('.album-cover');
    const progress = document.querySelector('.progress');
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeEl = document.querySelector('.current-time');
    const durationEl = document.querySelector('.duration');
    
    // Create audio element
    const audio = new Audio();
    
    // Song list - replace with your own songs
    const songs = [
        {
            title: 'Mất Kết Nối',
            artist: 'Dương Domic',
            cover: './acssets/photo/Mat-ket-noi.jpg',
            file: "./acssets/audio/Mất kết nối.mp3"
        },
        {
            title: 'Thêm Bao Nhiêu Lâu',
            artist: 'Đạt G',
            cover: './acssets/photo/thembaonhieulau.jpg',
            file: './acssets/audio/Thêm Bao Nhiêu Lâu - Đạt G  OFFICIAL MV - DatG Music.mp3'
        },
        {
            title: "Don't Coi",
            artist: 'RPT Orijinn x Ronboogz',
            cover: './acssets/photo/dontcoi.jpg',
            file: "./acssets/audio/Don't Côi - RPT Orijinn x Ronboogz (Visualizer) - RPT ORIJINN.mp3"
        },
        {
            title: 'Như Anh Đã Thấy Em',
            artist: 'Phuc Xp',
            cover: './acssets/photo/Nhuanhdathayem.jpg',
            file: "./acssets/audio/PhucXp - Nhu Anh Da Thay Em (CTTDE 2)  Official Video - PHUCXP.mp3"
        }
        
    ];
    
    let currentSongIndex = 0;
    let isPlaying = false;
    
    // Initialize the player
    function loadSong(index) {
        const song = songs[index];
        songName.textContent = song.title;
        artistName.textContent = song.artist;
        albumCover.src = song.cover;
        audio.src = song.file;
    }
    
    // Play/pause function
    function playPauseSong() {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    }
    
    // Previous song
    function prevSong() {
        currentSongIndex--;
        if (currentSongIndex < 0) {
            currentSongIndex = songs.length - 1;
        }
        loadSong(currentSongIndex);
        if (isPlaying) {
            audio.play();
        }
    }
    
    // Next song
    function nextSong() {
        currentSongIndex++;
        if (currentSongIndex > songs.length - 1) {
            currentSongIndex = 0;
        }
        loadSong(currentSongIndex);
        if (isPlaying) {
            audio.play();
        }
    }
    
    // Update progress bar
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            progress.style.width = `${progressPercent}%`;
            
            // Update time display
            const durationMinutes = Math.floor(duration / 60);
            let durationSeconds = Math.floor(duration % 60);
            if (durationSeconds < 10) {
                durationSeconds = `0${durationSeconds}`;
            }
            
            const currentMinutes = Math.floor(currentTime / 60);
            let currentSeconds = Math.floor(currentTime % 60);
            if (currentSeconds < 10) {
                currentSeconds = `0${currentSeconds}`;
            }
            
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    }
    
    // Set progress by clicking
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        
        audio.currentTime = (clickX / width) * duration;
    }
    
    // Event listeners
    playPauseBtn.addEventListener('click', playPauseSong);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    audio.addEventListener('timeupdate', updateProgress);
    progressBar.addEventListener('click', setProgress);
    
    // When song ends, play next song
    audio.addEventListener('ended', nextSong);
    
    // Load first song
    loadSong(currentSongIndex);
});




const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);


var btnSwitchMode = $('.switch-mode');
var checkDarkMode = false;
var body = $('body')



const app = {
    getLocalStorage: function(){
        var darkChecked = JSON.parse(localStorage.getItem('checked'));
        if(!darkChecked){
            body.classList.remove('dark-mode')
            btnSwitchMode.setAttribute('title','switch to dark mode')
            checkDarkMode  = false
        }
        else{
            body.classList.add('dark-mode');
            btnSwitchMode.setAttribute('title','switch to light mode')
            checkDarkMode = true
        }
    },
    handleEvents: function(){
        btnSwitchMode.onclick = () =>{
            if(checkDarkMode){
                body.classList.remove('dark-mode')
                btnSwitchMode.setAttribute('title','switch to dark mode')
                localStorage.setItem('checked', false);
                checkDarkMode  = false
            }
            else{
                body.classList.add('dark-mode');
                btnSwitchMode.setAttribute('title','switch to light mode')
                localStorage.setItem('checked', true);
                checkDarkMode = true
            }
        }
    },
    start : function(){
        this.getLocalStorage();
        this.handleEvents();
    }
}
app.start();


document.addEventListener('click', function initAudioAutoplay() {
    const audio = document.querySelector('audio') || document.getElementsByTagName('audio')[0];
    if (audio) {
        playPauseSong();
        document.removeEventListener('click', initAudioAutoplay);
    }
}, { once: true });

