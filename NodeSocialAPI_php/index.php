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

?>