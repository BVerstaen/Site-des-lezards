// ----- Récuperation des éléments -----
//Introduction
const upIntro = document.querySelector("#UpIntro");
const prankDiv = document.querySelector("#PrankIcon");
const IntroTitle = document.querySelector(".title");

//lézard qui se déplace
const movingLizardImg = document.querySelector("#movingLizard");

//Terrain des lézards
const LTAdd = document.querySelector("#LTAdd");
const LTDelete = document.querySelector("#LTDelete");
const LTDeleteAll = document.querySelector("#LTDeleteAll");
const LTChange = document.querySelector("#LTChange");
const ul = document.querySelector("#LizardList");

//Nom lézard
const changeColor = document.querySelector("#changeColor");
const changeSize = document.querySelector("#changeSize");
const changeBkColor = document.querySelector("#changeBkColor");
const nameLizard = document.querySelector("#nameLizard");

//couleur arrière-plan
const buttonBackgroundColor = document.getElementById("btnBackgroundColor")

// ----- Variables -----
let lockScroll = true;
let lizardImgType = false;



//Quand page chargé
window.addEventListener("load", function(){
    IntroTitle.classList.add("appearTitle");
})
//Mettre un arrière plan sur le corps
document.body.style.backgroundImage = "url('images/backgroundbody.jpg')";


// ----- Application du piège -----
UpIntro.addEventListener("mouseover", function(){
    //Obtenir la distance entre les bouttons
    const buttonUp = document.getElementById("UpIntro");
    const buttonDown = document.getElementById("DownIntro");
    const dist = buttonDown.offsetTop - buttonUp.offsetTop

    //Application du mouvement du boutton du bas
    buttonDown.style.transition = "all 1s";
    buttonDown.style.transform = "translate(0,-" + dist +"px)"

    //Faire apparaitre le message
    prankDiv.classList.add("AppearJoke");
})

// ----- Sortir du piège -----
UpIntro.addEventListener("click", function(){
    //Stop le blocage du scroll
    lockScroll = false;
    window.scrollTo(0, 1400);
})



// ----- Progression de la barre de défilement -----
window.addEventListener("scroll", function(){
    //Blocage du scroll si sur l'introduction
    if (lockScroll){
        window.scrollTo(0, 0);
    }
    else{
        //Empêcher de revenir sur l'introduction
        if(this.window.scrollY < 1400){
            window.scrollTo(0, 1400);
        }

        //Hauteur total de la page
        const height = document.documentElement.scrollHeight - window.innerHeight
        // Position verticale
        const YScroll = window.scrollY
        // Largeur de la fenêtre
        const screenWidth = document.documentElement.clientWidth
        // Calcul de la largeur de la barre
        let newWidth = YScroll / height * screenWidth;
    
        document.getElementById("ScrollBar").style.width = newWidth+"px"
    }
})



// ----- Commande de déplacement du lézard-----
document.addEventListener("keydown", (e) => {
    //Obtention de la position du coté droit de l'écran
    let rightSide = (document.documentElement.clientWidth - movingLizardImg.getBoundingClientRect().width);
    //Conversion pour enlever les unités
    //sinon, le "bouclage" ne fonctionnera pas à droite
    rightSide = Math.trunc(rightSide/10)*10

    if(e.code == "KeyD"){
        //Centrer sur le lézard
        window.scrollTo(0, 2000);
        //Mettre une nouvelle position
        const newPosition = movingLizardImg.getBoundingClientRect().left + 10;
        movingLizardImg.style.left = newPosition + "px";
        movingLizardImg.style.transform = "ScaleX(1)";

        console.log(rightSide)
        //Boucler si tout à droite
        if(movingLizardImg.style.left == rightSide+"px" ){
            movingLizardImg.style.left = "0px";
        }
    }
    else if(e.code == "KeyA"){
                //Centrer sur le lézard
                window.scrollTo(0, 2000);
                //Mettre une nouvelle position
                const newPosition = movingLizardImg.getBoundingClientRect().left - 10;
                movingLizardImg.style.left = newPosition + "px";
                movingLizardImg.style.transform = "ScaleX(-1)";

                //Boucler si tout à gauche
                if(movingLizardImg.style.left <= "-20px" ){
                    movingLizardImg.style.left = (rightSide-10) + "px";
                }
    }

    
})

// ----- Bouttons du terrain des lézards -----
LTAdd.addEventListener("click", function(){
    //Creation des elements à instancier
    const li = document.createElement("li");
    const img = document.createElement("img")
    //Application de propriété sur l'image
    if(lizardImgType){ img.src="images/lezard2.png"}
    else {img.src="images/lezard1.png"}
    img.classList.add("LizardImg")

    //Acqusition de la position du terrain et application aléatoire
    //de la nouvelle position du lézard
    const Terrain = document.getElementById("Terrain")
    const XPosition = Terrain.getBoundingClientRect().left + Math.random() * 550
    const YPosition = 3000 + Math.random() * 575

    img.style.top = YPosition + "px"
    img.style.left = XPosition + "px"

    //Instanciation des éléments
    li.append(img);
    ul.append(li);
})
LTDelete.addEventListener("click", function(){
    const li = ul.lastChild;
    li.remove()
})
LTDeleteAll.addEventListener("click", function(){
    let child = ul.lastElementChild;
    while (child) {
        ul.removeChild(child);
        child = ul.lastElementChild;
    }
})
LTChange.addEventListener("click", function(){
    lizardImgType = !lizardImgType;
    //Boucle pour changer chaque élément
    for(const child of ul.children){
        const childOfchild = child.lastElementChild;
        if(lizardImgType){childOfchild.src="images/lezard2.png"}
        else {childOfchild.src="images/lezard1.png"}
    }
})



// ----- Nom lézard -----
changeColor.addEventListener("click",function(){
    nameLizard.classList.toggle("lizardColor");
})
changeSize.addEventListener("click",function(){
    nameLizard.classList.toggle("lizardSize");
})
changeBkColor.addEventListener("click",function(){
    nameLizard.classList.toggle("lizardBkColor");
})

// ----- Changer couleur arrière-plan -----
buttonBackgroundColor.addEventListener("click", function(){
    changeBackgroundColor()
})
document.addEventListener("keydown", (e) =>{
    if(e.code == "KeyG"){
        changeBackgroundColor()
    }
})

function changeBackgroundColor(){
            //Création des composants R,G et B
            const R = Math.floor(Math.random() * 100);
            const G = Math.floor(Math.random() * 100); // Multiplie par 100 pour garder un arrière-plan sombre
            const B = Math.floor(Math.random() * 100);
            //Application de la nouvelle couleur
            const main = document.querySelector("main");
            main.style.backgroundColor = "rgb("+R+","+G+","+B+")"
}
