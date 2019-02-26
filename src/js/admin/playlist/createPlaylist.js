{
    let view = {
        el: '.createPlaylist',
        init() {
            this.$el = $(this.el)
        },
    }

    let model = {

    }

    let controller = {
        init(view, model) {
            this.view = view
            this.view.init()
            this.model = model

            this.bindEvents()

            this.bindEventHub()
        },
        bindEvents() {
            this.model.find()


            this.view.$el.on('click', (e) => {
                this.view.$el.addClass('active')
                    .siblings('.active')
                    .removeClass('active')

                // $('#songList-container').find('li')
                window.eventHub.emit('createPlaylistform')
            })
        },
        bindEventHub() {

        }
    }

    controller.init(view, model)
}