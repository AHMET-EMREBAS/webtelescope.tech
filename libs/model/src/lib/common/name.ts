export interface IName {
  name: string;
}

export interface ITitle {
  title: string;
}

export interface IDescription {
  description: string;
}

export interface INameDescription extends IName, IDescription {}

export interface ITitleDescription extends ITitle, IDescription {}
