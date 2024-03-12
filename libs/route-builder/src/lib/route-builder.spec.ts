/* eslint-disable @typescript-eslint/no-explicit-any */
import { RouteBuilder } from './route-builder';

describe('RouteBuilder', () => {
  const route = new RouteBuilder('sample', 'samples');
  const cat = new RouteBuilder('cat', 'cats');

  it.each`
    key                          | value
    ${'GENERIC_ADD_RELATION'}    | ${'sample/:id/:rn/:rid'}
    ${'GENERIC_REMOVE_RELATION'} | ${'sample/:id/:rn/:rid'}
    ${'GENERIC_SET_RELATION'}    | ${'sample/:id/:rn/:rid'}
    ${'GENERIC_UNSET_RELATION'}  | ${'sample/:id/:rn'}
    ${'CREATE'}                  | ${'sample'}
    ${'FIND_ALL'}                | ${'samples'}
    ${'FIND_ONE_BY_ID'}          | ${'sample/:id'}
    ${'DELETE_ONE_BY_ID'}        | ${'sample/:id'}
    ${'UPDATE_ONE_BY_ID'}        | ${'sample/:id'}
    ${'COUNT'}                   | ${'sample/meta/count'}
    ${'SUBSCRIBE_CREATE'}        | ${'sample/subscribe/create'}
    ${'SUBSCRIBE_UPDATE'}        | ${'sample/subscribe/update'}
    ${'SUBSCRIBE_DELETE'}        | ${'sample/subscribe/delete'}
  `('$key should be equal to $value', ({ key, value }) => {
    expect((route as unknown as any)[key]).toBe(value);
  });

  it.each`
    key                           | value
    ${route.FIND_RELATION(cat)}   | ${'sample/:id/cat'}
    ${route.ADD_RELATION(cat)}    | ${'sample/:id/cat/:rid'}
    ${route.REMOVE_RELATION(cat)} | ${'sample/:id/cat/:rid'}
    ${route.SET_RELATION(cat)}    | ${'sample/:id/cat/:rid'}
    ${route.UNSET_RELATION(cat)}  | ${'sample/:id/cat'}
  `('$key should be $value', ({ key, value }) => {
    expect(key).toBe(value);
  });
});
