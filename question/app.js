document.getElementById('formulario').addEventListener('submit', function(e) {
    
    e.preventDefault();

    let formulario = new FormData(document.getElementById('formulario'));

    fetch('/question/registrar.php', {
        method: 'POST',
        body: formulario
    })
    .then(res => res.json())
    .then(data => {
        if(data == 'true') {
            document.getElementById('txt_usuario').value = '';
            document.getElementById('txt_respuesta').value = '';
            alert('El usuario se insertó correctamente.');
        } else {
            console.log(data);
        }
    });

});