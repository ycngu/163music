// {
//     let view ={
//         el:'#playList-container',
//         $el:null,
//         init(){
//             this.$el = $(this.el)
//         }
//     }

//     let model = {
//         data:{

//         }
//     }

//     let controller = {
//         init(view, model){
//             this.view = view
//             this.model = model
//             this.view.init()
//             this.bindEvent()
//             this.bindEventHub()
//         },
//         bindEvent(){

//         },
//         bindEventHub(){
//             window.eventHub.on('newxx',()=>{
//                 this.view.$el.addClass('active').siblings('.active').removeClass('active')
//                 console.log('newxx')
//             })
//         }
//     }

//     controller.init(view, model)
// }

{
    let view = {
        el: '#playList-container-copy',
        init() {
            this.$el = $(this.el)
        },
        template: `<ul class="songPlayList"></ul>`,

        render(data) {
            let $el = $('#playList-container-copy')
            $el.html(this.template)
            let {
                lists,
                selectedListId
            } = data
            let liList = lists.map((list) => {
                let $li = $('<li></li>').text(list.name).attr('data-list-id', list.id)
                if (selectedListId === list.id) {
                    $li.addClass('active')
                }
                return $li
            })
            $el.find('ul').empty()
            liList.map((domLi) => {
                $el.find('ul').append(domLi)
            })
        },

        clearActive() {
            // $(this.el).find('.active').removeClass('active')
            $('#playList-container-copy').find('.active').removeClass('active')
        }
    }

    let model = {
        data: {
            lists: [],
            selectedListId: null
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
            this.getAllLists()
        },
        active() {
            $(this.view.el).addClass('active')
                .siblings('.active')
                .removeClass('active')
        },
        deactive() {
            $(this.view.el).removeClass('active')
        },
        getAllLists() {
            return this.model.find().then(() => {
                this.view.render(this.model.data)
            })
        },
        bindEvents() {
            $('#playList-container-copy').on('click', 'li', (e) => {
                let listId = e.currentTarget.getAttribute('data-list-id')

                this.model.data.selectedListId = listId
                this.view.render(this.model.data)

                let data
                let lists = this.model.data.lists
                for (let i = 0; i < lists.length; i++) {
                    if (lists[i].id == listId) {
                        data = lists[i]
                        break
                    }
                }
                window.eventHub.emit('selectxx', JSON.parse(JSON.stringify(data))) //深拷贝
            })
        },
        bindEventHub() {
            // window.eventHub.on('createPlaylistform', (songData) => {
            //     this.model.data.lists.push(songData)
            //     this.view.render(this.model.data)
            //   })
            window.eventHub.on('newxx', () => {
                $('#playList-container-copy').addClass('active').siblings('.active').remove('active')
                // this.view.render(this.model.data)
                this.view.clearActive()
            })
            // window.eventHub.on('playlist', () => {
            //     this.view.render(this.model.data)
            //     this.view.clearActive()
            // })
            window.eventHub.on('updatePlayList',(list)=>{
                let lists = this.model.data.lists
                for (let i = 0; i < lists.length; i++) {
                  if(lists[i].id === list.id){
                    lists[i] = list
                    Object.assign(lists[i], list)
                  }
                }
                this.view.render(this.model.data)
              })
        }
    }

    controller.init(view, model)
}