<?php
//include ("Conexion.php");
header('Access-Control-Allow-Origin:*');
//$descripcion = $_POST['descripcion'];

$descripcion = $_POST['descripcion'];
$orden = $_POST['orden'];
$cantidad = $_POST['cantidad'];
$fecha = date('Y/m/d');

$link = new PDO("mysql:host=localhost;dbname=tiaapp", "root", "");
$pdoQuery="insert into productosbalde(DesIte,Orden,Cantidad,FecEmi) 
values (:descripcion, :orden, :cantidad, :fecha)";
$pdoResult = $link->prepare($pdoQuery);
$pdoExec = $pdoResult->execute([
    ":descripcion"=>$descripcion,
    ":orden"=>$orden,
    ":cantidad"=>$cantidad,
    ":fecha"=>$fecha
    ]);


    echo json_encode('correcto: '.$descripcion.' orden: '.$orden. 'cantidad: '.$cantidad);



?>