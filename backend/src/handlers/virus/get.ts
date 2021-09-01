import { APIGatewayProxyHandler } from 'aws-lambda';
import uuid from 'uuid';

import { success } from '@libs/response';


export const main: APIGatewayProxyHandler = async (event) => {
    /* 
    La fonction doit générer 1 virus si un id est passé en query param
    Sinon elle en génère 4
    */
    let viruses = [{}]
    if (event.queryStringParameters) {
        if (event.queryStringParameters.id) {
            viruses = [
                { id: uuid() },
              ];
        } else {
            viruses = [
                { id: uuid() },
                { id: uuid() },
                { id: uuid() },
                { id: uuid() }
              ];
        }
    }

  return success({ viruses });
};