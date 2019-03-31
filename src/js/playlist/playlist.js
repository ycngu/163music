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
        findCurrentSongs(listId) {
            if (!listId) return
            var playlist = AV.Object.createWithoutData('PlayList', listId);
            // 构建 ListSongMap 的查询
            var query = new AV.Query('ListSongMap');
      
            // 查询所有选择了playlist的
            query.equalTo('playlist', playlist);
      
            // 执行查询
            return query.find().then((lists) => {
              let songs = []
      
              songs = lists.map((list) => {
                return list.attributes.song
              })
      
              AV.Object.fetchAll(songs).then((s) => {
                // 成功
                this.data.songs = s.map((ss) => {
                  return {
                    id: ss.id,
                    ...ss.attributes
                  }
                })
              }, function (error) {
                // 异常处理
                console.log('zzzzzzzzzzz', error)
              });
      
              return lists
            })
          },
    }

    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.model.id = getListId()
            this.model.findCurrentSongs(this.model.id)
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
    controller.init(view, model)
}