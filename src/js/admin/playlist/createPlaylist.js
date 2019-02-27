{
    let view = {
        el: '.createPlaylist',
        init() {
            this.$el = $(this.el)
        },
    }
    let model = {}
    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            // this.view.render(this.model.data)
            window.eventHub.on('createPlaylistform', (data) => {
                this.active()
            })
            window.eventHub.on('selectPlayList', (data)=>{
              this.deactive()
            })
            $(this.view.el).on('click', () => {
                window.eventHub.emit('createPlaylistform')
            })
        },
        active() {
            $(this.view.el).addClass('active')
                .siblings('.active')
                .removeClass('active')
        },
        deactive() {
            $(this.view.el).removeClass('active')
        }
    }
    controller.init(view, model)
}