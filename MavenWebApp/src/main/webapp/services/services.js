'use strict';

var services = angular.module('services', []);

services.factory('restQuery', function($http) {
    return {
        forecast: function(trackJson){
        	return $http({
            	url: 'https://sava-nti-core-dev:8080/amica-resource/rest/amica/forecast',
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
                data:JSON.stringify(trackJson)
            });
        },
        forecastRun: function(){
        	return $http({
            	url: 'https://sava-nti-core-dev:8080/amica-resource/rest/amica/run',
                method: 'GET'
            });
        }
    };
});
//services.factory('dataServices', function ($resource) {
//    return $resource('https://localhost:8080/amica-resource/rest',{},
//	    {
//	    	forecast : {
//	    		url: 'https://localhost:8080/amica-resource/rest/amica/forecast',
//	    		method: 'POST',
// 	    		isArray: true
//	    	},
//	    } 
//    );
//});



