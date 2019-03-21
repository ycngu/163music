{
  let view = {
    el: '.playList',
  }
  let model = {}
  let controller = {
    init(view, model){
      this.view = view
      this.model = model

      window.eventHub.on('newxx', (data)=>{
        this.active()
      })
      window.eventHub.on('selectxx', (data)=>{
        this.deactive()
      })
      $(this.view.el).on('click',()=>{
        window.eventHub.emit('newxx')
      })
    },
    active(){
      $(this.view.el).addClass('active')
        .siblings('.active')
        .removeClass('active')
    },
    deactive(){
      $(this.view.el).removeClass('active')
    }
  }
  controller.init(view, model)
}
