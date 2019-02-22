{
    let view = {
        el: '#app',
        init() {
            this.$el = $(this.el)
        },
        render(data){
            let {song, status} = data
            this.$el.find('audio').attr('src',`${song.url}`)
            this.$el.find('img.cover').attr('src',`${song.cover}`)
            this.$el.css('background-image', `url(${song.cover})`)
            if( status === 'playing'){
                this.$el.find('.disc-container').addClass('playing')
            } else {
                this.$el.find('.disc-container').removeClass('playing')
            }
        },
        play(){
            let audio = this.$el.find('audio')[0]
            audio.play()
            console.log('2')
        },
        pause(){
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
                url: ''
            },
            status:'paused'
        },
        get(id) {
            var query = new AV.Query('Song');
            return query.get(id).then((song)=>{
                Object.assign(this.data.song, {id:song.id,...song.attributes})
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
            })
            this.bindEvents()

        },
        bindEvents(){
            $(this.view.$el.on('click','.cover',()=>{
                if(this.model.data.status === 'paused'){
                    this.model.data.status = 'playing'
                    this.view.render(this.model.data)
                    this.view.play()
                } else {
                    this.model.data.status = 'paused'
                    this.view.render(this.model.data)
                    this.view.paused()
                }
            }))
            $(this.view.$el.on('click','.pause',()=>{
                this.view.pause()
            }))
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