function audioPlayer() {
    const player = document.querySelector('.player'),
          prevBtn = document.querySelector('.prev'),
          nextBtn = document.querySelector('.next'),
          playBtn = document.querySelector('.play'),
          mixBtn = document.querySelector('.mix'),
          repeatBtn = document.querySelector('.repeat'),
          audio = document.querySelector('.audio'),
          progressContainer = document.querySelector('.progress__container'),
          progress = document.querySelector('.progress-bar'),
          audioName = document.querySelector('.audio__name'),
          cover = document.querySelector('.cover'),
          controlAudio = document.querySelector('.control__audio'),
          volvume = document.querySelector('.volvume__range'),
          volvumeSlider = document.querySelector('.volvume__slider'),
          volvumeImg = document.querySelector('.volvume__img'),
          playlist = document.querySelector('.playList'),
          currentDurationTime = document.querySelector('.currentTime'),
          durationTime = document.querySelector('.durationTime')

          
    let context, analyser, src;
    
    let isMix = false;
    let isRepeat = false;

    const songs = ["Blackway What's Up","College", "Duckwrth Start A Riot", "Post Malone Sunflower", "Vince Staples Home"]

    let songIndex = 0;
    //Inti Audio
    function loadAudio(song) {
        audioName.innerHTML = song;
        audio.src = `./assets/audio/${song}.mp3`
    }
    loadAudio(songs[songIndex])
    //play audio
    function playAudio() {
        if (!context) {
            preparation()
            
        }
        player.classList.add('play');
        audio.play();
        loop()
    }
    //pause audio
    function pauseAudio() {
        player.classList.remove('play');
        audio.pause();
    }
    playBtn.addEventListener('click', () => {
        const isPlaying = player.classList.contains('play')
        if (isPlaying) {
            pauseAudio()
            controlAudio.src = './assets/img/pause.svg'
        } else {
            playAudio()
            controlAudio.src = './assets/img/play.svg'
        }
    })

    //next audio
    function nextAudio() {
        songIndex++;
        if (songIndex > songs.length - 1) {
            songIndex = 0
        }
        loadAudio(songs[songIndex])
        playAudio()
    }
    nextBtn.addEventListener('click', nextAudio);
    //prev audio
    function prevAudio() {
        songIndex--;
        if (songIndex < 0) {
            songIndex = 0
        }
        loadAudio(songs[songIndex])
        playAudio()
    }
    prevBtn.addEventListener('click', prevAudio);
    //Progress bar
    function updateProgress(e) {
        const {duration, currentTime} = e.srcElement;
        
        setTimeProgress(toTime(duration), toTime(currentTime))

        const progressPrecent = (currentTime / duration) * 100;
        progress.style.width = `${progressPrecent}%`;
    }
    audio.addEventListener('timeupdate', updateProgress)

    function toTime(time) {
        const second = Math.floor(time % 60);
        const minute = Math.floor(time / 60);
        const hours = Math.floor(minute / 60);

        const outSecond = second ? (second < 10 ? '0' + second : second) : '00';
        const outMinute = minute ? (minute < 10 ? '0' + minute : minute) : '00';
        const outHours = hours ? hours + ':' : '';

        return `${outHours}${outMinute}:${outSecond}`
    }
    //Set progress 
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;

        audio.currentTime = (clickX / width) * duration;
    }
    
    progressContainer.addEventListener('click', setProgress)
    //Repat audio
    function repeatAudio() {
        loadAudio(songs[songIndex])
        playAudio()
    }

    function setTimeProgress(duration, currentTime) {
        durationTime.innerHTML = duration;
        currentDurationTime.innerHTML = currentTime;
    }
    

    repeatBtn.addEventListener('click', () => {
        repeatBtn.classList.toggle('active__button')
        isRepeat = !isRepeat;
    })

    audio.addEventListener('ended', () => {
        if (isMix){
            mixAudio()
        }else if (isRepeat) {
            repeatAudio()
        } else {
            nextAudio()
        }
        
    })
    //Mix audio
    function mixAudio() {
        songIndex = Math.floor(Math.random() * (songs.length - 1))
        loadAudio(songs[songIndex])
        playAudio()
    }
    mixBtn.addEventListener('click', () => {
        mixBtn.classList.toggle('active__button')
        isMix = !isMix;
    })


    //animation vizualization

    function preparation() {
        context = new AudioContext();
        analyser = context.createAnalyser();
        src = context.createMediaElementSource(audio);
        src.connect(analyser);
        analyser.connect(context.destination);
        loop()
    }
    
    function loop() {
        if(!audio.paused) {
            window.requestAnimationFrame(loop);
        }
        
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array)
    
        cover.style.minHeight = (array[40])+"px";
        cover.style.width = (array[40])+"px";
    }

    //Set Volvume
    function setVolvume(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const calc = clickX / width
        audio.volume = calc;
        volvumeSlider.style.width = ((calc) * 100)+"px";
        if (calc < 0.4) {
            volvumeImg.src = './assets/img/volLow.svg';
        } else if (calc > 0.3 && calc < 0.7) {
            volvumeImg.src = './assets/img/volMedium.svg';
        } else if (calc >= 0.7) {
            volvumeImg.src = './assets/img/volHigh.svg';
        }
    }
    volvume.addEventListener('click', setVolvume)

    //Set playlist
    function setPlaylist() {
        let list = '';

        songs.forEach((elem, i) => {
            list += `
                <div id='${i}' class="playList__elem">
                    <span>${i + 1}.</span> <span>${elem}</span>
                </div>
            `
        })
        playlist.innerHTML = list
    }
    setPlaylist()
    
    function selectAudio(e) {
        const id = e.target.closest(".playList__elem").id
        loadAudio(songs[id])
        playAudio()
    }
    playlist.addEventListener('click', selectAudio)
}
export default audioPlayer;