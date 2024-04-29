import { ModelManager } from '@webpackages/meta';
import { ImportPrinter } from '@webpackages/printer';
import { names } from '@webpackages/utils';
import { ClassNameBuilder } from '../common';
import { IPackageNames } from './package-names';

export class ImportsBuilder {
  constructor(
    protected readonly modelManager: ModelManager,
    protected readonly nameBuilder: ClassNameBuilder,
    protected readonly packageNames: IPackageNames
  ) {}




  /**
   * Import from the folders next to this folder.
   * @param items 
   * @returns 
   */
  protected __sibling(items:string[]){ 
   return items.map(e=>{ 

    return new 
   })
  }


  /**
   * Import from common pacakge
   */
  protected __common(items: string[]) {
    return new ImportPrinter({
      source: this.packageNames.common(),
      items,
    })
  }


  /**
   * Import from core package
   */
  protected __core(items: string[]) {
    return new ImportPrinter({
      source: this.packageNames.common(),
      items,
    })
  }

  protected __relationsImport() {
    return this.modelManager
      .uniqueRelationNames()
      .map((e) => {
        return new ImportPrinter({
          source: `../${names(e).fileName}`,
          items: [e],
        }).print();
      })
      .join('\n');
  }

  Entity() {
    const relations = this.__relationsImport();
    const interfaces =this.
    return {
      print() {
        return relations;
      },
    };
  }
  CreateDto() {
    return {
      print() {
        return '';
      },
    };
  }
  UpdateDto() {
    return {
      print() {
        return '';
      },
    };
  }
  QueryDto() {
    return {
      print() {
        return '';
      },
    };
  }
  View() {
    return {
      print() {
        return '';
      },
    };
  }
}
