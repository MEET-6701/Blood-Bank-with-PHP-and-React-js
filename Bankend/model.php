<?php
class Model{
    public $conn="";
    function __construct(){
        $this->conn=new mysqli('localhost','root','','blood_bank');
        if ($this->conn->connect_error) {
            die("Connection failed: " . $this->conn->connect_error);
        }
    }

    function select($tbl){
        $sql="select * from $tbl";
        $result=$this->conn->query($sql);
        if ($result === false) {
            echo "Error: " . $this->conn->error;
            return null;
        }
        return $result;
    }
    function insert($data){
        $result=$this->conn->query($data);
        if ($result === false) {
            echo "Error: " . $this->conn->error;
            return NULL;
        }
        return $result;
    }

    function update($data){
        $result=$this->conn->query($data);
        if ($result === false) {
            echo "Error: " . $this->conn->error;
            return NULL;
        }
        return $result;
    }

    function select_where($tbl,$where, $which){
        $sql="select * from $tbl where $which = '$where'";
        $result=$this->conn->query($sql);
        if ($result === false) {
            echo "Error: " . $this->conn->error;
            return null;
        }
        return $result;
    }
}

$obj = new Model;

?>