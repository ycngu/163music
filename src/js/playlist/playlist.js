{
    let view = {
        el: "section.songs",
        template:`
        <li>
        <h3>{{song.name}}</h3>
        <p>
          <svg class="icon icon-sq">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-sq"></use>
          </svg>
    {{song.singer}}
        </p>
        <a class="playButton" href="./song.html?id={{song.id}}">
          <svg class="icon icon-play">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play"></use>
          </svg>
        </a>
      </li>
        `,
        init() {
            this.$el = $(this.el)
        },
        render(data){
            let {songs} = data 
            songs.map((song)=>{
                let $li = $(this.template
                    .replace('{{song.name}}',song.name)
                    .replace('{{song.singer}}',song.singer)
                    .replace('{{song.id}}',song.id)
                )

                this.$el.find('ol.list').append($li)
            })
        }
    }

    let model = {
        data:{
            id:'',
            songs:[]
        },
    }

    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.model.id = getListId()
        },
            
        getListId() {
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
}