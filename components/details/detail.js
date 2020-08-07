(function(angular) {
  'use strict';
function DetailComponentController($scope, $state, DetailService){
  var ctrl = this;
  console.log(ctrl)
  ctrl.widgetDetailsList = [];

   this.$onInit = function () {
     console.log(DetailService.getAllDetails());
     ctrl.widgetDetailsList =  DetailService.getAllDetails();
   };

   ctrl.goToDetails = function(wid) {
       $state.go("detail.summary", { widgetId: wid });
   };

   ctrl.openModal = function (wid) {
     var headerText = "Confirmation";
     var innerText = "Are you sure do you want to delete the widget?";
     var type = 'delete';
     DetailService.openModalDialog(wid, headerText, innerText, type);
   };
 }

angular.module('app').component('detail', {
    templateUrl: './components/details/detail.html', 
    controller: DetailComponentController
});
})(window.angular);