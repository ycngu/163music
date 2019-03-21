{
  let view = {
    el: '.page > main',
    template: `
      <ul class="vsonglist"></ul>
      <button id="add">add</button>
      <button id="remove">remove</button>
      <ul class="csongList"></ul>
    `,
    render(data) {
      let $el = $(this.el)
      // $el.addClass('active').siblings('.active').remove('active')
      $el.html(this.template)
      let {
        songs,
        selectedSongId,
        lists,
        selectedListId
      } = data

      let liListS = songs.map((song) => {
        let $li = $('<li></li>').text(song.name).attr('data-song-id', song.id)
        if (selectedSongId === song.id) {
          $li.addClass('active')
        }
        return $li
      })

      let liListL = lists.map((list) => {
        let $li = $('<li></li>').text(list.name).attr('data-list-id', list.id)
        if (selectedListId === list.id) {
          $li.addClass('active')
        }
        return $li
      })

      $el.find('.vsongList').empty()
      liListS.map((domLi) => {
        $el.find('.vsongList').append(domLi)
      })

      $el.find('.csongList').empty()
      liListL.map((domLi) => {
        $el.find('.csonglist').append(domLi)
      })
    },

    clearActive() {
      $(this.el).find('.active').removeClass('active')
    }
  }
  let model = {
    data: {
      songs: [],
      lists: [],
      selectedSongId: null,
      selectedListId: null,
    },
    findSongs() {
      var query = new AV.Query('Song')
      return query.find().then((songs) => {
        this.data.songs = songs.map((song) => {
          return {
            id: song.id,
            ...song.attributes
          }
        })
        return songs
      })
    },
    findCurrentSongs(listId) {
      var playlist = AV.Object.createWithoutData('PlayList', listId);
      var query = new AV.Query('Song');
      query.equalTo('dependent', playlist);
      query.find().then(function (songs) {
        songs.forEach(function (song, i, a) {
          console.log('findCurrentSong',song.id);
        });
      });
    }
  }
  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.bindEvents()
      this.bindEventsHub()
      this.getAllSongs()
      this.model.findLists().then(() => {
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
      $(this.view.el).on('click', 'li', (e) => {
        let songId = e.currentTarget.getAttribute('data-song-id')

        this.model.data.selectedSongId = songId
        this.view.render(this.model.data)

        let data
        let songs = this.model.data.songs
        for (let i = 0; i < songs.length; i++) {
          if (songs[i].id == songId) {
            data = songs[i]
            break
          }
        }
        window.eventHub.emit('select', JSON.parse(JSON.stringify(data))) //深拷贝
      })
    },
    bindEventsHub() {
      // window.eventHub.on('create', (songData) => {
      //   this.model.data.songs.push(songData)
      //   this.view.render(this.model.data)
      // })
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