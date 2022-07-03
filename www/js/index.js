/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

var db;

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    /*console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready'); */

    //open the database
    db = window.sqlitePlugin.openDatabase (
       { name: 'students.db', location:'default'},
       function() {
           alert("DB Opened Successfully!");
       },
       function() {
           alert("DB Failed to open!");
       }
    );

    var link1 = crossroads.addRoute("/sqliteclick", function () {

    });

    //create a table
    db.transaction ( //code yang melebatkan apa2 command ngan database , so dalam eu leh letak CRUD
        function(tx) {
            var query="CREATE TABLE IF NOT EXISTS studentTbl (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT NOT NULL);";
            tx.executeSql( query, [],
                function(tx, result) {
                    alert("Table created Successfully!");//kalau berjaya create table
                },
                function(err) {
                    alert("error occured:"+err.code);//kalau tak berjaya 
                });         
    });


    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM studentTbl;', [],
            function (tx, results) {
                var len = results.row.length;

                if (len > 0) {//some data exists in table, do the process of displaying

                    htmlText = "";
                    for (i = 0; i < len; i++) {
                        htmlText = htmlText + "<tr><td>" + (i + 1) + "</td><td>" + results.rows.item(i).name +
                            "</td><td>" + results.rows.item(i).phone + "</td></tr>";
                    }
                    $('#tblStudent tbody').html(htmlText);
                } 
                $('#divStudentList').show();
                //what is written inside htmlText?
                    //All data from stduentTB table will we written in htmlText String variable.

            });

    });

}
