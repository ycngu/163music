{
    let view = {
        el: '.playList',
        init() {
            this.$el = $(this.el)
        },
        template:`
        <ul class="songPlayList">
        </ul>
       `,
       render(data) {
           let $el = $('#songList-container')
           $el.html(this.template)
           let { lists, selectedListId} = data
           let liList = lists.map((list) =>{
             let $li = $('<li></li>').text(list.name).attr('data-list-id',list.id)
             if(selectedListId === list.id){
               $li.addClass('active')
             }
             return $li
           })
           $el.find('ul').empty()
           liList.map((domLi) => {
             $el.find('ul').append(domLi)
           })
         },
    }

    let model = {
        data: {
            lists: [],
            selectedListId:null
        },
        find() {
            var query = new AV.Query('PlayList')
            return query.find().then((lists) => {
                this.data.lists = lists.map((list) => {
                    return {
                        id: list.id,
                        ...list.attributes
                    }
                })
                return lists
            })
        }
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
                this.view.render(this.model.data)
            })
        },
        bindEventHub() {

        }
    }

    controller.init(view, model)
}