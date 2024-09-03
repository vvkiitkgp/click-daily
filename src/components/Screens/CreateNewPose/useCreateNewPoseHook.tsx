import { useState } from 'react';
import { Path, Pose } from '../../../types';

export enum CreateNewPoseSteps {
  POSE_CAPTURE = 'POSE_CAPTURE',
  POSE_DRAW = 'POSE_DRAW',
  POSE_NAME = 'POSE_NAME',
  POSE_REMINDER = 'POSE_REMINDER',
  POSE_CHECKLIST = 'POSE_CHECKLIST',
  POSE_CREATED = 'POSE_CREATED',
}

export const useCreateNewPoseHook = () => {
  const [step, setStep] = useState<CreateNewPoseSteps>(
    CreateNewPoseSteps.POSE_CAPTURE
  );
  const [firstImage, setFirstImage] = useState<string | null>(null);
  const [penThickness, setPenThickness] = useState<number>(4);
  const [createdPose, setCreatedPose] = useState<Pose>({
    createdDate: new Date().toString(),
    enabledWeekDays: [],
    isMissedToday: false,
    isPoseClickedToday: true,
    name: '',
    paths: [],
    photoCount: 1,
    poseId: '1', // TODO
    poseIndexForUser: 1, // TODO according to set reminder
    reminder: '',
    streak: 1,
    totalDayCount: 1,
    totalMissed: 0,
    userId: '1', // TODO set user Id here
    checklist: [
      {
        id: '1',
        index: 0,
        message: 'Did workout today?',
        type: 'checklist',
        count: 0,
        isChecked: false,
      },
      {
        id: '2',
        index: 0,
        message:
          'Had enough protein today? bij hb jbj bjb b jb bj b bhj bh bb hhb hb buh buh bu bub yb ub ubv bub ub ubu buy b bub ub uy buyb uybhu b bh',
        type: 'checklist',
        count: 0,
        isChecked: false,
      },
      {
        id: '3',
        index: 1,
        message: ' pushups 10',
        type: 'count',
        count: 0,
        isChecked: false,
      },
      {
        id: '4',
        index: 2,
        message: 'squates 15',
        type: 'count',
        count: 0,
        isChecked: false,
      },
    ],
  });

  const stepsOrder: CreateNewPoseSteps[] = [
    CreateNewPoseSteps.POSE_CAPTURE,
    CreateNewPoseSteps.POSE_DRAW,
    CreateNewPoseSteps.POSE_NAME,
    CreateNewPoseSteps.POSE_REMINDER,
    CreateNewPoseSteps.POSE_CHECKLIST,
    CreateNewPoseSteps.POSE_CREATED,
  ];

  return {
    step,
    setStep,
    firstImage,
    setFirstImage,
    stepsOrder,
    penThickness,
    setPenThickness,
    createdPose,
    setCreatedPose,
  };
};
