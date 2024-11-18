import { useEffect, useState } from "react"
import { AsyncResult, Pose } from "../../../../types"
import { getAllPosesApi } from "../../../../services/api";


export const useGetAllPoses = ():AsyncResult<Pose[]>=>{
    const [state, setState] = useState<AsyncResult<Pose[]>>({
        data:undefined,
        loading: true,
        error:undefined
    })

    useEffect(() => {
        const fetchAllPoses = async () => {
          try {
            const poses = await getAllPosesApi();
            setState({ data: poses ?? undefined, loading: false, error: undefined });
          } catch (e) {
            setState({ data: undefined,loading: false, error: e as Error });
          }
        };
        fetchAllPoses();
      }, []);

    return state
}