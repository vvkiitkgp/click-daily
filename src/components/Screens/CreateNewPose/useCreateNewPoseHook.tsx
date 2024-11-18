import { useEffect, useState } from 'react';
import { Path, Pose } from '../../../types';
import { createNewPoseApi, modifyPoseByIdApi } from '../../../services/api';
import { generateNewUuid } from '../../../utils/generateNewUuid';
import { getCurrentTime } from './utils';
import { DEFAULT_USER_ID } from '../../../utils/common';

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
  const defaultPoseData: Pose = {
    createdDate: new Date(),
    enabledWeekDays: [],
    isMissedToday: false,
    isPoseClickedToday: true,
    name: '',
    paths: [],
    photoCount: 1,
    poseId: '',
    poseIndexForUser: 1, // TODO according to set reminder
    reminder: getCurrentTime(),
    streak: 1,
    totalDayCount: 1,
    totalMissed: 0,
    userId: DEFAULT_USER_ID, // TODO set user Id here
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
        id: '3',
        index: 1,
        message: ' pushups 10',
        type: 'count',
        count: 0,
        isChecked: false,
      },
    ],
  };
  const [createdPose, setCreatedPose] = useState<Pose | null>(null);

  useEffect(() => {
    const createPose = async () => {
      const newPose: Pose = {
        ...defaultPoseData,
        poseId: `${generateNewUuid()}`,
      };
      setCreatedPose(newPose);
      await createNewPoseApi(newPose);
    };

    createPose();
  }, []);

  const stepsOrder: CreateNewPoseSteps[] = [
    CreateNewPoseSteps.POSE_CAPTURE,
    CreateNewPoseSteps.POSE_DRAW,
    CreateNewPoseSteps.POSE_NAME,
    CreateNewPoseSteps.POSE_REMINDER,
    CreateNewPoseSteps.POSE_CHECKLIST,
    CreateNewPoseSteps.POSE_CREATED,
  ];

  const handleMofifyPose = async (data: Pose) => {
    await modifyPoseByIdApi(data);
    setCreatedPose(data);
  };

  return {
    step,
    setStep,
    firstImage,
    setFirstImage,
    stepsOrder,
    penThickness,
    setPenThickness,
    createdPose,
    setCreatedPose: handleMofifyPose,
  };
};
