angular.module('app').component('detail', {

    templateUrl: './components/details/detail.html', 
    controller: function($scope, $state, DetailService){

      $scope.widgetDetailsList = [];

      this.$onInit = function () {
        $scope.widgetDetailsList =  DetailService.getAllDetails();
      };

      $scope.goToDetails = function(wid) {
          $state.go("detail.summary", { widgetId: wid });
      };

      $scope.openModal = function (wid) {
        var headerText = "Confirmation";
        var innerText = "Are you sure do you want to delete the widget?";
        var type = 'delete';
        DetailService.openModalDialog(wid, headerText, innerText, type);
      };
    }
  });