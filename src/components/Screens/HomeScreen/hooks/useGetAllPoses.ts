import { useState, useEffect, useCallback } from "react";
import { AsyncResult, Pose } from "../../../../types";
import { getAllPosesApi } from "../../../../services/api";

export const useGetAllPoses = (): {
  data: Pose[] | undefined;
  loading: boolean;
  error: Error | undefined;
  refetch: () => Promise<void>;
} => {
  const [state, setState] = useState<AsyncResult<Pose[]>>({
    data: undefined,
    loading: true,
    error: undefined,
  });

  const fetchAllPoses = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true })); // Set loading to true while refetching
    try {
      const poses = await getAllPosesApi();
      setState({ data: poses ?? undefined, loading: false, error: undefined });
    } catch (e) {
      setState({ data: undefined, loading: false, error: e as Error });
    }
  }, []);

  useEffect(() => {
    fetchAllPoses();
  }, [fetchAllPoses]);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    refetch: fetchAllPoses,
  };
};
