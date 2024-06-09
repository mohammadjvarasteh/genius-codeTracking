<?php
/**
 * Plugin Name: Set Code Tracking  (test version)
 * Plugin URI:
 * Description: Set Code Tracking
 * Author: Mohammad varasteh
 * Author URI:
 * Version: 1.1
 * License: GPLv2 or later
 */

define('setCodeTracking_plugin', __DIR__ );
define('setCodeTracking_plugin_url', plugin_dir_url(__FILE__) );

require_once setCodeTracking_plugin . '/inc/codeTracking_Controller.php';
require_once setCodeTracking_plugin . '/inc/codeTracking_menu.php';
