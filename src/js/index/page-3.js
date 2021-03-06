export default function page3(){
    let view = {
        el:".page-3",
        init(){
            this.$el = $(this.el)
        },
        show(){
            this.$el.addClass('active')
        },
        hidden(){
            this.$el.removeClass('active')
        }
    }
    let model = {}
    let controller = {
        init(view, model){
            this.view = view 
            this.view.init()
            this.model = model
            this.bindEvents()
            this.bindEventHub()
        },
        bindEvents(){

        },
        bindEventHub(){
            window.eventHub.on('selectTab',(tabName)=>{
                if(tabName === 'page-3'){
                    this.view.show()
                } else {
                    this.view.hidden()
                }
            })
        }
    }

    controller.init(view, model) 
}