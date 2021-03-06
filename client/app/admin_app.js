/*
* (C) Copyright 2017 SLU Global Bioinformatics Centre, SLU
* (http://sgbc.slu.se) and the eBioKit Project (http://ebiokit.eu).
*
* This file is part of The eBioKit portal 2017. All rights reserved.
* The eBioKit portal is free software: you can redistribute it and/or
* modify it under the terms of the GNU General Public License as
* published by the Free Software Foundation, either version 3 of
* the License, or (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
* Lesser General Public License for more details.
*
*  You should have received a copy of the GNU General Public License
*  along with eBioKit portal.  If not, see <http://www.gnu.org/licenses/>.
*
* Contributors:
*     Dr. Erik Bongcam-Rudloff
*     Dr. Rafael Hernandez de Diego (main developer)
*     and others.
*
*  More info http://ebiokit.eu/
*  Technical contact ebiokit@gmail.com
*
* THIS FILE CONTAINS THE FOLLOWING MODULE DECLARATION
*  - AdminController
*/

(function() {

	var app = angular.module('eBioKitMainSiteApp', [
		'ang-dialogs',
		'ui.router',
		'ngSanitize',
		'services.directives.service-directives',
		'admin.controllers.service-list',
		'users.controllers.user-session'
	]);

	app.constant('myAppConfig', {
		VERSION: '0.1',
		SERVER_URL : "/"
	});

	//Define the events that are fired in the APP
	app.constant('APP_EVENTS', {
		launchService: 'launch-service',
		jobListChange: 'job-list-changed',
		logoutSuccess: 'logout-success',
		loginSuccess: 'login-success',
		serviceStoreAction : 'service-store-action'
	});

	//DEFINE THE ENTRIES FOR THE WEB APP
	app.config([
		'$stateProvider',
		'$urlRouterProvider',
		function ($stateProvider, $urlRouterProvider) {
			// For any unmatched url, redirect to /login
			$urlRouterProvider.otherwise("/");
			var signin = {
				name: 'signin',
				url: '/signin',
				templateUrl: "static/app/users/user-sign-in.tpl.html",
				data: {requireLogin: false}
			},
			controlPanel = {
				name: 'control-panel',
				url: '/',
				templateUrl: "static/app/admin/templates/control-panel.tpl.html",
				data: {requireLogin: true}
			},
			applicationStore = {
				name: 'application-store',
				url: '/application-store',
				templateUrl: "static/app/admin/templates/application-store.tpl.html",
				data: {requireLogin: true}
			},
			jobsQueue = {
				name: 'jobs-queue',
				url: '/jobs-queue',
				templateUrl: "static/app/admin/templates/jobs-queue.tpl.html",
				data: {requireLogin: true}
			},
			settings = {
				name: 'settings',
				url: '/settings',
				templateUrl: "static/app/admin/templates/settings.tpl.html",
				data: {requireLogin: true}
			};
			$stateProvider.state(signin);
			$stateProvider.state(controlPanel);
			$stateProvider.state(applicationStore);
			$stateProvider.state(jobsQueue);
			$stateProvider.state(settings);
		}]
	);


	/******************************************************************************
	*       _____ ____  _   _ _______ _____   ____  _      _      ______ _____   _____
	*      / ____/ __ \| \ | |__   __|  __ \ / __ \| |    | |    |  ____|  __ \ / ____|
	*     | |   | |  | |  \| |  | |  | |__) | |  | | |    | |    | |__  | |__) | (___
	*     | |   | |  | | . ` |  | |  |  _  /| |  | | |    | |    |  __| |  _  / \___ \
	*     | |___| |__| | |\  |  | |  | | \ \| |__| | |____| |____| |____| | \ \ ____) |
	*      \_____\____/|_| \_|  |_|  |_|  \_\\____/|______|______|______|_|  \_\_____/
	*
	******************************************************************************/
	app.controller('AdminController', function ($rootScope, $scope, $state, $http, $sce, $timeout, $interval, $cookies, myAppConfig, APP_EVENTS) {
		/******************************************************************************
		*       ___ ___  _  _ _____ ___  ___  _    _    ___ ___
		*      / __/ _ \| \| |_   _| _ \/ _ \| |  | |  | __| _ \
		*     | (_| (_) | .` | | | |   / (_) | |__| |__| _||   /
		*      \___\___/|_|\_| |_|_|_|_\\___/|____|____|___|_|_\
		*        | __| | | | \| |/ __|_   _|_ _/ _ \| \| / __|
		*        | _|| |_| | .` | (__  | |  | | (_) | .` \__ \
		*        |_|  \___/|_|\_|\___| |_| |___\___/|_|\_|___/
		*
		******************************************************************************/

		$rootScope.getRequestPath = function(service, extra){
			extra = (extra || "");
			switch (service) {
				case "user-rest":
				return myAppConfig.SERVER_URL + "api/system/user/";
				case "session-rest":
				return myAppConfig.SERVER_URL + "api/system/session/?admin=1";
				case "system-info":
				return myAppConfig.SERVER_URL + "api/system/system-info/";
				case "system-settings":
				return myAppConfig.SERVER_URL + "api/system/system-settings/";
				case "system-version":
				return myAppConfig.SERVER_URL + "api/system/system-version/";
				case "service-list":
				return myAppConfig.SERVER_URL + "api/applications/";
				case "service-info":
				return myAppConfig.SERVER_URL + "api/applications/" + extra;
				case "service-status":
				return myAppConfig.SERVER_URL + "api/applications/" + extra + "/status/";
				case "service-start":
				return myAppConfig.SERVER_URL + "api/applications/" + extra + "/start/";
				case "service-stop":
				return myAppConfig.SERVER_URL + "api/applications/" + extra + "/stop/";
				case "service-restart":
				return myAppConfig.SERVER_URL + "api/applications/" + extra + "/restart/";
				case "service-enable":
				return myAppConfig.SERVER_URL + "api/applications/" + extra + "/enable/";
				case "service-disable":
				return myAppConfig.SERVER_URL + "api/applications/" + extra + "/disable/";
				case "service-prepare-install":
				return myAppConfig.SERVER_URL + "api/applications/" + extra + "/prepare-install/";
				case "service-prepare-upgrade":
				return myAppConfig.SERVER_URL + "api/applications/" + extra + "/prepare-upgrade/";
				case "service-install":
				return myAppConfig.SERVER_URL + "api/applications/" + extra + "/install/";
				case "service-upgrade":
				return myAppConfig.SERVER_URL + "api/applications/" + extra + "/upgrade/";
				case "service-uninstall":
				return myAppConfig.SERVER_URL + "api/applications/" + extra + "/uninstall/";
				case "available-updates":
				return myAppConfig.SERVER_URL + "api/applications/available-updates/";
				case "available-applications":
				return myAppConfig.SERVER_URL + "api/applications/available-applications/";
				case "job-list":
				return myAppConfig.SERVER_URL + "api/applications/jobs/" + extra;
				case "task-log":
				return myAppConfig.SERVER_URL + "api/applications/task/log/" + extra;
				default:
				return "";
			}
		};

		$rootScope.getHttpRequestConfig = function(method, service, options){
			options = (options || {});
			options.params = (options.params || {});

			var requestData = {
				method: method,
				headers: options.headers,
				url: this.getRequestPath(service, options.extra),
				params: options.params,
				data: options.data
			};

			if(options.transformRequest !== undefined){
				requestData.transformRequest = options.transformRequest;
			}

			return requestData;
		};

		this.setPage = function (page) {
			$state.transitionTo(page);
			$scope.currentPage = page;
		};

		this.getPageTitle  = function(page){
			return
		};

		this.setCurrentPageTitle = function(page){
			$scope.currentPageTitle = page;
		};

		this.retrieveSystemVersion = function(){
			$http($rootScope.getHttpRequestConfig("GET", "system-version", {})).
			then(
				function successCallback(response){
					$rootScope.systemVersion = response.data.system_version;
				},
				function errorCallback(response){
					$scope.isLoading = false;

					debugger;
					var message = "Failed while retrieving the system version.";
					$dialogs.showErrorDialog(message, {
						logMessage : message + " at AdminController:retrieveSystemVersion."
					});
					console.error(response.data);
				}
			);
		};

		/******************************************************************************
		*            _____   _____ _  _ _____
		*           | __\ \ / / __| \| |_   _|
		*           | _| \ V /| _|| .` | | |
		*      _  _ |___| \_/_|___|_|\_| |_| ___  ___
		*     | || | /_\ | \| |   \| |  | __| _ \/ __|
		*     | __ |/ _ \| .` | |) | |__| _||   /\__ \
		*     |_||_/_/ \_\_|\_|___/|____|___|_|_\|___/
		*
		******************************************************************************/
		$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {
			var requireLogin = toState.data.requireLogin;
			var ebiokitsession = $cookies.get("ebiokitsession");

			//Check if the user is logged in, redirect to signin panel
			if (requireLogin && ebiokitsession === undefined) {
				event.preventDefault();
				$cookies.remove("ebiokitsession");
				$state.go('signin');
			}
		});

		$scope.$on(APP_EVENTS.launchService, function (event, args) {
		});

		$scope.$on(APP_EVENTS.loginSuccess, function (event, args) {
			$rootScope.isLoggedIn=true;
		});

		$scope.$on(APP_EVENTS.logoutSuccess, function (event, args) {
			$rootScope.isLoggedIn=false;
		});

		$scope.$on(APP_EVENTS.serviceStoreAction, function (event, args) {
			me.changeCurrentServiceHandler('jobs-queue');
		});

		$scope.$on(APP_EVENTS.installNewServiceAction, function (event, args) {
			me.changeCurrentServiceHandler('application-store');
		});

		this.changeCurrentServiceHandler = function(service){
			if(typeof service === "string"){
				for(var i in $scope.open_services){
					if($scope.open_services[i].name === service){
						service = $scope.open_services[i];
						break;
					}
				}
			}
			if($scope.visible_services.indexOf(service) === -1){
				if($scope.visible_services.length >=  $scope.max_visible_services){
					$scope.visible_services.shift();
				}
				$scope.visible_services.push(service);
				while($rootScope.interval.length > 0){
					console.log("Cancelling interval...");
					$interval.cancel($scope.interval[0]);
					$scope.interval.shift();
				}
				$state.transitionTo(service.name);
			}
		};

		/******************************************************************************
		*      ___ _  _ ___ _____ ___   _   _    ___ ____  _ _____ ___ ___  _  _
		*     |_ _| \| |_ _|_   _|_ _| /_\ | |  |_ _|_  / /_\_   _|_ _/ _ \| \| |
		*      | || .` || |  | |  | | / _ \| |__ | | / / / _ \| |  | | (_) | .` |
		*     |___|_|\_|___| |_| |___/_/ \_\____|___/___/_/ \_\_| |___\___/|_|\_|
		*
		******************************************************************************/
		var me = this;
		$rootScope.myAppConfig = myAppConfig;

		$scope.open_services = [
			{name:"control-panel", title: 'Control panel', description: 'The main eBioKit admin page', icon : 'fa-tachometer'},
			{name:"application-store", title: 'Application store', description: 'Install, update or remove apps', icon : 'fa-shopping-cart'},
			{name:"jobs-queue", title: 'Installation status', description: 'Queue for service installation or removing', icon : 'fa-tasks'},
			{name:"settings", title: 'Settings', description: 'eBioKit server settings', icon : 'fa-sliders'}
		];

		$scope.visible_services = [$scope.open_services[0]];
		$scope.max_visible_services = 1;
		$rootScope.interval = [];

		if($cookies.get("ebiokitsession") !== undefined){
			$rootScope.isLoggedIn=true;
		}

		this.retrieveSystemVersion();
	});
})();
