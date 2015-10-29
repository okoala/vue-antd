var express = require('express')
var http = require('http')
var formidable = require('formidable')
var fs = require('fs')
var path = require('path')

var app = express()
var temp = path.join(__dirname, '..', '.temp')

app.use(express.static(temp))

app.post('/upload', function(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    var old_path = files.file.path,
        file_size = files.file.size,
        file_ext = files.file.name.split('.').pop(),
        index = old_path.lastIndexOf('/') + 1,
        file_name = old_path.substr(index),
        new_path = path.join(temp, '/uploads/', file_name + '.' + file_ext)

    fs.readFile(old_path, function(err, data) {
      fs.writeFile(new_path, data, function(err) {
        fs.unlink(old_path, function(err) {
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

app.listen('8002', function() {
  console.log('[%s] Express server listening on port %d', 'development', 8002);
})
