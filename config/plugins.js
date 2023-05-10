module.exports = ({ env }) => ({
    
    email: {
      config: {
        provider: 'sendgrid', // For community providers pass the full package name (e.g. provider: 'strapi-provider-email-mandrill')
        providerOptions: {
          apiKey: env('SENDGRID_API_KEY'),
        },
        settings: {
          defaultFrom: 'fabrice.milet.dev@gmail.com',
          defaultReplyTo: 'fabrice.milet.dev@gmail.com',
          testAddress: 'fabrice.milet.dev@gmail.com',
        },
      },
    },
    
  });