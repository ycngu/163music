// var Song = AV.Object.extend('Song');
// var song = new Song();
// song.set('name', '11111');

// var PlayList = AV.Object.extend('PlayList')
// var playlist = new PlayList()
// playlist.set('name', '测试')
// playlist.set('summary', '测试')

// song.set('dependent', playlist)

// song.save().then((newSong) => {
//   let {
//     id,
//     attributes
//   } = newSong
//   Object.assign(this.data, {
//     id,
//     ...attributes
//   })
// }, (error) => {
//   console.error(error);
// });

// playlist.save().then((newPlaylist) => {
//   console.log(newPlaylist)
// }, (err) => {
//   console.error(err)
// })

{
    let view = {
        el: '.playlistForm-wrapper',
        init() {
            this.$el = $(this.el)
            this.$form = this.$el.find('form')
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
            this.view.$el.on('submit', 'form', (e) => {

                e.preventDefault()

                let form = this.view.$form.get(0)
                let keys = ['name', 'summary']
                let data = {}
                keys.reduce((prev, item) => {
                    prev[item] = form[item].value
                    console.log(prev)
                    return prev
                }, data)
                this.model.create(data)
            })
            // this.findAll()

        },
        findAll(listId){
           

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