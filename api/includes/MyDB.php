<?php

class MyDB extends mysqli{
    private static $instance = null;
    
    private $user = 'root';
    private $pass = 'root';
    private $dbName = 'backbone_tutorial';
    private $dbHost = 'localhost';
 
    public static function getInstance() {
        if(!self::$instance instanceof self){
            self::$instance = new self;
        }
        return self::$instance;
    }
    
    public function __clone() {
        trigger_error('Clone is not allowed '.E_USER_ERROR);
    }
    
    public function __wakeup() {
        trigger_error('Deserializing is not allowed '.E_USER_ERROR);
    }
    
    private function __construct() {
        parent::__construct($this->dbHost, $this->user, $this->pass, $this->dbName);
        if(mysqli_connect_error()){
            exit('Connection Error ('.mysqli_connect_errno().') '.mysqli_connect_error());
        }
        parent::set_charset('utf-8');
    }
    
    public function authenticateUser($username, $password) {
        
        $username = $this->real_escape_string($username);
        $password = $this->real_escape_string($password);
        $password_md5 = md5($password);
        
        $queryStr = "select id from users where user_name = '$username' and password= '$password_md5'";
        $user = $this->query($queryStr);
        if($user->num_rows > 0 ){
            $row = $user->fetch_row();
            return true;
        }else{
            return false;
        }
    }
    
    function save($bean){
        
        $id = $bean->id;
        if(!empty($bean->id)){
            $is_update = true;
            
        }
        else{
            $is_update = false;
        }
        
        
        if($is_update){
            $query = "UPDATE " . $bean->table . " SET";
            $sep = ' ';
            foreach ($bean->fields as $field) {
                if($field == 'id') continue;
                $query .= $sep . $field . '="' . $bean->$field.'"';
                $sep = ', ';
            }
            $query .= " WHERE id = '$id'";
            
        }
        else{
            
            $bean->id = uniqid();
            $fields = ' ('.implode(", ", $bean->fields).' ) ';
            $query = "INSERT INTO " . $bean->table . $fields ." VALUES ";
            $sep = ' ( ';
            foreach ($bean->fields as $field) {
               $query .= $sep ."'" . $bean->$field . "'" ;
                $sep = ', ';
            }
            $query .= ' ) ';
        }
        //writelog($query);
        $result = $this->query($query);
        return $result;
    }
    
    function delete($bean){
        $query = "DELETE FROM $bean->table WHERE id = '$bean->id'";
        $result = $this->query($query);
        return $result;
    }
    
}
