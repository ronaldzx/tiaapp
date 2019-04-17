<?php
abstract class Conexion{
    protected function conectaDB(){
        try{
            $Con=new PDO("mysql:host=localhost;dbname=tiaapp","root","");
            $Con->query("SET NAMES UTF8");
            $Con->query("SET CHARACTER SET utf8");
            return $Con;
        }catch (PDOException $Erro){
            echo $Erro->getMessage();
        }

    }
}

?>