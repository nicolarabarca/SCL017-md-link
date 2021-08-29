const fs = require("fs");
const fetch = require("node-fetch");

mdLinks('./assets');


function mdLinks(path) {
  let linksToReview = []; // se guardan todos los link del archivo md que se encuentran
  let linksOK = [];// todos los links buenos
  let linksNOOK = [];// todos los link malos 
  try {
    const isDirectory = fs.lstatSync(path).isDirectory(); // "variable que pasa a argumento"
    console.log(isDirectory);
    if (isDirectory) {
      fs.readdir(path, (err, files) => {
        files.forEach((file) => {
          if (file.includes('.md')) {
           

            fs.readFile(path+"/"+file, "utf-8", (err, data) => {// se concatenzz el nombre del archivo mas la ruta
              const lines = data.split(/\r?\n/);
              lines.forEach((line) => {
                let  hasLinks = line.indexOf('http://') !== -1 || line.indexOf('https://') !== -1
                if (hasLinks) {
                  linksToReview.push(getUrl(line));
                }
              });
              //console.log("linksToReview.toString()");
              //console.log(linksToReview.toString());
              if(linksToReview.length > 0){
                for(let link of linksToReview){
                  fetch(link).then(function(response) {// fetch ve  el estado del link si es  ok o fail
                    if(response.ok) {
                      console.log(link + " OK");
                    } else {
                      console.log(link + "FAIL");
                    }
                  })
                  .catch(function(error) {
                    console.log(link + " FAIL");
                  });


                }

              }
       
            });            
          }
         
        });
      });
    }else{//Si no es directorio es un archivo, por lo cual aqui el proceso 
          //Pasa compobrar el nombre del archivo y leer el archivo con la funcion fs.readFile

          if (path.includes('.md')) {
           
            fs.readFile(path, "utf-8", (err, data) => {
              const lines = data.split(/\r?\n/);
              lines.forEach((line) => {
                var hasLinks = line.indexOf('http://') !== -1 || line.indexOf('https://') !== -1
                if (hasLinks) {
                  linksToReview.push(getUrl(line));
                }
              });
              //console.log("linksToReview.toString()");
              //console.log(linksToReview.length);
              if(linksToReview.length > 0){
                for(let link of linksToReview){
                  fetch(link).then(function(response) {
                    if(response.ok) {
                      linksOK.push((link));
                    } else {
                      linksNOOK.push((link));
                    }
                  })
                  .catch(function(error) {
                    linksNOOK.push((link));
                  });

                }

              }
              console.log("linksOK.toString()");
              console.log(linksOK.toString());
              console.log("linksNOOK.toString()");
              console.log(linksNOOK.toString());
            });            
          }          


    }




  } catch (e) {
    // Handle error
    if (e.code == "ENOENT") {
      //no such file or directory
      //do something
    } else {
      //do something else
    }
  }
}


function getUrl(line){

  if (line.indexOf('http://') !== -1) { // se  usa  para  limpiar  la  linea  se agrega  un  if  para  limpiar  en el caso de  que despues de la  primera  vez que limpie  quede  con  un ()al lado derecho
    //console.log('line http: ', line)
    let partialLink = line.substring(line.indexOf('http://'), line.length );
    if(partialLink.indexOf(')') > -1){
      return  partialLink.substring(partialLink.indexOf('http://'), partialLink.indexOf(')') );
    }else{
      return partialLink;
    }
    
  }
  if (line.indexOf('https://') !== -1) {
    let partialLink = line.substring(line.indexOf('https://'), line.length);
    if(partialLink.indexOf(')') > -1){
      return  partialLink.substring(partialLink.indexOf('https://'), partialLink.indexOf(')') );
    }else{
      return partialLink;
    }
    
  }


  

}




