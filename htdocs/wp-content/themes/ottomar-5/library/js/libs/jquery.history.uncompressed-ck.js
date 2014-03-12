/*
    json2.js
    2012-10-08

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*//*jslint evil: true, regexp: true *//*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.
typeof JSON!="object"&&(JSON={});(function(){"use strict";function f(e){return e<10?"0"+e:e}function quote(e){escapable.lastIndex=0;return escapable.test(e)?'"'+e.replace(escapable,function(e){var t=meta[e];return typeof t=="string"?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'}function str(e,t){var n,r,i,s,o=gap,u,a=t[e];a&&typeof a=="object"&&typeof a.toJSON=="function"&&(a=a.toJSON(e));typeof rep=="function"&&(a=rep.call(t,e,a));switch(typeof a){case"string":return quote(a);case"number":return isFinite(a)?String(a):"null";case"boolean":case"null":return String(a);case"object":if(!a)return"null";gap+=indent;u=[];if(Object.prototype.toString.apply(a)==="[object Array]"){s=a.length;for(n=0;n<s;n+=1)u[n]=str(n,a)||"null";i=u.length===0?"[]":gap?"[\n"+gap+u.join(",\n"+gap)+"\n"+o+"]":"["+u.join(",")+"]";gap=o;return i}if(rep&&typeof rep=="object"){s=rep.length;for(n=0;n<s;n+=1)if(typeof rep[n]=="string"){r=rep[n];i=str(r,a);i&&u.push(quote(r)+(gap?": ":":")+i)}}else for(r in a)if(Object.prototype.hasOwnProperty.call(a,r)){i=str(r,a);i&&u.push(quote(r)+(gap?": ":":")+i)}i=u.length===0?"{}":gap?"{\n"+gap+u.join(",\n"+gap)+"\n"+o+"}":"{"+u.join(",")+"}";gap=o;return i}}if(typeof Date.prototype.toJSON!="function"){Date.prototype.toJSON=function(e){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(e){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;typeof JSON.stringify!="function"&&(JSON.stringify=function(e,t,n){var r;gap="";indent="";if(typeof n=="number")for(r=0;r<n;r+=1)indent+=" ";else typeof n=="string"&&(indent=n);rep=t;if(!t||typeof t=="function"||typeof t=="object"&&typeof t.length=="number")return str("",{"":e});throw new Error("JSON.stringify")});typeof JSON.parse!="function"&&(JSON.parse=function(text,reviver){function walk(e,t){var n,r,i=e[t];if(i&&typeof i=="object")for(n in i)if(Object.prototype.hasOwnProperty.call(i,n)){r=walk(i,n);r!==undefined?i[n]=r:delete i[n]}return reviver.call(e,t,i)}var j;text=String(text);cx.lastIndex=0;cx.test(text)&&(text=text.replace(cx,function(e){return"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver=="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")})})();(function(e,t){"use strict";var n=e.History=e.History||{},r=e.jQuery;if(typeof n.Adapter!="undefined")throw new Error("History.js Adapter has already been loaded...");n.Adapter={bind:function(e,t,n){r(e).bind(t,n)},trigger:function(e,t,n){r(e).trigger(t,n)},extractEventData:function(e,n,r){var i=n&&n.originalEvent&&n.originalEvent[e]||r&&r[e]||t;return i},onDomLoad:function(e){r(e)}};typeof n.init!="undefined"&&n.init()})(window);(function(e,t){"use strict";var n=e.document,r=e.setTimeout||r,i=e.clearTimeout||i,s=e.setInterval||s,o=e.History=e.History||{};if(typeof o.initHtml4!="undefined")throw new Error("History.js HTML4 Support has already been loaded...");o.initHtml4=function(){if(typeof o.initHtml4.initialized!="undefined")return!1;o.initHtml4.initialized=!0;o.enabled=!0;o.savedHashes=[];o.isLastHash=function(e){var t=o.getHashByIndex(),n;n=e===t;return n};o.isHashEqual=function(e,t){e=encodeURIComponent(e).replace(/%25/g,"%");t=encodeURIComponent(t).replace(/%25/g,"%");return e===t};o.saveHash=function(e){if(o.isLastHash(e))return!1;o.savedHashes.push(e);return!0};o.getHashByIndex=function(e){var t=null;typeof e=="undefined"?t=o.savedHashes[o.savedHashes.length-1]:e<0?t=o.savedHashes[o.savedHashes.length+e]:t=o.savedHashes[e];return t};o.discardedHashes={};o.discardedStates={};o.discardState=function(e,t,n){var r=o.getHashByState(e),i;i={discardedState:e,backState:n,forwardState:t};o.discardedStates[r]=i;return!0};o.discardHash=function(e,t,n){var r={discardedHash:e,backState:n,forwardState:t};o.discardedHashes[e]=r;return!0};o.discardedState=function(e){var t=o.getHashByState(e),n;n=o.discardedStates[t]||!1;return n};o.discardedHash=function(e){var t=o.discardedHashes[e]||!1;return t};o.recycleState=function(e){var t=o.getHashByState(e);o.discardedState(e)&&delete o.discardedStates[t];return!0};if(o.emulated.hashChange){o.hashChangeInit=function(){o.checkerFunction=null;var t="",r,i,u,a,f=Boolean(o.getHash());if(o.isInternetExplorer()){r="historyjs-iframe";i=n.createElement("iframe");i.setAttribute("id",r);i.setAttribute("src","#");i.style.display="none";n.body.appendChild(i);i.contentWindow.document.open();i.contentWindow.document.close();u="";a=!1;o.checkerFunction=function(){if(a)return!1;a=!0;var n=o.getHash(),r=o.getHash(i.contentWindow.document);if(n!==t){t=n;if(r!==n){u=r=n;i.contentWindow.document.open();i.contentWindow.document.close();i.contentWindow.document.location.hash=o.escapeHash(n)}o.Adapter.trigger(e,"hashchange")}else if(r!==u){u=r;f&&r===""?o.back():o.setHash(r,!1)}a=!1;return!0}}else o.checkerFunction=function(){var n=o.getHash()||"";if(n!==t){t=n;o.Adapter.trigger(e,"hashchange")}return!0};o.intervalList.push(s(o.checkerFunction,o.options.hashChangeInterval));return!0};o.Adapter.onDomLoad(o.hashChangeInit)}if(o.emulated.pushState){o.onHashChange=function(t){var n=t&&t.newURL||o.getLocationHref(),r=o.getHashByUrl(n),i=null,s=null,u=null,a;if(o.isLastHash(r)){o.busy(!1);return!1}o.doubleCheckComplete();o.saveHash(r);if(r&&o.isTraditionalAnchor(r)){o.Adapter.trigger(e,"anchorchange");o.busy(!1);return!1}i=o.extractState(o.getFullUrl(r||o.getLocationHref()),!0);if(o.isLastSavedState(i)){o.busy(!1);return!1}s=o.getHashByState(i);a=o.discardedState(i);if(a){o.getHashByIndex(-2)===o.getHashByState(a.forwardState)?o.back(!1):o.forward(!1);return!1}o.pushState(i.data,i.title,encodeURI(i.url),!1);return!0};o.Adapter.bind(e,"hashchange",o.onHashChange);o.pushState=function(t,n,r,i){r=encodeURI(r).replace(/%25/g,"%");if(o.getHashByUrl(r))throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");if(i!==!1&&o.busy()){o.pushQueue({scope:o,callback:o.pushState,args:arguments,queue:i});return!1}o.busy(!0);var s=o.createStateObject(t,n,r),u=o.getHashByState(s),a=o.getState(!1),f=o.getHashByState(a),l=o.getHash(),c=o.expectedStateId==s.id;o.storeState(s);o.expectedStateId=s.id;o.recycleState(s);o.setTitle(s);if(u===f){o.busy(!1);return!1}o.saveState(s);c||o.Adapter.trigger(e,"statechange");!o.isHashEqual(u,l)&&!o.isHashEqual(u,o.getShortUrl(o.getLocationHref()))&&o.setHash(u,!1);o.busy(!1);return!0};o.replaceState=function(t,n,r,i){r=encodeURI(r).replace(/%25/g,"%");if(o.getHashByUrl(r))throw new Error("History.js does not support states with fragment-identifiers (hashes/anchors).");if(i!==!1&&o.busy()){o.pushQueue({scope:o,callback:o.replaceState,args:arguments,queue:i});return!1}o.busy(!0);var s=o.createStateObject(t,n,r),u=o.getHashByState(s),a=o.getState(!1),f=o.getHashByState(a),l=o.getStateByIndex(-2);o.discardState(a,s,l);if(u===f){o.storeState(s);o.expectedStateId=s.id;o.recycleState(s);o.setTitle(s);o.saveState(s);o.Adapter.trigger(e,"statechange");o.busy(!1)}else o.pushState(s.data,s.title,s.url,!1);return!0}}o.emulated.pushState&&o.getHash()&&!o.emulated.hashChange&&o.Adapter.onDomLoad(function(){o.Adapter.trigger(e,"hashchange")})};typeof o.init!="undefined"&&o.init()})(window);(function(e,t){"use strict";var n=e.console||t,r=e.document,i=e.navigator,s=e.sessionStorage||!1,o=e.setTimeout,u=e.clearTimeout,a=e.setInterval,f=e.clearInterval,l=e.JSON,c=e.alert,h=e.History=e.History||{},p=e.history;try{s.setItem("TEST","1");s.removeItem("TEST")}catch(d){s=!1}l.stringify=l.stringify||l.encode;l.parse=l.parse||l.decode;if(typeof h.init!="undefined")throw new Error("History.js Core has already been loaded...");h.init=function(e){if(typeof h.Adapter=="undefined")return!1;typeof h.initCore!="undefined"&&h.initCore();typeof h.initHtml4!="undefined"&&h.initHtml4();return!0};h.initCore=function(d){if(typeof h.initCore.initialized!="undefined")return!1;h.initCore.initialized=!0;h.options=h.options||{};h.options.hashChangeInterval=h.options.hashChangeInterval||100;h.options.safariPollInterval=h.options.safariPollInterval||500;h.options.doubleCheckInterval=h.options.doubleCheckInterval||500;h.options.disableSuid=h.options.disableSuid||!1;h.options.storeInterval=h.options.storeInterval||1e3;h.options.busyDelay=h.options.busyDelay||250;h.options.debug=h.options.debug||!1;h.options.initialTitle=h.options.initialTitle||r.title;h.options.html4Mode=h.options.html4Mode||!1;h.options.delayInit=h.options.delayInit||!1;h.intervalList=[];h.clearAllIntervals=function(){var e,t=h.intervalList;if(typeof t!="undefined"&&t!==null){for(e=0;e<t.length;e++)f(t[e]);h.intervalList=null}};h.debug=function(){(h.options.debug||!1)&&h.log.apply(h,arguments)};h.log=function(){var e=typeof n!="undefined"&&typeof n.log!="undefined"&&typeof n.log.apply!="undefined",t=r.getElementById("log"),i,s,o,u,a;if(e){u=Array.prototype.slice.call(arguments);i=u.shift();typeof n.debug!="undefined"?n.debug.apply(n,[i,u]):n.log.apply(n,[i,u])}else i="\n"+arguments[0]+"\n";for(s=1,o=arguments.length;s<o;++s){a=arguments[s];if(typeof a=="object"&&typeof l!="undefined")try{a=l.stringify(a)}catch(f){}i+="\n"+a+"\n"}if(t){t.value+=i+"\n-----\n";t.scrollTop=t.scrollHeight-t.clientHeight}else e||c(i);return!0};h.getInternetExplorerMajorVersion=function(){var e=h.getInternetExplorerMajorVersion.cached=typeof h.getInternetExplorerMajorVersion.cached!="undefined"?h.getInternetExplorerMajorVersion.cached:function(){var e=3,t=r.createElement("div"),n=t.getElementsByTagName("i");while((t.innerHTML="<!--[if gt IE "+ ++e+"]><i></i><![endif]-->")&&n[0]);return e>4?e:!1}();return e};h.isInternetExplorer=function(){var e=h.isInternetExplorer.cached=typeof h.isInternetExplorer.cached!="undefined"?h.isInternetExplorer.cached:Boolean(h.getInternetExplorerMajorVersion());return e};h.options.html4Mode?h.emulated={pushState:!0,hashChange:!0}:h.emulated={pushState:!Boolean(e.history&&e.history.pushState&&e.history.replaceState&&!/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(i.userAgent)&&!/AppleWebKit\/5([0-2]|3[0-2])/i.test(i.userAgent)),hashChange:Boolean(!("onhashchange"in e||"onhashchange"in r)||h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<8)};h.enabled=!h.emulated.pushState;h.bugs={setHash:Boolean(!h.emulated.pushState&&i.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),safariPoll:Boolean(!h.emulated.pushState&&i.vendor==="Apple Computer, Inc."&&/AppleWebKit\/5([0-2]|3[0-3])/.test(i.userAgent)),ieDoubleCheck:Boolean(h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<8),hashEscape:Boolean(h.isInternetExplorer()&&h.getInternetExplorerMajorVersion()<7)};h.isEmptyObject=function(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0};h.cloneObject=function(e){var t,n;if(e){t=l.stringify(e);n=l.parse(t)}else n={};return n};h.getRootUrl=function(){var e=r.location.protocol+"//"+(r.location.hostname||r.location.host);if(r.location.port||!1)e+=":"+r.location.port;e+="/";return e};h.getBaseHref=function(){var e=r.getElementsByTagName("base"),t=null,n="";if(e.length===1){t=e[0];n=t.href.replace(/[^\/]+$/,"")}n=n.replace(/\/+$/,"");n&&(n+="/");return n};h.getBaseUrl=function(){var e=h.getBaseHref()||h.getBasePageUrl()||h.getRootUrl();return e};h.getPageUrl=function(){var e=h.getState(!1,!1),t=(e||{}).url||h.getLocationHref(),n;n=t.replace(/\/+$/,"").replace(/[^\/]+$/,function(e,t,n){return/\./.test(e)?e:e+"/"});return n};h.getBasePageUrl=function(){var e=h.getLocationHref().replace(/[#\?].*/,"").replace(/[^\/]+$/,function(e,t,n){return/[^\/]$/.test(e)?"":e}).replace(/\/+$/,"")+"/";return e};h.getFullUrl=function(e,t){var n=e,r=e.substring(0,1);t=typeof t=="undefined"?!0:t;/[a-z]+\:\/\//.test(e)||(r==="/"?n=h.getRootUrl()+e.replace(/^\/+/,""):r==="#"?n=h.getPageUrl().replace(/#.*/,"")+e:r==="?"?n=h.getPageUrl().replace(/[\?#].*/,"")+e:t?n=h.getBaseUrl()+e.replace(/^(\.\/)+/,""):n=h.getBasePageUrl()+e.replace(/^(\.\/)+/,""));return n.replace(/\#$/,"")};h.getShortUrl=function(e){var t=e,n=h.getBaseUrl(),r=h.getRootUrl();h.emulated.pushState&&(t=t.replace(n,""));t=t.replace(r,"/");h.isTraditionalAnchor(t)&&(t="./"+t);t=t.replace(/^(\.\/)+/g,"./").replace(/\#$/,"");return t};h.getLocationHref=function(e){e=e||r;return e.URL===e.location.href?e.location.href:e.location.href===decodeURIComponent(e.URL)?e.URL:e.location.hash&&decodeURIComponent(e.location.href.replace(/^[^#]+/,""))===e.location.hash?e.location.href:e.URL.indexOf("#")==-1&&e.location.href.indexOf("#")!=-1?e.location.href:e.URL||e.location.href};h.store={};h.idToState=h.idToState||{};h.stateToId=h.stateToId||{};h.urlToId=h.urlToId||{};h.storedStates=h.storedStates||[];h.savedStates=h.savedStates||[];h.normalizeStore=function(){h.store.idToState=h.store.idToState||{};h.store.urlToId=h.store.urlToId||{};h.store.stateToId=h.store.stateToId||{}};h.getState=function(e,t){typeof e=="undefined"&&(e=!0);typeof t=="undefined"&&(t=!0);var n=h.getLastSavedState();!n&&t&&(n=h.createStateObject());if(e){n=h.cloneObject(n);n.url=n.cleanUrl||n.url}return n};h.getIdByState=function(e){var t=h.extractId(e.url),n;if(!t){n=h.getStateString(e);if(typeof h.stateToId[n]!="undefined")t=h.stateToId[n];else if(typeof h.store.stateToId[n]!="undefined")t=h.store.stateToId[n];else{for(;;){t=(new Date).getTime()+String(Math.random()).replace(/\D/g,"");if(typeof h.idToState[t]=="undefined"&&typeof h.store.idToState[t]=="undefined")break}h.stateToId[n]=t;h.idToState[t]=e}}return t};h.normalizeState=function(e){var t,n;if(!e||typeof e!="object")e={};if(typeof e.normalized!="undefined")return e;if(!e.data||typeof e.data!="object")e.data={};t={};t.normalized=!0;t.title=e.title||"";t.url=h.getFullUrl(e.url?e.url:h.getLocationHref());t.hash=h.getShortUrl(t.url);t.data=h.cloneObject(e.data);t.id=h.getIdByState(t);t.cleanUrl=t.url.replace(/\??\&_suid.*/,"");t.url=t.cleanUrl;n=!h.isEmptyObject(t.data);if((t.title||n)&&h.options.disableSuid!==!0){t.hash=h.getShortUrl(t.url).replace(/\??\&_suid.*/,"");/\?/.test(t.hash)||(t.hash+="?");t.hash+="&_suid="+t.id}t.hashedUrl=h.getFullUrl(t.hash);(h.emulated.pushState||h.bugs.safariPoll)&&h.hasUrlDuplicate(t)&&(t.url=t.hashedUrl);return t};h.createStateObject=function(e,t,n){var r={data:e,title:t,url:n};r=h.normalizeState(r);return r};h.getStateById=function(e){e=String(e);var n=h.idToState[e]||h.store.idToState[e]||t;return n};h.getStateString=function(e){var t,n,r;t=h.normalizeState(e);n={data:t.data,title:e.title,url:e.url};r=l.stringify(n);return r};h.getStateId=function(e){var t,n;t=h.normalizeState(e);n=t.id;return n};h.getHashByState=function(e){var t,n;t=h.normalizeState(e);n=t.hash;return n};h.extractId=function(e){var t,n,r,i;e.indexOf("#")!=-1?i=e.split("#")[0]:i=e;n=/(.*)\&_suid=([0-9]+)$/.exec(i);r=n?n[1]||e:e;t=n?String(n[2]||""):"";return t||!1};h.isTraditionalAnchor=function(e){var t=!/[\/\?\.]/.test(e);return t};h.extractState=function(e,t){var n=null,r,i;t=t||!1;r=h.extractId(e);r&&(n=h.getStateById(r));if(!n){i=h.getFullUrl(e);r=h.getIdByUrl(i)||!1;r&&(n=h.getStateById(r));!n&&t&&!h.isTraditionalAnchor(e)&&(n=h.createStateObject(null,null,i))}return n};h.getIdByUrl=function(e){var n=h.urlToId[e]||h.store.urlToId[e]||t;return n};h.getLastSavedState=function(){return h.savedStates[h.savedStates.length-1]||t};h.getLastStoredState=function(){return h.storedStates[h.storedStates.length-1]||t};h.hasUrlDuplicate=function(e){var t=!1,n;n=h.extractState(e.url);t=n&&n.id!==e.id;return t};h.storeState=function(e){h.urlToId[e.url]=e.id;h.storedStates.push(h.cloneObject(e));return e};h.isLastSavedState=function(e){var t=!1,n,r,i;if(h.savedStates.length){n=e.id;r=h.getLastSavedState();i=r.id;t=n===i}return t};h.saveState=function(e){if(h.isLastSavedState(e))return!1;h.savedStates.push(h.cloneObject(e));return!0};h.getStateByIndex=function(e){var t=null;typeof e=="undefined"?t=h.savedStates[h.savedStates.length-1]:e<0?t=h.savedStates[h.savedStates.length+e]:t=h.savedStates[e];return t};h.getCurrentIndex=function(){var e=null;h.savedStates.length<1?e=0:e=h.savedStates.length-1;return e};h.getHash=function(e){var t=h.getLocationHref(e),n;n=h.getHashByUrl(t);return n};h.unescapeHash=function(e){var t=h.normalizeHash(e);t=decodeURIComponent(t);return t};h.normalizeHash=function(e){var t=e.replace(/[^#]*#/,"").replace(/#.*/,"");return t};h.setHash=function(e,t){var n,i;if(t!==!1&&h.busy()){h.pushQueue({scope:h,callback:h.setHash,args:arguments,queue:t});return!1}h.busy(!0);n=h.extractState(e,!0);if(n&&!h.emulated.pushState)h.pushState(n.data,n.title,n.url,!1);else if(h.getHash()!==e)if(h.bugs.setHash){i=h.getPageUrl();h.pushState(null,null,i+"#"+e,!1)}else r.location.hash=e;return h};h.escapeHash=function(t){var n=h.normalizeHash(t);n=e.encodeURIComponent(n);h.bugs.hashEscape||(n=n.replace(/\%21/g,"!").replace(/\%26/g,"&").replace(/\%3D/g,"=").replace(/\%3F/g,"?"));return n};h.getHashByUrl=function(e){var t=String(e).replace(/([^#]*)#?([^#]*)#?(.*)/,"$2");t=h.unescapeHash(t);return t};h.setTitle=function(e){var t=e.title,n;if(!t){n=h.getStateByIndex(0);n&&n.url===e.url&&(t=n.title||h.options.initialTitle)}try{r.getElementsByTagName("title")[0].innerHTML=t.replace("<","&lt;").replace(">","&gt;").replace(" & "," &amp; ")}catch(i){}r.title=t;return h};h.queues=[];h.busy=function(e){typeof e!="undefined"?h.busy.flag=e:typeof h.busy.flag=="undefined"&&(h.busy.flag=!1);if(!h.busy.flag){u(h.busy.timeout);var t=function(){var e,n,r;if(h.busy.flag)return;for(e=h.queues.length-1;e>=0;--e){n=h.queues[e];if(n.length===0)continue;r=n.shift();h.fireQueueItem(r);h.busy.timeout=o(t,h.options.busyDelay)}};h.busy.timeout=o(t,h.options.busyDelay)}return h.busy.flag};h.busy.flag=!1;h.fireQueueItem=function(e){return e.callback.apply(e.scope||h,e.args||[])};h.pushQueue=function(e){h.queues[e.queue||0]=h.queues[e.queue||0]||[];h.queues[e.queue||0].push(e);return h};h.queue=function(e,t){typeof e=="function"&&(e={callback:e});typeof t!="undefined"&&(e.queue=t);h.busy()?h.pushQueue(e):h.fireQueueItem(e);return h};h.clearQueue=function(){h.busy.flag=!1;h.queues=[];return h};h.stateChanged=!1;h.doubleChecker=!1;h.doubleCheckComplete=function(){h.stateChanged=!0;h.doubleCheckClear();return h};h.doubleCheckClear=function(){if(h.doubleChecker){u(h.doubleChecker);h.doubleChecker=!1}return h};h.doubleCheck=function(e){h.stateChanged=!1;h.doubleCheckClear();h.bugs.ieDoubleCheck&&(h.doubleChecker=o(function(){h.doubleCheckClear();h.stateChanged||e();return!0},h.options.doubleCheckInterval));return h};h.safariStatePoll=function(){var t=h.extractState(h.getLocationHref()),n;if(!h.isLastSavedState(t)){n=t;n||(n=h.createStateObject());h.Adapter.trigger(e,"popstate");return h}return};h.back=function(e){if(e!==!1&&h.busy()){h.pushQueue({scope:h,callback:h.back,args:arguments,queue:e});return!1}h.busy(!0);h.doubleCheck(function(){h.back(!1)});p.go(-1);return!0};h.forward=function(e){if(e!==!1&&h.busy()){h.pushQueue({scope:h,callback:h.forward,args:arguments,queue:e});return!1}h.busy(!0);h.doubleCheck(function(){h.forward(!1)});p.go(1);return!0};h.go=function(e,t){var n;if(e>0)for(n=1;n<=e;++n)h.forward(t);else{if(!(e<0))throw new Error("History.go: History.go requires a positive or negative integer passed.");for(n=-1;n>=e;--n)h.back(t)}return h};if(h.emulated.pushState){var v=function(){};h.pushState=h.pushState||v;h.replaceState=h.replaceState||v}else{h.onPopState=function(t,n){var r=!1,i=!1,s,o;h.doubleCheckComplete();s=h.getHash();if(s){o=h.extractState(s||h.getLocationHref(),!0);if(o)h.replaceState(o.data,o.title,o.url,!1);else{h.Adapter.trigger(e,"anchorchange");h.busy(!1)}h.expectedStateId=!1;return!1}r=h.Adapter.extractEventData("state",t,n)||!1;r?i=h.getStateById(r):h.expectedStateId?i=h.getStateById(h.expectedStateId):i=h.extractState(h.getLocationHref());i||(i=h.createStateObject(null,null,h.getLocationHref()));h.expectedStateId=!1;if(h.isLastSavedState(i)){h.busy(!1);return!1}h.storeState(i);h.saveState(i);h.setTitle(i);h.Adapter.trigger(e,"statechange");h.busy(!1);return!0};h.Adapter.bind(e,"popstate",h.onPopState);h.pushState=function(t,n,r,i){if(h.getHashByUrl(r)&&h.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(i!==!1&&h.busy()){h.pushQueue({scope:h,callback:h.pushState,args:arguments,queue:i});return!1}h.busy(!0);var s=h.createStateObject(t,n,r);if(h.isLastSavedState(s))h.busy(!1);else{h.storeState(s);h.expectedStateId=s.id;p.pushState(s.id,s.title,s.url);h.Adapter.trigger(e,"popstate")}return!0};h.replaceState=function(t,n,r,i){if(h.getHashByUrl(r)&&h.emulated.pushState)throw new Error("History.js does not support states with fragement-identifiers (hashes/anchors).");if(i!==!1&&h.busy()){h.pushQueue({scope:h,callback:h.replaceState,args:arguments,queue:i});return!1}h.busy(!0);var s=h.createStateObject(t,n,r);if(h.isLastSavedState(s))h.busy(!1);else{h.storeState(s);h.expectedStateId=s.id;p.replaceState(s.id,s.title,s.url);h.Adapter.trigger(e,"popstate")}return!0}}if(s){try{h.store=l.parse(s.getItem("History.store"))||{}}catch(m){h.store={}}h.normalizeStore()}else{h.store={};h.normalizeStore()}h.Adapter.bind(e,"unload",h.clearAllIntervals);h.saveState(h.storeState(h.extractState(h.getLocationHref(),!0)));if(s){h.onUnload=function(){var e,t,n;try{e=l.parse(s.getItem("History.store"))||{}}catch(r){e={}}e.idToState=e.idToState||{};e.urlToId=e.urlToId||{};e.stateToId=e.stateToId||{};for(t in h.idToState){if(!h.idToState.hasOwnProperty(t))continue;e.idToState[t]=h.idToState[t]}for(t in h.urlToId){if(!h.urlToId.hasOwnProperty(t))continue;e.urlToId[t]=h.urlToId[t]}for(t in h.stateToId){if(!h.stateToId.hasOwnProperty(t))continue;e.stateToId[t]=h.stateToId[t]}h.store=e;h.normalizeStore();n=l.stringify(e);try{s.setItem("History.store",n)}catch(i){if(i.code!==DOMException.QUOTA_EXCEEDED_ERR)throw i;if(s.length){s.removeItem("History.store");s.setItem("History.store",n)}}};h.intervalList.push(a(h.onUnload,h.options.storeInterval));h.Adapter.bind(e,"beforeunload",h.onUnload);h.Adapter.bind(e,"unload",h.onUnload)}if(!h.emulated.pushState){h.bugs.safariPoll&&h.intervalList.push(a(h.safariStatePoll,h.options.safariPollInterval));if(i.vendor==="Apple Computer, Inc."||(i.appCodeName||"")==="Mozilla"){h.Adapter.bind(e,"hashchange",function(){h.Adapter.trigger(e,"popstate")});h.getHash()&&h.Adapter.onDomLoad(function(){h.Adapter.trigger(e,"hashchange")})}}};(!h.options||!h.options.delayInit)&&h.init()})(window);