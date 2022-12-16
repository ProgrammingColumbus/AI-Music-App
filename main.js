//Start

song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
song1Status = "";
song2Status = "";
scoreRightWrist = 0;


function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(500, 400);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet: Initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        console.log("Left Wrist X:  " + leftWristX + ", Left Wrist Y:  " + leftWristY);
        console.log("Right Wrist X:  " + rightWristX + ", Right Wrist Y:  " + rightWristY);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("[scoreLeftWrist]  :  " + scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score Right Wrist:  " + scoreRightWrist);
    }
}

function draw(){
    image(video, 0, 0, 500, 400);
    song1Status = song1.isPlaying();
    song2Status = song2.isPlaying();
    fill("#7f60AA");
    stroke("#09ADFA");
    if(scoreLeftWrist > 0.2){
        circle(leftWristX - 80, leftWristY - 70, 20);
        song1.stop();
        console.log("Song1 Stopped");
        if(song2Status == false){
            song2.play();
            document.getElementById("head1").innerHTML = "Song: Peter Pan"; 
        }

    }
    if(scoreRightWrist > 0.2){
        circle(rightWristX - 80, rightWristY - 70, 20);
        song2.stop();
        console.log("Song2 Stopped");
        if(song1Status == false){
            song1.play();
            document.getElementById("head1").innerHTML = "Song: Harry Potter Theme Song";
        }
    }

}
