

var appfilter = angular.module('app');

appfilter.directive('uibAlert', function() {
    return {
      controller: 'UibAlertController',
      controllerAs: 'alert',
      templateUrl: function(element, attrs) {
        return attrs.templateUrl || './directive/alert.html';
      },
      transclude: true,
      replace: true,
      scope: {
        type: '@',
        close: '&',
        dismissOnTimeout: '@'
      }
    };
});