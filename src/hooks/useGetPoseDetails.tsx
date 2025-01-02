import { useState, useEffect } from 'react';
import { AsyncResult, Pose } from '../types';
import { getPoseDetailsByPoseIdApi } from '../services/api';

export const useGetPoseDetails = (poseId: string): AsyncResult<Pose | null> => {
    const [state, setState] = useState<AsyncResult<Pose | null>>({
        data: null,
        loading: true,
        error: undefined,
    });

    useEffect(() => {
        const fetchPoseDetails = async () => {
            setState((prev) => ({ ...prev, loading: true })); // Set loading to true
            try {
                const data = await getPoseDetailsByPoseIdApi(poseId);
                setState({ data, loading: false, error: undefined });
            } catch (error) {
                setState({ data: null, loading: false, error: error as Error });
            }
        };

        fetchPoseDetails();
    }, [poseId]);

    return state;
};