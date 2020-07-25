angular.module('app').component('summary', {
  bindings: { summary: '<' },
  templateUrl: './components/summary/summary.html',
  controller: function($scope, $state, DetailService, $stateParams) {
    $scope.widgetDetail = {};
    this.$onInit = function () {
      $scope.widgetDetail =  DetailService.getWidgetDetails($stateParams.widgetId);
    };

    $scope.editWidget = function() {
      $state.go('edit.view', { widgetId: $scope.widgetDetail.id });
    }
  }
});