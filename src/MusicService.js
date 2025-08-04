class MusicService {
  constructor() {
    if (MusicService.instance) {
      return MusicService.instance
    }
    MusicService.instance = this

    this.audio = new Audio()
    this.currentIndex = 0
    // 本地
    // this.songList = [
    //     ['/src/components/music/EKKSTACY - i walk this earth all by myself (Explicit).mp3', 'i walk this earth all by myself (Explicit)'],
    //     ['/src/components/music/Corn Wave - dinosaurs.mp3', 'dinosaurs'],
    //     ['/src/components/music/Corn Wave - манго нектар.mp3', 'манго нектар'],
    //     ['/src/components/music/Где Фантом_ - Я тебя люблю.mp3', 'Я тебя люблю'],
    //     ['/src/components/music/Corn Wave - greek sculptures (Explicit).mp3', 'greek sculptures (Explicit)'],
    // ]
    // R2存储器
    this.songList = [
      ['https://cdn.likaixu.com/EKKSTACY%20-%20i%20walk%20this%20earth%20all%20by%20myself%20(Explicit).mp3', 'i walk this earth all by myself (Explicit)'],
      ['https://cdn.likaixu.com/Corn%20Wave%20-%20dinosaurs.mp3', 'dinosaurs'],
      ['https://cdn.likaixu.com/Corn%20Wave%20-%20%D0%BC%D0%B0%D0%BD%D0%B3%D0%BE%20%D0%BD%D0%B5%D0%BA%D1%82%D0%B0%D1%80.mp3', 'манго нектар'],
      ['https://cdn.likaixu.com/%D0%93%D0%B4%D0%B5%20%D0%A4%D0%B0%D0%BD%D1%82%D0%BE%D0%BC_%20-%20%D0%AF%20%D1%82%D0%B5%D0%B1%D1%8F%20%D0%BB%D1%8E%D0%B1%D0%BB%D1%8E.mp3', 'Я тебя люблю'],
      ['https://cdn.likaixu.com/Corn%20Wave%20-%20greek%20sculptures%20(Explicit).mp3', 'greek sculptures (Explicit)'],
    ]
    this.isPlaying = false
    this.volume = 0.5
    this.currentTime = 0
    this.duration = 0

    // 事件监听
    this.audio.addEventListener('timeupdate', () => {
      this.currentTime = this.audio.currentTime
      this.emit('timeupdate', this.currentTime)
    })

    this.audio.addEventListener('loadedmetadata', () => {
      this.duration = this.audio.duration
      this.emit('durationupdate', this.duration)
    })

    this.audio.addEventListener('ended', () => {
      this.nextSong()
    })

    // 初始化音量
    this.audio.volume = this.volume

    // 加载第一首歌
    this.loadCurrentSong()
  }

  // 事件系统
  listeners = {}

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  off(event, callback) {
    if (!this.listeners[event]) return
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback)
  }

  emit(event, data) {
    if (!this.listeners[event]) return
    this.listeners[event].forEach(callback => callback(data))
  }

  // 播放控制方法
  setSongList(songs) {
    if (songs && songs.length > 0) {
      this.songList = songs
      this.currentIndex = 0
      this.loadCurrentSong()
    }
  }

  loadCurrentSong() {
    if (!this.songList.length) return
    const [path, name] = this.songList[this.currentIndex]
    this.audio.src = path
    this.audio.load()
    this.emit('songchange', { name, index: this.currentIndex })
  }

  play() {
    if (!this.songList.length) return
    this.audio.play()
    this.isPlaying = true
    this.emit('play')
  }

  pause() {
    this.audio.pause()
    this.isPlaying = false
    this.emit('pause')
  }

  previousSong() {
    if (!this.songList.length) return
    if (this.currentIndex > 0) {
      this.currentIndex--
    } else {
      this.currentIndex = this.songList.length - 1
    }
    this.currentTime = 0
    this.loadCurrentSong()
    if (this.isPlaying) {
      this.play()
    }
  }

  nextSong() {
    if (!this.songList.length) return
    if (this.currentIndex < this.songList.length - 1) {
      this.currentIndex++
    } else {
      this.currentIndex = 0
    }
    this.currentTime = 0
    this.loadCurrentSong()
    if (this.isPlaying) {
      this.play()
    }
  }

  seek(time) {
    this.audio.currentTime = time
  }

  setVolume(value) {
    this.volume = value
    this.audio.volume = value
    this.emit('volumechange', value)
  }

  // 获取当前状态
  getCurrentSong() {
    if (!this.songList.length) return ['', '无歌曲']
    return this.songList[this.currentIndex]
  }

  getCurrentTime() {
    return this.currentTime
  }

  getDuration() {
    return this.duration
  }

  getVolume() {
    return this.volume
  }

  getIsPlaying() {
    return this.isPlaying
  }
}

export default new MusicService()
