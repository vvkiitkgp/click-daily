import { Pose } from "../../../types";
import { DEFAULT_USER_ID } from "../../../utils/common";

export const getDefaultCreatePoseData = () => {
    const pose: Pose = {
        poseId: "1", // TODO
        userId: DEFAULT_USER_ID, // TODO
        paths: [],
        name: "Untitled",
        reminder: new Date(),
        totalDayCount: 0,
        photoCount: 0,
        createdDate: new Date(),
        isPoseClickedToday: false,
        isMissedToday: false,
        streak: 0,
        enabledWeekDays: ["Monday"],
        totalMissed: 0,
        poseIndexForUser: 0, // TODO
        checklist: []
      };

      return pose
}