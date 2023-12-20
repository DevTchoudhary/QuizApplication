// Array of full-stack development quiz questions and their possible answers
const questions = [
    {
      question: "What is the purpose of a package.json file in a Node.js project?",
      answers: [
        { text: "To store metadata about the project", correct: true },
        { text: "To serve as the main entry point for the application", correct: false },
        { text: "To define the project's HTML structure", correct: false },
        { text: "To manage database configurations", correct: false },
      ],
    },
    {
      question: "Which of the following is a front-end framework for building user interfaces?",
      answers: [
        { text: "Express.js", correct: false },
        { text: "React.js", correct: true },
        { text: "MongoDB", correct: false },
        { text: "Node.js", correct: false },
      ],
    },
    {
      question: "What does MVC stand for in the context of web development?",
      answers: [
        { text: "Model View Controller", correct: true },
        { text: "Most Valuable Code", correct: false },
        { text: "Modern View Configuration", correct: false },
        { text: "Managed Virtual Components", correct: false },
      ],
    },
    {
      question: "Which HTTP method is typically used for updating resources on the server in a RESTful API?",
      answers: [
        { text: "GET", correct: false },
        { text: "POST", correct: false },
        { text: "PUT", correct: true },
        { text: "DELETE", correct: false },
      ],
    },
    {
      question: "What is the purpose of the Git version control system?",
      answers: [
        { text: "To manage and track changes in source code", correct: true },
        { text: "To execute JavaScript code on the server", correct: false },
        { text: "To design responsive user interfaces", correct: false },
        { text: "To query databases using SQL", correct: false },
      ],
    },
  ];
  
  // Get HTML elements by their IDs
  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  
  // Initialize variables for tracking quiz progress and score
  let currentQuestionIndex = 0;
  let score = 0;
  
  // Function to start the quiz
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
  }
  
  // Function to display the current question and its answer choices
  function showQuestion() {
    // Reset the state of the quiz
    resetState();
    
    // Get the current question and its number
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    
    // Display the question
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  
    // Create buttons for each answer choice
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerHTML = answer.text; // Set the text content of the button
      button.classList.add("btn");
      answerButtons.appendChild(button);
      
      // Add a data attribute to mark correct answers
      if (answer.correct) {
        button.dataset.correct = 'true';
      }
  
      // Attach click event listener to each button
      button.addEventListener("click", selectAnswer);
    });
  }
  
  // Function to reset the state of the quiz
  function resetState() {
    nextButton.style.display = "none";
    
    // Remove all child elements from the answer buttons container
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  // Function to handle the user's answer selection
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
  
    // Update styles based on correctness
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("incorrect");
    }
  
    // Disable all buttons after an answer is selected
    Array.from(answerButtons.children).forEach((button) => {
      if (button.dataset.correct === 'true') {
        button.classList.add("correct");
      } else {
        button.disabled = true;
      }
    });
  
    // Display the "Next" button
    nextButton.style.display = "block";
  }
  
  // Function to display the final score
  function showScore() {
    // Reset the state of the quiz
    resetState();
    
    // Display the final score
    questionElement.innerHTML = "You scored " + score + " out of " + questions.length;
    
    // Update the "Next" button text
    nextButton.innerHTML = "Play Again";
    
    // Display the "Next" button
    nextButton.style.display = "block";
  }
  
  // Function to handle the "Next" button click
  function handleNextButton() {
    currentQuestionIndex++;
  
    // Check if there are more questions
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      // If no more questions, display the final score
      showScore();
    }
  }
  
  // Add event listener to the "Next" button
  nextButton.addEventListener("click", () => {
    // Check if there are more questions or if the quiz should restart
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      // If the quiz should restart, start the quiz again
      startQuiz();
    }
  });
  
  // Start the quiz when the script is first run
  startQuiz();
  