import { Picture, PictureInAWeek } from '../../../types';

export const formatPhotosToWeekArray = (
  pictureList: Picture[]
): PictureInAWeek[] => {
  let week = 1;
  let formatedPhotosToWeek: PictureInAWeek[] = [];
  pictureList.map((picture) => {
    if (formatedPhotosToWeek.length < week) {
      formatedPhotosToWeek.push({
        week,
        photos: [],
      });
    }
    if (formatedPhotosToWeek?.[week - 1]?.photos?.length < 7) {
      formatedPhotosToWeek[week - 1].photos.push(picture);
    } else {
      formatedPhotosToWeek.push({
        week: week + 1,
        photos: [picture],
      });
      week++;
    }
  });

  return formatedPhotosToWeek;
};
