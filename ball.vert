precision highp float;
 varying vec2 vPos;
attribute vec3 aPosition;

void main(){
    vPos =aPosition.xy;
    vPos=vPos*2.0-1.0;
    gl_Position=vec4(vPos,aPosition.z,1.0);
    }
