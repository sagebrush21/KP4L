"use strict";


// finds the temperature based on room 
function getTemp(room){
	MySql.Execute(
				"sql.wpc-is.online",	// mySQL server
				"jrcopel1", 			// login name
				"jrco3757", 			// login password
				"db_test_jrcopel1", 	// database to use
										// SQL query string:
				"SELECT 											\
					RoomTemp 										\
				 FROM 												\
					Rooms 											\
				 WHERE 												\
					RoomNumber = " + room + " 	\ ",
		        function (data) {
		        	processQueryResult(data);
		    	}
		    );
}

function processQueryResult(dataReturned){
	let temp = 0;

	if (!dataReturned.success)
		alert(dataReturned.error);
	else {
		temp = dataReturned.Result[0];
	}
}