import { createContext } from 'react';
import { Pose } from '../types';

export interface PosesContextType {
  posesList: Pose[];
  setPosesList: (u: Pose[]) => void;
}

export const defaultPosesContext: PosesContextType = {
    posesList: [],
    setPosesList: ([]) => null,
};

export const PosesContext = createContext<PosesContextType>(defaultPosesContext);
