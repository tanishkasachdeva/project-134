sound="";
status="";
objects=[];

function preload()
{
    sound=loadSound("dandelions.mp3");                                                                                     
}

function setup()
{
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
   
}

function modelLoaded()
{
    console.log("model loaded!");
}

function draw()
{
    image(video,0,0,380,380);
    r=random(255);
    g=random(255);
    b=random(255);
    objectDetector.detect(video,gotResult);

        for(i=0;i<objects.length;i++)
        {
            document.getElementById("status").innerHTML="Status: Objects Detected";
            fill(r,g,b);
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+' '+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if (objects[i].label=="person")
           {
                  document.getElementById("result").innerHTML="Baby Detected";
                  sound.stop();
           }
            else
           {
                  document.getElementById("result").innerHTML="Baby Not Detected";
                  sound.play();
           } 
    

        if (objects[i].length<0)
        {
            document.getElementById("result").innerHTML="Baby Not Detected";
            sound.play(); 
        }   
    }            

}

function gotResult(error,results)
{
    if (error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects=results;
        
    }
}


