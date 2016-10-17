'use strict';

/* App Module */

var app = angular.module('app', [
    'ui.bootstrap',
    'services',
    'constants',
    'ngResource',
    //'ngGrid',
    //'ui.timepicker',
    'ngTouch',
    'ui.grid',
    'ui.grid.selection',
    'ui.grid.resizeColumns'
]);


//application's top level Controller.
app.controller('AppCtrl', function ($scope,$q) {
 var EXAMPLE_JSON = JSON.stringify({
     currentPosit:
     {
         entityName:"FOOBAR",
         posit:
         {
             latitude:18.239147222222222,
             longitude:109.49524722222222,
             dateTime:"2015-12-23T05:45:12.000Z"
         },
         trackId:"SAV888888888",
         s2aTrackId:"SAV888888888"
     },
     trackPosits:
     [
         {
             latitude:17.486816666666666,
             longitude:109.18371944444445,
             dateTime:"2015-12-23T00:05:12.000Z"
         },
         {
             latitude:17.699808333333333,
             longitude:109.17404722222223,
             dateTime:"2015-12-23T01:45:12.000Z"
         },
         {
             latitude:17.922272222222222,
             longitude:109.10767777777778,
             dateTime:"2015-12-23T02:45:12.000Z"
         },
         {
             latitude:18.100483333333333,
             longitude:109.08997222222222,
             dateTime:"2015-12-23T03:45:12.000Z"
         },
         {
             latitude:18.243986111111113,
             longitude:109.07828888888889,
             dateTime:"2015-12-23T04:45:12.000Z"
         },
         {
             latitude:18.239147222222222,
             longitude:109.49524722222222,
             dateTime:"2015-12-23T05:45:12.000Z"
         }
     ]});
 
        console.log("In app ctrl");
        $scope.jsonObjArrayConcurrently = [];
        $scope.jsonObjArraySequentially = [];
        $scope.jsonObjTestArray = [];
        $scope.sequentialFinished = false;
        $scope.disableAmicaTest = false;
        $scope.selectedTest = {};
        $scope.gridApi;
        $scope.gridData = [
            {
                applicationName: "AMICA Concurrency Tests",
                verification: "Not run"
            }
        ];
        
        var counter = 0;
        $scope.check = 0;
        
        $scope.forecast = function(){
            console.log("In button");
            $scope.disableAmicaTest = true;
            createRequestSequentially();
            
            $scope.$watch('sequentialFinished', function(newValue, oldValue) {
                
                if(newValue === true){
                   //For producing ten concurrent tracks.
                    for(var i =0; i < 10; i++){
                        createRequestConcurrently();
                    } 
                }
            });
        };
        
        var createRequestSequentially = function(){
            
            var wait = function() {
                var deferred = $q.defer();
                var jsonObj = {};
                var client = new XMLHttpRequest();

                client.open('POST', 'http://sava-nti-core-dev:8080/amica-resource/rest/amica/forecast');
                client.setRequestHeader('Content-Type', 'application/json');
                client.withCredentials = true;
                client.onreadystatechange = function() {
                    if(client.readyState === 4){
                        var url = client.responseText;
                        var client2 = new XMLHttpRequest();
                        client2.open('GET', url);

                        client2.onreadystatechange = function(){
                            if(client2.readyState === 4){
                                jsonObj = JSON.parse(client2.responseText);
                                console.log('Sequential add: ' + counter);
                                counter++;
                                $scope.jsonObjArraySequentially.push(jsonObj);
                                deferred.resolve();
                            }
                        };
                        client2.send();
                    }
                };
                client.send(EXAMPLE_JSON); 

                return deferred.promise;
      	   };
  		 
      	   wait($scope.selected)
      	   .then(function() {
                $scope.check ++;
                if($scope.check < 10)
                    createRequestSequentially();
                else
                    $scope.sequentialFinished = true;
   			 
      	   })
      	   ["catch"](function() {
      		 
      	   });
        };
        
        var createRequestConcurrently = function(){
            var jsonObj = {};
            var client = new XMLHttpRequest();
            
            client.open('POST', 'http://sava-nti-core-dev:8080/amica-resource/rest/amica/forecast');
            client.setRequestHeader('Content-Type', 'application/json');
            client.withCredentials = true;
            client.onreadystatechange = function() {
                if(client.readyState === 4){
                    var url = client.responseText;
                    var client2 = new XMLHttpRequest();
                    client2.open('GET', url);
                    
                    client2.onreadystatechange = function(){
                        if(client2.readyState === 4){
                            jsonObj = JSON.parse(client2.responseText);
                            console.log('Concurrent add: ' + counter);
                            counter++;
                            $scope.jsonObjArrayConcurrently.push(jsonObj);
                            if(counter>19)
                            {
                                compareResults();
                            }
                        }
                    };
                    client2.send();
                }
            };
            client.send(EXAMPLE_JSON); 
            
        };
       
       var compareResults = function(){
           for(var i=0;i<$scope.jsonObjArraySequentially.length;i++){
               for(var j=0;j<$scope.jsonObjArrayConcurrently.length;j++){
                   if($scope.jsonObjArraySequentially[i].callsign === $scope.jsonObjArrayConcurrently[j].callsign)
                   {
                       if($scope.jsonObjArraySequentially[i].shipname === $scope.jsonObjArrayConcurrently[j].shipname)
                       {
                           if($scope.jsonObjArraySequentially[i].branches[0].features.length === $scope.jsonObjArrayConcurrently[j].branches[0].features.length)
                           {
                               $scope.jsonObjTestArray.push($scope.jsonObjArraySequentially[i]);
                               break;
                           }
                       }
                   }
               }
           }
            $scope.$apply(function() {
                if($scope.jsonObjTestArray.length !== 10){
                     $scope.gridData[0].verification = "Failure";
                }else
                    $scope.gridData[0].verification = "Success";
                $scope.disableAmicaTest = false;
                $scope.jsonObjArraySequentially = [];
                $scope.jsonObjArrayConcurrently = [];
                $scope.jsonObjTestArray = [];
                counter = 0;
                $scope.check = 0;
            });
       };
       
        $scope.gridFindings = {
        data: 'gridData',    
//        enableRowSelection: true,
//        enableRowHeaderSelection: false,
//        multiSelect: false,
//        noUnselect: false,
//        selectedItems: $scope.selectedTest,
        enableColumnResize: true,
        columnDefs: [
            {field: 'applicationName', displayName: 'Test Types', width: '50%'},
            {field: 'runTests', displayName: 'Run Test', width: '15%', cellTemplate:'<button ng-disabled="grid.appScope.disableAmicaTest" ng-click="grid.appScope.forecast();">Run Test</button>', enableColumnMenu: false, cellClass: 'centerCell', enableSorting: false},
            {field: 'verification', displayName: 'Pass/Fail', width: '20%'},
            {field: 'viewResults', displayName: 'Test Results', width: '15%', cellTemplate:'<button id="amicaResults" ng-disabled = "true" ng-click="">View Results</button>', enableColumnMenu: false, cellClass: 'centerCell', enableSorting: false}
        ]
//        afterSelectionChange: function (data) {
//        	if (data.selected === true){
//        		$scope.selectedTest;
//        	}
//            }
        };
//       	$scope.gridFindings.onRegisterApi = function( gridApi ) {
//            $scope.gridApi = gridApi;
//            
//            $scope.gridApi.selection.on.rowSelectionChanged($scope,function(row){
//             var msg = 'row selected ' + row.isSelected;
//             $scope.selectedTest = row.entity;
//            });
//        };
       	   
});

