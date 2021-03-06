export default function playlist() {
  let view = {
    el: "section.songs",
    template: `
    <li class="song-all" data-song-id="{{song.id}}">
            <div class="order-number">{{number}}</div>
            <div class="sgi_fr">
                <div class="sgich_fl">
                    <div class="f-thide sgich_tl">{{song.name}}</div>
                    <div class="f-thide sgich_info">{{song.singer}} - {{song.name}}</div>
                </div>
                <div class="sgich_fr"><svg class="icon icon-play">
                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-play"></use>
                  </svg></div>
            </div>
        </li>
    `,
    render(data) {
      let {
        songs
      } = data
      songs.forEach((song, i) => {
        let $li = $(this.template
          .replace('{{song.name}}', song.name)
          .replace('{{song.singer}}', song.singer)
          .replace('{{song.id}}', song.id)
          .replace('{{number}}', i + 1)
          .replace('{{song.name}}', song.name)
        )

        $(this.el).find('ol.songlist').append($li)
      })
    }
  }

  let model = {
    data: {
      id: '',
      songs: [],
      list:{}
    },
    async findCurrentSongs(listId) {
      if (!listId) return
      let playlist = AV.Object.createWithoutData('PlayList', listId);
      // 构建 ListSongMap 的查询
      let query = new AV.Query('ListSongMap');
      // 查询所有选择了playlist的
      query.equalTo('playlist', playlist);

      // 执行查询
      const lists = await query.find();
      let songs = [];
      songs = lists.map((list) => {
        return list.attributes.song;
      });
      AV.Object.fetchAll(songs).then((s) => {
        // 成功
        this.data.songs = s.map((song) => {
          return {
            id: song.id,
            ...song.attributes
          };
        });
      }, function (error) {
        // 异常处理
        console.log('error', error);
      });
      return songs;
    },
    async getPlaylist(id) {
      var query = new AV.Query('PlayList');
      const list = await query.get(id);
      Object.assign(this.data.list, {
        id: list.id,
        ...list.attributes
      });
      return list;
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
    init(view, model) {
      this.view = view
      this.model = model
      this.model.id = this.model.getListId()
      this.model.getPlaylist(this.model.id).then(()=>{
        console.log('1',this.model.data.list)
        $('.plhead_fl>.u-img').attr('src',this.model.data.list.cover)
        $(".playlist-bg").css("background-image",`url(${this.model.data.list.cover})`)
      })
      this.model.findCurrentSongs(this.model.id).then(() => {
        setTimeout(() => {
          this.view.render(this.model.data)
        }, 500);
      })
      this.bindEvents()
    },
    bindEvents() {
      $('.intro_arrow').on('click', (e) => {
        $('.u-intro>.f-brk').toggleClass('f-thide3')
        $('.intro_arrow').toggleClass('u-arowup')
        $('.intro_arrow').toggleClass('u-arowdown')
      })

      $('ol.songlist').on('click', 'li', (e) => {
        let id = e.currentTarget.getAttribute('data-song-id')
        window.location.href = "./song.html?id=" + id
      })
    },
  }
  controller.init(view, model)
}