# nico-md

## Índice

* [1. ¿Qué es nico-md?](#1¿Qué-es-Md-Links?)
* [2. Diagrama de Flujo](#2Diagrama-de-Flujo)
* [3. Instalación](#3Instalación)
* [4. Indicaciones de como debes usar la librería](#4Indicaciones-de-como-debes-usar-la-librería)
* [5. ¿Qué muestra el análisis?](#3¿Qué-muestra-el-análisis?)


***

## 1. ¿Que es nico-md? 

***nico-md*** es un lenguaje de marcado ligero que manejan texto plano, ayudando asi a conseguir la máxima legibilidad y facilidad de  publicación (como  el conocido documento README.md).Nico-md valida especificamente si el archivo Markdown contiene links y si estos links son funcionales o se encuentran rotos.


## 2. Diagrama de Flujo

![Diagrama de Flujo](https://github.com/nicolarabarca/SCL017-md-link/blob/Borrador/assets/Untitled%20Diagram%20(7).png)

### 3. Instalación 

  Para llevar a cabo el primer paso tienes ***2 opciones***
    - La primera opción es realizar un ***Fork*** y ***clonar*** el proyecto nico-md para luego realizar la instalacion con el comando ***npm install -g Nico-mdLinks.*** 
    - La segunda opción es ***descargar*** directamente el proyecto y luego realizar la instalacion con el comando ***npm install -g Nico-mdLinks.***
    
#### 4. Indicaciones de como debes usar la librería

  * Adjunta archivo o directorio que desees revisar a proyecto nico-md.
  * Una vez realizado el primer paso vamos a abrir la terminal de tu editor de código o tu gitbash (o el que tu prefieras), como se muestra en la siguiente imagen
  
  ![Terminal](https://github.com/nicolarabarca/SCL017-md-link/blob/master/assets/terminal%20nicomd.png)
  
  * A continuación debes usar el siguiente comando ***Nico-mdLinks*** y agregar ruta relativa o absoluta del archivo o directorio que quieras analizar. En La foto que adjunto a continuación yo ocupo el nombre del directorio assets que contiene un archivo .md y otros de formatos diferentes.
  
  ![Comando](https://github.com/nicolarabarca/SCL017-md-link/blob/master/assets/terminal%20nicomd2.png)
  
  * Por último hacer  click en la tecla ***Enter*** y ***voilà*** ya tienes el resultado del analisis de tu archivo o directorio.
  
  ![Análisis](https://github.com/nicolarabarca/SCL017-md-link/blob/master/assets/terminal%20nicomd3.png)
  
  
 ##### 5. ¿Qué muestra el análisis?
 
  * El análisis saludará a tu directorio o archivo.
  *Analiza y muestra si tu ruta corresponde a un archivo o directorio. ***Si*** es directorio retornará ***true*** o de lo contrario retornará ***false*** y esto quiere decir que es un archivo.
  * Luego mostrará el resultado de la ruta y nombre del archivo .md encontrado dentro del directorio.
  *Enseguida mostrará un resumen de todos los links detectados sin importar si estos links se encuentran funcionales o rotos.
  * A continuación validará cada uno de las URLs detectadas.
  *Finalmente justo en el lado izquierdo de cada link mostrará el status de cada uno de estos con un ***Link Valid*** o ***Link inValid***
 
        
        
  
