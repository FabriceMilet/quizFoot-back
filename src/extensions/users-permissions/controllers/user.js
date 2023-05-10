// Récupère l'utilisateur avec l'ID 1 et ses quiz associés
// const user = await strapi.query('user', 'users-permissions').findOne({
//     id: 1
//   }, ['quizzes']);

  
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('plugin::users-permissions.user', ({strapi}) => ({
    async customFindOne(ctx) {
        
        try {   
        const user = await strapi.db.query('plugin::users-permissions.user').findOne({ 
          populate: { quiz: true}
        });

        const userWithQuiz = {
            ...user,
            quiz: user.quiz?.map(quiz => ({
                id: quiz.id,
            })),
        };
    
        return userWithQuiz;
    } catch(err){
        console.log('err');
        ctx.body = err
    }
      }}))