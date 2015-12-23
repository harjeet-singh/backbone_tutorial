<?php
session_start();
require_once 'API.php';
require_once 'includes/MyDB.php';
require 'include.php';
class MyAPI extends API
{
    var $allowed_endpoints = array(
        'get_token',
        'login',
        'logout'
    );
    
    public function __construct($request, $origin) {
        parent::__construct($request);
        
        //Check if token present in the header
        if (!array_key_exists('Token', $this->headers) && !in_array($request, $this->allowed_endpoints)) {
            throw new Exception('No API Token provided');
        }
        
        //Authenticate Token
        if(!in_array($this->headers['Token'], $_SESSION) && !in_array($request, $this->allowed_endpoints)){
            throw new Exception('Expired or Invalid API Token');
        }
    }

    /**
     * Example of an Endpoint
     */
     protected function users() {
         
        if ($this->method == 'GET') {
            $User = new User();
            if(!empty($this->verb)){
                return $User->retreive($this->verb);
            }else{
                return $User->get_user_list();
            }
            
        }
        else if($this->method == 'POST') {
            
            $User = new User();
            $User->first_name = $this->payload->first_name;
            $User->last_name = $this->payload->last_name;
            $User->user_name = $this->payload->user_name;
            $this->payload->id = $User->save();
            
            return $this->payload;
        }
        else if($this->method == 'PUT') {
            writelog('$this->payload');
            writelog($this->payload);
            if(!empty($this->verb)){
                
                $User = new User();
                $User->id = $this->verb;
                $User->first_name = $this->payload->first_name;
                $User->last_name = $this->payload->last_name;
                $User->user_name = $this->payload->user_name;
                $this->payload->id = $User->save();
                return  $this->payload;
            }
        }
        else if($this->method == 'DELETE') {
            if(!empty($this->verb)){
                
                $User = new User();
                $User->id = $this->verb;
                $User->delete();
                return  $this->payload;
            }
        }
     }
     
     protected function login() {
         try{
             if ($this->method == 'POST') {
            $username = $this->request['username'];
            $password = $this->request['password'];
            
                if(isset($username) && isset($password)){

                    if(isset($_SESSION[$username])){
                        return $_SESSION[$username];
                    }
                    else{
                        $user_authenticated = MyDB::getInstance()->authenticateUser($username, $password);
                        if($user_authenticated){
                            //$this->User->loadUser($username, $password);
                            $_SESSION[$username] = uniqid();
                            return $_SESSION[$username];
                        }
                        else{
                            throw new Exception('Invalid user credentials');
                        }
                    }
                }
                else{
                    throw new Exception('Missing username or password');
                }

            } else {
                throw new Exception('Wrong request type');
            }
        }
        catch(Exception $e){
            header( '401 Not Authorized' );
            return $e->getMessage();
        }
   }
   
   protected function logout() {
       session_destroy();
       return true;
     }
 }


