const apikeyTrending = "https://api.giphy.com/v1/gifs/trending?api_key=bYQ1Vfn6G2NKpWha0cAgVmdsArrnZiSz&limit=4";

let word = document.getElementById("word");

/**In this function get words the api ....En esta funcion traigo el endpoint search con fetch,
 * con una funcion asincronica , recoriendo el array del response json (data)
 */
async function getWords() {
    let response = await fetch(apikeyTrending);
    let responseJson = await response.json();
    let dat = responseJson.data;
   // console.log(dat);
    dat.forEach(element => {
        let titulo = element.title;
        word.innerHTML += titulo + ` , `;
        //console.log(titulo);
    });
    /* writeWords(responseJson) */

}

getWords();