define(["./var/arr","./var/document","./var/getProto","./var/slice","./var/concat","./var/push","./var/indexOf","./var/class2type","./var/toString","./var/hasOwn","./var/fnToString","./var/ObjectFunctionString","./var/support","./core/DOMEval"],function(arr,document,getProto,slice,concat,push,indexOf,class2type,toString,hasOwn,fnToString,ObjectFunctionString,support,DOMEval){"use strict";var version="3.1.1",jQuery=function(selector,context){return new jQuery.fn.init(selector,context)},rtrim=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,rmsPrefix=/^-ms-/,rdashAlpha=/-([a-z])/g,fcamelCase=function(all,letter){return letter.toUpperCase()};jQuery.fn=jQuery.prototype={jquery:version,constructor:jQuery,length:0,toArray:function(){return slice.call(this)},get:function(num){if(num==null){return slice.call(this)}return num<0?this[num+this.length]:this[num]},pushStack:function(elems){var ret=jQuery.merge(this.constructor(),elems);ret.prevObject=this;return ret},each:function(callback){return jQuery.each(this,callback)},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem)}))},slice:function(){return this.pushStack(slice.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(i){var len=this.length,j=+i+(i<0?len:0);return this.pushStack(j>=0&&j<len?[this[j]]:[])},end:function(){return this.prevObject||this.constructor()},push:push,sort:arr.sort,splice:arr.splice};jQuery.extend=jQuery.fn.extend=function(){var options,name,src,copy,copyIsArray,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=false;if(typeof target==="boolean"){deep=target;target=arguments[i]||{};i++}if(typeof target!=="object"&&!jQuery.isFunction(target)){target={}}if(i===length){target=this;i--}for(;i<length;i++){if((options=arguments[i])!=null){for(name in options){src=target[name];copy=options[name];if(target===copy){continue}if(deep&&copy&&(jQuery.isPlainObject(copy)||(copyIsArray=jQuery.isArray(copy)))){if(copyIsArray){copyIsArray=false;clone=src&&jQuery.isArray(src)?src:[]}else{clone=src&&jQuery.isPlainObject(src)?src:{}}target[name]=jQuery.extend(deep,clone,copy)}else if(copy!==undefined){target[name]=copy}}}}return target};jQuery.extend({expando:"jQuery"+(version+Math.random()).replace(/\D/g,""),isReady:true,error:function(msg){throw new Error(msg)},noop:function(){},isFunction:function(obj){return jQuery.type(obj)==="function"},isArray:Array.isArray,isWindow:function(obj){return obj!=null&&obj===obj.window},isNumeric:function(obj){var type=jQuery.type(obj);return(type==="number"||type==="string")&&!isNaN(obj-parseFloat(obj))},isPlainObject:function(obj){var proto,Ctor;if(!obj||toString.call(obj)!=="[object Object]"){return false}proto=getProto(obj);if(!proto){return true}Ctor=hasOwn.call(proto,"constructor")&&proto.constructor;return typeof Ctor==="function"&&fnToString.call(Ctor)===ObjectFunctionString},isEmptyObject:function(obj){var name;for(name in obj){return false}return true},type:function(obj){if(obj==null){return obj+""}return typeof obj==="object"||typeof obj==="function"?class2type[toString.call(obj)]||"object":typeof obj},globalEval:function(code){DOMEval(code)},camelCase:function(string){return string.replace(rmsPrefix,"ms-").replace(rdashAlpha,fcamelCase)},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toLowerCase()===name.toLowerCase()},each:function(obj,callback){var length,i=0;if(isArrayLike(obj)){length=obj.length;for(;i<length;i++){if(callback.call(obj[i],i,obj[i])===false){break}}}else{for(i in obj){if(callback.call(obj[i],i,obj[i])===false){break}}}return obj},trim:function(text){return text==null?"":(text+"").replace(rtrim,"")},makeArray:function(arr,results){var ret=results||[];if(arr!=null){if(isArrayLike(Object(arr))){jQuery.merge(ret,typeof arr==="string"?[arr]:arr)}else{push.call(ret,arr)}}return ret},inArray:function(elem,arr,i){return arr==null?-1:indexOf.call(arr,elem,i)},merge:function(first,second){var len=+second.length,j=0,i=first.length;for(;j<len;j++){first[i++]=second[j]}first.length=i;return first},grep:function(elems,callback,invert){var callbackInverse,matches=[],i=0,length=elems.length,callbackExpect=!invert;for(;i<length;i++){callbackInverse=!callback(elems[i],i);if(callbackInverse!==callbackExpect){matches.push(elems[i])}}return matches},map:function(elems,callback,arg){var length,value,i=0,ret=[];if(isArrayLike(elems)){length=elems.length;for(;i<length;i++){value=callback(elems[i],i,arg);if(value!=null){ret.push(value)}}}else{for(i in elems){value=callback(elems[i],i,arg);if(value!=null){ret.push(value)}}}return concat.apply([],ret)},guid:1,proxy:function(fn,context){var tmp,args,proxy;if(typeof context==="string"){tmp=fn[context];context=fn;fn=tmp}if(!jQuery.isFunction(fn)){return undefined}args=slice.call(arguments,2);proxy=function(){return fn.apply(context||this,args.concat(slice.call(arguments)))};proxy.guid=fn.guid=fn.guid||jQuery.guid++;return proxy},now:Date.now,support:support});if(typeof Symbol==="function"){jQuery.fn[Symbol.iterator]=arr[Symbol.iterator]}jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(i,name){class2type["[object "+name+"]"]=name.toLowerCase()});function isArrayLike(obj){var length=!!obj&&"length"in obj&&obj.length,type=jQuery.type(obj);if(type==="function"||jQuery.isWindow(obj)){return false}return type==="array"||length===0||typeof length==="number"&&length>0&&length-1 in obj}return jQuery});