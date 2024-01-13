const LAST_QUESTION = 9;
var selectedIndexes = [];
var questionIndex = undefined;
var selectedAnswers = [null, null, null, null, null];

const startTest = () => {
  //generate 5 random questions indexes
  selectedIndexes = [];
  let count = 0;
  while (count < 9) {
    let number = null;
    do {
      number = Math.floor(Math.random() * 10);
    } while (selectedIndexes.includes(number));
    selectedIndexes.push(number);
    count++;
  }

  //show
  questionIndex = 0;
  let questionObj = questions[selectedIndexes[questionIndex]];
  //console.log(questionObj);

  //show new question
  displayQuestion(questionObj);

  //set the question number
  document.getElementById("counter").innerHTML = questionIndex + 1;

  //disable previous button and next button
  document.getElementById("next").style.pointerEvents = "none";
  document.getElementById("next").style.color = "gray";

  document.getElementById("previous").style.pointerEvents = "none";
  document.getElementById("previous").style.color = "gray";

  //hide the intro page an show the test
  document.getElementsByClassName("welcome")[0].style.display = "none";
  document.getElementsByClassName("container")[0].style.display = "flex";

  //don't show test result
  document.getElementById("test-result").style.display = "none";

  //hide restart button
  document.getElementById("restart").style.display = "none";

  //hide the right side
  document.getElementsByClassName("your-answers")[0].style.display = "none";
};

const resetPreviousStyles = () => {
  //reset styles added previously
  document.getElementById("div-ans-a").style.border = "none";
  document.getElementById("div-ans-b").style.border = "none";
  document.getElementById("div-ans-c").style.border = "none";
  document.getElementById("div-ans-d").style.border = "none";
};

const displaySelectedAnswer = (answer) => {
  if (answer === 0) {
    document.getElementById("div-ans-a").style.border = "2px solid blue";
  } else if (answer === 1) {
    document.getElementById("div-ans-b").style.border = "2px solid blue";
  } else if (answer === 2) {
    document.getElementById("div-ans-c").style.border = "2px solid blue";
  } else {
    document.getElementById("div-ans-d").style.border = "2px solid blue";
  }
};

const displayQuestion = (questionObj) => {
  document.getElementById("question").innerHTML = questionObj.question;
  document.getElementById("ans-a").innerHTML = questionObj.answers[0].text;
  document.getElementById("ans-b").innerHTML = questionObj.answers[1].text;
  document.getElementById("ans-c").innerHTML = questionObj.answers[2].text;
  document.getElementById("ans-d").innerHTML = questionObj.answers[3].text;

  //enable previous button if there's a previous question
  if (questionIndex > 0) {
    document.getElementById("previous").style.pointerEvents = "auto";
    document.getElementById("previous").style.color = "black";
  } else {
    document.getElementById("previous").style.pointerEvents = "none";
    document.getElementById("previous").style.color = "gray";
  }

  //enable the next button only if there's an existing answer
  if (selectedAnswers[questionIndex] !== null) {
    document.getElementById("next").style.pointerEvents = "auto";
    document.getElementById("next").style.color = "black";
  } else {
    document.getElementById("next").style.pointerEvents = "none";
    document.getElementById("next").style.color = "gray";
  }

  //next 'next question to finish' if question is the last

  if (questionIndex === LAST_QUESTION - 1) {
    document.getElementById("next").innerHTML = "Finish";
  } else {
    document.getElementById("next").innerHTML = "Next question >";
  }
};

const nextQuestion = () => {
  if (questionIndex < selectedIndexes.length - 1) {
    questionIndex++;
    let questionObj = questions[selectedIndexes[questionIndex]];
    //console.log(questionObj);

    //reset styles added previously
    resetPreviousStyles();

    //show new question
    displayQuestion(questionObj);

    if (selectedAnswers[questionIndex] !== null) {
      //previous answer exist
      //set the selected answer since user can change the answer
      let answer = selectedAnswers[questionIndex];
      displaySelectedAnswer(answer);
    }

    //set the question number
    document.getElementById("counter").innerHTML = questionIndex + 1;
  } else {
    showAllQuestionAndAnswer();
  }
};

const previousQuestion = () => {
  console.log(questionIndex);
  if (questionIndex > 0) {
    questionIndex--;

    let questionObj = questions[selectedIndexes[questionIndex]];
    //console.log(questionObj);

    resetPreviousStyles();

    //show new question
    displayQuestion(questionObj);

    //set the question number
    document.getElementById("counter").innerHTML = questionIndex + 1;

    //set the selected answer since user can change the answer
    let answer = selectedAnswers[questionIndex];
    displaySelectedAnswer(answer);
  }
};

const selectedAnswer = (ans) => {
  //reset styles added previously
  resetPreviousStyles();

  //setSelected answers
  displaySelectedAnswer(ans);

  //when answer is selected, enable the next button
  document.getElementById("next").style.pointerEvents = "auto";
  document.getElementById("next").style.color = "black";

  //user answer so we can display it at the end
  selectedAnswers[questionIndex] = ans;
  //console.log(selectedAnswers);
};

//function to show the chosen question and answer. For summary at the end of the test
const showElement = (questionObj, chosenAnswer, index) => {
  let element = "";

  switch (chosenAnswer) {
    case 0:
      element = `<div id="question-count">Question <span id="counter"></span>${index}/9</div>
        <div id="question">${questionObj.question}</div>
        <div class="ans" id="div-ans-a" style="border: 2px solid blue">
          <span class="my-alpha">A</span><span id="ans-a">${questionObj.answers[0].text}</span>
        </div>
        <div class="ans" id="div-ans-b">
          <span class="my-alpha">B</span><span id="ans-b">${questionObj.answers[1].text}</span>
        </div>
        <div class="ans" id="div-ans-c">
          <span class="my-alpha">C</span><span id="ans-c">${questionObj.answers[2].text}</span>
        </div>
        <div class="ans" id="div-ans-d" style="margin-bottom: 40px">
          <span class="my-alpha">D</span><span id="ans-d">${questionObj.answers[3].text}</span>
        </div>
        `;
      break;
    case 1:
      element = `<div id="question-count">Question <span id="counter"></span>${index}/9</div>
        <div id="question">${questionObj.question}</div>
        <div class="ans" id="div-ans-a">
          <span class="my-alpha">A</span><span id="ans-a">${questionObj.answers[0].text}</span>
        </div>
        <div class="ans" id="div-ans-b" style="pointer-events: none; border: 2px solid blue">
          <span class="my-alpha">B</span><span id="ans-b">${questionObj.answers[1].text}</span>
        </div>
        <div class="ans" id="div-ans-c" >
          <span class="my-alpha">C</span><span id="ans-c">${questionObj.answers[2].text}</span>
        </div>
        <div class="ans" id="div-ans-d" style="margin-bottom: 40px">
          <span class="my-alpha">D</span><span id="ans-d">${questionObj.answers[3].text}</span>
        </div>
        `;
      break;
    case 2:
      element = `<div id="question-count">Question <span id="counter"></span>${index}/9</div>
        <div id="question">${questionObj.question}</div>
        <div class="ans" id="div-ans-a">
          <span class="my-alpha">A</span><span id="ans-a">${questionObj.answers[0].text}</span>
        </div>
        <div class="ans" id="div-ans-b">
          <span class="my-alpha">B</span><span id="ans-b">${questionObj.answers[1].text}</span>
        </div>
        <div class="ans" id="div-ans-c" style="border: 2px solid blue">
          <span class="my-alpha">C</span><span id="ans-c">${questionObj.answers[2].text}</span>
        </div>
        <div class="ans" id="div-ans-d" style="none; margin-bottom: 40px">
          <span class="my-alpha">D</span><span id="ans-d">${questionObj.answers[3].text}</span>
        </div>
        `;
      break;
    case 3:
      element = `<div id="question-count">Question <span id="counter"></span>${index}/9</div>
        <div id="question">${questionObj.question}</div>
        <div class="ans" id="div-ans-a">
          <span class="my-alpha">A</span><span id="ans-a">${questionObj.answers[0].text}</span>
        </div>
        <div class="ans" id="div-ans-b">
          <span class="my-alpha">B</span><span id="ans-b">${questionObj.answers[1].text}</span>
        </div>
        <div class="ans" id="div-ans-c">
          <span class="my-alpha">C</span><span id="ans-c">${questionObj.answers[2].text}</span>
        </div>
        <div class="ans" id="div-ans-d" style="margin-bottom: 40px; border: 2px solid blue">
          <span class="my-alpha">D</span><span id="ans-d">${questionObj.answers[3].text}</span>
        </div>
        `;
      break;
    default:
      element = `<div id="question-count">Question <span id="counter"></span>${index}/9</div>
        <div id="question">${questionObj.question}</div>
        <div class="ans" id="div-ans-a">
          <span class="my-alpha">A</span><span id="ans-a">${questionObj.answers[0].text}</span>
        </div>
        <div class="ans" id="div-ans-b">
          <span class="my-alpha">B</span><span id="ans-b">${questionObj.answers[1].text}</span>
        </div>
        <div class="ans" id="div-ans-c">
          <span class="my-alpha">C</span><span id="ans-c">${questionObj.answers[2].text}</span>
        </div>
        <div class="ans" id="div-ans-d" style="margin-bottom: 40px">
          <span class="my-alpha">D</span><span id="ans-d">${questionObj.answers[3].text}</span>
        </div>
        `;
  }

  return element;
};

const showAllQuestionAndAnswer = () => {
  //store the count for later comparison
  let programmerOrDesignerCount = 0;
  let artistOrAnimatorCount = 0;

  //get the questions and selected answer in order to display the summary
  for (let i = 0; i < selectedIndexes.length; i++) {
    let questionObj = questions[selectedIndexes[i]];
    let answer = selectedAnswers[i];
    let element = showElement(questionObj, answer, i + 1);
    document.getElementById("answers").innerHTML += element;

    let cat = questionObj.answers[answer].cat;
    if (cat === "PROGRAMMER or DESIGNER") {
        programmerOrDesignerCount++;
    } else {
        artistOrAnimatorCount++;
    }
  }

  //console.log(introvertCount);
  //console.log(extrovertCount);

  showPersonalities(programmerOrDesignerCount, artistOrAnimatorCount);

  //hide the previous and finish button and show restart button
  document.getElementById("next").style.display = "none";
  document.getElementById("previous").style.display = "none";
};

const showPersonalities = (introvert, extrovert) => {
  if (introvert > extrovert) {
    //show image
    document.getElementById("image").src ="P OR D.png";

    document.getElementById("trait-title").innerText = "You are a programmer or designer" ;

    //append personality traits
    let element = `<li> تحويل الأفكار إلى واقع: يتعين على المبرمج تحويل رؤية المصمم للعبة إلى شفرات برمجية قابلة للتنفيذ.
    يقوم بتحويل العناصر المختلفة في اللعبة إلى كود يمكن أن يتفاعل معه اللاعبون.
   </li>
   <li>برمجة الميكانيكيات والتفاعلات: يقوم المبرمج بتصميم وتنفيذ الميكانيكيات والتفاعلات داخل اللعبة. 
   يعمل على برمجة حركة الشخصيات والأعداء، وتفاعل اللاعب مع العناصر المختلفة، والنظام الفيزيائي للعالم الافتراضي.</li>
   <li> إدارة الذكاء الاصطناعي: في حالة وجود شخصيات ذكاء اصطناعي في اللعبة،
    يكون على المبرمج برمجة سلوكها واتخاذ القرارات المنطقية والتفاعل مع اللاعبين بطريقة ذكية.</li>
   <li>
   تحسين الأداء والأداء التقني: يقوم المبرمج بتحسين أداء اللعبة وتحسين الأداء التقني لتشغيلها بسلاسة وبدون مشاكل.
    يعمل على تحسين أداء الرسومات والتحسينات التقنية الأخرى لتقديم تجربة سلسة ومريحة للاعب.
   </li>

   <li>
   تصميم العوالم والمراحل: يقوم مصمم المراحل بتصميم العوالم والمراحل داخل اللعبة،
    بما في ذلك تحديد الهياكل والمشاهد والعناصر المختلفة. يضمن توجيه اللاعبين عبر مراحل متنوعة ومثيرة.

   </li>
   <li>إنشاء الألغاز والتحديات: يقوم مصمم المراحل بتصميم ألغاز وتحديات ممتعة ومثيرة لتحفيز اللاعبين على التفكير وحل المشكلات.
    يعمل على توفير تجربة لعب تحفز اللاعبين على الاستمرار والتقدم.
   </li>
   <li> توجيه اللاعبين: يقوم مصمم المراحل بتوجيه اللاعبين وتوجيههم عبر اللعبة من خلال توفير إشارات ودلائل ومؤشرات للمسار الصحيح.
    يعمل على توجيه اللاعبين وإبقائهم مستمتعين ومتحمسين للاستكشاف.
   </li>
   <li>اختبار وتعديل المراحل: يتعين على مصمم المراحلال تصميماته وتجربتها من خلال الاختبار
    وجمع الملاحظات وإجراء التعديلات اللازمة لتحسين الألعاب وجعلها أكثر تحفيزًا وممتعة.</li>`;

    document.getElementById("personalities").innerHTML += element;
  } else {
    //show image
    document.getElementById("image").src ="A OR AN.png";
    document.getElementById("trait-title").innerText = "You are an artist or animator";

    let element = `<li>تصميم الشخصيات والعناصر: يقوم الفنان أو الرسام بتصميم شخصيات اللعبة والعناصر المختلفة فيها.</li>
<li>إنشاء العوالم والمشاهد: يعمل الفنان أو الرسام على إنشاء العوالم والمشاهد داخل اللعبة.</li>
<li>تصميم الرسوم المتحركة والحركة: يستخدم الفنان أو الرسام مهاراته في إنشاء رسوم متحركة وحركات للشخصيات والعناصر في اللعبة.</li>
<li>تصميم الواجهات والرموز: يقوم الفنان أو الرسام بتصميم واجهات المستخدم والرموز والرسوم التوضيحية التي تظهر في اللعبة.</li>
<li>إضفاء الأجواء والمزج اللوني: يعمل الفنان أو الرسام على إضفاء الأجواء المناسبة للعبة من خلال استخدام الألوان والإضاءة والظلال.</li>
<li>تصميم الأصوات والمؤثرات الصوتية: يساهم الفنان أو الرسام في تصميم الأصوات والمؤثرات الصوتية التي تعزز تجربة اللعبة وتضيف لها واقعية وتشويقًا.</li>
<li>اختبار وتعديل الرسومات: يتعين على الفنان أو الرسام اختبار وتقييم الرسومات التي يقوم بإنشائها وإجراء التعديلات اللازمة لتحسينها.</li>
<li>التعاون مع فريق التطوير: يتعاون الفنان أو الرسام مع باقي أعضاء فريق التطوير مثل المبرمجين ومصممي المراحل لضمان التنسيق والتكامل السلس بين جميع عناصر اللعبة.</li>
`;
    document.getElementById("personalities").innerHTML += element;
  }

  //show test result
  document.getElementById("test-result").style.display = "flex";

  //show restart button
  document.getElementById("restart").style.display = "block";

  //show the right side
  document.getElementsByClassName("your-answers")[0].style.display = "block";
};

const restartQuestion = () => {
  window.location.reload();
};
