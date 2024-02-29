import {
  getPseudoSelector,
  getMediaBreakpoint,
  getChildPseudoSelector,
  getTransitionValue,
  getPropertyValue,
  getPropertyName,
  getActionPseudoSelector,
} from './style';
import {
  actionPseudoMap,
  childPseudoMap,
  mediaBreakPoints,
  propertyNameMap,
} from './common';
describe('Rule Testing', () => {
  describe('getPseudoSelector', () => {
    it.each`
      cls                   | result
      ${''}                 | ${''}
      ${'some'}             | ${''}
      ${'some-class'}       | ${''}
      ${'hover:class-name'} | ${'hover'}
      ${'child:some'}       | ${'child'}
      ${'first-child:some'} | ${'first-child'}
      ${'last-child:some'}  | ${'last-child'}
      ${'last-child:'}      | ${'last-child'}
    `('should return $result for $cls', ({ cls, result }) => {
      expect(getPseudoSelector(cls)).toBe(result);
    });
  });
  describe('getActionPseudoSelector', () => {
    it.each`
      cls               | result
      ${''}             | ${''}
      ${'some'}         | ${''}
      ${'hover:some'}   | ${actionPseudoMap['hover']}
      ${'active:some'}  | ${actionPseudoMap['active']}
      ${'visited:some'} | ${actionPseudoMap['visited']}
    `('should return $result for $cls', ({ cls, result }) => {
      expect(getActionPseudoSelector(cls)).toBe(result);
    });
  });

  describe('getMediaBreakpoint', () => {
    it.each`
      cls                   | result
      ${''}                 | ${''}
      ${'some'}             | ${''}
      ${'class-name'}       | ${''}
      ${'  '}               | ${''}
      ${'  '}               | ${''}
      ${'sm'}               | ${''}
      ${'sm:class-name'}    | ${mediaBreakPoints['sm']}
      ${'md:class-name'}    | ${mediaBreakPoints['md']}
      ${'lg:class-name'}    | ${mediaBreakPoints['lg']}
      ${'xl:class-name'}    | ${mediaBreakPoints['xl']}
      ${'lxl:class-name'}   | ${mediaBreakPoints['lxl']}
      ${'print:class-name'} | ${mediaBreakPoints['print']}
    `('should return $result for $cls', ({ cls, result }) => {
      expect(getMediaBreakpoint(cls)).toBe(result);
    });
  });
  describe('getChildPseudoSelector', () => {
    it.each`
      cls                   | result
      ${''}                 | ${''}
      ${'some'}             | ${''}
      ${'class-name'}       | ${''}
      ${'child:some'}       | ${childPseudoMap['child']}
      ${'first-child:some'} | ${childPseudoMap['first-child']}
      ${'last-child:some'}  | ${childPseudoMap['last-child']}
    `('should return $result for $cls', ({ cls, result }) => {
      expect(getChildPseudoSelector(cls)).toBe(result);
    });
  });

  describe('getTransitionValue', () => {
    it.each`
      cls                         | result
      ${''}                       | ${''}
      ${'some'}                   | ${''}
      ${'class-name'}             | ${''}
      ${'child:some'}             | ${''}
      ${'first-child:some'}       | ${''}
      ${'last-child:some-500'}    | ${''}
      ${'last-child:some-400s'}   | ${''}
      ${'last-child:some-400ms'}  | ${'400ms'}
      ${'last-child:some-200ms'}  | ${'200ms'}
      ${'last-child:some-1000ms'} | ${'1000ms'}
    `('should return $result for $cls', ({ cls, result }) => {
      expect(getTransitionValue(cls)).toBe(result);
    });
  });
  describe('getPropertyValue', () => {
    it.each`
      cls                    | result
      ${'sm:some-40ms'}      | ${'some'}
      ${'c-blue-400'}        | ${'blue-400'}
      ${'sm:jc-center'}      | ${'center'}
      ${'sm:jc-center-40ms'} | ${'center'}
    `('should return $result for $cls', ({ cls, result }) => {
      expect(getPropertyValue(cls)).toBe(result);
    });
  });

  describe('getPropertyName', () => {
    it.each`
      cls            | result
      ${'sm:m-40ms'} | ${propertyNameMap['m']}
      ${'sm:p-40ms'} | ${propertyNameMap['p']}
      ${'sm:some'}   | ${propertyNameMap['some']}
      ${'sm:orange'} | ${propertyNameMap['orange']}
    `('should return $result for $cls', ({ cls, result }) => {
      expect(getPropertyName(cls)).toBe(result);
    });
  });
});
