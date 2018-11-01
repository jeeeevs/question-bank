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
            percentageMarks:
                (questionBankRequirement.marks * difficulty[key]) / 100,
        };
    });
    return difficultyObj;
}

function getQuestions(questionBankRequirement, questions) {
    const ques = [];
    const totalMarks = questionBankRequirement.marks;
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
                totalMarksPerDifficlulty[difficulty]['percentageMarks']
            ) {
                totalMarksPerDifficlulty[difficulty]['totalMarks'] += mark;
                currMarks += mark;
                ques.push(q);
            }
            if (totalMarks == currMarks) {
                throw BreakException;
            }
        });
    } catch (e) {
        return ques;
    }

    return ques;
}

module.exports = {
    validateDifficultyPerventage,
    getQuestions,
};
