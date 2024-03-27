import { IID } from '../../common';
import { IMeeting } from '../../model';

export interface ICreateMeetingDto
  extends Pick<
    IMeeting<IID, IID>,
    | 'attendantMembers'
    | 'description'
    | 'duration'
    | 'goals'
    | 'held'
    | 'invitedMembers'
    | 'sprint'
    | 'title'
    | 'start'
  > {}
