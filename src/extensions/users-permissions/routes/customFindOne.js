module.exports = {
    routes: [
        {
            "method": "GET",
            "path": "/user-with-quiz/:id",
            "handler": "users-permissions.customFindOne"
          }
    ]
}