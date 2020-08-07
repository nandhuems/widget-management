
(function(angular) {
  'use strict';
  var myApp =  angular.module('app', ['ui.router', 'ui.bootstrap']);
  myApp.config(function($stateProvider, $urlRouterProvider) {
    // An array of state definitions
    var states = [
      {
        name: 'detail', 
        url: '/', 
        component: 'detail'
      },
      
      {
        name: 'detail.summary', 
        url: 'detail/{widgetId}', 
        component: 'summary'
      },
  
       
      { 
        name: 'edit', 
        url: '/edit', 
        component: 'edit' 
      },
  
      { 
        name: 'edit.view', 
        url: '/{widgetId}', 
        component: 'edit' 
      },
      
    ];
    
    // Loop over the state definitions and register them
    states.forEach(function(state) {
      $stateProvider.state(state);
    });
    $urlRouterProvider.otherwise('/');
  });
})(window.angular);

// var myApp = angular.module('app', ['ui.router', 'ui.bootstrap']);

