import { formatFiles, generateFiles, names, Tree } from '@nx/devkit';
import { join } from 'path';
import {
  ClassBuilder,
  FileNameBuilder,
  getClassBuilder,
  ICoverAllClassTypes,
} from '@webpackages/meta-printer';
import * as MetaData from '@webpackages/gen-meta';
import { Model } from '@webpackages/meta';
import { IPrint } from '@webpackages/printer';

const classBuilders = Object.entries(
  MetaData as unknown as Record<string, Model>
).map(([, value]) => {
  return [value.modelName, getClassBuilder(value)] as [string, ClassBuilder];
});

function Entity(
  tree: Tree,
  projectRoot: string,
  fileBuilder: ICoverAllClassTypes<string>,
  classBuilder: ICoverAllClassTypes<IPrint>
) {
  generateFiles(tree, join(__dirname, 'files'), projectRoot, {
    fileName: fileBuilder.Entity(),
    content: classBuilder.Entity().print(),
  });
}

function View(
  tree: Tree,
  projectRoot: string,
  fileBuilder: ICoverAllClassTypes<string>,
  classBuilder: ICoverAllClassTypes<IPrint>
) {
  generateFiles(tree, join(__dirname, 'files'), projectRoot, {
    fileName: fileBuilder.View(),
    content: classBuilder.View().print(),
  });
}

function CreateDto(
  tree: Tree,
  projectRoot: string,
  fileBuilder: ICoverAllClassTypes<string>,
  classBuilder: ICoverAllClassTypes<IPrint>
) {
  generateFiles(tree, join(__dirname, 'files'), projectRoot, {
    fileName: fileBuilder.Create(),
    content: classBuilder.Create().print(),
  });
}

function UpdateDto(
  tree: Tree,
  projectRoot: string,
  fileBuilder: ICoverAllClassTypes<string>,
  classBuilder: ICoverAllClassTypes<IPrint>
) {
  generateFiles(tree, join(__dirname, 'files'), projectRoot, {
    fileName: fileBuilder.Update(),
    content: classBuilder.Update().print(),
  });
}

function QueryDto(
  tree: Tree,
  projectRoot: string,
  fileBuilder: ICoverAllClassTypes<string>,
  classBuilder: ICoverAllClassTypes<IPrint>
) {
  generateFiles(tree, join(__dirname, 'files'), projectRoot, {
    fileName: fileBuilder.Query(),
    content: classBuilder.Query().print(),
  });
}

function IEntity(
  tree: Tree,
  projectRoot: string,
  fileBuilder: ICoverAllClassTypes<string>,
  classBuilder: ICoverAllClassTypes<IPrint>
) {
  generateFiles(tree, join(__dirname, 'files'), projectRoot, {
    fileName: fileBuilder.IEntity(),
    content: classBuilder.IEntity().print(),
  });
}

function IView(
  tree: Tree,
  projectRoot: string,
  fileBuilder: ICoverAllClassTypes<string>,
  classBuilder: ICoverAllClassTypes<IPrint>
) {
  generateFiles(tree, join(__dirname, 'files'), projectRoot, {
    fileName: fileBuilder.IView(),
    content: classBuilder.IView().print(),
  });
}

function ICreate(
  tree: Tree,
  projectRoot: string,
  fileBuilder: ICoverAllClassTypes<string>,
  classBuilder: ICoverAllClassTypes<IPrint>
) {
  generateFiles(tree, join(__dirname, 'files'), projectRoot, {
    fileName: fileBuilder.ICreate(),
    content: classBuilder.ICreate().print(),
  });
}

function IUpdate(
  tree: Tree,
  projectRoot: string,
  fileBuilder: ICoverAllClassTypes<string>,
  classBuilder: ICoverAllClassTypes<IPrint>
) {
  generateFiles(tree, join(__dirname, 'files'), projectRoot, {
    fileName: fileBuilder.IUpdate(),
    content: classBuilder.IUpdate().print(),
  });
}

function IQuery(
  tree: Tree,
  projectRoot: string,
  fileBuilder: ICoverAllClassTypes<string>,
  classBuilder: ICoverAllClassTypes<IPrint>
) {
  generateFiles(tree, join(__dirname, 'files'), projectRoot, {
    fileName: fileBuilder.IQuery(),
    content: classBuilder.IQuery().print(),
  });
}

function __genEntities(tree: Tree) {
  for (const [modelName, classBuilder] of classBuilders) {
    const projectRoot = `libs/gen-entity/src/lib/${names(modelName).fileName}`;
    const fileNameBuilder = new FileNameBuilder(modelName);
    Entity(tree, projectRoot, fileNameBuilder, classBuilder);
    View(tree, projectRoot, fileNameBuilder, classBuilder);
    CreateDto(tree, projectRoot, fileNameBuilder, classBuilder);
    UpdateDto(tree, projectRoot, fileNameBuilder, classBuilder);
    QueryDto(tree, projectRoot, fileNameBuilder, classBuilder);
  }
  for (const [modelName, classBuilder] of classBuilders) {
    const projectRoot = `libs/gen-model/src/lib/${names(modelName).fileName}`;
    const fileNameBuilder = new FileNameBuilder(modelName);

    IEntity(tree, projectRoot, fileNameBuilder, classBuilder);
    IView(tree, projectRoot, fileNameBuilder, classBuilder);
    ICreate(tree, projectRoot, fileNameBuilder, classBuilder);
    IUpdate(tree, projectRoot, fileNameBuilder, classBuilder);
    IQuery(tree, projectRoot, fileNameBuilder, classBuilder);
  }
}

export async function entityGenerator(tree: Tree) {
  __genEntities(tree);

  await formatFiles(tree);
}

export default entityGenerator;
