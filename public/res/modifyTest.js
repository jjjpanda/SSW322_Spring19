var test;

window.onload = function() {
    testname = localStorage.getItem("displayTestName")
    loadTest = JSON.parse(localStorage.getItem(testname))
    document.getElementById("testName").value = testname
    console.log(loadTest)
    loadQuestions(loadTest["questions"]);
}

function loadQuestions(testQuestions) {
    for (question of testQuestions) {
        if (question.questionType == "trueFalse") {
            writeQuestion("trueFalse")
            document.getElementsByName("question"+question["number"]+"Prompt")[0].value = question['prompt']
            if(question["answer"] = true) {
                document.getElementsByName("question"+question['number'])[0].checked = true
            }
            if(question["answer"] = false) {
                document.getElementsByName("question"+question['number'])[1].checked = true
            }
        }
        if (question.questionType == "multipleChoice") {
            writeQuestion('multipleChoice')
            document.getElementsByName("question"+question["number"]+"Prompt")[0].value = question['prompt']
            for(choice of question["answerChoices"]) {
                addMultipleChoiceAnswer(document.getElementById('question'+question["number"]+'Answers'), question["number"])
                //document.getElementById("question"+question["number"]+"Answers").children.getElementsByClassName("questionPromptCreate")[0].value = choice
            }
            for (i = 0; i < document.getElementsByName("question"+question['number']).length; i++) {
                if(question["answer"] = i)
                    document.getElementsByName("question"+question['number'])[i].checked = true
            }
        }
        if (question.questionType == "shortAnswer") {
            writeQuestion('shortAnswer')
            document.getElementsByName("question"+question["number"]+"Prompt")[0].value = question['prompt']
            document.getElementsByName("question"+question['number'])[0].value = question["answer"]
        }
        if (question.questionType == "essayAnswer") {
            writeQuestion('essayAnswer')
            document.getElementsByName("question"+question["number"]+"Prompt")[0].value = question['prompt']
            document.getElementsByName("question"+question['number'])[0].value = question["answer"]
        }
        if (question.questionType == "matching") {
            writeQuestion('matching')
            document.getElementsByName("question"+question["number"]+"Prompt")[0].value = question['prompt']
        }
        if (question.questionType == "ranking") {
            writeQuestion('ranking')
            document.getElementsByName("question"+question["number"]+"Prompt")[0].value = question['prompt']
        }
    }
}

var questionNumber = 1
function addQuestion(type, number) {
    if (type == "trueFalse"){
        test["questions"].push({'questionType':'trueFalse', 'number':number});
        return '<div class="question"><span class="questionNumber">'+number+'</span><input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt"><div class="questionAnswers" id="question'+number+'Answers"><input class="trueFalse" type="radio" name="question'+number+'" placeholder="option1"> True<br><input class="trueFalse" type="radio" name="question'+number+'" placeholder="option2"> False<br></div></div><br>';
    }
    if (type == "multipleChoice"){
        test["questions"].push({'questionType':'multipleChoice', 'number':number});
        output = '<div class="question"><span class="questionNumber">'+number+'</span><input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt"><div class="questionAnswers" id="question'+number+'Answers"></div>'
        output += '<button class="addButton" onclick="addMultipleChoiceAnswer(document.getElementById(\'question'+number+'Answers\'), '+number+')">+</button>';
        output += '<button class="addButton" onclick="delMultipleChoiceAnswer(document.getElementById(\'question'+number+'Answers\'))">-</button></div>';
        return output;
    }
    if (type == "shortAnswer"){
        test["questions"].push({'questionType':'shortAnswer', 'number':number});
        return '<div class="question"><span class="questionNumber">'+number+'</span><input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt"><div class="questionAnswers" id="question'+number+'Answers"><input class="shortAnswer" type="text" name="question'+number+'" placeholder="Short Answer"></div></div><br>';
    }
    if (type == "essayAnswer"){
        test["questions"].push({'questionType':'essayAnswer', 'number':number});
        return '<div class="question"><span class="questionNumber">'+number+'</span><input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt"><div class="questionAnswers" id="question'+number+'Answers"><input class="essayAnswer" type="text" name="question'+number+'" placeholder="Essay Answer"></div></div><br>';
    }
    if (type == "matching"){
        test["questions"].push({'questionType':'matching', 'number':number});
        output = '<div class="question"><span class="questionNumber">'+number+'</span><input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt"><div class="questionAnswers" id="question'+number+'Answers"></div>'
        output += '<button class="addButton" onclick="addMatchingChoiceAnswer(document.getElementById(\'question'+number+'Answers\'), '+number+')">+</button>';
        output += '<button class="addButton" onclick="delMatchingChoiceAnswer(document.getElementById(\'question'+number+'Answers\'))">-</button></div>';
        return output;
    }
    if (type == "ranking"){
        test["questions"].push({'questionType':'ranking', 'number':number});
        output = '<div class="question"><span class="questionNumber">'+number+'</span><input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt"><br><div class="questionAnswers" id="question'+number+'Answers"></div>';
        output += '<button class="addButton" onclick="addRankingChoiceAnswer(document.getElementById(\'question'+number+'Answers\'), '+number+')">+</button>';
        output += '<button class="addButton" onclick="delRankingChoiceAnswer(document.getElementById(\'question'+number+'Answers\'))">-</button></div>';
        return output;
    }
}

function writeToScreen(text) {
    output = document.getElementById("questionDiv");
    var pre = document.createElement("p");
	pre.style.wordWrap = "break-word";
	pre.innerHTML = text;
    output.appendChild(pre);
    showDeleteButton()
}

function writeQuestion(type) {
    writeToScreen(addQuestion(type, questionNumber));
    questionNumber++;
    var x = document.getElementById("submitButton");
    if(questionNumber > 1){
        x.style.display = "block";
    }
    console.log(test)
}

function hideDeleteButton() {
    var x = document.getElementById("deleteButton");
    if (x.style.display === "block") {
      x.style.display = "none";
    }
}

function showDeleteButton() {
    var x = document.getElementById("deleteButton");
    if (x.style.display === "none") {
      x.style.display = "block";
    }
}

function deleteLastQuestion() {
    output = document.getElementById("questionDiv");
    if (output.lastChild != null) {
        output.removeChild(output.lastChild);
        test["questions"].pop();
        questionNumber--;
    }
    var x = document.getElementById("submitButton");
    if (questionNumber == 1){
        hideDeleteButton()
        x.style.display = "none";
    }

}

function addMultipleChoiceAnswer(answerDIV, number) {
    var pre = document.createElement("div");
    pre.innerHTML = '<input class="multipleChoice" type="radio" name="question'+number+'" placeholder="option'+answerDIV.children.length+'"><input class="questionPromptCreate" type="text" name="question'+number+'Text'+answerDIV.children.length+'" placeholder="Question Answer"><br>';
    answerDIV.appendChild(pre)
}

function delMultipleChoiceAnswer(answerDIV) {
    answerDIV.removeChild(answerDIV.lastChild);
}

function addMatchingChoiceAnswer(answerDIV, number) {
    var pre = document.createElement("div");
    pre.innerHTML = '<input class="matchningPromptCreate" type="text" name="question'+number+'_'+answerDIV.children.length+'_1" placeholder="Question Prompt"> = <input class="matchningPromptCreate" type="text" name="question'+number+'_'+answerDIV.children.length+'_2" placeholder="Question Answer"></input>';
    answerDIV.appendChild(pre)
}

function delRankingChoiceAnswer(answerDIV) {
    answerDIV.removeChild(answerDIV.lastChild);
}

function addRankingChoiceAnswer(answerDIV, number) {
    var pre = document.createElement("div");
    pre.innerHTML = '<input class="rankingPromptCreate" type="text" name="question'+number+'_'+answerDIV.children.length+'" placeholder="Question Answer '+(answerDIV.children.length+1)+'">';
    answerDIV.appendChild(pre)
}

function delMatchingChoiceAnswer(answerDIV) {
    answerDIV.removeChild(answerDIV.lastChild);
}

function submit(){
    for(question of test["questions"]){
        var prompt = document.getElementsByName("question"+question["number"]+"Prompt")[0].value;
        question['prompt'] = prompt;
        if (question["questionType"] === "trueFalse"){
            choices = document.getElementsByName("question"+question['number']);
            if(document.getElementsByName("question"+question['number'])[0].checked){
               question["answer"] = true;
            }
            if(document.getElementsByName("question"+question['number'])[1].checked){
                question["answer"] = false;
            }
        }
        if (question["questionType"] === "multipleChoice"){
            choices = document.getElementById("question"+question["number"]+"Answers").children
            question['answer'] = [];
            question['answerChoices'] = [];
            for(choice of choices){
                question["answerChoices"].push(choice.getElementsByClassName("questionPromptCreate")[0].value);
            }
            for (i = 0; i < document.getElementsByName("question"+question['number']).length; i++) {
                if(document.getElementsByName("question"+question['number'])[i].checked)
                    question["answer"] = i;
            }
        }
        if (question["questionType"] === "shortAnswer"){
            question["answer"] = document.getElementsByName("question"+question['number'])[0].value;
        }
        if (question["questionType"] === "essayAnswer"){
            question["answer"] = document.getElementsByName("question"+question['number'])[0].value;
        }
        if (question["questionType"] === "matching"){
            choices = document.getElementById("question"+question["number"]+"Answers").getElementsByClassName("matchningPromptCreate")
            question['answer'] = [];
            i = 0;
            for(choice of choices){
                if( i % 2 == 0){
                    question["answer"].push({ "prompt":choice.value});
                }
                if( i% 2 == 1){
                    question["answer"][(i-1)/2]["answer"] = choice.value;
                }
                i++;
            }
        }
        if (question["questionType"] === "ranking"){
            answers = document.getElementById("question"+question["number"]+"Answers").getElementsByClassName("rankingPromptCreate")
            question['answer'] = [];
            for(answer of answers){
                question["answer"].push(answer.value);
            }
        }
    }
    localStorage.setItem("displayTestName", document.getElementById("testName").value);
    localStorage.setItem(document.getElementById("testName").value, JSON.stringify(test));
    console.log(test)
    window.location.href ='displayTest.html';
}

function changeType(type) {
    if (type == 'test' && test["type"] != 'test') {
        test["type"] = type;
        document.getElementById("testTypeButton").classList.add("typeSelected");
        document.getElementById("surveyTypeButton").classList.remove("typeSelected");
        //test form code here
    }
    else if (type == 'survey' && test["type"] != 'survey') {
        test["type"] = type;
        document.getElementById("surveyTypeButton").classList.add("typeSelected");
        document.getElementById("testTypeButton").classList.remove("typeSelected");
        //survey form code here
    }
}