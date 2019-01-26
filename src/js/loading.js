{
    let view = {
        el: "#siteLoading",
        show() {
            $(this.el).addClass('active')
        },
        hide() {
            console.log('hide')
            $(this.el).removeClass('active')
        }
    }

    let controller = {
        init(view) {
            this.view = view
            this.bindEventsHub()
        },
        bindEventsHub() {
            window.eventHub.on('beforeUpload', () => {
                this.view.show()
            })
            window.eventHub.on('afterUpload', () => {
                this.view.hide()
            })
        }
    }
    controller.init(view)
}