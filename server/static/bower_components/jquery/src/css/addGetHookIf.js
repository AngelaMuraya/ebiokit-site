define(function(){"use strict";function addGetHookIf(conditionFn,hookFn){return{get:function(){if(conditionFn()){delete this.get;return}return(this.get=hookFn).apply(this,arguments)}}}return addGetHookIf});