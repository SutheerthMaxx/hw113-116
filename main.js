result1="";
result2="";

Webcam.set({
    width : 350 ,
    height :300 ,
    image_format : "png" ,
    png_quality : 100
});

camera =document.getElementById("camera");

Webcam.attach(camera);

function capture()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src = "'+data_uri+'"/>'
    });
}

console.log('ml5 version' , ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/EnXTw2w8K/model.json" , modelloaded);
function modelloaded()
{
    console.log("model is loaded");
}

function speak()
{
    var synth = window.speechSynthesis;
    speak1 = "The First Prediction is " + result1;
    speak2 = "The Second Prediction is" + result2;
    utterthis = new SpeechSynthesisUtterance(speak1 + speak2);
    synth.speak(utterthis);
}

function show()
{
    img =  document.getElementById("captured_image");
    classifier.classify(img , gotresult);
}

function gotresult(error , results )
{
    if (error)
    {
        console.log(error);
    } else
    {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;

        result1 = results[0].label;
        result2 = results[1].label;
       speak();

       if(results[0].label == "happy")
       {
        document.getElementById("Emoji").innerHTML = "&#128512;" ;
       }
       if(results[0].label == "sad")
       {
        document.getElementById("Emoji").innerHTML = "&#128532;" ;
       }
       if(results[0].label == "angry")
       {
        document.getElementById("Emoji").innerHTML = "&#128545;" ;
       }
       
       if(results[1].label == "happy")
       {
        document.getElementById("Emoji_2").innerHTML = "&#128512;" ;
       }
       if(results[1].label == "sad")
       {
        document.getElementById("Emoji_2").innerHTML = "&#128532;" ;
       }
       if(results[1].label == "angry")
       {
        document.getElementById("Emoji_2").innerHTML = "&#128545;" ;
       }

    }
}
