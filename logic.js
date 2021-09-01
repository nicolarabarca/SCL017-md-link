const fs = require("fs");
const fetch = require("node-fetch");

function mdLinks(path) {
  try {
    const isDirectory = fs.lstatSync(path).isDirectory(); // "variable que pasa a argumento"
    console.log("isDirectory: ", isDirectory);
    if (isDirectory) {
      fs.readdir(path, (err, files) => {
        if (err) {
          throw new Error("Cant read directory");
        }
        files.forEach((file) => {
          if (file.includes(".md")) {
            //Si es un archivo de tipo .md entonces se ejecuta la funcion reviewLinks, si no pasamos al siguiente archivo
            reviewLinks(path, file);
          }
        });
      });
    } else {
      //Si no es directorio es un archivo, por lo cual aqui el proceso
      //Pasa compobrar el nombre del archivo y leer el archivo con la funcion fs.readFile
      if (path.includes(".md")) {
        reviewLinks(path, "");
      }
    }
  } catch (e) {
    if (e.code == "ENOENT") {
      //no such file or directory
      //do something
      console.error("Cant read mdLinks");
    } else {
      //do something else
      console.error("Cant read mdLinks");
    }
  }
}

function getUrl(line) {
  if (line.indexOf("http://") !== -1) {
    let partialLink = line.substring(line.indexOf("http://"), line.length);
    if (partialLink.indexOf(")") > -1) {
      return partialLink.substring(
        partialLink.indexOf("http://"),
        partialLink.indexOf(")")
      );
    } else {
      return partialLink;
    }
  }
  if (line.indexOf("https://") !== -1) {
    let partialLink = line.substring(line.indexOf("https://"), line.length);
    if (partialLink.indexOf(")") > -1) {
      return partialLink.substring(
        partialLink.indexOf("https://"),
        partialLink.indexOf(")")
      );
    } else {
      return partialLink;
    }
  }
}

function reviewLinks(path, file) {
  let linksToReview = []; // se guardan todos los link del archivo md que se encuentran
  let validLinks = [];
  let invalidLinks = [];

  console.log("Reading file in: ", path + "/" + file);

  try {
    fs.readFile(path + "/" + file, "utf-8", (err, data) => {
      if (err) {
        console.error("Cant read file");
        throw new Error("Cant read file");
      }
      // se concatenzz el nombre del archivo mas la ruta
      linksToReview = getLinksFromFile(data);
      console.info("linksToReview: ", linksToReview);

      //console.log("linksToReview.toString()");
      //console.log(linksToReview.toString());
      if (linksToReview.length > 0) {
        for (let link of linksToReview) {
          console.info("Validating link: ", link);
          isValidLink(link)
            .then((response) => {
              if (response == true) {
                validLinks.push(link);
                console.info("Link valid: ", link);
              } else {
                invalidLinks.push(link);
                console.info("Link invalid: ", link);
              }
            })
            .catch((err) => {
              console.info("Link invalid: ", link, " message: ", err.message);
              invalidLinks.push(link);
            });
        }
      }
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

function isValidLink(link) {
  let isValidLink = false;
  return new Promise((resolve, reject) => {
    try {
      fetch(link) //busca link
        .then((response) => {
          //then espera la respuesta (response)
          const status = response.status;
          if (status == 200) {
            isValidLink = true;
            resolve(isValidLink);
          }
          reject(isValidLink);
        })
        .catch((err) => reject(err.message));
    } catch (err) {
      reject(isValidLink);
    }
  });
}

function getLinksFromFile(fileData) {
  let linksToReview = [];
  const lines = fileData.split(/\r?\n/); //split separa linea por linea con el documento
  lines.forEach((line) => {
    //recorre linea por linea
    let hasLinks =
      line.indexOf("http://") !== -1 || line.indexOf("https://") !== -1;
    if (hasLinks) {
      linksToReview.push(getUrl(line));
    }
  });
  return linksToReview;
}
exports.mdLinks = mdLinks;
exports.getUrl = getUrl;
exports.reviewLinks = reviewLinks;
exports.isValidLink = isValidLink;