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

export const useGetAllPicturesForPose = (poseId: string) => {
  const [data, setData] = useState<Picture[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPictures = async () => {
      setLoading(true);
      setError(null);
      try {
        const pictures = await getAllPicturesByPoseId(poseId);
        setData(pictures);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    if (poseId && !data.length) {
      fetchPictures();
    }
  }, [poseId]);

  return { data, loading, error };
};
