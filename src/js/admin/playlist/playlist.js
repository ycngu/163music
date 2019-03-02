{
    let view = {
        el: '.playList',
        init() {
            this.$el = $(this.el)
        },
        template: `<ul class="songPlayList"></ul>`,

        render(data) {
            let $el = $('#playList-container')
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
            $('#playList-container').find('.active').removeClass('active')
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
            window.eventHub.on('playlist', () => {
                this.active()
            })

            this.view.$el.on('click', (e) => {
                window.eventHub.emit('playlist')
            })

            $('#playList-container').on('click', 'li', (e) => {
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
                window.eventHub.emit('selectPlayList', JSON.parse(JSON.stringify(data))) //深拷贝

            })

        },
        bindEventHub() {
            window.eventHub.on('createPlaylistform', (songData) => {
                this.model.data.lists.push(songData)
                this.view.render(this.model.data)
              })
            window.eventHub.on('newPlaylistform', () => {
                $('#playList-container').addClass('active').siblings('.active').remove('active')
                this.view.render(this.model.data)
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