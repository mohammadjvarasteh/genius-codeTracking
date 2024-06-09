<?php 

add_action('admin_menu', function($actions) {
    add_menu_page(
        'Set code Tracking',
        'بارگذاری کد رهگیری',
        'manage_options',
        'My_Set_Code_tracking',
        'setCodeTrackingMenuHandler'
    );
});


function setCodeTrackingMenuHandler()
{

    
$order_id = 231; // شماره سفارش ووکامرس

$billing_first_name = get_post_meta($order_id, '_billing_first_name', true);
$billing_last_name = get_post_meta($order_id, '_billing_last_name', true);

if (!empty($billing_first_name) && !empty($billing_last_name)) {
    $customer_name = $billing_first_name . ' ' . $billing_last_name;
    echo 'نام مشتری: ' . $customer_name;
} else {
    echo 'نام مشتری یافت نشد.';
}


    wp_register_style('setCodeTracking-plugin-style-bootstrap',setCodeTracking_plugin_url . 'assets/css/bootstrap.css'  );
    wp_register_style('setCodeTracking-plugin-style',setCodeTracking_plugin_url . 'assets/css/style.css'  );
    require_once setCodeTracking_plugin . '/view/main.php';
    wp_register_script('setCodeTracking-plugin-script',setCodeTracking_plugin_url . 'assets/js/script.js');
    require_once setCodeTracking_plugin . '/view/loading.php';
    require_once setCodeTracking_plugin . '/view/popup.php';
    wp_register_script('setCodeTracking-plugin-script-excel',setCodeTracking_plugin_url . 'assets/js/xlsx.full.min.js');
}


function setCodeTracking_plugin_add_assets()
{
    wp_enqueue_style('setCodeTracking-plugin-style');
    wp_enqueue_style('setCodeTracking-plugin-style-bootstrap');
    wp_enqueue_script('setCodeTracking-plugin-script');
    wp_enqueue_script('setCodeTracking-plugin-script-excel');
}

add_action('admin_enqueue_scripts', 'setCodeTracking_plugin_add_assets');