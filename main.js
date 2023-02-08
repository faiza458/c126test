song1="";
song2="";
leftWristX = 0 ;
leftWristY = 0 ;
rightWristX = 0 ;
rightWristY = 0 ;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song_name ="";


function preload(){
song1 = loadSound("music.mp3");
song2 = loadSound("music2.mp3");
}

function setup(){

    canvas = createCanvas(600,500);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded); 
    poseNet.on('pose', gotPoses);
    }





function draw(){
image(video,0,0,600,500);


fill("#FF0000");
stroke("#FF0000");

song_name = song1.isPlaying();
console.log(song_name);

if(scoreLeftWrist > 0.2){
    circle(leftWristX,leftWristY,20);
    song2.stop();
    if(song1 == false){
        song1.play();
            console.log("Song Name: song1");
        document.getElementById("song_id").innerHTML = "Song Name: song1";
    }
}
}

if(scoreRightWrist > 0.2){
    circle(rightWristX,rightWristY,20);
    song1.stop();
    if(song2 == false){
        song2.play();
    }
    else{
        console.log("Song Name: song2");
        document.getElementById("song_id").innerHTML = "Song Name: song2";
    }
}




function modelLoaded(){
    console.log('poseNet is Initialized');
}



function gotPoses(results){
    if(results.length > 0)
    {console.log(results); 
    

 scoreLeftWrist = results[0].pose.keypoints[9].score;
console.log("scoreLeftWrist = " + scoreLeftWrist + "scoreRightWrist = " + scoreRightWrist);

scoreRightWrist = results[0].pose.keypoints[10].score;
console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX +"leftWristY = " + leftWristY );
    
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY );
    }
}
