/**
 * @param id {@link id}
 * @param label {@link label}
 */
export interface IOption {
  id: number;
  label: string;
  subs?: IOption[];
}
