this.onmessage=function(e){var t=e.data.imgData,n=e.data.intensity,r=t.data,i=null,s=r.length;for(var o=0;o<s;o+=4){var u=r[o]*.3+r[o+1]*.59+r[o+2]*.11;r[o]=~~(u*n+r[o]*(1-n));r[o+1]=~~(u*n+r[o+1]*(1-n));r[o+2]=~~(u*n+r[o+2]*(1-n))}postMessage(t)};