
(function(angular) {
  'use strict';
  function editViewController($state, DetailService, $stateParams) {
  var ctrl = this;
  ctrl.widgetDetail = {};
  this.$onInit = function () {
    ctrl.widgetDetail =  DetailService.getWidgetDetails($stateParams.widgetId);
  };

    ctrl.editWidget = function() {
      $state.go('edit.view', { widgetId: ctrl.widgetDetail.id });
    }
  }

  angular.module('app').component('summary', {
    bindings: { summary: '<' },
    templateUrl: './components/summary/summary.html',
    controller: editViewController
  });
})(window.angular);