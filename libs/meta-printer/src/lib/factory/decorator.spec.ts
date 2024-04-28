import { DecoratorPrinterFactory } from './common-decorators';
const Decorators = new DecoratorPrinterFactory();

describe('DecoratorPrinterFactory', () => {
  it.each`
    expected                           | actual
    ${'@Entity()'}                     | ${Decorators.ENTITY().print()}
    ${"@Column({ type: 'string' })"}   | ${Decorators.COLUMN({ type: 'string' }).print()}
    ${"@Property({ type: 'string' })"} | ${Decorators.PROPERTY({ type: 'string' }).print()}
    ${'@ViewColumn()'}                 | ${Decorators.VIEW_COLUMN().print()}
    ${'@Dto()'}                        | ${Decorators.DTO().print()}
    ${"@Many('Some')"}                 | ${Decorators.MANY('Some').print()}
    ${"@One('Some')"}                  | ${Decorators.ONE('Some').print()}
    ${"@Owner('Some')"}                | ${Decorators.OWNER('Some').print()}
  `('should print $expected ', ({ expected, actual }) => {
    expect(actual).toBe(expected);
  });
});
