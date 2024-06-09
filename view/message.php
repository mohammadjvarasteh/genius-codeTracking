<style>
.geniusCodeTracking_message{
    position: fixed;
    top: 50%; /* المنت را در مرکز عمودی صفحه قرار می‌دهد */
    left: 50%; /* المنت را در مرکز افقی صفحه قرار می‌دهد */
    transform: translate(-50%, -50%); /* المنت را بر اساس مرکز خود تراز می‌کند */
    width: 400px;
    padding-bottom: 15px;
    display: block;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 10px;
    background-color: white;
    z-index: 999999999999999999999;
}

    .geniusCodeTracking_message_icon_box {
        height: 32.5%;
        text-align: center;
        padding-top: 10px;
    }
    .geniusCodeTracking_message_icon_box span 
    {

        padding-top: 10px;
        padding-bottom: 10px;
        width: 50px;
        height: 30px;
        margin-bottom: 20px;
        text-align: center;
        border-radius: 100%;
        font-size: 35px;
        background-color: red;
        color: white;
    }
    .geniusCodeTracking_message_icon_box p
    {
        font-size: 20px;
        font-weight: bold;
    }
    .geniusCodeTracking_messageBox
    {
        text-align: center;
    }
    .geniusCodeTracking_message_operator
    {
        height: 32.5%;
        margin-top: 10px;
        text-align: center;
    }
    .geniusCodeTracking_message_operator button
    {
        margin-top: 20px;
        position: relative;
        padding: 10px 30px;
        outline: none;
        border: none;
        text-decoration: none;
        color: white;
        cursor: pointer;
        font-size: 14px;
        border-radius: 8px;
        cursor: pointer;
    }
    .geniusCodeTracking_message_operator button:hover
    {
        background-color: #363636;
    }
</style>


<div id="geniusCodeTracking_message" class="geniusCodeTracking_message  ">
    <div class="geniusCodeTracking_message_icon_box">
        <span class="dashicons dashicons-no"></span>
        <p id="geniusCodeTracking_message_header" >هشدار</p>
    </div>
    <div id="geniusCodeTracking_messageBox" class="geniusCodeTracking_messageBox" >
    </div>
    <div class="geniusCodeTracking_message_operator" >
        <button id="geniusCodeTracking_message_operator_accept" class="btn btn-primary" >تایید</button>
    </div>
</div>

