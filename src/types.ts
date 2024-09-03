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
  date: string;
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
  reminder: string;
  totalDayCount: number;
  photoCount: number;
  createdDate: string;
  isPoseClickedToday: boolean;
  isMissedToday: boolean;
  streak: number;
  enabledWeekDays: string[];
  totalMissed: number;
  poseIndexForUser: number;
  checklist: ChecklistItem[];
}
