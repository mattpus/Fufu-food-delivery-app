// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { DIsh, Restaurant } = initSchema(schema);

export {
  DIsh,
  Restaurant
};