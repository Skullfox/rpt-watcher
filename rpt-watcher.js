var settings = require('./rpt-watcher.config.json');
const fs = require('fs');
const glob = require('glob');
const readLastLines = require('read-last-lines');

var folder = settings.drive + process.env.HOMEPATH + "\\AppData\\Local\\Arma 3";
var lastmtime = "";
var file = "";

glob(folder + '/*.rpt', {}, (err, files)=>{

  if( files.length === 0){
     throw new Error('No rpt file found in ' + folder);
  };

  for (var i=0; i<files.length; i++) {
    if(i == 0){
      //index file
      var lastmtime = fs.statSync(files[i]).mtime;
      var file = files[i];
    }
    if(fs.statSync(files[i]).mtime > lastmtime){
      var file = files[i];
      var lastmtime = fs.statSync(files[i]).mtime;
    };
  };

  console.log("Watchfile: " + file);
  fs.watchFile(file, (curr, prev) => {
    readLastLines.read(file, settings.lines)
        .then((lines) => console.log(lines));

      ;
  });

})
