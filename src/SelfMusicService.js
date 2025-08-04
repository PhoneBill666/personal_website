class SelfMusicService {
    constructor() {
        if (SelfMusicService.instance) {
            return SelfMusicService.instance
        }
        SelfMusicService.instance = this

        this.audio = new Audio()
        this.currentIndex = 0

        // R2存储器
        this.songList = [
            ['https://cdn2.likaixu.com/dyingsociety.ogg', 'dyingsociety'],
            ['https://cdn2.likaixu.com/hoi4mainthemeallies.ogg', 'hoi4mainthemeallies'],
            ['https://cdn2.likaixu.com/bezerk.ogg', 'bezerk'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_apla_march.ogg', 'TFR_mu_tfr_apla_march'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_atomkrieg.ogg', 'TFR_mu_tfr_atomkrieg'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_behind_you.ogg', 'TFR_mu_tfr_behind_you'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_belgradian_symphony.ogg', 'TFR_mu_tfr_belgradian_symphony'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_cascadia_lives.ogg', 'TFR_mu_tfr_cascadia_lives'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_chained_reaktion.ogg', 'TFR_mu_tfr_chained_reaktion'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_crossing_the_styx.ogg', 'TFR_mu_tfr_crossing_the_styx'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_daughter_of_russia.ogg', 'TFR_mu_tfr_daughter_of_russia'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_day_of_rage.ogg', 'TFR_mu_tfr_day_of_rage'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_desespoir.ogg', 'TFR_mu_tfr_desespoir'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_dialtone.ogg', 'TFR_mu_tfr_dialtone'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_fearless_highway.ogg', 'TFR_mu_tfr_fearless_highway'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_fractured_timeline.ogg', 'TFR_mu_tfr_fractured_timeline'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_hell_march.ogg', 'TFR_mu_tfr_hell_march'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_insurrection.ogg', 'TFR_mu_tfr_insurrection'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_isolation.ogg', 'TFR_mu_tfr_isolation'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_march_of_dominance.ogg', 'TFR_mu_tfr_march_of_dominance'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_our_home.ogg', 'TFR_mu_tfr_our_home'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_pulchritudo_europae.ogg', 'TFR_mu_tfr_pulchritudo_europae'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_real_american.ogg', 'TFR_mu_tfr_real_american'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_rememberance.ogg', 'TFR_mu_tfr_rememberance'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_revenge_of_the_red_spectre.ogg', 'TFR_mu_tfr_revenge_of_the_red_spectre'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_rise_of_the_dimon.ogg', 'TFR_mu_tfr_rise_of_the_dimon'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_rivers_of_babylon.ogg', 'TFR_mu_tfr_rivers_of_babylon'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_schwarzflammen.ogg', 'TFR_mu_tfr_schwarzflammen'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_tears_of_aquilon.ogg', 'TFR_mu_tfr_tears_of_aquilon'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_the_dragons_roar.ogg', 'TFR_mu_tfr_the_dragons_roar'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_the_flames_get_higher.ogg', 'TFR_mu_tfr_the_flames_get_higher'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_the_peoples_connection.ogg', 'TFR_mu_tfr_the_peoples_connection'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_the_time_is_now.ogg', 'TFR_mu_tfr_the_time_is_now'],
            ['https://cdn2.likaixu.com/TFR_mu_tfr_war_what_is_it_good_for.ogg', 'TFR_mu_tfr_war_what_is_it_good_for'],
            ['https://cdn2.likaixu.com/TFR_mu_unknown_endsieg.ogg', 'TFR_mu_unknown_endsieg'],
            ['https://cdn2.likaixu.com/TFR_mu_xurious_camp_of_the_saints.ogg', 'TFR_mu_xurious_camp_of_the_saints'],
            ['https://cdn2.likaixu.com/TFR_mu_zapad_order.ogg', 'TFR_mu_zapad_order'],
            ['https://cdn2.likaixu.com/TFR_mu_zapad_we_will_build_a_better_world_than_before.ogg', 'TFR_mu_zapad_we_will_build_a_better_world_than_before'],
        ]
        this.isPlaying = false
        this.volume = 0.35
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

export default new SelfMusicService()