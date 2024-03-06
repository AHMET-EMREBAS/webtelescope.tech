## Project Schemas

## How to generate \*?

Here is the list of generators.

- entity
- graph
- form
- resoruce
- table

```shell
npx nx g @webpackages/gen:GENERATOR_NAME MODEL_NAME PROJECT_NAME
```

After running the command above, it will read the yaml file named as the command's first argument (MODEL_NAME), then generate files under the project defined as the second argument (PROJECT_NAME).

## How to update improve schema

There are property names, entity names, input types, input formats, and icons (Google Icons) defined under the enum directory. You can add/remove items to improve overall consistancy of your project defination.
