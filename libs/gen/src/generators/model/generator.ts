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

function __entity(
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
function __createDto(
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

function __updateDto(
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

function __queryDto(
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

function ___gen(tree: Tree) {
  for (const [modelName, classBuilder] of classBuilders) {
    const projectRoot = `libs/gen-model/src/lib/${names(modelName).fileName}`;
    const fileNameBuilder = new FileNameBuilder(modelName);
    __entity(tree, projectRoot, fileNameBuilder, classBuilder);
    __createDto(tree, projectRoot, fileNameBuilder, classBuilder);
    __updateDto(tree, projectRoot, fileNameBuilder, classBuilder);
    __queryDto(tree, projectRoot, fileNameBuilder, classBuilder);
  }
}

export async function entityGenerator(tree: Tree) {
  ___gen(tree);
  await formatFiles(tree);
}
export default entityGenerator;
