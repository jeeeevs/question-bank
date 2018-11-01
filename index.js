const http = require('http');

const fileProcessor = require('./utils/fileProcessor');
const questionBankService = require('./services/questionBankService');

const questions = fileProcessor.getDataFromFile('./data/questions.json');
const questionBankRequirement = fileProcessor.getDataFromFile(
    './data/questionsRequired.json'
);

if (questionBankService.validateDifficultyPerventage(questionBankRequirement)) {
    const quesBank = questionBankService.getQuestions(
        questionBankRequirement,
        questions
    );
    console.log(quesBank);
} else {
    console.log('Wrong total percentage');
}
