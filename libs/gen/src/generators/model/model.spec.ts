import * as yaml from 'js-yaml';
import { readFileSync } from 'fs';
import { join } from 'path';
import { ModelOptions, StringValidation } from './model';

describe('Model', () => {
  it('yaml data should match the Model interface', () => {
    const content = readFileSync(join(__dirname, 'model.test.yaml')).toString();

    const obj = yaml.load(content) as ModelOptions;

    expect(obj.properties).not.toBeUndefined();
    expect(obj.properties.title).not.toBeUndefined();
    expect(obj.properties.title.validation).not.toBeUndefined();
    expect((obj.properties.title.validation as StringValidation).format).toBe(
      'shortText'
    );

    expect(obj.properties.description).not.toBeUndefined();
    expect(obj.properties.category).not.toBeUndefined();

    expect(obj.relations).not.toBeUndefined();
    expect(obj.relations.assignee).not.toBeUndefined();
    expect(obj.relations.sprint).not.toBeUndefined();
    expect(obj.required).not.toBeUndefined();
    expect(obj.required.length).toBe(2);
    expect(obj.unique).not.toBeUndefined();
    expect(obj.unique.length).toBe(1);
  });
});
