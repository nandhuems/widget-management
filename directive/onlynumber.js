var appfilter = angular.module('app');

appfilter.directive('onlyDigits', function () {
  return {
    restrict: "A",
    require: '?ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
        if (!ngModelCtrl) {
            return;
        }

        ngModelCtrl.$parsers.push(function(val) {
           if (val === null)
            return;
           var myRegex = /\d+/;
           var clean = myRegex.exec(val)[0];
           if (val != clean) {
               ngModelCtrl.$setViewValue(clean);
               ngModelCtrl.$render();
           }
           return clean;
        });

        element.bind('keypress', function(event) {
          // console.log(event.keyCode)
            if (event.keyCode === 32 || event.keyCode === 45 || event.keyCode === 43 || event.keyCode === 46) {
                event.preventDefault();
            }
        });
    }
  };
});