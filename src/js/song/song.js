{
    let view = {
        el: '#app',
        init() {
            this.$el = $(this.el)
        },
        render(data) {
            let {
                song,
                status
            } = data
            this.$el.find('img.cover').attr('src', `${song.cover}`)
            if (this.$el.find('audio').attr('src') !== song.url) {
                this.$el.find('audio').attr('src', `${song.url}`)
                    .on('ended', () => {
                        this.$el.find('.disc-container').removeClass('playing')
                    })
            }
            this.$el.find(".background").css('background-image', `url(${song.cover})`)
            if (status === 'playing') {
                this.$el.find('.disc-container').addClass('playing')
            } else {
                this.$el.find('.disc-container').removeClass('playing')
            }
            this.$el.find('.song-description>h1').text(song.name)
        },
        play() {
            let audio = this.$el.find('audio')[0]
            audio.play()
        },
        pause() {
            let audio = this.$el.find('audio')[0]
            audio.pause()
        }
    }
    let model = {
        data: {
            song: {
                id: '',
                name: '',
                singer: '',
                url: '',
                lyrics: ''
            },
            status: 'paused'
        },
        get(id) {
            var query = new AV.Query('Song');
            return query.get(id).then((song) => {
                Object.assign(this.data.song, {
                    id: song.id,
                    ...song.attributes
                })
                console.log(this.data.song)
                return song
            })
        }
    }
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.init()
            let id = this.getSongId()
            this.model.get(id).then(() => {
                this.view.render(this.model.data)
                this.bindEvents()
            })

        },
        bindEvents() {
            $(this.view.$el.on('click', '.cover', () => {
                if (this.model.data.status === 'paused') {
                    this.model.data.status = 'playing'
                    this.view.render(this.model.data)
                    this.view.play()
                } else {
                    this.model.data.status = 'paused'
                    this.view.render(this.model.data)
                    this.view.pause()
                }
            }))
            let player = this.view.$el.find('audio')[0]

            // //onceLrc是在lyric.js的全局变量
            onceLrc = parseLyric(this.model.data.song.lyrics) 
            let lyricContainer = document.querySelector('.lyricContainer')
            console.log(lyricContainer)
            console.log('1')
            appendLyric(onceLrc,lyricContainer)
            player.addEventListener("timeupdate", function(e) {
                // if (!that.lyric) return;
                for (var i = 0, l = onceLrc.length; i < l; i++) {
                    if (player.currentTime > onceLrc[i][0] - 0.50) {
                        var pp = lyricContainer.querySelectorAll('.current-line-1')
                        pp.forEach(function (o) {
                            o.classList.remove('current-line-1')
                        })
                        var line = document.getElementById('line-' + i)
                        var prevLine = document.getElementById('line-' + (i > 0 ? i - 1 : i))
                        if (prevLine != null) {
                            prevLine.className = ''
                        } 
                        if (line != null) {
                            line.className = 'current-line-1'
                            lyricContainer.style.top = 20 - line.offsetTop + 'px'
                        }
                    }
                }
            })
        },
        getSongId() {
            let search = window.location.search

            //去掉问号
            if (search.indexOf('?') === 0) {
                search = search.substring(1)
            }

            let array = search.split('&').filter((v => v))
            let id = ''

            array.forEach((current) => {
                let [key, value] = current.split('=')
                if (key === 'id') {
                    id = value
                    return false
                }
            })

            return id
        }
    }
    controller.init(view, model)
}