<?php


class geniusCodeTracking_AjaxController
{
    static $instance = null;
    private $status = true;
    private $message = '';
    private $data = [];
    public static function getInstance()
    {
        if(self::$instance == null )
        {
            self::$instance = new self();
        }
        
        return self::$instance;
    }
    public static function init()  
    {
        $instance = self::getInstance();
        add_action('wp_ajax_genius_codeTracking',[$instance,'handler']);
    }

    public function handler()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $this->tokenValidation();
        $this->sendResponse();
    }

    private function sendResponse()
    {
        $response = [
            'status'  => $this->status,
            'message' => $this->message,
            'data'    => $this->data
        ];
        $this->setDefaultResponse();

        wp_send_json($response);
    }


    private function setDefaultResponse()
    {
        $this->message = '';
        $this->status = true;
        $this->data   = [];
    }

    private function tokenValidation()
    {
        if ( isset( $this->data['security'] ) && wp_verify_nonce( $this->data['security'], 'my_didar_plugin_ajax_nonce' ) )
        {
            $this->status = true ;
            return true;
        }
        $this->status = false;
        $this->message = 'Invalid security token';
        return false;
    }


}





geniusCodeTracking_AjaxController::init();