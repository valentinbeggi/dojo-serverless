import * as AwsConfig from 'serverless/aws';

import ApiGatewayErrors from './resources/apiGatewayErrors';

const serverlessConfiguration: AwsConfig.Serverless = {
  service: 'dojo-serverless-backend',
  frameworkVersion: '>=1.83',
  plugins: ['serverless-webpack', 'serverless-step-functions'],
  provider: {
    name: 'aws',
    runtime: 'nodejs10.x',
    region: 'eu-west-1',
    stage: 'dev',
    profile: 'dojo-serverless',
    usagePlan: {
      quota: {
        limit: 5000,
        offset: 2,
        period: 'MONTH',
      },
      throttle: {
        burstLimit: 200,
        rateLimit: 100,
      },
    },
  },
  functions: {
    hello: {
      handler: 'hello.main',
      events: [
        {
          http: {
            method: 'get',
            path: 'hello',
            cors: true,
          },
        },
      ],
    },
    getVirus: {
      handler: 'src/handlers/virus/get.main',
      events: [
        {
          http: {
            method: 'get',
            path: 'virus',
            cors: true,
          },
        },
      ],
    },
    createVirus: {
      handler: 'src/handlers/virus/create.main',
      events: [
        /*         {
          schedule: 'rate(1 minute)',
          je l'ai commentée car sinon elle va tourner
          tout le temps
        }, */
        {
          http: {
            method: 'post', // pour l'instant elle ne poste rien dans la session 1
            path: 'virus',
            cors: true,
          },
        },
      ],
    },
  },
  resources: {
    Resources: {
      ...ApiGatewayErrors,
    },
  },
};

module.exports = serverlessConfiguration;
