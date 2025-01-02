import { useState, useMemo } from 'react';
import { useGetPoseDetails } from '../../../../hooks/useGetPoseDetails';
import { saveImageToDevice } from '../../CreateNewPose/utils';
import { addDailyChecklist, uploadPictureByPoseIdApi } from '../../../../services/api';
import { generateNewUuid } from '../../../../utils/generateNewUuid';
import { AsyncResult, ChecklistItem, Pose } from '../../../../types';

interface ClickTodayData {
    poseData?: Pose | null;
    handleDone: (poseCatureImage: string | null, setPoseCaptureImage: React.Dispatch<React.SetStateAction<string | null>>, pose: any, factId: string, newChecklistData: ChecklistItem[]) => void;
}

export const useClickToday = (poseId: string): AsyncResult<ClickTodayData> => {
    const [processing, setProcessing] = useState(false)
    const [processError, setProcessError] = useState<Error | undefined>(undefined)

    const { data: PoseDetails, loading: PoseDetailsLoading, error: PoseDetailsError } = useGetPoseDetails(poseId);

    const uploadPicture = async (poseCatureImage, setPoseCaptureImage, pose, factId) => {
        saveImageToDevice(
            poseCatureImage,
            setPoseCaptureImage,
            () => { }
        );

        if (
            pose?.createdDate &&
            pose?.poseId &&
            pose?.userId &&
            poseCatureImage
        ) {
            await uploadPictureByPoseIdApi({
                date: new Date(),
                day: 1,
                picture: poseCatureImage,
                pictureId: generateNewUuid().toString(),
                poseId: pose.poseId,
                streak: 1,
                userId: pose.userId,
            }, factId);
        }
    }

    const handleDone = async (poseCatureImage, setPoseCaptureImage, pose, factId, newChecklistData) => {
        try {
            setProcessing(true);
            await uploadPicture(poseCatureImage, setPoseCaptureImage, pose, factId);
            console.log(newChecklistData[1].count)
            await addDailyChecklist(newChecklistData, factId, pose.poseId);
        } catch (e) {
            setProcessError(e as Error)
        } finally {
            setProcessing(false);
        }


    }

    const loading = PoseDetailsLoading || processing;
    const error = PoseDetailsError || processError;
    const data: ClickTodayData = useMemo(() => {
        return {
            poseData: PoseDetails,
            handleDone,
        }
    }, [PoseDetails, handleDone])



    return { data, loading, error };
};