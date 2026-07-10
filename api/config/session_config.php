<?php
session_set_cookie_params([
    'lifetime' => 86400,       // duración: 1 día
    'path' => '/',             // válida en todo el dominio
    'domain' => '',            // vacío significa el dominio actual
    'secure' => false,          // solo se envía por HTTPS
    'httponly' => true,        // JavaScript no puede leer esta cookie
    'samesite' => 'Lax',       // protección básica contra CSRF
]);