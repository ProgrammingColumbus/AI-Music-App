//Start

song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;


function preload(){
    song = loadSound("music.mp3");
    song = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(500, 400);
    canvas.position(400, 200);

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
    }
}

function draw(){
    image(video, 0, 0, 500, 400);
}

function playSound(){
    song.play();
}

