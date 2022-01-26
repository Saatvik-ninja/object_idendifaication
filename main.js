img="";
status="";
objects=[];
function preload(){
img=loadImage('tiger.jpg');
}


function setup(){
canvas=createCanvas(380,380);
canvas.position(500,150);
video=createCapture(VIDEO);
video.size(380,380);
video.hide();
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="status- detecting objects";
}


function draw(){
image(video,0,0,380,380);
if(status != ""){
    r=random(255);
    g=random(255);
    b=random(255);
    objectDetector.detect(video,gotResult);
    for(i=0; i<objects.length; i++){
        document.getElementById("status").innerHTML="status- objects detected";
        document.getElementById("number-of-objects").innerHTML="number of objects detected are- "+objects.length;
        fill(r,g,b);
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+  percent  +"%",objects[i].x,objects[i].y);
        noFill();
        stroke("r,g,b");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
}
}

function modelLoaded(){
    console.log("model loaded started");
    status=true;
    objectDetector.detect(video,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}