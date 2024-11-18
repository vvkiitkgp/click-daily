import { Picture, User } from '../../types';

export const usersMock: User[] = [
  { userId: '1', emailId: 'user1@example.com', password: 'passworduser1' },
  { userId: '2', emailId: 'user2@example.com', password: 'passworduser2' },
];

const getPictures = () => {
  const twentyElementsArray = new Array(50).fill(null);
  return twentyElementsArray.map((p, index) => ({
    userId: '',
    poseId: '',
    pictureId: '',
    picture: '',
    date: '',
    day: index + 1,
    streak: index + 1,
  }));
};

export const picturesMock: Picture[] = getPictures();


