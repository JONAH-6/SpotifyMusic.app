const songData = [
    {
        name: "Mentally",
        artist: "Asake",
        src: "Asake-Mentally-(TrendyBeatz.com).mp3",
    },
    {
        name: "MMS",
        artist: "Asake ft. Wizkid",
        src: "Asake-ft-wizkid-mms-(TrendyBeatz.com).mp3",
    },
    {
        name: "Dull",
        artist: "Asake",
        src: "Asake_-_dull.mp3",
    },
];

const container = document.querySelector(".container");
const songName = document.querySelector(".song-name");
const songArtist = document.querySelector(".song-artist");
const cover = document.querySelector(".cover");
const playPauseBtn = document.querySelector(".play-pause");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const audio = document.querySelector(".audio");
const songTime = document.querySelector(".song-time");
const songProgress = document.querySelector(".song-progress");
const coverName = document.querySelector(".cover span:nth-child(2)");
const coverArtist = document.querySelector(".cover span:nth-child(1)");

let songIndex = 0;

const loadSong = (index) => {
    coverName.textContent = songData[index].name;
    coverArtist.textContent = songData[index].artist;
    songName.textContent = songData[index].name;
    songArtist.textContent = songData[index].artist;
    audio.src = songData[index].src;
};

const playSong = () => {
    container.classList.add("pause");
    playPauseBtn.firstElementChild.className = 'fa-solid fa-pause';
    audio.play();
    cover.classList.add("rotate");
};

const pauseSong = () => {
    container.classList.remove("pause");
    playPauseBtn.firstElementChild.className = 'fa-solid fa-play';
    audio.pause();
    cover.classList.remove("rotate");
};

playPauseBtn.addEventListener("click", () => {
    if (container.classList.contains("pause")) {
        pauseSong();
    } else {
        playSong();
    }
});

const prevSongPlay = () => {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songData.length - 1;
    }
    loadSong(songIndex);
    playSong();
};

const nextSongPlay = () => {
    songIndex++;
    if (songIndex > songData.length - 1) { 
        songIndex = 0;
    }
    loadSong(songIndex);
    playSong();
};

prevBtn.addEventListener("click", prevSongPlay);
nextBtn.addEventListener("click", nextSongPlay);

loadSong(songIndex);
// Select the time display spans
const timeSpans = document.querySelectorAll('.time span');

audio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    // Update progress bar
    if (duration) {
        let currentTimeWidth = (currentTime / duration) * 100;
        songProgress.style.width = `${currentTimeWidth}%`;
    }

    
    function formatTime(sec) {
        if (isNaN(sec)) return "0:00";
        const minutes = Math.floor(sec / 60);
        const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    }

    if (timeSpans.length === 2) {
        timeSpans[0].textContent = formatTime(currentTime);
        timeSpans[1].textContent = formatTime(duration);
    }
});
songTime.addEventListener("click", (e) => {
    const rect = songTime.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percent = clickX / width;
    if (audio.duration) {
        audio.currentTime = percent * audio.duration;
    }
});
audio.addEventListener("ended", () => {
    nextSongPlay();
});