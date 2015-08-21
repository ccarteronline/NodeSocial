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
/*
			$this->connectToDB();
			
			$getBareBonesItem = mysqli_query($this->connectToDB(), 'SELECT * FROM barebones');
			$rows = array();
			while ($d = mysqli_fetch_assoc($getBareBonesItem)) {
				$rows[] = $d;
			}
						
			$tasks = mysqli_query($this->connectToDB(), 'SELECT * FROM tasks');
			$tows = array();
			while ($r = mysqli_fetch_assoc($tasks)) {
				$tows[] = $r;
			}
			$newObj = json_encode($tows);
			//$tows = json_encode($tows);
			$rows[] = $newObj;
			//echo json_encode($rows);
*/
		}
		private function getItems ($getType) {
			$this->connectToDB();
			
			$getBareBonesItem = mysqli_query($this->connectToDB(), 'SELECT * FROM '.$getType);
			$rows = array();
			while ($d = mysqli_fetch_assoc($getBareBonesItem)) {
				$rows[] = $d;
			}
			
			echo json_encode($rows, JSON_PRETTY_PRINT);
		}
	}
?>