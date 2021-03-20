

var questionEl = document.getElementById("question");
var containerEl = document.getElementById("container");
var startbtnEl = document.getElementById("startbtn");
var choice1El = document.getElementById("choice1");
var choice2El = document.getElementById("choice2");
var choice3El = document.getElementById("choice3");
var choice4El = document.getElementById("choice4");
var scoreEl = document.getElementById("score");
var showScoreEl = document.getElementById("showScore");
var answerStatusEl = document.getElementById("answerStatus");
var timeEl = document.getElementById("time");
var highscoreEl = document.getElementById("highscore");
var highscorebtnEl = document.getElementById("highscorebtn");
var headerEl = document.getElementById("header");
var gobackEl = document.getElementById("goback");
var initialsEl = document.getElementById("initials");
var submitInitial = document.getElementById("submit");
var clearScoreEl = document.getElementById("clearScore");
var questionTypeEl = document.getElementById("questionType");
var getInputEl =document.getElementById("getInput");

timeEl.textContent = timer;
// var timeInterval;
var questionIndex = 0;
var score = 0;
var timer = 50
var highScoreData = []

questionEl.style.display = "none";
scoreEl.style.display = "none";
highscoreEl.style.display ="none";

startbtnEl.addEventListener("click", function(){
    questionEl.style.display = "block";       //After click on startquiz button Question1 appears here
    containerEl.style.display = "none";  
         //Start quiz page disappers
         timer=50;
         questionIndex=0
         timeEl.textContent = timer;
    setTime();
    readQuestion()
})


function setTime(){
    timeInterval = setInterval(function(){
       timer--;
       timeEl.textContent = timer;
       if(timer <= 0 || myQuestions.length == questionIndex ){
           clearInterval(timeInterval);
           timer = 0
           timeEl.textContent = timer;
           //show gameover
           scoreEl.style.display = "block";
           questionEl.style.display = "none";
           showScoreEl.textContent = score;
       }
   },1000)
}

//function question
function readQuestion(){

   choice1El.disabled=false;  //button Enabled
   choice2El.disabled=false;
   choice3El.disabled=false;
   choice4El.disabled=false;

   questionTypeEl.textContent = myQuestions[questionIndex].question;
   var answer = myQuestions[questionIndex].answers;
   answer.forEach(function(item,index){ // item is the list value, index is the list index
       document.getElementById('choice'+(index+1)).textContent = item // '.fontSize()'     
   })
}

var myQuestions = [
    {
        question: "Which of the following methods could be called to change a font-size of the content of an element?",
        answers:[
            ".fontSize()" ,
            ".appendChild()",
            ".setAttribute()",
            ".querySelector()" ],
        correctAnswer: ".fontSize()"
    },    

    {
        question: "What is the JavaScript syntax for printing values in Console?",
        answers: [
          "print(5)",
          "console.print(5);",
          "print.console(5);",
          "console.log(5);"],
        correctAnswer: "console.log(5);"
      },            
     
    {
        question: "_______ is the process of finding errors and fixing them within a program.",
        answers:[
            "Compiling" ,
            "Executing",
            "Debugging",
            "Scanning" ],
        correctAnswer: "Debugging"
    },              
    
    {
        question: "Kim has just constructed her first for loop within the Java language .Which of the following is not a required part of a for loop?",
        answers:[
            "Initialization" ,
            "Condition",
            "Variable",
            "Increment" ],
        correctAnswer: "Variable"
    },    
    {
        question: "What is the syntax for creating a function in JavaScript named as Geekfunc?",
        answers: [
          "function = Geekfunc()",
          "function Geekfunc()",
          "function := Geekfunc()",
          "function : Geekfunc()"],
        correctAnswer: "function Geekfunc()"
    },          
];


//Check answers function

choice1El.addEventListener("click" ,checkAnswer);
choice2El.addEventListener("click" ,checkAnswer);
choice3El.addEventListener("click" ,checkAnswer);
choice4El.addEventListener("click" ,checkAnswer);


function checkAnswer(event){
    choice1El.disabled=true;
    choice2El.disabled=true;
    choice3El.disabled=true;
    choice4El.disabled=true;

    
    var selectedAnswer = event.target.innerHTML;
    if(selectedAnswer == myQuestions[questionIndex].correctAnswer){
        score++;
        answerStatusEl.textContent = "Correct";
        // show question 2 hide question 1
        questionIndex++ 
         var timeInterval = setInterval(function(){
            answerStatusEl.textContent = "";
            if(questionIndex < myQuestions.length){
                readQuestion()
            }
            clearInterval(timeInterval)
        } , 2000)           
    } else{
        answerStatusEl.textContent = "InCorrect";
        timer = timer-10;
        timeEl.textContent = timer;
        // show question 2 hide question 1  timer -10sec
        questionIndex++ 
         var timeInterval = setInterval(function(){
            answerStatusEl.textContent = "";   
            if(questionIndex < myQuestions.length){      //1<5 so questions are there
                readQuestion()
            }
            clearInterval(timeInterval)
        } , 2000) 
    }
}


//Getting score from local storage
function pullHighScore(){
    highScoreData = JSON.parse(localStorage.getItem("allScores"));


}
// showing gameover screen and setting initial and score  to local storage

submitInitial.addEventListener("click",function(){
    highscoreEl.style.display = "block";
    containerEl.style.display = "none";
    headerEl.style.display = "none";
    scoreEl.style.display = "none";
    var grade = {
        initial : initialsEl.value,
        score: score,
    }
    pullHighScore()
    if(highScoreData == null) { 
        highScoreData = []
    };
    highScoreData.push(grade) 
    localStorage.setItem("allScores", JSON.stringify(highScoreData));
    setHighScore()
})


// on click hightscore button
highscorebtnEl.addEventListener("click", function(){
    highscoreEl.style.display = "block";
    containerEl.style.display = "none";
    headerEl.style.display = "none";
    scoreEl.style.display = "none";
    setHighScore()
})



function setHighScore(){
    getInputEl.innerHTML = ''
    var sortedHighScoreData = []
    pullHighScore()
    if(highScoreData) {
        sortedHighScoreData = highScoreData.sort(function(a,b){
            if(a.score > b.score) {
                -1
            }else {
                1
            }
        })
    }
    sortedHighScoreData.forEach(function(item,index){
        var listNode = document.createElement('li')
        listNode.textContent = item.initial + ' - ' + item.score
        getInputEl.appendChild(listNode)
    })
}


//Go back button
gobackEl.addEventListener("click",function(){
    containerEl.style.display = "block";
    highscoreEl.style.display = "none";
    headerEl.style.display = "flex";
})

//Clear score button
clearScoreEl.addEventListener("click",function(){
    localStorage.clear();
     setHighScore()

})












// highScoreData.forEach(function(iten, index){
// getInput.appendChild(<li>item.intial -- item.score</li>)
// })

// if(e,target,innerHTML === question.correctAnswer} 
//     score++, 
//     question1 hide 
//     question2 show,
//     answerStuats show 
//     answerStatus.textcontent = 'correct' 
// else {
//     question1 hide
//     question2 show 
//     answerStuats show 
//     answerStatus.textcontent = 'Incorrect '+ question.correctAnswer
//     timer = timer - 5