<?php

function my_ajax_function() {
    // بررسی اطلاعات دریافت شده از درخواست AJAX
    $data = $_POST['data'];

    // انجام عملیات مورد نظر با داده دریافتی
    // مثال:
    $result =  [];
    foreach($data as $codes )
    {
       $name = '';
       $order = wc_get_order($codes['code']);
       if($order != false)
       {
          $name .= $order->get_billing_first_name();
          $name .= ' ';
          $name .= $order->get_billing_last_name();
       }

       $result[] = [
           'code' => $codes['code'],
           'codeTracking' => $codes['postCode'],
           'name' => $order == false ? 'سفارش پیدا نشد' : $name,
           'status' => false
       ];
    }

    wp_send_json([
        'success'=> true,
        'result'=> $result
    ]);

    // پایان اجرای عملیات
    wp_die();
}

add_action('wp_ajax_my_ajax', 'my_ajax_function');
//add_action('wp_ajax_nopriv_my_ajax', 'my_ajax_function');