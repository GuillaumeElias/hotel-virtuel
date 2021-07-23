const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');

let app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//INIT ROUTING
app.get('/', async function(req, res) {
    res.status(200).send('All good.');
});

app.post('/picture', function (req, res) {

  let imageData = req.body.imageData;
  let name = req.body.name;
  let forename= req.body.forename;

  if(!name && !forename){
    name = 'unknown' + uuid();
  }else{
    name = forename + '_' + name;
  }

  if(imageData){
    let data = imageData.split(',');
    if(data.length > 1){


      let buff = Buffer.from(data[1], 'base64');
      fs.writeFileSync('uploads/' + name + '.png', buff);

      console.log("received picture from "+ name);
    }
  }


  res.status(200).send('Ok');
})


//START SERVER
let server = app.listen(3501, function() {
    console.log('Server is listening on port 3501');
});


function uuid() {
  return '00-0-4-1-000'.replace(/[^-]/g,
          s => ((Math.random() + ~~s) * 0x10000 >> s).toString(16).padStart(4, '0')
  );
}