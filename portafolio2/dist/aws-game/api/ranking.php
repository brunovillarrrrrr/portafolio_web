<?php
// Configura tus datos de acceso:
$host = "localhost";
$db = "u152829126_u152829126_jue";   // Tu base de datos real
$user = "u152829126_u152829126_use";      // Tu usuario MySQL real
$pass = "TuContraseñaFuerte9876.Z.";        // Tu contraseña real

header('Content-Type: application/json; charset=utf-8');

// Conecta a la base
$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Error de conexión"]);
    exit;
}

// Consulta el top 10 (ajusta el nombre de la tabla si es necesario)
$sql = "SELECT nombre, score, fecha FROM tabla_scores ORDER BY score DESC, fecha ASC LIMIT 10";
$result = $conn->query($sql);

$ranking = [];
if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $ranking[] = $row;
    }
}
echo json_encode($ranking);

$conn->close();
?>
