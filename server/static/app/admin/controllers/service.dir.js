(function(){var app=angular.module("services.directives.service-directives",[]);app.directive("serviceRow",function(){return{controller:"ServiceController",controllerAs:"controller",templateUrl:"static/app/admin/templates/service-row.tpl.html"}});app.directive("serviceStoreRow",function(){return{controller:"ServiceController",controllerAs:"controller",templateUrl:"static/app/admin/templates/service-store-row.tpl.html"}});app.directive("jobRow",function(){return{controller:"JobController",controllerAs:"controller",templateUrl:"static/app/admin/templates/job-row.tpl.html"}})})();