import { ClassType } from '../__printer';
import { ClassPrinterFactory } from './class';

describe('ClassFactory', () => {
  it('should print the class by class-type', () => {
    const CreateClass = new ClassPrinterFactory().Create('Some');
    
  });
});
