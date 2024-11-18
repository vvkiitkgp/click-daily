export interface User {
  userId: string;
  emailId: string;
  password: string;
}

export interface Picture {
  userId: string;
  poseId: string;
  pictureId: string;
  picture: string;
  date: Date;
  day: number;
  streak: number;
}

export interface PictureInAWeek {
  week: number;
  photos: Picture[];
}

export interface ChecklistItem {
  id: string;
  index: number;
  type: 'checklist' | 'count';
  message: string;
  isChecked: boolean;
  count: number;
}
export interface Path {
  d: string[];
  penThickness: number;
}
export interface Pose {
  poseId: string;
  userId: string;
  paths: Path[];
  name: string;
  reminder: Date;
  totalDayCount: number;
  photoCount: number;
  createdDate: Date;
  isPoseClickedToday: boolean;
  isMissedToday: boolean;
  streak: number;
  enabledWeekDays: string[];
  totalMissed: number;
  poseIndexForUser: number;
  checklist: ChecklistItem[];
}

export interface AsyncResult<TData = any> {
  data?: TData;
  loading: boolean;
  error?: Error;
}