angular.module('app').component('edit', {

    templateUrl: './components/edit/createwidget.html', 
    controller: function($scope, $state, DetailService, $stateParams){
      $scope.isEdit = false;
      $scope.widgetDetail = {
        name:'',
        id:1,
        number:'', 
        pairs:[
          {key:'', value:''},
          {key:'', value:''},
          {key:'', value:''},
          {key:'', value:''},
          {key:'', value:''}
        ]
      };
      $scope.alerts = [];

      $scope.submit = function() {
        var widgetDataList = DetailService.getAllDetails().sort(function(a, b) {
          return a - b;
        });
        var lastIndItemId = widgetDataList[widgetDataList.length - 1];
        $scope.widgetDetail.id = $scope.generateId(lastIndItemId, $scope.widgetDetail.id);
        var findIndexOfExist = widgetDataList.findIndex(function(item) { 
          return item.id === $scope.widgetDetail.id;
        });
        // console.log(findIndexOfExist)
       
        if($scope.validate(widgetDataList)) {
          if(findIndexOfExist !== -1) {
            widgetDataList.splice(findIndexOfExist, 1);
          }
          widgetDataList.push($scope.widgetDetail);
          sessionStorage.setItem('widgetData', JSON.stringify(widgetDataList));
  
          $scope.openModal('');
        }
        
      };

      $scope.validate = function(arrItem) {
        var isValid = true;
        if(!$scope.isEdit) {
          var findNameInd = arrItem.findIndex(function(item) {
            return item.name === $scope.widgetDetail.name;
          });
          if(findNameInd !== -1) {
            $scope.alertError("Duplicate name found");
            isValid = false;
          }
        } else if($scope.isEdit) {
          var findNameInd1 = arrItem.findIndex(function(item) {
            return item.name === $scope.widgetDetail.name;
          });
          if(findNameInd1 !== -1) {
            if(arrItem[findNameInd1].id !== $scope.widgetDetail.id) {
              $scope.alertError("Duplicate name found");
              isValid = false;
            }
          }
        }
        return isValid;
      };

      $scope.alertError = function(text) {
        $scope.alerts.push({msg: text, dt: 3000, type: 'danger'});
      };

      $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
      };

      $scope.openModal = function (wid) {
        var headerText = "Confirmation";
        var innerText = $scope.isEdit ? "Widget updated successfully" : "Widget Registration completed successfully";
        var type = 'save';
        DetailService.openModalDialog(wid, headerText, innerText, type);
      };

      this.$onInit = function () {
        $scope.isEdit = $stateParams.widgetId ? true : false;
        if($scope.isEdit) {
          $scope.widgetDetail =  DetailService.getWidgetDetails($stateParams.widgetId);
          $scope.widgetDetail.number =  $scope.widgetDetail.number ? parseInt($scope.widgetDetail.number) : '';
        }
      };
      
      $scope.generateId = function(lastIndItemId, currentwid) {
        if(!$scope.isEdit) {
          return lastIndItemId ? lastIndItemId.id + 1 : $scope.widgetDetail.id;
        } else {
          return currentwid;
        }
      };

      $scope.addKeyValu = function() {
        var pairs = {key:'', value:''};
        $scope.widgetDetail.pairs.push(pairs);
      };

      $scope.deletePairs = function(ind) {
        $scope.widgetDetail.pairs.splice(ind, 1);
      };

    }
  });