import { useEffect, useState } from 'react';
import { getAllPicturesByPoseId } from '../../../../services/api';

export interface Picture {
  userId: string;
  poseId: string;
  pictureId: string;
  picture: string;
  date: Date;
  day: number;
  streak: number;
}

// Custom hook
export const useGetAllPicturesForPose = (poseId: string) => {
  const [data, setData] = useState<Picture[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  console.log("56757656756756755555 5 5 5 5 5 5 5 5 5 5 5 5 5 ", poseId)
  useEffect(() => {
    const fetchPictures = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(poseId,"POSEE ID 222222222")
        const pictures = await getAllPicturesByPoseId(poseId);
        setData(pictures);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    console.log(poseId,"POSEE ID 1111111111")
    if (poseId) {
      fetchPictures();
    }
  }, [poseId]);

  return { data, loading, error };
};
