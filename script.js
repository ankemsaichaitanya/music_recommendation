const songs = [
  { title: "Perfect", artist: "Ed Sheeran", genre: "Pop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { title: "Believer", artist: "Imagine Dragons", genre: "Rock", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "Shape of You", artist: "Ed Sheeran", genre: "Pop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { title: "Someone Like You", artist: "Adele", genre: "Pop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
  { title: "Thunder", artist: "Imagine Dragons", genre: "Rock", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
  { title: "Counting Stars", artist: "OneRepublic", genre: "Pop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" },
  { title: "Let Her Go", artist: "Passenger", genre: "Acoustic", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
  { title: "Radioactive", artist: "Imagine Dragons", genre: "Rock", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
  { title: "Hymn for the Weekend", artist: "Coldplay", genre: "Pop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" },
  { title: "Demons", artist: "Imagine Dragons", genre: "Rock", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3" },
  { title: "Photograph", artist: "Ed Sheeran", genre: "Pop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3" },
  { title: "Viva La Vida", artist: "Coldplay", genre: "Pop", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3" }
];

let currentIndex = 0;
const audioPlayer = document.getElementById("audio-player");
const playBtn = document.getElementById("play-btn");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const songTitle = document.getElementById("song-title");
const songArtist = document.getElementById("song-artist");
const recommendationList = document.getElementById("recommendation-list");

// Load the first song
loadSong(currentIndex);

playBtn.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playBtn.textContent = "⏸ Pause";
  } else {
    audioPlayer.pause();
    playBtn.textContent = "▶ Play";
  }
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % songs.length;
  loadSong(currentIndex);
  audioPlayer.play();
  playBtn.textContent = "⏸ Pause";
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + songs.length) % songs.length;
  loadSong(currentIndex);
  audioPlayer.play();
  playBtn.textContent = "⏸ Pause";
});

function loadSong(index) {
  const song = songs[index];
  songTitle.textContent = song.title;
  songArtist.textContent = `${song.artist} (${song.genre})`;
  audioPlayer.src = song.url;
  showRecommendations(song.genre, song.title);
}

function showRecommendations(genre, currentTitle) {
  const related = songs
    .filter((s) => s.genre === genre && s.title !== currentTitle)
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);

  recommendationList.innerHTML = "";
  related.forEach((s) => {
    const li = document.createElement("li");
    li.textContent = `${s.title} — ${s.artist}`;
    li.addEventListener("click", () => {
      currentIndex = songs.findIndex((x) => x.title === s.title);
      loadSong(currentIndex);
      audioPlayer.play();
      playBtn.textContent = "⏸ Pause";
    });
    recommendationList.appendChild(li);
  });
}
