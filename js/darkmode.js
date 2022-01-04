const darkmodeButton = document.getElementById("darkMode");
const crearGifo = document.querySelectorAll(".crear-gifo");
const crearGifoHover = document.querySelectorAll(".crear-gifo-hover");
const crearGifoN = document.getElementById("crear-gifo-n");
const crearGifoHN = document.getElementById("crear-gifo-hover-n");
darkmodeButton.addEventListener("click",()=>{
    document.body.classList.toggle('dark')
    //TOOGLE "SI NO TIENE UNA CLASE SE LA PONE Y SILA TIENE SE LA QUITA"
    
});

/* const header = document.querySelector('.header-flex');
const dark = 'dark';
try {
    darkmodeButton.addEventListener("click",()=>{
        header
    });
    
} catch (error) {
    console.log(error)
} */