const apikeySearch = "https://api.giphy.com/v1/gifs/search?api_key=cAvuB99zo3RklJTjZSYGgx2ERWNnpzSP&limit=12&offset=0&rating=g&lang=en&q=";

let resultados = document.getElementById("resultados");

let searchInput = document.getElementById("searchInput");

let line = document.getElementById("line");

let palabra = document.getElementById("palabra");

let verMas = document.getElementById("verMas");

let trending = document.querySelector(".em-4");
let wr = document.getElementById("word");

/**En esta funcion dibujo las cards de los resultados del search */

function drawResultSearch(src) {

    let add =
        `
    
        <div id="card">
            <img src="${src}" frameborder="0" id="iframe">
        </div>
  
    `
    resultados.innerHTML += add;

    line.style.display = "block";

   
    verMas.style.display = "block";
    

};

/**Para hacer la llamada fetch utilizo una fincion asincronica la cual va a dibujar la grila con las cards */

async function getIframe(url) {
    let response = await fetch(url);
    let responseJSON = await response.json();
    let dat = responseJSON.data;
    console.log(dat);
   /*  for (let i = 0; i < 12; i++) {
        console.log(responseJSON.data[i].images.original.url);
        drawResultSearch(responseJSON.data[i].images.original.url)
    } */
    dat.forEach(element => {

        drawResultSearch(element.images.downsized_large.url);
        

        //console.log(element.images.original.url);
        //console.log(dat);
        
        
    });

    /*  drawResultSearch(responseJSON.data[0].embed_url); */

}


searchInput.addEventListener("keyup", e => {
    
   
    if (searchInput.value.length >= 4) {
        url = apikeySearch + searchInput.value;
        getIframe(url);
    };
    if(searchInput.value.length == 0){
        line.style.display = "none";
        
        resultados.style.display = "none";
    }else{
        trending.style.display ="none";
    };

    if(searchInput.value.length == 0){
        verMas.style.display = "none";
        
    }else{
        wr.style.display ="none"
    }
    palabra.innerHTML = searchInput.value;
    palabra.style.display = "block";
    
    

});