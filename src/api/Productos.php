<?php
include ("Conexion.php");

class Productos extends Conexion {
    public function mostrarProductos(){
        $BFetch =$this ->conectaDB()->prepare("SELECT pro_iId, DesIte FROM productos");

        $BFetch->execute();

        $J=[];
        $I = 0;

        while($Fetch=$BFetch->fetch(PDO::FETCH_ASSOC)){
            $J[$I]=[
                "id"=>$Fetch['pro_iId'],
                "descripcion"=>$Fetch['DesIte']
            ];
            $I++;

        }

        header('Access-Control-Allow-Origin:*');
        header("Content-Type:application/json");
        echo json_encode($J, JSON_UNESCAPED_UNICODE);
    }
}

?>
