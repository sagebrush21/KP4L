        var db_server   = "sql.wpc-is.online";  // mySQL server
        var db_username = "jrcopel1";               // login name
        var db_password = "jrco3757";       // login password
        var db_table    = "db_test_jrcopel1";       // database to use
        var insertStmt;
        var queryStmt  = "select * from db_test_jrcopel1.Request;"


var MySql = {
    _internalCallback : function() { console.log("Callback not set")},
    Execute: function (Host, Username, Password, Database, Sql, Callback) {
        MySql._internalCallback = Callback;
        // to-do: change localhost: to mysqljs.com
        var strSrc = "http://mysqljs.com/sql.aspx?";
        strSrc += "Host=" + Host;
        strSrc += "&Username=" + Username;
        strSrc += "&Password=" + Password;
        strSrc += "&Database=" + Database;
        strSrc += "&sql=" + Sql;
        strSrc += "&Callback=MySql._internalCallback";
        var sqlScript = document.createElement('script');
        sqlScript.setAttribute('src', strSrc);
        document.head.appendChild(sqlScript);
    }
};

function getDataCopy(){

    var room = document.getElementById("room").value;
    var building = document.getElementById("building").value;
    var asurite = document.getElementById("asurite").value;

    var hot; 
    var cold;

    if(document.getElementById("radio1").checked){
        hot = "1";
    }
    else{
        hot = "0";
    }
    
    if(document.getElementById("radio2").checked){
        cold = "1";
    }
    else{
        cold ="0";
    }


    console.log(room, building, asurite, hot, cold);

    insertStmt = "insert into db_test_jrcopel1.Request(Asurite, Building, RoomNumber, TooHot, TooCold) values ('" + asurite +"','" + building + "', '" + room +"','"+hot+"','"+cold+"');";

    console.log(insertStmt);

    insertStatement();
}

        
    function pullData() {
        MySql.Execute(
            db_server, db_username, db_password, db_table, queryStmt,
            function(data){
                console.log("step1");
                console.log(data);
                if (!data.Success) {
                    alert(data.Error)
                } else {
                    var myString = JSON.stringify(data.Result, null, 2);
                    console.log(myString);

                }
            }
        );
    }

    function insertStatement() {
        MySql.Execute(
            db_server, db_username, db_password, db_table,
            insertStmt,                     // SQL query string
            function(data){
                console.log("step2");
                console.log(data);
                if (!data.Success) {
                    if (data.Error == 'Cannot find table 0.') {
                        // we call it true anyway - see comments at top
                        // and enable the next step
                        step2Success.innerHTML='false, but we consider true anyway';
                        buttonStep3.disabled=false;
                    } else // some other error like incorrect insert statement
                        alert(data.Error)
                } else {
                    alert(data.Success);
                }
            }

        );
        pullData();
    }

    
 
    
