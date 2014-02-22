<?php 
/*
Plugin Name: WP Mobile Detect
Version: 1.2.0
Plugin URI: http://jes.se.com/wp-mobile-detect
Description: A WordPress plugin based on the PHP Mobile Detect class (Original author Victor Stanciu now maintained by Serban Ghita) incorporates functions and shortcodes to empower User Admins to have better control of when content is served
Author: Jesse Friedman 
Author URI: http://jes.se.com
License: GPL v3

WP Mobile Detect
Copyright (C) 2012, Jesse Friedman - http://jes.se.com

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/



/********************************************//**
* PHP Mobile Detect class used to detect browser or device type
***********************************************/
require_once('mobile-detect.php');

$detect = new Mobile_Detect();



/********************************************//**
* Generates [notmobile][/notmobile] shortcode which shows content on desktops or tablets
***********************************************/
function wpmd_notphone( $tats, $content="" ) {
	global $detect;
	if( ! $detect->isMobile() || $detect->isTablet() ) return do_shortcode($content);
}
add_shortcode( 'notphone', 'wpmd_notphone' );



/********************************************//**
* Returns true when on desktops or tablets
***********************************************/
function wpmd_is_notphone() {
	global $detect;
	if( ! $detect->isMobile() || $detect->isTablet() ) return true;
}



/********************************************//**
* Generates [nottab][/nottab] shortcode which shows content on desktops or phones
***********************************************/
function wpmd_nottab( $tats, $content="" ) {
	global $detect;
	if( ! $detect->isTablet() ) return do_shortcode($content);
}
add_shortcode( 'nottab', 'wpmd_nottab' );



/********************************************//**
* Returns true when on desktops or phones
***********************************************/
function wpmd_is_nottab() {
	global $detect;
	if( ! $detect->isTablet() ) return true;
}



/********************************************//**
* Generates [notdevice][/notdevice] shortcode which shows content on desktops only
***********************************************/
function wpmd_notdevice( $tats, $content="" ) {
	global $detect;
	if( ! $detect->isMobile() && ! $detect->isTablet() ) return do_shortcode($content);
}
add_shortcode( 'notdevice', 'wpmd_notdevice' );



/********************************************//**
* Returns true when on desktops only
***********************************************/
function wpmd_is_notdevice() {
	global $detect;
	if( ! $detect->isMobile() && ! $detect->isTablet() ) return true;
}



/********************************************//**
* Generates [phone][/phone] shortcode which shows content on phones ONLY
***********************************************/
function wpmd_phone( $tats, $content="" ) {
	global $detect;
	if( $detect->isMobile() && ! $detect->isTablet() ) return do_shortcode($content);
}
add_shortcode( 'phone', 'wpmd_phone' );



/********************************************//**
* Returns true when on phones ONLY
***********************************************/
function wpmd_is_phone() {
	global $detect;
	if( $detect->isMobile() && ! $detect->isTablet() ) return true;
}



/********************************************//**
* Generates [tablet][/tablet] shortcode which shows content on Tablets ONLY
***********************************************/
function wpmd_tablet( $tats, $content="" ) {
	global $detect;
	if( $detect->isTablet() ) return do_shortcode($content);
}
add_shortcode( 'tablet', 'wpmd_tablet' );

/********************************************//**
* WARNING: This is deprecated. Conflicts with the [tab] shortcode changed to [tablet] Generates [tab][/tab] shortcode which shows content on Tablets ONLY
***********************************************/
function wpmd_tab( $tats, $content="" ) {
	global $detect;
	if( $detect->isTablet() ) return do_shortcode($content);
}
add_shortcode( 'tab', 'wpmd_tab' );



/********************************************//**
* Returns true when on Tablets ONLY
***********************************************/
function wpmd_is_tablet() {
	global $detect;
	if( $detect->isTablet() ) return true;
}



/********************************************//**
* Generates [device][/device] shortcode which shows content on phones or tablets but NOT destkop
***********************************************/
function wpmd_device( $tats, $content="" ) {
	global $detect;
	if( $detect->isMobile() || $detect->isTablet() ) return do_shortcode($content);
}
add_shortcode( 'device', 'wpmd_device' );



/********************************************//**
* Returns true when on phones or tablets but NOT destkop
***********************************************/
function wpmd_is_device() {
	global $detect;
	if( $detect->isMobile() || $detect->isTablet() ) return true;
}



/********************************************//**
* Generates [ios][/ios] shortcode which shows content on iOS devices only
***********************************************/
function wpmd_ios( $tats, $content="" ) {
	global $detect;
	if( $detect->isiOS() ) return do_shortcode($content);
}
add_shortcode( 'ios', 'wpmd_ios' );



/********************************************//**
* Returns true when on iOS
***********************************************/
function wpmd_is_ios() {
	global $detect;
	if( $detect->isiOS() ) return true;
}



/********************************************//**
* Generates [iPhone][/iPhone] shortcode which shows content on iPhone's only
***********************************************/
function wpmd_iphone( $tats, $content="" ) {
	global $detect;
	if( $detect->isiPhone() ) return do_shortcode($content);
}
add_shortcode( 'iPhone', 'wpmd_iphone' );



/********************************************//**
* Returns true when on iPhone
***********************************************/
function wpmd_is_iphone() {
	global $detect;
	if( $detect->isiPhone() ) return true;
}



/********************************************//**
* Generates [iPad][/iPad] shortcode which shows content on iPad's only
***********************************************/
function wpmd_ipad( $tats, $content="" ) {
	global $detect;
	if( $detect->isiPad() ) return do_shortcode($content);
}
add_shortcode( 'iPad', 'wpmd_ipad' );



/********************************************//**
* Returns true when on iPad
***********************************************/
function wpmd_is_ipad() {
	global $detect;
	if( $detect->isiPad() ) return true;
}



/********************************************//**
* Generates [android][/android] shortcode which shows content on Android devices only
***********************************************/
function wpmd_android( $tats, $content="" ) {
	global $detect;
	if( $detect->isAndroidOS() ) return do_shortcode($content);
}
add_shortcode( 'android', 'wpmd_android' );



/********************************************//**
* Returns true when on Android OS
***********************************************/
function wpmd_is_android() {
	global $detect;
	if( $detect->isAndroidOS() ) return true;
}



/********************************************//**
* Generates [windowsmobile][/windowsmobile] shortcode which shows content on Windows Mobile devices only
***********************************************/
function wpmd_windows_mobile( $tats, $content="" ) {
	global $detect;
	if( $detect->isWindowsMobileOS() ) return do_shortcode($content);
}
add_shortcode( 'windowsmobile', 'wpmd_windows_mobile' );



/********************************************//**
* Returns true when on Android OS
***********************************************/
function wpmd_is_windows_mobile() {
	global $detect;
	if( $detect->isWindowsMobileOS() ) return true;
}