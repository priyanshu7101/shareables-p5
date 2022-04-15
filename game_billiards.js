let b=[];let bi=6,limit,radius=20,holedia=radius*1.7,ke=0,frameC,w=0,holex=2,holey=3,posx=0,posy=1,checkhit,gravity=0.0;
//let bound=[70,50,380,580];
let bound=[370,100,680,630];
bound[4]=(bound[2]-bound[0]);bound[5]=bound[3]-bound[1];
let balls=[],holes=[],future=[],sup=0,fh,fh2;

for(let i=1;i<bi;i++)for(let j=0;j<i;j++){balls[sup++]=(1-i)/2+j;balls[sup++]=i; }

for(let i=0;i<holex;i++)for(let j=0;j<holey;j++){holes[w++]=bound[0]+bound[4]*i/(holex-1);holes[w++]=bound[1]+bound[5]*j/(holey-1);}
function setup() {
  createCanvas(windowWidth-50, windowHeight-50);
  limit=sup/2+1;sup=0;
  b[0]=new bubble(bound[0]+(bound[4])/2,bound[1]+(bound[5])*3/4,0);
  for(let i=1;i<limit;i++)
 if(bi>8) b[i]= new bubble(random(bound[0]+radius/2,bound[2]-radius/2),random(bound[1]+radius/2,bound[3]-radius/2),i);
  else b[i]= new bubble(bound[0]+(bound[4])/2+(balls[sup++])*radius,bound[1]+(bound[5])/4+bi-(balls[sup++])*radius,i);

 may= createP('');
 futureball=new bubble(bound[0]+(bound[4])/2,bound[1]+(bound[5])*3/4,-1);
 fh=new bubble(0,0,-2);fh2=new bubble(0,0,0);
}
 
let x1 = 0,  x2 = 0,  v1 = 0,  v2 = 0,
  y=500,
  t = 0,  max = 0,  min = 0;

function draw() {
  ke=0;frameC=frameCount;
  may.html(int(frameRate()));
  y = height;
 background(250);
colorMode(RGB);
 fill(240,190,160);
 rect(bound[0]-holedia/2,bound[1]-holedia/2,bound[4]+holedia,bound[5]+holedia,5);//draws side bar

 fill(100,250,100);
 stroke(0);
 rect(bound[0],bound[1],bound[4],bound[5]);//draws green
 
 fill(0);
 w=0;
 for(let i=0;i<holex;i++)for(let j=0;j<holey;j++)ellipse(holes[w++],holes[w++],holedia);//holes

 if(abs(b[0].v1*b[0].v2)<0.01){b[0].throws();}
 if(b[0].mov==1){ b[0].move();}b[0].sinks();if(b[0].mov==1) b[0].makeup();//cue things
 if(b[0].mov==-1){fh2.x1=mouseX;fh2.x2=mouseY;fh2.makeup();}

 //cue prediction
futureball.x1=b[0].x1;futureball.x2=b[0].x2;futureball.mov=2;futureball.throws();
w=0;checkhit=0;
future[w++]=futureball.x1;future[w++]=futureball.x2;
for(i=0;i<50;i+=2){
  for(let j=1;j<limit;j++)
  {fh.x1=b[j].x1;fh.x2=b[j].x2;
    fh.v1=b[j].v1;fh.v2=b[j].v2;
   fh2.v1=b[j].v1;fh2.v2=b[j].v2;
    futureball.hits(fh);
   if(!(fh.v1==fh2.v1 && fh.v2==fh2.v2) )
   {fh2.v1=fh.v1;fh2.v2=fh.v2;fh2.x1=fh.x1;fh2.x2=fh.x2;break;}
}
  futureball.move();
  future[w++]=futureball.x1;future[w++]=futureball.x2;
   stroke(0);
  if(abs(b[0].v1*b[0].v2)<0.01 && b[0].mov==1){
 line(future[i],future[i+1],future[i+2],future[i+3]);
 }
 stroke(255);
 line(fh2.x1,fh2.x2,20*fh2.v1+fh2.x1,20*fh2.v2+fh2.x2);
}

 
 for(let i=1;i<limit;i++){//balls all functions
 for(let j=0;j<limit;j++)
 if(i!=j)
 b[i].hits(b[j]);
 if(b[i].mov==1)  { b[i].move();b[i].sinks();}
 b[i].makeup(); 
} 


}

//class bubble-=-=-=-=-=-=-=-=-=-=--=-=-=-
class bubble{
  constructor(x,y,id){
    this.x1=x;
    this.x2=y;
    this.v1=0;
    this.v2=0;
    this.id=id;
    this.mov=1;
  }
move(){
  this.v1=mina(this.v1,30); this.v2=mina(this.v2,30);
  this.v1*=0.985;this.v2*=0.985;
  if ((this.x1 <= bound[0]+radius/2 || this.x1 > bound[2]-radius/2) && (this.x1 - bound[0]-radius/2 ) * this.v1 > 0) {this.v1*=-0.92;}//wall collision and energy reduction
  if ((this.x2 <= bound[1]+radius/2 || this.x2 > bound[3]-radius/2) && (this.x2 - bound[1]-radius/2 ) * this.v2 > 0) {this.v2*=-0.92;}//wall collision and energy reduction
  else this.v2 += gravity;//gravity 

  {this.x1 += this.v1;this.x2 += this.v2;}//move
}
throws(){
  if (mouseIsPressed || this.mov==2)//mov=2 for futureball
   {
    this.v1 = mina(( this.x1-mouseX) / 7,20);
    this.v2 = mina(( this.x2-mouseY) / 7,20);
    if(this.id==0 && this.mov==-1){this.x1=mouseX;this.x2=mouseY;this.v1=0;this.v2=0;this.mov=1;}
   }
   else if(!(mouseIsPressed)) this.mov=1;
   
}
hits(bi){let k=(dist(this.x1+this.v1,this.v2+this.x2,bi.x1+bi.v1,bi.x2+bi.v2));
  if(bi!=this && bi.mov*this.mov==1){
if(k<radius )hit(this,bi);}
else if(k<radius )hit(this,bi);
}

sinks(){w=0;
  for(let i=0;i<holex;i++)for(let j=0;j<holey;j++)
 { let k=dist(this.x1,this.x2,holes[w++],holes[w++]);
if(k<holedia/2){this.mov=0;if(this.id!=0){this.x1=bound[0]+(posx)*(radius+4);this.x2=bound[3]+(posy)*(holedia);posx++;if(posx>=bound[4]/radius){posx=0;posy++;}}
else {this.v1=0;this.v2=0;this.mov=-1;}}
}//end of loops
}//end of sinks

makeup(){
  stroke(40);
  
  colorMode(HSB);
  fill((360/limit * this.id-1),50,100);
    if(this.id==0)fill(255);
  ellipse(this.x1, this.x2, radius);
}
}


function hit(t1,t2){//calculates post hit velocities called in hits
  let matv=[],matr=[],matk=[],ker=0,ker2,ver;
 matv=[t1.v1,t1.v2,t2.v1,t2.v2];

ver=createVector(t1.x1-t2.x1,t1.x2-t2.x2);

ker2=sqrt(ver.x*ver.x+ver.y*ver.y);

ver.x=ver.x/ker2;
ver.y=ver.y/ker2;
// ker2=ker2-radius;

matr=[ver.x,-1*(ver.y),ver.y,ver.x];

matk=matmul(matv,matr);

ker=Math.abs(matk[0]-matk[2]);

//ker=ker2/ker;//time in frames from detection to collision
ker2=matk[0];matk[0]=matk[2];matk[2]=ker2;

matr[1]*=-1;matr[2]*=-1;

matv=matmul(matk,matr);
t1.v1=matv[0];t1.v2=matv[1];t2.v1=matv[2];t2.v2=matv[3];

}

function matmul(mata,matb){let matc=[]; //matrix multipication
  for(let i=0;i<2;i++)for(let j=0;j<2;j++){matc[2*i+j]=0;for(let k=0;k<2;k++){matc[2*i+j]+=mata[2*i+k]*matb[j+2*k];}}
  return matc;
}

function mina(leta,letb){//absolute minimum of two return original
 if(leta*leta>letb*letb) {return (letb*leta/abs(leta));} else{ return (leta);}
}
