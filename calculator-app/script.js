const operators = ['+', '-', 'x', '/'];
const ecran = document.querySelector(".ecran p"); // Le <p> pour tout afficher


const theme1 = document.getElementById("theme1");
const theme2 = document.getElementById("theme2");
const theme3 = document.getElementById("theme3");
const body = document.body;


theme1.addEventListener("change", () => body.className = "theme1");
theme2.addEventListener("change", () => body.className = "theme2");
theme3.addEventListener("change", () => body.className = "theme3");


window.addEventListener("DOMContentLoaded", () => {
  if(theme1.checked) body.className = "theme1";
  else if(theme2.checked) body.className = "theme2";
  else if(theme3.checked) body.className = "theme3";

  ecran.textContent = "0";
});


function click_touch(value){
    
    if(ecran.textContent === "0" || ecran.textContent === "Erreur"){
        ecran.textContent = value;
    } else {
        ecran.textContent += value;
    }
}


function egal(){
    let formule = ecran.textContent.replace(/x/g, '*');

    if(operators.includes(ecran.textContent.slice(-1))){
        ecran.textContent = "Erreur";
        return;
    }

    try {
        let result = eval(formule);
        if(!Number.isFinite(result)){
            ecran.textContent = "Erreur";
            return;
        }
        ecran.textContent = result.toLocaleString('fr-FR', { maximumFractionDigits: 6 });
    } catch {
        ecran.textContent = "Erreur";
    }
}


function erase(){
    ecran.textContent = "0";
}


function del(){
    ecran.textContent = "0";
    if(ecran.textContent === "") ecran.textContent = "0";
}


document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.textContent;
        if(value === "RESET") erase();
        else if(value === "DEL") del();
        else if(value === "=") egal();
        else click_touch(value === 'x' ? 'x' : value);
    });
});

window.addEventListener("keydown", (e) => {
    if(e.key >= '0' && e.key <= '9') click_touch(e.key);
    else if(['+', '-', '*', '/'].includes(e.key)) click_touch(e.key === '*' ? 'x' : e.key);
    else if(e.key === 'Enter') egal();
    else if(e.key === 'Backspace') del();
    else if(e.key.toLowerCase() === 'c') erase();
});