/*!
 * jquery.unevent.js 0.2
 * https://github.com/yckart/jquery.unevent.js
 *
 * Copyright (c) 2013 Yannick Albert (http://yckart.com)
 * Licensed under the MIT license (http://www.opensource.org/licenses/mit-license.php).
 * 2013/07/26
**/(function(e){var t=e.fn.on,n;e.fn.on=function(){var e=Array.apply(null,arguments),r=e[e.length-1];if(isNaN(r)||r===1&&e.pop())return t.apply(this,e);var i=e.pop(),s=e.pop();e.push(function(){var e=this,t=arguments;clearTimeout(n);n=setTimeout(function(){s.apply(e,t)},i)});return t.apply(this,e)}})(this.jQuery||this.Zepto);