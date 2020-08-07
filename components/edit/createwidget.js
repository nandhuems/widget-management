(function(angular) {
  'use strict';
  function CreateAndEditController(DetailService, $stateParams){
    var ctrl = this;
    ctrl.isEdit = false;
    ctrl.widgetDetail = {
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
    ctrl.alerts = [];

    ctrl.submit = function() {
      var widgetDataList = DetailService.getAllDetails().sort(function(a, b) {
        return a - b;
      });
      var lastIndItemId = widgetDataList[widgetDataList.length - 1];
      ctrl.widgetDetail.id = ctrl.generateId(lastIndItemId, ctrl.widgetDetail.id);
      var findIndexOfExist = widgetDataList.findIndex(function(item) { 
        return item.id === ctrl.widgetDetail.id;
      });
      // console.log(findIndexOfExist)
    
      if(ctrl.validate(widgetDataList)) {
        if(findIndexOfExist !== -1) {
          widgetDataList.splice(findIndexOfExist, 1);
        }
        widgetDataList.push(ctrl.widgetDetail);
        sessionStorage.setItem('widgetData', JSON.stringify(widgetDataList));

        ctrl.openModal('');
      }
      
    };

    ctrl.validate = function(arrItem) {
      ctrl.closeAlert(0);
      var isValid = true;
      if(!ctrl.isEdit) {
        var findNameInd = arrItem.findIndex(function(item) {
          return item.name === ctrl.widgetDetail.name;
        });
        if(findNameInd !== -1) {
          ctrl.alertError("Duplicate name found");
          isValid = false;
        }
      } else if(ctrl.isEdit) {
        var findNameInd1 = arrItem.findIndex(function(item) {
          return item.name === ctrl.widgetDetail.name;
        });
        if(findNameInd1 !== -1) {
          if(arrItem[findNameInd1].id !== ctrl.widgetDetail.id) {
            ctrl.alertError("Duplicate name found");
            isValid = false;
          }
        }
      }
      return isValid;
    };

    ctrl.alertError = function(text) {
      ctrl.alerts.push({msg: text, dt: 3000, type: 'danger'});
    };

    ctrl.closeAlert = function(index) {
      ctrl.alerts.splice(index, 1);
    };

    ctrl.openModal = function (wid) {
      var headerText = "Confirmation";
      var innerText = ctrl.isEdit ? "Widget updated successfully" : "Widget Registration completed successfully";
      var type = 'save';
      DetailService.openModalDialog(wid, headerText, innerText, type);
    };

    this.$onInit = function () {
      ctrl.isEdit = $stateParams.widgetId ? true : false;
      if(ctrl.isEdit) {
        ctrl.widgetDetail =  DetailService.getWidgetDetails($stateParams.widgetId);
        ctrl.widgetDetail.number =  ctrl.widgetDetail.number ? parseInt(ctrl.widgetDetail.number) : '';
      }
    };
    
    ctrl.generateId = function(lastIndItemId, currentwid) {
      if(!ctrl.isEdit) {
        return lastIndItemId ? lastIndItemId.id + 1 : ctrl.widgetDetail.id;
      } else {
        return currentwid;
      }
    };

    ctrl.addKeyValu = function() {
      var pairs = {key:'', value:''};
      ctrl.widgetDetail.pairs.push(pairs);
    };

    ctrl.deletePairs = function(ind) {
      ctrl.widgetDetail.pairs.splice(ind, 1);
    };

  }

  angular.module('app').component('edit', {
    templateUrl: './components/edit/createwidget.html', 
    controller: CreateAndEditController
  });
})(window.angular);