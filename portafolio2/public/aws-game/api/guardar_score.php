<?php
$host = "localhost";
$db = "u152829126_u152829126_jue";
$user = "u152829126_u152829126_use"; // cámbialo por tu usuario real
$pass = "TuContraseñaFuerte9876.Z.";         // cámbialo por tu contraseña real

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo "Error de conexión";
    exit;
}

$nombre = $_POST['nombre'] ?? '';
$score = $_POST['score'] ?? 0;

if ($nombre === '') {
    http_response_code(400);
    echo "Nombre vacío";
    exit;
}

$stmt = $conn->prepare("INSERT INTO tabla_scores (nombre, score) VALUES (?, ?)");
$stmt->bind_param("si", $nombre, $score);
$stmt->execute();
$stmt->close();
$conn->close();

echo "Guardado con éxito";
