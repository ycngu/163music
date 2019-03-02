{
    let view = {
        el: '.page > main',
        template: `
        <div class="playlistForm-wrapper">
        <form class="playlistForm">
          <div class="row">
            <label>歌单名</label><input type="text" name="name" value="__name__">
          </div>
          <div class="row">
            <label>简介</label><textarea name="summary" id="" cols="100" rows="10">__summary__</textarea>
          </div>
          <div class="row actions">
            <button type="submit">保存</button>
          </div>
        </div>`,
        render(data = {}) {
            let placeholders = ['name', 'summary']
            let html = this.template
            placeholders.map((string) => {
                html = html.replace(`__${string}__`, data[string] || '')
            })

            $(this.el).html(html)
            if (data.id) {
                $(this.el).prepend('<h1>编辑歌单</h1>')
            } else {
                $(this.el).prepend('<h1>新建歌单</h1>')
            }
        },
        init() {
            this.$el = $(this.el)
        },
        reset() {
          this.render({})
        }
    }

    let model = {
        data: {
            name:'',
            summary:''
        },
        create(data) {
            var PlayList = AV.Object.extend('PlayList')
            var playlist = new PlayList()
            playlist.set('name', data.name)
            playlist.set('summary', data.summary)



            return playlist.save().then((newPlaylist) => {
                let {id,attributes} = newPlaylist

                Object.assign(this.data, {id,...attributes})
            }, (err) => {
                console.error(err)
            })
        },
        update(data){
            var playlist = AV.Object.createWithoutData('PlayList', this.data.id);
            playlist.set('name', data.name);
            playlist.set('summary', data.summary);
            return playlist.save().then((res)=>{
              Object.assign(this.data, data)
              return res
            });
          },
    }

    let controller = {
        init(view, model) {
            this.view = view
            this.view.init()
            this.model = model
            this.bindEvents()
        },
        bindEvents() {
            window.eventHub.on('newPlaylistform', (data) => {

              if (this.model.data.id) {
                this.model.data = {
                  name: '',
                  summary: ''
                }
              } else {
                Object.assign(this.model.data, data)
              }
              this.view.render(this.model.data)
            })

            window.eventHub.on('selectPlayList', (data) => {
                this.model.data = data
                this.view.render(this.model.data)
            })

            this.view.$el.on('submit', '.playlistForm', (e) => {
                e.preventDefault()
                if (this.model.data.id) {
                  this.update()
                } else {
                  this.create()
                }
                // e.preventDefault()

                // let form = this.view.$form.get(0)
                // let keys = ['name', 'summary']
                // let data = {}
                // keys.reduce((prev, item) => {
                //     prev[item] = form[item].value
                //     return prev
                // }, data)
                // this.model.create(data)
            })
            // this.findAll()


        },
        create() {
            let needs = 'name summary'.split(' ')
            let data = {}
            needs.map((string) => {
              data[string] = this.view.$el.find(`[name="${string}"]`).val()
            })
            this.model.create(data)
              .then(() => {
                this.view.reset()
                let string = JSON.stringify(this.model.data)
                let object = JSON.parse(string)
                window.eventHub.emit('createPlaylistform', object)
              })
        },
        update() {
            let needs = 'name summary'.split(' ')
            let data = {}
            needs.map((string) => {
              data[string] = this.view.$el.find(`[name="${string}"]`).val()
            })
            this.model.update(data).then(()=>{
              window.alert('更新成功')
              window.eventHub.emit('updatePlayList',JSON.parse(JSON.stringify(this.model.data)))
            })
        },
        findAll(listId) {


            var PlayList = AV.Object.createWithoutData('PlayList', listId);

            // var Song = AV.Object.extend('Song');
            // var song = new Song();
            // song.set('name', '222222');
            // song.set('dependent', PlayList)
            // song.save();

            var query = new AV.Query('Song');
            query.equalTo('dependent', PlayList);
            query.find().then(function (Songs) {
                Songs.forEach(function (Song, i, a) {
                    console.log(Song.id);
                });
            });
        }
    }

    controller.init(view, model)
}