{
    let view = {
        el: "section.playlists",
        init() {
            this.$el = $(this.el)
        },
        template: `
        <a href="./playlist.html?id={{list.id}}">
         <li>
           <div class="cover">
             <img width=105 src="{{list.cover}}" alt="封面">
           </div>
           <p>{{list.name}}</p>
           <p>{{list.summary}}</p>
         </li>
        </a>
        `,
        render(data) {
            let {lists} = data
            lists.map((list)=>{
                let $li = $(this.template
                    .replace('{{list.name}}',list.name)
                    .replace('{{list.cover}}',list.cover)
                    .replace('{{list.id}}',list.id)
                    .replace('{{list.summary}}',list.summary)
                )
                
                this.$el.find('ol.songs').append($li)
            })

        }
    }
    let model = {
        data: {
            id: '',
            lists: []
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
            this.model = model
            this.view.init()
            this.model.find().then(() => {
                this.view.render(this.model.data)
            })
        },
    }

    controller.init(view, model)
}