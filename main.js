var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)

var musicList = $('.music-list ul')
var imageSong = $('.img-area img')

var audio = $('#main-audio')
var songName = $('.song-details p.name')
var singer = $('.song-details .artist')
var isPlay = false
var moreMusic = $('#more-music')
var currentIndex = 2


var app = {
	songs:  [
        {
            img: './img/song-1.jpg',
            singer: 'Patti',
            songName: 'Say you love me',
            path: './mp3/say-you-love-me.mp3'
        },
        {
            img: './img/song-2-1.jpg',
            singer: 'Becky G',
            songName: 'Sin pijama',
            path: './mp3/sin-pijama.mp3'
        },
        {
            img: './img/song-2.jpg',
            singer: 'Jason Mraz',
            songName: 'I\'m yours',
            path: './mp3/im-yours.mp3'
        },
        {
            img: './img/song-3.jpg',
            singer: 'Enrique Iglesias',
            songName: 'Bailando',
            path: './mp3/bailando.mp3'
        },
        {
            img: './img/song-4.jpg',
            singer: 'Enrique Iglesias',
            songName: 'El perdon',
            path: './mp3/elperdon.mp3'
        },
        {
            img: './img/song-5.jpg',
            singer: 'The Marias',
            songName: 'Baby one more time',
            path: './mp3/baby-one-more-time.mp3'
        },
        {
            img: './img/song-6.jpg',
            singer: 'Sting',
            songName: 'Shape of my heart',
            path: './mp3/shape-of-my-heart.mp3'
        }
    ],
	renderSong: function(){
		let html = ''
		this.songs.map((v,i) => {
			return html += `
			<li index="${i}">
	                <div class="row">
	                  <span>${v.songName}</span>
	                  <p>${v.singer}</p>
	                </div>
	                <span class="audio-duration">3:40</span>
	                <audio id='audio' src="${v.path}"></audio>
	        </li>
			`
			})
		musicList.innerHTML = html
	},
	defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[currentIndex];
      }
    });
  },
	loadCurrentSong: function(){
		imageSong.src = this.currentSong.img
		audio.src = this.currentSong.path
		singer.innerText = this.currentSong.singer
		songName.innerText = this.currentSong.songName
		$(`[index$="${currentIndex}"]`).classList.add('playing')
	},
	handleEvent: function(){
		const _this = this
		const playPause = $('.play-pause')
		const next = $('.controls i#next')
		// Khi click play
		playPause.onclick = () => {
			isPlay = !isPlay
			if (isPlay) {
				audio.play()
				$('.play-pause i').innerText = 'pause'
			} else {
				audio.pause()
				$('.play-pause i').innerText = 'play_arrow'
			}
			
		}

		next.onclick = function(){
			currentIndex++
			if (currentIndex > _this.songs.length - 1) {
				currentIndex = 0
			}
			_this.loadCurrentSong()
			audio.play()
			$('.play-pause i').innerText = 'pause'
			isPlay = true;
			$$('[index]').forEach(v=>console.log(v.classList.remove('playing')))
			$(`[index$="${currentIndex}"]`).classList.add('playing')
		}

		prev.onclick = function() {
			currentIndex--
			if(currentIndex<0) {
				currentIndex = _this.songs.length - 1
			}
			_this.loadCurrentSong()
			audio.play()
			$('.play-pause i').innerText = 'pause'
			isPlay = true;
			$$('[index]').forEach(v=>v.classList.remove('playing'))
			$(`[index$="${currentIndex}"]`).classList.add('playing')
		}

		moreMusic.onclick = function() {
			$('.music-list').style.opacity = 1
			$('.music-list').style.bottom = 0
			$('.music-list').style.pointerEvents = 'auto';
		}

		$('.header #close').onclick = () => {
			$('.music-list').style.opacity = 0
			$('.music-list').style.bottom = "-100%"
			$('.music-list').style.pointerEvents = 'none';
		}

		$$('[index]').forEach((v,i)=>{
			v.onclick = function() {
				currentIndex = i
				$('.play-pause i').innerText = 'pause'
				isPlay=true
				$$('[index]').forEach(v=>v.classList.remove('playing'))
				$(`[index$="${currentIndex}"]`).classList.add('playing')
				$('.music-list').style.bottom = '-100%' 
				_this.loadCurrentSong()
				audio.play()

			}
		})
	},

	start: function() {
		this.defineProperties()
		this.renderSong()
		this.loadCurrentSong()
		this.handleEvent()
	}
}

app.start()
