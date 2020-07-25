angular.module('app').service('DetailService', function($http, $uibModal, $state) {
  var service = {
    getAllDetails: function() {
      var getSessionData = sessionStorage.getItem('widgetData');
      if(getSessionData) {
        return JSON.parse(getSessionData);
      } else {
        return [];
      }
    },
    
    getWidgetDetails: function(id) {
      function personMatchesParam(widget) {
        return parseInt(widget.id) === parseInt(id);
      }
      
      return service.getAllDetails().find(personMatchesParam);
    },

    openModalDialog: function(wid, headerText, innerText, type) {
      $uibModal.open({
        templateUrl: './components/modal/modal.html',
        backdrop: 'static',
        keyboard: false,
        controller: function ($scope, $uibModalInstance) {
          $scope.headerText = headerText;
          $scope.innerText = innerText;
          $scope.type = type;
          $scope.ok = function () {
            $uibModalInstance.close();
            $state.go('detail');
          };

          $scope.yes = function () {
            $uibModalInstance.close();
            var widgetList = service.getAllDetails();
            var indexOfItem = widgetList.findIndex(function(item) {
              return parseInt(wid.id) === parseInt(item.id) && item.name === wid.name;
            });
            widgetList.splice(indexOfItem, 1);
            sessionStorage.setItem('widgetData', JSON.stringify(widgetList));
            $state.transitionTo('detail', {}, { reload: true, inherit: false, notify: true });
          };
        
          $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
          };
        }
      });
    }
  };
  
  return service;
});