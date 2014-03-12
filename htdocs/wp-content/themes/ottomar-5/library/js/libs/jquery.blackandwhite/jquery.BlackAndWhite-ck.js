/**
 *
 * Version: 0.2.8
 * Author:  Gianluca Guarini
 * Contact: gianluca.guarini@gmail.com
 * Website: http://www.gianlucaguarini.com/
 * Twitter: @gianlucaguarini
 *
 * Copyright (c) 2013 Gianluca Guarini
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 **/!function(e){e.fn.extend({BlackAndWhite:function(t){"use strict";var n=this,r={hoverEffect:!0,webworkerPath:!1,responsive:!0,invertHoverEffect:!1,speed:500,onImageReady:null,intensity:1};t=e.extend(r,t);var i=t.hoverEffect,s=t.webworkerPath,o=t.invertHoverEffect,u=t.responsive,a=typeof t.intensity=="number"&&t.intensity<1&&t.intensity>0?t.intensity:1,f=e.isPlainObject(t.speed)?t.speed.fadeIn:t.speed,l=e.isPlainObject(t.speed)?t.speed.fadeOut:t.speed,c=document.all&&!window.opera&&window.XMLHttpRequest?!0:!1,h=" -webkit- -moz- -o- -ms- ".split(" "),p={},d=function(e){if(p[e]||p[e]==="")return p[e]+e;var t=document.createElement("div"),n=["","Moz","Webkit","O","ms","Khtml"];for(var r in n)if(typeof t.style[n[r]+e]!="undefined"){p[e]=n[r];return n[r]+e}return e.toLowerCase()},v=function(){var e=document.createElement("div");e.style.cssText=h.join("filter:blur(2px); ");return!!e.style.length&&(document.documentMode===undefined||document.documentMode>9)}(),m=!!document.createElement("canvas").getContext,g=e(window),y=function(){return typeof Worker!="undefined"?!0:!1}(),b=d("Filter"),w=[],E=y&&s?new Worker(s+"BnWWorker.js"):!1,S=function(t){e(t.currentTarget).find(".BWfade").stop(!0,!0)[o?"fadeOut":"fadeIn"](l)},x=function(t){e(t.currentTarget).find(".BWfade").stop(!0,!0)[o?"fadeIn":"fadeOut"](f)},T=function(e){typeof t.onImageReady=="function"&&t.onImageReady(e)},N=function(){if(!w.length){E.terminate&&E.terminate();E.close&&E.close();return}E.postMessage({imgData:w[0].imageData,intensity:a});E.onmessage=function(e){w[0].ctx.putImageData(e.data,0,0);T(w[0].img);w.splice(0,1);N()}},C=function(e,t,n,r){var i=t.getContext("2d"),s=e,o=0,u;i.drawImage(e,0,0,n,r);var f=i.getImageData(0,0,n,r),l=f.data,c=l.length;if(E)w.push({imageData:f,ctx:i,img:e});else{for(;o<c;o+=4){var h=l[o]*.3+l[o+1]*.59+l[o+2]*.11;l[o]=~~(h*a+l[o]*(1-a));l[o+1]=~~(h*a+l[o+1]*(1-a));l[o+2]=~~(h*a+l[o+2]*(1-a))}i.putImageData(f,0,0);T(e)}},k=function(t,n){var r=t[0],i=r.src,s=t.width(),u=t.height(),f=t.position(),l={position:"absolute",top:f.top,left:f.left,display:o?"none":"block"};if(m&&!v){var c=r.width,h=r.height;e('<canvas class="BWfade" width="'+c+'" height="'+h+'"></canvas>').prependTo(n);var p=n.find("canvas");p.css(l);C(r,p[0],c,h)}else{l[d("Filter")]="grayscale("+a*100+"%)";e("<img src="+i+' width="'+s+'" height="'+u+'" class="BWFilter BWfade" /> ').prependTo(n);e(".BWFilter").css(e.extend(l,{filter:"progid:DXImageTransform.Microsoft.BasicImage(grayscale=1)"}));T(r)}};this.init=function(t){n.each(function(t,n){var r=e(n),i=r.find("img");i.width()?k(i,r):i.on("load",function(){k(i,r)})});E&&N();if(i){n.on("mouseleave",S);n.on("mouseenter",x)}u&&g.on("resize orientationchange",n.resizeImages)};this.resizeImages=function(){n.each(function(t,n){var r=e(n).find("img:not(.BWFilter)"),i=c?e(r).prop("width"):e(r).width(),s=c?e(r).prop("height"):e(r).height();e(this).find(".BWFilter, canvas").css({width:i,height:s})})};return this.init(t)}})}(jQuery);