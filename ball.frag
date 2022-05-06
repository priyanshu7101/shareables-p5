precision highp float; varying vec2 vPos;
void main(){
vec2 t=vPos;t=(t+1.0)*0.5;
float n=1.-t.x*t.x-t.y*t.y;
n=clamp(n,0.,1.);
gl_FragColor = vec4(n,n,n,0.3);}
