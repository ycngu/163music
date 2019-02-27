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
            <label>简介</label><textarea name="summary" id="" cols="100" rows="10" value="__summary__"></textarea>
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
        }
    }

    let model = {
        data: {
            lists: [],
            selectedListId: null
        },
        create(data) {
            var PlayList = AV.Object.extend('PlayList')
            var playlist = new PlayList()
            playlist.set('name', data.name)
            playlist.set('summary', data.summary)



            playlist.save().then((newPlaylist) => {
                window.alert('创建成功')
            }, (err) => {
                console.error(err)
            })
        }
    }

    let controller = {
        init(view, model) {
            this.view = view
            this.view.init()
            this.model = model
            this.bindEvents()
        },
        bindEvents() {
            window.eventHub.on('createPlaylistform', () => {
                this.view.$el.html(this.view.template)
                this.view.$form = this.view.$el.find('.playlistForm')
            })

            window.eventHub.on('selectPlayList', (data) => {
                this.model.data = data
                this.view.render(this.model.data)
            })

            this.view.$el.on('submit', '.playlistForm', (e) => {

                e.preventDefault()

                let form = this.view.$form.get(0)
                let keys = ['name', 'summary']
                let data = {}
                keys.reduce((prev, item) => {
                    prev[item] = form[item].value
                    return prev
                }, data)
                this.model.create(data)
            })
            // this.findAll()


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