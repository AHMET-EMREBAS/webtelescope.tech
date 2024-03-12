# Route Builder

Build rest-api routes from signular and plural names.

### How to use?

```typescript
import { RouteBuilder, ParamNames, ParamDefinations } from '@webpackages/rotue-builder';

const sample = new RouteBuilder('sample', 'samples');
const cat = new RouteBuilder('cat', 'cats');

sample.ADD_RELATION; // sample/:id/:rn/:rid (2 ms)
sample.REMOVE_RELATION; // sample/:id/:rn/:rid
sample.SET_RELATION; // sample/:id/:rn/:rid
sample.UNSET_RELATION; // sample/:id/:rn (1 ms)
sample.CREATE; // sample
sample.FIND_ALL; // samples
sample.FIND_ONE_BY_ID; // sample/:id
sample.DELETE_ONE_BY_ID; // sample/:id
sample.UPDATE_ONE_BY_ID; // sample/:id (1 ms)
sample.COUNT; // sample/meta/count
sample.SUBSCRIBE_CREATE; // sample/subscribe/create
sample.SUBSCRIBE_UPDATE; // sample/subscribe/update
sample.SUBSCRIBE_DELETE; // sample/subscribe/delete
route.FIND_RELATION(cat); // 'sample/:id/cat'
route.ADD_RELATION(cat); // 'sample/:id/cat/:rid'
route.REMOVE_RELATION(cat); // 'sample/:id/cat/:rid'
route.SET_RELATION(cat); // 'sample/:id/cat/:rid'
route.UNSET_RELATION(cat); // 'sample/:id/cat'

ParamDefinations.ID; // ':id'
ParamDefinations.RELATION_NAME; // ':rn'
ParamDefinations.RELATION_ID; // ':rid'

ParamNames.ID; // 'id',
ParamNames.RELATION_ID; // 'rid',
ParamNames.RELATION_NAME; // 'rn',
ParamNames.SUBSCRIBE; // 'subscribe',
ParamNames.CREATE; // 'create',
ParamNames.UPDATE; // 'update',
ParamNames.DELETE; // 'delete',
ParamNames.META; // 'meta',
ParamNames.COUNT; // 'count',
```
