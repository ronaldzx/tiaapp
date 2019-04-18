<?php
//include ("Conexion.php");
header('Access-Control-Allow-Origin:*');
header("Content-Type:application/json");
//$descripcion = $_POST['descripcion'];

$orden = $_POST['orden'];
try{
$conn = new PDO("mysql:host=localhost;dbname=tiaapp", "root", "");
$conn->query("SET NAMES UTF8");
$conn->query("SET CHARACTER SET utf8");
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$sql = $conn->prepare("SELECT DesIte as descripcion from productos where Orden = :orden");
$sql->execute(array('orden'=>$orden));
//$resultado = $sql->fetchAll();
$arreglo = $sql->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($arreglo);



}catch(PDOException $e){
    echo "ERROR: " . $e->getMessage();

}
    // $J=[];
    // $I = 0;

    // while($Fetch=$pdoExec->fetch(PDO::FETCH_ASSOC)){
    //     $J[$I]=[
    //         "orden"=>$Fetch['Orden']
    //     ];
    //     $I++;

    // }

    //echo json_encode('orden: '.$pdoExec);



?>