module.exports = {
    routes: [
        {
            "method": "GET",
            "path": "/quiz-with-all-info/:id",
            "handler": "quiz.customFindOne"
          }
    ]
}