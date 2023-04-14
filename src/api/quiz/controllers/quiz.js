'use strict';

/**
 * quiz controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::quiz.quiz', ({strapi}) => ({
    async customFind(ctx) {
        console.log('ok');
        try {
            console.log('ok2');
        const quizzes = await strapi.db.query('api::quiz.quiz').findMany({
            
          populate: { category: true, players : true, level: true, teams :true},
         
        });
        const quizzesWithRelations = quizzes.map(quiz => ({
          ...quiz,
          players: quiz.players?.map(player => ({
            id: player.id,
            name: player.name,
            position: player.position
          })),
          teams: quiz.teams?.map(team => ({
            id: team.id,
            name: team.name
          })),
          level: {
            id: quiz.level.id,
            name: quiz.level.name
          },
          category: {
            id: quiz.category.id,
            name: quiz.category.name
          }
        }));

        return quizzesWithRelations;
    } catch(err){
        console.log('err');
        ctx.body = err
    }
      }
}));
