//TODO: Add number of desired answers to addQuestion method
var questionNumber = 1
function addQuestion(type, number) {
    if (type == "trueFalse")
        return '<div class="question">\n<span class="questionNumber">'+number+'</span>\n<input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt">\n<div class="questionAnswers">\n<input class="trueFalse" type="radio" name="question'+number+'" placeholder="option1"> True<br>\n<input class="trueFalse" type="radio" name="question'+number+'" placeholder="option2"> False<br>\n</div>\n</div>\n<br></br>';
    if (type == "multipleChoice")
        return '<div class="question">\n<span class="questionNumber">'+number+'</span>\n<input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt">\n<div class="questionAnswers">\n<input class="multipleChoice" type="radio" name="question'+number+'" placeholder="option1"> \n<input class="questionPromptCreate" type="text" name="question'+number+'Text1" placeholder="Question Answer">\n<br>\n<input class="multipleChoice" type="radio" name="question'+number+'" placeholder="option2">\n<input class="questionPromptCreate" type="text" name="question'+number+'Text2" placeholder="Question Answer">\n<br>\n<input class="multipleChoice" type="radio" name="question'+number+'" placeholder="option3">\n<input class="questionPromptCreate" type="text" name="question'+number+'Text3" placeholder="Question Answer">\n<br>\n<input class="multipleChoice" type="radio" name="question'+number+'" placeholder="option4">\n<input class="questionPromptCreate" type="text" name="question'+number+'Text4" placeholder="Question Answer">\n<br>\n</div>\n</div>\n<br></br>';
    if (type == "shortAnswer")
        return '<div class="question">\n<span class="questionNumber">'+number+'</span>\n<input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt">\n<div class="questionAnswers">\n<input class="shortAnswer" type="text" name="question'+number+'" placeholder="Short Answer">\n</div>\n</div>\n<br></br>';
    if (type == "essayAnswer")
        return '<div class="question">\n<span class="questionNumber">'+number+'</span>\n<input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt">\n<div class="questionAnswers">\n<input class="essayAnswer" type="text" name="question'+number+'" placeholder="Essay Answer">\n</div>\n</div>\n<br></br>';
    if (type == "matching")
        return '<div class="question">\n<span class="questionNumber">'+number+'</span>\n<input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt">\n<div class="questionAnswers">\n<input class="matchningPromptCreate" type="text" name="question'+number+'_1_1" placeholder="Question Prompt">=\n<input class="matchningPromptCreate" type="text" name="question'+number+'_1_2" placeholder="Question Answer">\n<br>\n<input class="matchningPromptCreate" type="text" name="question'+number+'_2_1" placeholder="Question Prompt">=\n<input class="matchningPromptCreate" type="text" name="question'+number+'_2_2" placeholder="Question Answer">\n<br>\n<input class="matchningPromptCreate" type="text" name="question'+number+'_3_1" placeholder="Question Prompt">=\n<input class="matchningPromptCreate" type="text" name="question'+number+'_3_2" placeholder="Question Answer">\n<br>\n<input class="matchningPromptCreate" type="text" name="question'+number+'_4_1" placeholder="Question Prompt">=\n<input class="matchningPromptCreate" type="text" name="question'+number+'_4_2" placeholder="Question Answer">\n</div>\n</div>\n<br></br>';
    if (type == "ranking")
        return '<div class="question">\n<span class="questionNumber">'+number+'</span>\n<input class="questionPromptCreate" type="text" name="question'+number+'Prompt" placeholder="Question Prompt">\n<br>\n<div class="questionAnswers">\n<input class="rankingPromptCreate" type="text" name="question'+number+'_1" placeholder="Question Answer 1"><br>\n<input class="rankingPromptCreate" type="text" name="question'+number+'_2" placeholder="Question Answer 2"><br>\n<input class="rankingPromptCreate" type="text" name="question'+number+'_3" placeholder="Question Answer 3"><br>\n<input class="rankingPromptCreate" type="text" name="question'+number+'_4" placeholder="Question Answer 4"><br>\n</div>\n</div>\n<br>';
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
        questionNumber--;
    }
    if (questionNumber == 1)
        hideDeleteButton()
}


console.log(addQuestion("trueFalse", 1));
console.log("\n");
console.log(addQuestion("multipleChoice", 2));
console.log("\n");
console.log(addQuestion("shortAnswer", 3));
console.log("\n");
console.log(addQuestion("essayAnswer", 4));
console.log("\n");
console.log(addQuestion("matching", 5));
console.log("\n");
console.log(addQuestion("ranking", 6));

