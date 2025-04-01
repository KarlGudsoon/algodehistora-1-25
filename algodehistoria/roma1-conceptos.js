var senado = document.getElementById('senado'),
    conceptosenadotexto1 = document.getElementById('concepto-senado-texto1'),
    conceptosenadotexto2 = document.getElementById('concepto-senado-texto2'),
    conceptosenado = document.getElementById('concepto-senado'),
    contador=0;

    function on(){ 
      conceptosenado.style.fill= "wheat";
      conceptosenadotexto1.style.fill= "var(--red2)";
      conceptosenadotexto2.style.fill= "var(--red2)";
    }
     

    function off(){ 
      conceptosenado.style.fill= "";
      conceptosenadotexto1.style.fill= "";
      conceptosenadotexto2.style.fill= "";
    }

senado.addEventListener('mouseover',on,true);
senado.addEventListener('mouseout',off,true);

var colegiosacerdotal = document.getElementById('colegiosacerdotal'),
    conceptosacerdotestexto1 = document.getElementById('concepto-sacerdotes-texto1'),
    conceptosacerdotestexto2 = document.getElementById('concepto-sacerdotes-texto2'),
    conceptosacerdotes = document.getElementById('concepto-sacerdotes');

    function sacerdoteson(){ 
      conceptosacerdotes.style.fill= "wheat";
      conceptosacerdotestexto1.style.fill= "var(--red2)";
      conceptosacerdotestexto2.style.fill= "var(--red2)";
    }
     

    function sacerdotesoff(){ 
      conceptosacerdotes.style.fill= "";
      conceptosacerdotestexto1.style.fill= "";
      conceptosacerdotestexto2.style.fill= "";
    }

colegiosacerdotal.addEventListener('mouseover',sacerdoteson,true);
colegiosacerdotal.addEventListener('mouseout',sacerdotesoff,true);

var rey = document.getElementById('rey'),
    conceptoreytexto1 = document.getElementById('concepto-rey-texto1'),
    conceptoreytexto2 = document.getElementById('concepto-rey-texto2'),
    conceptoreytexto3 = document.getElementById('concepto-rey-texto3'),
    conceptoreytexto4 = document.getElementById('concepto-rey-texto4'),
    conceptorey = document.getElementById('concepto-rey');

    function reyon(){ 
      conceptorey.style.fill= "wheat";
      conceptoreytexto1.style.fill= "var(--red2)";
      conceptoreytexto2.style.fill= "var(--red2)";
      conceptoreytexto3.style.fill= "var(--red2)";
      conceptoreytexto4.style.fill= "var(--red2)";
    }
     

    function reyoff(){ 
      conceptorey.style.fill= "";
      conceptoreytexto1.style.fill= "";
      conceptoreytexto2.style.fill= "";
      conceptoreytexto3.style.fill= "";
      conceptoreytexto4.style.fill= "";
    }

rey.addEventListener('mouseover',reyon,true);
rey.addEventListener('mouseout',reyoff,true);

var patricios = document.getElementById('patricios'),
    conceptopatriciostexto = document.getElementById('concepto-patricios-texto'),
    conceptopatricios = document.getElementById('concepto-patricios');

    function patricioson(){ 
      conceptopatricios.style.fill= "wheat";
      conceptopatriciostexto.style.fill= "var(--red2)";
    }
     

    function patriciosoff(){ 
      conceptopatricios.style.fill= "";
      conceptopatriciostexto.style.fill= "";
    }

patricios.addEventListener('mouseover',patricioson,true);
patricios.addEventListener('mouseout',patriciosoff,true);

var plebeyos = document.getElementById('plebeyos'),
    conceptoplebeyostexto = document.getElementById('concepto-plebeyos-texto'),
    conceptoplebeyos = document.getElementById('concepto-plebeyos');


    function plebeyoson(){ 
      conceptoplebeyos.style.fill= "wheat";
      conceptoplebeyostexto.style.fill= "var(--red2)";
    }
     

    function plebeyosoff(){ 
      conceptoplebeyos.style.fill= "";
      conceptoplebeyostexto.style.fill= "";
    }

plebeyos.addEventListener('mouseover',plebeyoson,true);
plebeyos.addEventListener('mouseout',plebeyosoff,true);



var seccionfinal = document.getElementById('seccionfinal2'),
    seccionfinal3 = document.getElementById('seccionfinal3'),
    contador=0,
    seccioncomplementaria = document.getElementById('seccioncomplementaria');

    function abriracordeon() {
      if(contador==0){
        seccioncomplementaria.style.height= "300px";
        seccioncomplementaria.style.visibility= "visible";
        seccioncomplementaria.style.opacity= "100%";
        seccionfinal3.style.height= "100%";
        seccionfinal3.style.opacity= "100%";
        seccionfinal3.style.visibility= "visible";
        contador=1;
      }
      
      else{
        seccionfinal3.style.height= "0%";
        seccionfinal3.style.visibility= "hidden";
        seccionfinal3.style.opacity= "0%";
        contador=0;
      }
    }

seccionfinal.addEventListener('click',abriracordeon,true);