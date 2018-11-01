const http = require('http');

const fileProcessor = require('./utils/fileProcessor');
const questionBankService = require('./services/questionBankService');

const questions = fileProcessor.getDataFromFile('./data/questions.json');
const questionBankRequirement = fileProcessor.getDataFromFile(
    './data/questionsRequired.json'
);

if (questionBankService.validateDifficultyPerventage(questionBankRequirement)) {
    const quesBank = questionBankService.getQuestionBank(
        questionBankRequirement,
        questions
    );
    if (quesBank.error.length > 0) {
        console.log(
            'There are issues with the question bank\n',
            quesBank.error,
            '\n'
        );
        quesBank.questions;
    } else {
        console.log('Your questions are', quesBank.questions);
    }
} else {
    console.log('Wrong total percentage');
}
