!function(Y){"use strict";var c="ht",$=Y[c],L=$.Default,y="prototype",z=$.DataModel[y],R=$.Data[y],Q=null,i=function(P){return"set"+P.charAt(0).toUpperCase()+P.slice(1)};L.getEasing=function(d){var q=Q;return d.indexOf(".")>=0?(d=d.split("."),q=t[d[0]][d[1]]):q=t[d],function(Z){return q(Z,0,1,1)}},L.getCommonEasing=function(n){var U=Q;return n.indexOf(".")>=0?(n=n.split("."),U=t[n[0]][n[1]]):U=t[n],U},R.setAnimation=function(n){var v=this._animation;this._animation=n,v!==n&&(this._animationprocess=Q,this._animationstatus=Q),this.fp("animation",v,n)},R.getAnimation=function(){return this._animation},R.pauseAnimation=function(){this._pauseAnimation||(this._pauseAnimation=!0,this._pauseTime=Date.now())},R.resumeAnimation=function(){delete this._pauseAnimation},Y.requestAnimFrame=function(){return Y.requestAnimationFrame||Y.webkitRequestAnimationFrame||Y.mozRequestAnimationFrame||function(b){Y.setTimeout(b,1e3/60)}}();var n=Y.requestAnimFrame,N=Y.setInterval;z.setAnimationInterval=function(F){var A=this;A.$2a=F,A.$1a!=Q&&(clearInterval(A.$1a),delete A.$1a,A.enableAnimation(F))},z.getAnimationInterval=function(){return this.$2a||"animationFrame"},z.getDataAnimation=function(f){return f.getAnimation()},z.enableAnimation=function(X){var b=this,g=b.getDatas();if(b.$1a==Q){X&&b.setAnimationInterval(X),X=b.getAnimationInterval();var S=function(){var o=b.getAnimationInterval();g.each(function(C){var J=b.getDataAnimation(C);if(C.setAnimation(J),J&&!C._pauseAnimation){var K=J.start;C._animationstatus=C._animationstatus||{},C._animationprocess=C._animationprocess||K.slice(0);for(var X=C._animationstatus,T=C._animationprocess,V=0;V<T.length;V++)if(null!=T[V]){var g;g=X[V]?X[V]:X[V]={$5a:0,$6a:0,$7a:0,$8a:0};var Z=J[T[V]],N=Z.property,j=Z.accessType,w=Z.from,B=Z.to,U=Z.easing||"Quad.easeOut",_=g.$5a,h=Z.frames||60,E=Z.repeat||0,H=Z.duration,n=Z.delay||0,P=Z.interval,Y=g.$6a,k=Z.onUpdate,r=Z.onComplete,S=!1,M=function(){var F;F=H!=Q?L.getCommonEasing(U)(Date.now()-g._startTime,w,B-w,H):L.getCommonEasing(U)(_,w,B-w,h),k?k.call(C,F):j?"style"===j?C.s(N,F):"attr"===j?C.a(N,F):"field"===j&&(C[N]=F):C[i(N)](F),S=!0},f=function(){g._startTime==Q&&(g._startTime=Date.now());var A=C._pauseTime;A!=Q&&(g._startTime+=Date.now()-A),V==T.length-1&&delete C._pauseTime,P!=Q?g.$7a>=P?(g.$7a=0,M()):g.$7a+=isNaN(o)?16.6666:o:M()};if(n?g.$8a>=n?f():g.$8a+=isNaN(o)?16.6666:o:f(),S)if(H!=Q){if(Date.now()-g._startTime>H)if(E===!0)g._startTime=Date.now();else if(Y=g.$6a=Y+1,Y>E)if(r&&r.call(C),Z.next)X[V]=Q,T[V]=Z.next;else{X[V]=Q,T[V]=Q;for(var p=!0,O=0;O<T.length;O++)null!=T[O]&&(p=!1);p&&(C.setAnimation(Q),C._animationstatus=Q,C._animationprocess=Q,C._pauseTime=Q)}}else if(_=g.$5a=_+1,_>h)if(E===!0)_=g.$5a=0;else if(Y=g.$6a=Y+1,Y>E)if(r&&r.call(C),Z.next)X[V]=Q,T[V]=Z.next;else{X[V]=Q,T[V]=Q;for(var p=!0,O=0;O<T.length;O++)null!=T[O]&&(p=!1);p&&(C.setAnimation(Q),C._animationstatus=Q,C._animationprocess=Q)}}}}),"animationFrame"===o&&b.$1a!=Q&&(b.$1a=n(S))};b.$1a="animationFrame"===X?n(S):N(S,X)}},z.disableAnimation=function(){var n=this,u=n.getAnimationInterval();"animationFrame"===u||clearInterval(n.$1a),delete n.$1a};var t={Linear:function(Q,X,l,I){return l*Q/I+X},Quad:{easeIn:function(U,F,r,M){return r*(U/=M)*U+F},easeOut:function(w,W,N,i){return-N*(w/=i)*(w-2)+W},easeInOut:function(W,r,k,e){return(W/=e/2)<1?k/2*W*W+r:-k/2*(--W*(W-2)-1)+r}},Cubic:{easeIn:function(t,O,B,e){return B*(t/=e)*t*t+O},easeOut:function(G,b,K,y){return K*((G=G/y-1)*G*G+1)+b},easeInOut:function(U,H,a,F){return(U/=F/2)<1?a/2*U*U*U+H:a/2*((U-=2)*U*U+2)+H}},Quart:{easeIn:function(J,u,d,D){return d*(J/=D)*J*J*J+u},easeOut:function(k,j,u,a){return-u*((k=k/a-1)*k*k*k-1)+j},easeInOut:function(V,t,w,o){return(V/=o/2)<1?w/2*V*V*V*V+t:-w/2*((V-=2)*V*V*V-2)+t}},Quint:{easeIn:function(b,J,F,A){return F*(b/=A)*b*b*b*b+J},easeOut:function(C,Y,G,A){return G*((C=C/A-1)*C*C*C*C+1)+Y},easeInOut:function(c,s,E,O){return(c/=O/2)<1?E/2*c*c*c*c*c+s:E/2*((c-=2)*c*c*c*c+2)+s}},Sine:{easeIn:function(H,J,X,A){return-X*Math.cos(H/A*(Math.PI/2))+X+J},easeOut:function(o,v,f,z){return f*Math.sin(o/z*(Math.PI/2))+v},easeInOut:function(z,s,R,B){return-R/2*(Math.cos(Math.PI*z/B)-1)+s}},Expo:{easeIn:function(k,I,P,H){return 0==k?I:P*Math.pow(2,10*(k/H-1))+I},easeOut:function(W,O,D,p){return W==p?O+D:D*(-Math.pow(2,-10*W/p)+1)+O},easeInOut:function(A,f,h,u){return 0==A?f:A==u?f+h:(A/=u/2)<1?h/2*Math.pow(2,10*(A-1))+f:h/2*(-Math.pow(2,-10*--A)+2)+f}},Circ:{easeIn:function(v,p,S,E){return-S*(Math.sqrt(1-(v/=E)*v)-1)+p},easeOut:function(k,P,C,f){return C*Math.sqrt(1-(k=k/f-1)*k)+P},easeInOut:function(v,t,w,d){return(v/=d/2)<1?-w/2*(Math.sqrt(1-v*v)-1)+t:w/2*(Math.sqrt(1-(v-=2)*v)+1)+t}},Elastic:{easeIn:function(F,W,D,l,S,k){var A;return 0==F?W:1==(F/=l)?W+D:("undefined"==typeof k&&(k=.3*l),!S||S<Math.abs(D)?(A=k/4,S=D):A=k/(2*Math.PI)*Math.asin(D/S),-(S*Math.pow(2,10*(F-=1))*Math.sin((F*l-A)*2*Math.PI/k))+W)},easeOut:function(l,y,I,w,E,Q){var X;return 0==l?y:1==(l/=w)?y+I:("undefined"==typeof Q&&(Q=.3*w),!E||E<Math.abs(I)?(E=I,X=Q/4):X=Q/(2*Math.PI)*Math.asin(I/E),E*Math.pow(2,-10*l)*Math.sin((l*w-X)*2*Math.PI/Q)+I+y)},easeInOut:function(a,S,t,I,C,r){var n;return 0==a?S:2==(a/=I/2)?S+t:("undefined"==typeof r&&(r=I*.3*1.5),!C||C<Math.abs(t)?(C=t,n=r/4):n=r/(2*Math.PI)*Math.asin(t/C),1>a?-.5*C*Math.pow(2,10*(a-=1))*Math.sin((a*I-n)*2*Math.PI/r)+S:.5*C*Math.pow(2,-10*(a-=1))*Math.sin((a*I-n)*2*Math.PI/r)+t+S)}},Back:{easeIn:function(F,D,d,v,G){return"undefined"==typeof G&&(G=1.70158),d*(F/=v)*F*((G+1)*F-G)+D},easeOut:function(G,g,_,s,C){return"undefined"==typeof C&&(C=1.70158),_*((G=G/s-1)*G*((C+1)*G+C)+1)+g},easeInOut:function(Q,x,P,A,m){return"undefined"==typeof m&&(m=1.70158),(Q/=A/2)<1?P/2*Q*Q*(((m*=1.525)+1)*Q-m)+x:P/2*((Q-=2)*Q*(((m*=1.525)+1)*Q+m)+2)+x}},Bounce:{easeIn:function(Y,H,u,D){return u-t.Bounce.easeOut(D-Y,0,u,D)+H},easeOut:function(k,o,p,t){return(k/=t)<1/2.75?p*7.5625*k*k+o:2/2.75>k?p*(7.5625*(k-=1.5/2.75)*k+.75)+o:2.5/2.75>k?p*(7.5625*(k-=2.25/2.75)*k+.9375)+o:p*(7.5625*(k-=2.625/2.75)*k+.984375)+o},easeInOut:function(A,k,q,$){return $/2>A?.5*t.Bounce.easeIn(2*A,0,q,$)+k:.5*t.Bounce.easeOut(2*A-$,0,q,$)+.5*q+k}}}}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);