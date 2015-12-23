<?php
require_once 'includes/MyDB.php';
class User  {
    var $fields = array(
        'id',
        'first_name',
        'last_name',
        'user_name',
        'deleted',
    );
    var $db;
    var $table = 'users';
    
    function __construct(){
        $this->db = $GLOBALS['db'];
        $this->deleted = '0';
    }
    
    function get_user_list(){
        $queryStr = "select id, first_name, last_name, user_name from users where deleted = '0'";
        $result = $this->db->query($queryStr);
        //writelog($queryStr);
        $userList = array();
        if($result->num_rows > 0 ){
            while($row = $result->fetch_assoc()){
                $userList[] =  $row;
            }
            return $userList;
        }else{
            return null;
        }
    }
    
    function retreive($id){
        $queryStr = "select user_name, first_name, last_name from $this->table where deleted = '0' and id='$id'";
        $result = $this->db->query($queryStr);
        //writelog($queryStr);
        $userList = array();
        if($result->num_rows > 0 ){
            $row = $result->fetch_assoc();
            return $row;
        }else{
            return null;
        }
    }
    
    function save(){
        $result = $this->db->save($this);
        if($result){
            return $this->id;
        }
        else{
            return false;
        }
    }
    
    function delete(){
        $result = $this->db->delete($this);
        if($result){
            return true;
        }
        else{
            return false;
        }
    }
    
}