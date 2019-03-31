
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
        render(data){
           
            let {songs} =  data
            songs.map((song)=>{
                let $li = $(this.template
                    .replace('{{song.name}}',song.name)
                    .replace('{{song.singer}}',song.singer)
                    .replace('{{song.id}}',song.id)
                )

                $(this.el).find('ol.list').append($li)
            })
        }
    }

    let model = {
        data:{
            id:'',
            songs:[],
            song:[],
        },
        findCurrentSongs(listId) {
            if (!listId) return
            let playlist = AV.Object.createWithoutData('PlayList', listId);
            // 构建 ListSongMap 的查询
            let query = new AV.Query('ListSongMap');
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

                this.data.songs = s.map((song) => {
                  return {
                    id: song.id,
                    ...song.attributes
                  }
                })
                console.log(this.data.songs)
              }, function (error) {
                // 异常处理
                console.log('error', error)
              });
              
              return songs
            })
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
        },
    }

    let controller = {
        init(view,model){
            this.view = view
            this.model = model
            this.model.id = this.model.getListId()
            this.model.findCurrentSongs(this.model.id).then(()=>{
                setTimeout(() => {
                  this.view.render(this.model.data)
                }, 500);
            })
        },
    }
    controller.init(view, model)
}
