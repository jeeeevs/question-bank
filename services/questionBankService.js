function validateDifficultyPerventage(questionBankRequirement) {
    const difficulty = questionBankRequirement.difficulty;
    const keys = Object.keys(difficulty);
    let totalPerc = 0;
    keys.forEach(key => {
        totalPerc += difficulty[key];
    });
    return totalPerc === 100;
}

function parseDifficulty(questionBankRequirement) {
    const difficultyObj = {};
    const difficulty = questionBankRequirement.difficulty;
    const keys = Object.keys(difficulty);
    keys.forEach(key => {
        difficultyObj[key] = {
            totalMarks: 0,
            requiredMarks:
                (questionBankRequirement.marks * difficulty[key]) / 100,
            questionCount: 0,
        };
    });
    return difficultyObj;
}
function validateQuestionBank(totalMarksPerDifficlulty, totalRequiredMarks) {
    const err = [];
    let totalMarks = 0;
    const keys = Object.keys(totalMarksPerDifficlulty);
    keys.forEach(key => {
        const difficulty = totalMarksPerDifficlulty[key];
        totalMarks += difficulty.totalMarks;
        if (difficulty.totalMarks < difficulty.requiredMarks)
            err.push(
                `Difficulty level ${key} requires ${
                    difficulty.requiredMarks
                } but has only ${difficulty.totalMarks} marks`
            );
        if (difficulty.questionCount == 0)
            err.push(`Difficulty level ${key} has not question`);
    });
    if (totalMarks < totalRequiredMarks)
        err.push(
            `Total required marks is ${totalRequiredMarks} but got only ${totalMarks}`
        );
    return err;
}
function getQuestionBank(questionBankRequirement, questions) {
    const ques = [];
    const totalRequiredMarks = questionBankRequirement.marks;
    const totalMarksPerDifficlulty = parseDifficulty(questionBankRequirement);
    const BreakException = {};
    let currMarks = 0;
    try {
        questions.forEach(q => {
            const mark = q.marks;
            const difficulty = q.difficulty;
            const perventageForCurrDifficulty =
                questionBankRequirement.difficulty[difficulty];
            if (
                totalMarksPerDifficlulty[difficulty]['totalMarks'] + mark <=
                totalMarksPerDifficlulty[difficulty]['requiredMarks']
            ) {
                totalMarksPerDifficlulty[difficulty]['totalMarks'] += mark;
                currMarks += mark;
                totalMarksPerDifficlulty[difficulty]['questionCount']++;
                ques.push(q);
            }
            if (totalRequiredMarks == currMarks) {
                throw BreakException;
            }
        });
    } catch (e) {}
    const error = validateQuestionBank(
        totalMarksPerDifficlulty,
        totalRequiredMarks
    );
    return { error, questions: ques };
}

module.exports = {
    validateDifficultyPerventage,
    getQuestionBank,
};
