# Question bank demo app

Question generator demo

## Steps to setup

1. Clone the repository
2. Go to `questions.json` file inside `data` folder and change the set of questions

### From CLI

1. Run `node index`
2. Go to `questionsRequired.json` file inside `data` folder and change the requirement accordingly
3. You can see the result in CLI

### From REST API

    1. Run `node server`
    2. Web server will be running in `http://localhost:7000`
    3. Post the question bank criteria as JSON 
    ```
        {
            "marks": 50,
            "difficulty": { "Easy": 10, "Medium": 50, "Hard": 40 }
        }
    ``` 
    to `http://localhost:7000/question-bank`
    4. Get the questions or error in JSON
    5. Sampe curl ```
        curl -X POST \
            http://localhost:7000/question-bank \
            -H 'Content-Type: application/json' \
            -d '{
            "marks": 50,
            "difficulty": { "Easy": 10, "Medium": 50, "Hard": 40 }
            }'
      ```

## Change required question bank params

Go to `questionsRequired.json` file inside `data` folder and chnage the requirement accordingly
