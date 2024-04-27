import { DecoratorOptionsPrinterFactory } from './decorator-options.factory';
import { DecoratorPrinterFactory } from './decorator.factory';
const Factory = new DecoratorPrinterFactory(
  new DecoratorOptionsPrinterFactory()
);

describe('DecoratorPrinterFactory', () => {
  it.each`
    expected                           | actual
    ${'@Entity()'}                     | ${Factory.ENTITY().print()}
    ${"@Column({ type: 'string' })"}   | ${Factory.COLUMN({ type: 'string' }).print()}
    ${"@Property({ type: 'string' })"} | ${Factory.PROPERTY({ type: 'string' }).print()}
    ${'@ViewColumn()'}                 | ${Factory.VIEW_COLUMN().print()}
    ${'@Dto()'}                        | ${Factory.DTO().print()}
    ${"@Many('Some')"}                 | ${Factory.MANY('Some').print()}
    ${"@One('Some')"}                  | ${Factory.ONE('Some').print()}
    ${"@Owner('Some')"}                | ${Factory.OWNER('Some').print()}
  `('should print $expected ', ({ expected, actual }) => {
    expect(actual).toBe(expected);
  });
});
