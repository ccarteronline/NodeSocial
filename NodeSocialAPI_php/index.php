<?
	header('Access-Control-Allow-Origin: *');
	header('Access-Control-Allow-Methods: GET, POST'); 
	
	error_reporting(-1);
	ini_set('display_errors', 'On');
	
	require('includes/connect.php');
	
	
	if (isset($_GET['barebones'])) {
		$bb = new bareBones('barebones');
	} else if (isset($_GET['tasks'])) {
		$bb = new bareBones('tasks');
	}

/*
	$bareBones = array('mainTitle' => 'Node Social', 'appVersion' => '0.0.1', 
		'tasks' => array('-Front end( );', '-Back end( );', '-EyeFaceDB( );', '-Zeta HD_2( );'),
		'description' => '-This is going to be the front end portion that will GET and POST data.');

	echo json_encode($bareBones);
*/

?>