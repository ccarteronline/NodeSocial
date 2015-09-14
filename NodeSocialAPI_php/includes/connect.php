<?
	class dbConnect {
		//Connect to database
		public function connectToDB() {
			$host = 'localhost';
			$username = 'root';
			$password = 'root';
			$dbName = 'nodeSocial';
			//
			$connection = new mysqli($host, $username, $password, $dbName);
			if($connection){
				$myConnectionStatus = true;
				return $connection;				
			} else {
				die('Cant connect to Database!');
			}
			
		}
	}
	
	class bareBones extends dbConnect {
		public function bareBones ($getType) {
			
			if ($getType == 'barebones') {
				$this->getItems ($getType);
			} else if ($getType == 'tasks') {
				$this->getItems ($getType);
			}
		}
		private function getItems ($getType) {
			header('Content-type: application/json');
			$this->connectToDB();
			$getBareBonesItem = mysqli_query($this->connectToDB(), 'SELECT * FROM '.$getType);
			$rows = array();
			while ($d = mysqli_fetch_assoc($getBareBonesItem)) {
				$rows[] = $d;
			}
			
			if ($getType == 'barebones') {
				echo json_encode(array_values($rows)[0]);
			} else if ($getType == 'tasks') {
				echo json_encode($rows);
			}
			
		}
	}
?>