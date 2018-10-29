(function(){var app=angular.module("eBioKitMainSiteApp",["ang-dialogs","ui.router","ngSanitize","services.directives.service-directives","services.controllers.service-list"]);app.constant("myAppConfig",{VERSION:"0.1",SERVER_URL:"/"});app.constant("APP_EVENTS",{launchService:"launch-service"});app.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){$urlRouterProvider.otherwise("/home");var home={name:"home",url:"/",data:{requireLogin:false}};$stateProvider.state(home)}]);app.controller("MainController",function($rootScope,$scope,$state,$http,$sce,$timeout,myAppConfig,APP_EVENTS){$rootScope.getRequestPath=function(service,extra){extra=extra||"";switch(service){case"system-version":return myAppConfig.SERVER_URL+"api/system/system-version/";case"service-list":return myAppConfig.SERVER_URL+"api/applications/";case"service-info":return myAppConfig.SERVER_URL+"api/applications/info";default:return""}};$rootScope.getHttpRequestConfig=function(method,service,options){options=options||{};options.params=options.params||{};var requestData={method:method,headers:options.headers,url:this.getRequestPath(service,options.extra),params:options.params,data:options.data};if(options.transformRequest!==undefined){requestData.transformRequest=options.transformRequest}return requestData};this.setPage=function(page){$state.transitionTo(page);$scope.currentPage=page};this.getPageTitle=function(page){return};this.setCurrentPageTitle=function(page){$scope.currentPageTitle=page};this.retrieveSystemVersion=function(){$http($rootScope.getHttpRequestConfig("GET","system-version",{})).then(function successCallback(response){$rootScope.systemVersion=response.data.system_version},function errorCallback(response){$scope.isLoading=false;debugger;var message="Failed while retrieving the system version.";$dialogs.showErrorDialog(message,{logMessage:message+" at AdminController:retrieveSystemVersion."});console.error(response.data)})};this.getVisibleWindowsSize=function(){var n=Math.min($scope.visible_services.length,$scope.max_visible_services);if(n>2){return"halfHeightDiv col-lg-6 col-md-6 col-sm-6"}else if(n===2){return"halfHeightDiv col-lg-12 col-md-12 col-sm-12"}else{return"fullHeightDiv col-lg-12 col-md-12 col-sm-12"}};this.trustAsResourceUrl=function(service){return $sce.trustAsResourceUrl(this.getLinkToService(service))};this.getLinkToService=function(service){if(service.port&&(document.location.hostname==="localhost"||/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(document.location.hostname))){var port=service.port.split(",")[0];return document.location.origin.replace(new RegExp(":"+document.location.port+"$"),"")+":"+port}else if(service.website!=null||service.website!==""){return service.website}else{return"/not-found.html"}};this.getServiceByName=function(name){for(var i in $scope.open_services){if($scope.open_services[i].name===name){return $scope.open_services[i]}}};$scope.$on(APP_EVENTS.launchService,function(event,args){me.launchServiceHandler(args);me.changeCurrentServiceHandler(args)});this.launchServiceHandler=function(service){if($scope.open_services.indexOf(service)===-1){$scope.open_services.push(service)}$scope.displayOptions.showMenu=false};this.changeCurrentServiceHandler=function(service){if($scope.visible_services.indexOf(service)===-1){if($scope.visible_services.length>=$scope.max_visible_services){$scope.visible_services.shift()}$scope.visible_services.push(service);$scope.service_window_size=this.getVisibleWindowsSize()}};this.setMaxVisibleServicesHandler=function(nServices){if(nServices>0&&nServices<5){$scope.max_visible_services=nServices;while($scope.visible_services.length>$scope.max_visible_services){$scope.visible_services.shift()}$scope.service_window_size=this.getVisibleWindowsSize()}};this.closeServiceHandler=function(service){this.hideServiceHandler(service);if(service.name!=="home"){var pos=$scope.open_services.indexOf(service);if(pos!==-1){$scope.open_services.splice(pos,1)}}};this.hideServiceHandler=function(service){var pos=$scope.visible_services.indexOf(service);if(pos!==-1){$scope.visible_services.splice(pos,1)}if($scope.visible_services.length===0){this.changeCurrentServiceHandler(this.getServiceByName("home"))}else{$scope.service_window_size=this.getVisibleWindowsSize()}};this.displayApplicationMenuHandler=function(){$scope.displayTimeout=$timeout(function(){$scope.displayOptions.showMenu=true},3e3)};this.displayApplicationMenuClickHandler=function(){$scope.displayOptions.showMenu=!$scope.displayOptions.showMenu};this.cancelDisplayApplicationMenuHandler=function(){if($scope.displayTimeout!==undefined){$timeout.cancel($scope.displayTimeout);delete $scope.displayTimeout}};this.uncollapseMenuHandler=function(){$scope.uncollapseTimeout=$timeout(function(){$scope.collapsedBar="expanded"},2e3)};this.collapseMenuHandler=function(){if($scope.uncollapseTimeout!==undefined){$timeout.cancel($scope.uncollapseTimeout);delete $scope.uncollapseTimeout}$scope.collapsedBar=""};var me=this;$rootScope.myAppConfig=myAppConfig;$scope.displayOptions={showMenu:false};$scope.open_services=[{name:"home",title:"Home page",description:"The main eBioKit page",website:"/home"}];$scope.visible_services=[$scope.open_services[0]];$scope.max_visible_services=1;$scope.service_window_size=this.getVisibleWindowsSize();this.retrieveSystemVersion()})})();