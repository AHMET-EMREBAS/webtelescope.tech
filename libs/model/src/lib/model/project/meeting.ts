import { IID, ITarget, ITimestamp } from '../../common';

/**
 * @param id {@link IID.id}
 * @param title {@link title}
 * @param description {@link description}
 * @param start {@link start}
 * @param held {@link held}
 * @param goals {@link goals}
 * @param target {@link ITarget.target} Sprint
 * @param delayedTo {@link delayedTo} IMeeting
 * @param invitedMembers {@link invitedMembers}
 * @param attendantMembers {@link attendantMembers}
 * @param createdAt {@link ITimestamp.createdAt}
 * @param updatedAt {@link ITimestamp.updatedAt}
 * @param deletedAt {@link ITimestamp.deletedAt}
 */
export interface IMeeting<User, Target>
  extends IID,
    ITimestamp,
    ITarget<Target> {
  /**
   * Start date-time of the meeting
   */
  start: Date;

  /**
   * Duration as minutes
   */
  duration: number;

  /**
   * Meeting title
   */
  title: string;

  /**
   * Meeting description
   */
  description: string;

  /**
   * Meeting Goals
   */
  goals: string[];

  /**
   * Invited users
   */
  invitedMembers: User[];

  /**
   * Attendant members
   */
  attendantMembers: User[];

  /**
   * Is the meeting successfully held.
   */
  held: boolean;

  /**
   * If the meeting is delayed, the new meeting is created with the new start date
   */
  delayedTo: IMeeting<User, Target>;
}
