/* eslint-disable @typescript-eslint/no-explicit-any */
import { Repository } from 'typeorm';

export function RestController() {
  class RController {
    constructor(public readonly repo: Repository<any>) {}
    findAll(query: any) {
      return this.repo.find(query);
    }

    findOneById(id: number) {
      return this.repo.findOneBy({ id });
    }

    save(entity: any) {
      return this.repo.save(entity);
    }

    delete(id: number) {
      return this.repo.delete(id);
    }

    softDelete(id: number) {
      return this.repo.softDelete(id);
    }

    update(id: number, entity: any) {
      return this.repo.update(id, entity);
    }

    addRelation() {}
    removeRelation() {}
    setRelation() {}
    unsetRelation() {}
  }

  return RController;
}
