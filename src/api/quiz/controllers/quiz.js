'use strict';

/**
 * quiz controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::quiz.quiz', ({strapi}) => ({
    async customFindAll(ctx) {
        
        try {   
        const quizzes = await strapi.db.query('api::quiz.quiz').findMany({ 
          populate: { category: true, players : true, level: true, teams :true, users_permissions_users:true},
        });
        const quizzesWithRelations = quizzes.map(quiz => ({
          ...quiz,
          players: quiz.players?.map(player => ({
            id: player.id,
            name: player.name,
            position: player.position,
            teams: player.teams?.map(team => ({
              id: team.id,
              name: team.name
            }))
          })),
          teams: quiz.teams?.map(team => ({
            id: team.id,
            name: team.name
          })),
          users_permissions_users : quiz.users_permissions_users?.map(user => ({
            id: user.id,
            name: user.username
          })),
          level: {
            id: quiz.level.id,
            name: quiz.level.name
          },
          category: {
            id: quiz.category.id,
            name: quiz.category.name,
            slug: quiz.category.slug
          }
        }));

        return quizzesWithRelations;
    } catch(err){
        console.log('err');
        ctx.body = err
    }
      },
    
  async customFindOne(ctx) {
    try {   
      const quiz = await strapi.db.query('api::quiz.quiz').findOne({ 
          where: { id: ctx.params.id },
          populate: { category: true, players : { populate: {
            teams: true
        }} 
        , level: true, teams :true},
      });

      const quizWithRelations = {
          ...quiz,
          players: quiz.players?.map(player => (console.log(player),{
              id: player.id,
              name: player.name,
              position: player.position,
              teams: player.teams
              ?.map(team => (
                team.name
            ))
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
              name: quiz.category.name,
              slug: quiz.category.slug
          }
      };

      return quizWithRelations;
  } catch(err){
      console.log('err');
      ctx.body = err
  }
  }    
}));
