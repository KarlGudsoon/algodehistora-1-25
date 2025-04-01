var abrirglosario = document.getElementById('abrirglosario'),
    glosario = document.getElementById('container-glosario'),
    Hipercritica =  document.getElementById('hipercritica'),
    Ghipercritica = document.getElementById('g-hipercritica'),
    contador=0;

    function abrir(){
      if(contador==0){
        glosario.style.left= "0";
        contador=1;
      }
      
      else{
        glosario.style.left= "-400px";
        Ghipercritica.style.background= "black";
        contador=0;
      }
    }

    function seleccion(){
      if(contador==0){
        Ghipercritica.style.background= "var(--red)";
        glosario.style.left= "0";
        contador=1;
      }
      
      else{
        Ghipercritica.style.background= "black";
        glosario.style.left= "-400px";
        contador=0;
      }
    }

    abrirglosario.addEventListener('click',abrir,true);

    Hipercritica.addEventListener('click',seleccion,true);

var sietecolinas2 = document.getElementById('sietecolinas2'),
    sietecolinas3 = document.getElementById('sietecolinas3'),
    Activo = false,
    colinas3d = document.getElementById('colinas3d');
    

    function pasado(){
      sietecolinas3.style.background= "var(--red2)";
      sietecolinas2.style.background= "wheat";
      sietecolinas2.style.color= "var(--red2)";
      sietecolinas3.style.color= "white";
    }

    function presente(){
      sietecolinas2.style.background= "var(--red2)";
      sietecolinas3.style.background= "wheat";
      sietecolinas2.style.color= "white";
      sietecolinas3.style.color= "var(--red2)";
    }



    sietecolinas2.addEventListener('click',pasado,true);
    sietecolinas3.addEventListener('click',presente,true);

var romuloremo = document.getElementById('romuloremo'),
    numapompilio = document.getElementById('numapompilio'),
    tulohostilio = document.getElementById('tulohostilio'),
    ancomarcio = document.getElementById('ancomarcio'),
    tarquinioprisco = document.getElementById('tarquinioprisco'),
    serviotulio = document.getElementById('serviotulio'),
    tarquiniosoberbio= document.getElementById('tarquiniosoberbio'),
    rey1 = document.getElementById('rey1'),
    rey2 = document.getElementById('rey2'),
    rey3 = document.getElementById('rey3'),
    rey4 = document.getElementById('rey4'),
    rey5 = document.getElementById('rey5'),
    rey6 = document.getElementById('rey6'),
    rey7 = document.getElementById('rey7'),
    contador=0;

    function activarrey1() {
      if(contador==0){
        romuloremo.style.bottom= "100%";
        rey1.style.background= "#ffa219";
        rey1.style.color= "#47030e";
        rey1.style.transform= "translateY(-10px)";
        romuloremo.style.opacity= "1";
        contador=1;
      }
      
      else{
        romuloremo.style.bottom= "";
        rey1.style.background= "";
        rey1.style.transform= "";
        rey1.style.color= "";
        romuloremo.style.opacity= "0";
        contador=0;
      }
    }

    function activarrey2() {
      if(contador==0){
        numapompilio.style.bottom= "100%";
        rey2.style.background= "#ffa219";
        rey2.style.color= "#47030e";
        rey2.style.transform= "translateY(-10px)";
        numapompilio.style.opacity= "1";
        contador=1;
      }
      
      else{
        numapompilio.style.bottom= "";
        rey2.style.background= "";
        rey2.style.transform= "";
        rey2.style.color= "";
        numapompilio.style.opacity= "0";
        contador=0;
      }
    }

    function activarrey3() {
      if(contador==0){
        tulohostilio.style.bottom= "100%";
        rey3.style.background= "#ffa219";
        rey3.style.color= "#47030e";
        rey3.style.transform= "translateY(-10px)";
        tulohostilio.style.opacity= "1";
        contador=1;
      }
      
      else{
        tulohostilio.style.bottom= "";
        rey3.style.background= "";
        rey3.style.transform= "";
        rey3.style.color= "";
        tulohostilio.style.opacity= "0";
        contador=0;
      }
    }

    function activarrey4() {
      if(contador==0){
        ancomarcio.style.bottom= "100%";
        rey4.style.background= "#ffa219";
        rey4.style.color= "#47030e";
        rey4.style.transform= "translateY(-10px)";
        ancomarcio.style.opacity= "1";
        contador=1;
      }
      
      else{
        ancomarcio.style.bottom= "";
        rey4.style.background= "";
        rey4.style.transform= "";
        rey4.style.color= "";
        ancomarcio.style.opacity= "0";
        contador=0;
      }
    }

    function activarrey5() {
      if(contador==0){
        tarquinioprisco.style.bottom= "100%";
        rey5.style.background= "#ffa219";
        rey5.style.color= "#47030e";
        rey5.style.transform= "translateY(-10px)";
        tarquinioprisco.style.opacity= "1";
        contador=1;
      }
      
      else{
        tarquinioprisco.style.bottom= "";
        rey5.style.background= "";
        rey5.style.transform= "";
        rey5.style.color= "";
        tarquinioprisco.style.opacity= "0";
        contador=0;
      }
    }

    function activarrey6() {
      if(contador==0){
        serviotulio.style.bottom= "100%";
        rey6.style.background= "#ffa219";
        rey6.style.color= "#47030e";
        rey6.style.transform= "translateY(-10px)";
        serviotulio.style.opacity= "1";
        contador=1;
      }
      
      else{
        serviotulio.style.bottom= "";
        rey6.style.background= "";
        rey6.style.transform= "";
        rey6.style.color= "";
        serviotulio.style.opacity= "0";
        contador=0;
      }
    }

    function activarrey7() {
      if(contador==0){
        tarquiniosoberbio.style.bottom= "100%";
        rey7.style.background= "#ffa219";
        rey7.style.color= "#47030e";
        rey7.style.transform= "translateY(-10px)";
        tarquiniosoberbio.style.opacity= "1";
        contador=1;
      }
      
      else{
        tarquiniosoberbio.style.bottom= "";
        rey7.style.background= "";
        rey7.style.transform= "";
        rey7.style.color= "";
        tarquiniosoberbio.style.opacity= "0";
        contador=0;
      }
    }


    rey1.addEventListener('click',activarrey1,true);
    rey2.addEventListener('click',activarrey2,true);
    rey3.addEventListener('click',activarrey3,true);
    rey4.addEventListener('click',activarrey4,true);
    rey5.addEventListener('click',activarrey5,true);
    rey6.addEventListener('click',activarrey6,true);
    rey7.addEventListener('click',activarrey7,true);
    
    