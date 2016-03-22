/* eslint-disable handle-callback-err */

var express = require('express')
var formidable = require('formidable')
var fs = require('fs')
var path = require('path')

var app = express()
var temp = path.join(__dirname, '..', '.temp')

app.use(express.static(temp))

app.post('/upload', (req, res) => {
  var form = new formidable.IncomingForm()
  form.parse(req, (err, fields, files) => {
    var old_path = files.file.path
    var file_ext = files.file.name.split('.').pop()
    var index = old_path.lastIndexOf('/') + 1
    var file_name = old_path.substr(index)
    var new_path = path.join(temp, '/uploads/', file_name + '.' + file_ext)

    fs.readFile(old_path, (err, data) => {
      fs.writeFile(new_path, data, err => {
        fs.unlink(old_path, err => {
          if (err) {
            res.status(500)
            res.json({'success': false})
          } else {
            res.status(200)
            res.json({'success': true})
          }
        })
      })
    })
  })
})

app.listen('8002', () => {
  console.log('[%s] Express server listening on port %d', 'development', 8002)
})
