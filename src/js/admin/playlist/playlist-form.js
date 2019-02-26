{
    let view = {
        el: '.page > main',
        template: `
        <div class="playlistForm-wrapper">
        <h1>创建歌单</h1>
        <form class="playlistForm">
          <div class="row">
            <label>歌单名 <input type="text" name="name"></label>
          </div>
          <div class="row">
            <label>简介<textarea name="summary" id="" cols="30" rows="10"></textarea></label>
          </div>
          <div class="row">
            <button type="submit">创建</button>
          </div>
        </div>`,
        render(){
            this.$el.html(this.template)
        },
        init() {
            this.$el = $(this.el)
        }
    }

    let model = {
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
            window.eventHub.on('createPlaylistform',()=>{
                this.view.$el.html(this.view.template)
                this.view.$form = this.view.$el.find('.playlistForm')
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


