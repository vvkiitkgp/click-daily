import { Picture, Pose } from "../types"
import { getFileNameAndType } from "../utils/common";

const API_BASE_URL = 'http://18.179.13.68:3000';

export const createNewPoseApi = async (data: Pose) =>{
  const result = await fetch(`${API_BASE_URL}/api/createNewPose`,{
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json'
    }
 })

 if(result.ok){
    const response = await result.json();
    if(response.sucess){
        console.log(response.message)
    } else {
        console.error(response.message)
    }
 } else{
    console.error("Something Went Wrong!! Unsuccessful call from backend")
 }
}

export const modifyPoseByIdApi = async (data: Pose) =>{
    const result = await fetch(`${API_BASE_URL}/api/modifyPoseById`,{
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
          'Content-Type': 'application/json'
      }
   })
  
   if(result.ok){
      const response = await result.json();
      if(response.sucess){
          console.log(response.message)
      } else {
          console.error(response.message)
      }
   } else{
      console.error("Something Went Wrong!! Unsuccessful call from backend")
   }
  }

export const uploadPictureByPoseIdApi = async (pictureData: Picture) => {
    try {
      const { fileName, mimeType } = getFileNameAndType(pictureData.picture);
  
      // Create FormData object
      const formData = new FormData();
      formData.append('file', {
        uri: pictureData.picture,
        name: fileName,
        type: mimeType,
      } as any);
  
      formData.append('userId', pictureData.userId);
      formData.append('poseId', pictureData.poseId);
      formData.append('pictureId', pictureData.pictureId);
      formData.append('date', pictureData.date.toString());
      formData.append('day', pictureData.day.toString());
      formData.append('streak', pictureData.streak.toString());
  
      // Send the request to the API endpoint
      const result = await fetch(`${API_BASE_URL}/api/uploadPictureByPoseId`, {
        method: 'POST',
        body: formData,
      });
  
      // Handle the response
      if (result.ok) {
        const response = await result.json();
        if (response.success) {
          console.log(response.message);
        } else {
          console.error(response.message);
        }
      } else {
        console.error('Something went wrong! Unsuccessful call from backend');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  export const getAllPosesApi = async (): Promise<Pose[] | null> => {
    try {
      const result = await fetch(`${API_BASE_URL}/api/getAllPoses`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (result.ok) {
        const response = await result.json();
        if (response.data) {
          console.log("Poses retrieved successfully:", response.data);
          return response.data;
        } else {
          console.error("Error from backend:", response.message);
          return null;
        }
      } else {
        console.error("Failed to retrieve poses. Backend call unsuccessful.");
        return null;
      }
    } catch (error) {
      console.error("An error occurred while fetching poses:", error);
      return null;
    }
  };

export const getPoseDetailsByPoseIdApi = async (poseId: string) => {
    try {
        const result = await fetch(`${API_BASE_URL}/api/getPoseDetailsByPoseId/:${poseId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (result.ok) {
            const response = await result.json();
            if (response.data) {
                console.log("Poses retrieved successfully:", response.data);
            } else {
                console.error("Error from backend:", response.message);
            }
        } else {
            console.error("Failed to retrieve poses. Backend call unsuccessful.");
        }
    } catch (error) {
        console.error("An error occurred while fetching poses:", error);
    }
};

export const getAllPicturesByPoseId = async (poseId: string): Promise<Picture[]> => {
    try {
      const result = await fetch(`${API_BASE_URL}/api/getAllPicturesByPoseId/${poseId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!result.ok) {
        throw new Error(`Failed to retrieve poses. Status: ${result.status}`);
      }
  
      const response = await result.json();
  
      if (response.data) {
        console.log("Pictures retrieved successfully:", response.data);
        return response.data as Picture[];
      } else {
        console.error("Error from backend:", response.message);
        throw new Error(response.message || "No data received");
      }
    } catch (error) {
      console.error("An error occurred while fetching Pictures:", error);
      throw error;
    }
  };