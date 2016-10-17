'use strict';


var localhost = '';

/* Controllers */
var mainController = angular.module('mainCtrl', []);
mainController.controller('mainCtrl', ['$scope','$window' ,'dataServices','restQuery',
    function mainCtrl ($scope,$window,dataServices,restQuery) {
        
        var EXAMPLE_JSON = "{\n" +
"    \"currentPosit\":{\n" +
"        \"entityName\":\"FOOBAR\",\n" +
"        \"posit\":{\n" +
"            \"latitude\":18.239147222222222,\n" +
"            \"longitude\":109.49524722222222,\n" +
"            \"dateTime\":\"2015-12-23T05:45:12.000Z\"\n" +
"        },\n" +
"        \"trackId\":\"SAV888888888\",\n" +
"        \"s2aTrackId\":\"SAV888888888\"\n" +
"    },\n" +
"    \"trackPosits\":[\n" +
"        {\n" +
"            \"latitude\":17.486816666666666,\n" +
"            \"longitude\":109.18371944444445,\n" +
"            \"dateTime\":\"2015-12-23T00:05:12.000Z\"\n" +
"        },\n" +
"        {\n" +
"            \"latitude\":17.699808333333333,\n" +
"            \"longitude\":109.17404722222223,\n" +
"            \"dateTime\":\"2015-12-23T01:45:12.000Z\"\n" +
"        },\n" +
"        {\n" +
"            \"latitude\":17.922272222222222,\n" +
"            \"longitude\":109.10767777777778,\n" +
"            \"dateTime\":\"2015-12-23T02:45:12.000Z\"\n" +
"        },\n" +
"        {\n" +
"            \"latitude\":18.100483333333333,\n" +
"            \"longitude\":109.08997222222222,\n" +
"            \"dateTime\":\"2015-12-23T03:45:12.000Z\"\n" +
"        },\n" +
"        {\n" +
"            \"latitude\":18.243986111111113,\n" +
"            \"longitude\":109.07828888888889,\n" +
"            \"dateTime\":\"2015-12-23T04:45:12.000Z\"\n" +
"        },\n" +
"        {\n" +
"            \"latitude\":18.239147222222222,\n" +
"            \"longitude\":109.49524722222222,\n" +
"            \"dateTime\":\"2015-12-23T05:45:12.000Z\"\n" +
"        }\n" +
"    ]\n" +
"} ";
        
        $scope.forecast = function(){
            $scope.json = restQuery.forecast(EXAMPLE_JSON, function(data){
                console.log(data);
            });
        };
        
    }]);
//complianceController.controller('summaryCtrl', ['$scope','$window' ,'dataServices','restQuery', '$timeout','$rootScope','CCMASCAN', 'CCMAREPORTS',
//    function summaryCtrl ($scope,$window,dataServices,restQuery, $timeout, $rootScope, CCMASCAN, CCMAREPORTS) {
//	$scope.reports = [];
//	$scope.appClicked = "";
//	$scope.numApps = 0;
//	$scope.selectedApps = [];
//	
//	$scope.$on(CCMASCAN, function(event){
//		$scope.selectedApps.length = 0;
//		$scope.selectedReport.length = 0;
//		$scope.getSources();
//	})
//	
//	
//	$scope.$on(CCMAREPORTS, function(event) {
//		$scope.retrieveReports();
//	});
//	
//	$scope.getSources = function(){
//		$scope.data = dataServices.getComplianceSrc(function(data){
//			console.log(data);
//			$scope.numApps = data.length;
//			
//			$scope.data.sort(function(a,b){
//				var appIdA = a.appId.toLowerCase(), appIdB = b.appId.toLowerCase();
//				if(appIdA < appIdB)
//					return -1;
//				if(appIdA > appIdB)
//					return 1;
//				return 0;
//			});
//			
//			$scope.$broadcast(CCMAREPORTS);
//		});
//	}
//   
//    $scope.goToDiff = function(appName){
//    	$scope.name = appName;
//        setTimeout(function(){
//        	$("#pendTab").trigger( "click" );
//        	$("#pendTab").addClass("active");
//   	    },100);
//        
//        $scope.$watchCollection(
//    			function(){
//    				return $scope.reportsRetrieved;
//    		}, 
//    		function(newValue,oldValue) {
//    			if(newValue.length == $scope.numApps){
//    		    	for(var i = 0; i<$scope.reportsRetrieved.length; i++){
//    		    		if($scope.reportsRetrieved[i].diffReports == appName){
//    		    			$scope.gridDiffReports.selectRow(i, true);
//    		    			if(appName == "Command Relationships") $scope.appClicked = $scope.reportCrma;
//    		    			else if(appName == "Mission Preparedness") $scope.appClicked = $scope.reportMpaa;
//    		    			else if(appName == "Force Data Management") $scope.appClicked = $scope.reportFdma;
//    		    			
//    		    			$scope.findDiff();
//    		    			
//    		    			break;
//    		    		}
//    		    	}
//    		    }
//    	});
//    }
//    
//    $scope.findDiff = function(){
//    	if($scope.appClicked.numberOfIssues > 0){
//    		for(var i=0; i< $scope.appClicked.compliancyFindings.length; i++){
//    			if($scope.appClicked.compliancyFindings[i].severity != "OK"){
//    				var tab = "", type = "";
//    				if($scope.appClicked.compliancyFindings[i].baselineItem.extensionType == "AUTHENTICITY") {
//    					tab = "#authTab"; 
//    					type = $scope.appClicked.compliancyFindings[i].baselineItem.authType;
//    				}else if($scope.appClicked.compliancyFindings[i].baselineItem.extensionType == "CONFIGURATION"){
//    					tab = "#confTab";
//    				    type = $scope.appClicked.compliancyFindings[i].baselineItem.configType;
//    				}
//    				setTimeout(function(){
//						$(tab).trigger( "click" );
//		        	    $(tab).addClass("active");
//		        	},100);
//    				
//    				break;
//    			}
//    		}
//    	}else{
//    		setTimeout(function(){
//				$("#confTab").trigger( "click" );
//        	    $("#confTab").addClass("active");
//        	},100);
//    	}
//    }
//	
//	var applicationName = '<div class="ngCellText ng-scope"><a title="Click to show first difference in report." tooltip-append-to-body="true" tooltip-placement="top" ng-click="goToDiff(row.entity.applicationName)" ng-cell-text="" >{{row.getProperty(col.field)}}</a></div>';
//	
//	$scope.getSources();
//    $scope.gridSummary = {
//        data: 'data',     				
//        selectedItems: $scope.selectedApps,    		// When a selection is made, we store it in this variable.
//        multiSelect: true,  	
//        totalServerItems: 'numApps',
//        enableColumnResize: true,
//        columnDefs: [
//            {field: 'applicationName', displayName: 'Application', width: '249px',cellTemplate:applicationName},
//            {field: 'lastScan', displayName: 'Last Scan Date', width: '250px'},
//            {field: 'user', displayName: 'User', width: '250px'},
//            {field:'numberOfDiffs', displayName: 'Differences', width: '100px'},
//            {field:'healthStatus', displayName: 'Health', width: '100px', cellTemplate:'<img ng-if = "row.entity.healthStatus == \'UP\'" ng-src="media/images/green1_16.png" style="margin-left: 5%;">' + 
//   					'<img ng-if = "row.entity.healthStatus == \'DOWN\'" ng-src="media/images/red1_16.png" style="margin-left: 5%;">'+
//   					'<img ng-if = "row.entity.healthStatus == \'NO_REPORT\'" ng-src="media/images/grey_dot.png" style="margin-left: 5%;">'+
//   					'<img ng-if = "row.entity.lastHealthCheck == null" ng-src="media/images/grey_dot.png" style="margin-left: 5%;">'
//   					//'<div class="ngCellText ng-scope" ng-if = "row.entity.lastHealthCheck == null" style="margin-left: 5%;"><span ng-cell-text="">UNKNOWN</span></div>'
//   					}
//        ],
//        afterSelectionChange: function (data) {
//        	if (data.selected == true){
//        		$scope.selectedApps[0];
//        	}
//     }};
//    
////    $scope.$on('ngGridEventData', function(e, s) {
////            $scope.gridSummary.selectRow(0, true);
////        });
//    
//    ////////////////////////////////////////////////////
//    var layoutPlugin = new ngGridLayoutPlugin();
//	$scope.selectedReport = [];
//	$scope.reportsRetrieved = [];
//	
//	$scope.retrieveReports = function(){
//		
//		restQuery.getAllAssessments().success(function(data){
//			$scope.reportsRetrieved = [];
//			for(var i=0;i<data.length;i++){
//				if(data[i].applicationName.toLowerCase() == "mpaa"){
//					$scope.reportMpaa = data[i];
//			        $scope.reportsRetrieved.push({'diffReports': 'Mission Preparedness'});
//				}else if(data[i].applicationName.toLowerCase() == "crma"){
//					$scope.reportCrma = data[i];
//			        $scope.reportsRetrieved.push({'diffReports': 'Command Relationships'});
//				}else if(data[i].applicationName.toLowerCase() == "fdma"){
//					$scope.reportFdma = data[i];
//			        $scope.reportsRetrieved.push({'diffReports': 'Force Data Management'});
//				}
//			}
//			$scope.sortReports();
//			
//	    }).error(function(){console.log('Error retrieving reports.');});
//		
//	};
//	$scope.retrieveReports();
//	
//	$scope.sortReports = function(){
//		$scope.reportsRetrieved.sort(function(a,b){
//			var reportA = a.diffReports.toLowerCase(), reportB = b.diffReports.toLowerCase();
//			if(reportA < reportB)
//				return -1;
//			if(reportA > reportB)
//				return 1;
//			return 0;
//		});
//	}
//	
//	
//	
//    $scope.gridDiffReports = {
//        data: 'reportsRetrieved',     
//        selectedItems: $scope.selectedReport,    		// When a selection is made, we store it in this variable.
//        multiSelect: false,  	
//        totalServerItems: 'numApps',
//        enableColumnResize: true,
//        virtualizationThreshold:'200',
//        columnDefs: [
//            {field: 'diffReports', displayName: 'Diff Reports', width: '150px'}
//        ],
//        plugins: [layoutPlugin],
//        afterSelectionChange: function (data) {
//        	if (data.selected == true){
//        		$scope.selectedReport[0].diffReports;
//        	}
//         }
//    };
//    
//    $('#pendTab').click(function() {
//       setTimeout(function(){
//    	   layoutPlugin.updateGridLayout();
//  	   },100);
//    });
//    $('#confTab').click(function() {
//    	layoutPlugin.updateGridLayout();
//    });
//}]);


