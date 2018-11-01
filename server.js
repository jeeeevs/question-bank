const http = require('http');
const fileProcessor = require('./utils/fileProcessor');
const questionBankService = require('./services/questionBankService');

const questions = fileProcessor.getDataFromFile('./data/questions.json');

const server = http.createServer(function(request, response) {
    if (request.method === 'POST' && request.url === '/question-bank') {
        const resp = { data: {}, errors: [] };
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });
        request.on('end', () => {
            const jsonBody = JSON.parse(body);
            if (questionBankService.validateDifficultyPerventage(jsonBody)) {
                const quesBank = questionBankService.getQuestionBank(
                    jsonBody,
                    questions
                );
                if (quesBank.error.length > 0) {
                    resp.errors = quesBank.error;
                } else {
                    resp.data = quesBank.questions;
                }
            } else {
                resp.errors.push('Wrong total percentage');
            }
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(resp));
        });
    }
});
server.listen(7000, () => {
    console.log('Webserver running');
});
