{
  let view = {
    el: '.page > main',
    template: `
      <ul class="lsonglist"></ul>
      <button id="add">add</button>
      <button id="remove">remove</button>
      <ul class="rsongList"></ul>
    `,
    render(data) {
      let $el = $(this.el)
      // $el.addClass('active').siblings('.active').remove('active')
      $el.html(this.template)
      let {
        leftSongs,
        leftSongId,
        rightSongs,
        rightSongId
      } = data

      let liListL = leftSongs.map((song) => {
        let $li = $('<li></li>').text(song.name).attr('data-song-id', song.id)
        if (leftSongId === song.id) {
          $li.addClass('active')
        }
        return $li
      })

      let liListR = rightSongs.map((song) => {
        let $li = $('<li></li>').text(song.name).attr('data-song-id', song.id)
        if (rightSongId === song.id) {
          $li.addClass('active')
        }
        return $li
      })

      $el.find('.rsongList').empty()
      liListR.map((domLi) => {
        $el.find('.rsongList').append(domLi)
      })

      $el.find('.lsongList').empty()
      liListL.map((domLi) => {
        $el.find('.lsonglist').append(domLi)
      })
    },

    clearActive() {
      $(this.el).find('.active').removeClass('active')
    }
  }
  let model = {
    data: {
      leftSongs: [],
      rightSongs: [],
      leftSongId: null,
      rightSongId: null,
      listId: null,
      ringtsongsId: null,
    },
    findSongs() {
      var query = new AV.Query('Song')
      return query.find().then((songs) => {
        this.data.leftSongs = songs.map((song) => {
          return {
            id: song.id,
            ...song.attributes
          }
        })
        return songs
      })
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

        AV.Object.fetchAll(songs).then(function (objects) {
          // 成功
          console.log('object',objects)

          this.data.rightSongs = objects.map((song)=>{
            console.log('songggggggggg',song)
            return {
              id:song.id,
              ...attributes
            }
          })
          console.log('this.model.data.rightSongs',this.model.data.rightSongs)
        }, function (error) {
          // 异常处理
          console.log('zzzzzzzzzzz',error)
        });

        return lists
      })
    },
    setPointer(listId, songId) {
      if (!listId) return
      if (!songId) return
      let song = AV.Object.createWithoutData('Song', songId);
      let playlist = AV.Object.createWithoutData('PlayList', listId);

      let listSongMAP = new AV.Object('ListSongMap');

      // 设置关联
      listSongMAP.set('song', song);
      listSongMAP.set('playlist', playlist);

      // listSongMAP.set('platform', 'web');

      listSongMAP.save();
    }
  }
  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.bindEvents()
      this.bindEventsHub()
      this.model.findSongs().then(() => {
        console.log('lists', this.model)
        console.log('model', this.model)
      })
    },
    getAllSongs() {
      this.model.findSongs().then(() => {
        this.view.render(this.model.data)
      })
    },
    bindEvents() {
      $(this.view.el).on('click', '.lsonglist>li', (e) => {
        let songId = e.currentTarget.getAttribute('data-song-id')
        console.log('songid', songId)
        this.model.data.leftSongId = songId
        this.view.render(this.model.data)
      })


      $(this.view.el).on('click', '#add', (e) => {
        let songId = $(this.view.el).find('.lsonglist>li.active').attr('data-song-id')
        let listId = this.model.data.listId

        this.model.setPointer(listId, songId)

        this.model.findCurrentSongs(listId).then(() => {
          this.view.render(this.model.data)
        })
      })
      $(this.view.el).on('click', '#remove', (e) => {

      })
    },
    bindEventsHub() {
      // window.eventHub.on('create', (songData) => {
      //   this.model.data.songs.push(songData)
      //   this.view.render(this.model.data)
      // })
      window.eventHub.on('selectxx', (data) => {
        this.model.data.listId = data.id
        this.model.findCurrentSongs(data.id).then(() => {
          this.view.render(this.model.data)
        })
      })
      window.eventHub.on('newxx', () => {
        this.view.render(this.model.data)
        this.view.clearActive()
      })
      // window.eventHub.on('update',(song)=>{
      //   let songs = this.model.data.songs
      //   for (let i = 0; i < songs.length; i++) {
      //     if(songs[i].id === song.id){
      //       songs[i] = song
      //       Object.assign(songs[i], song)
      //     }
      //   }
      //   this.view.render(this.model.data)
      // })
    },
  }

  controller.init(view, model)
}