import { IID, IOwnedEntity } from './base';

export interface IReview<O> extends IOwnedEntity<O> {
  review: string;
  rate: number;
}

export interface ICreateReviewDto
  extends Pick<IReview<IID>, 'owner' | 'review' | 'rate'> {}

export interface IUpdateReviewDto extends Partial<ICreateReviewDto> {}



