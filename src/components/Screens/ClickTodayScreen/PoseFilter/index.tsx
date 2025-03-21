import React from 'react';
import { View } from 'react-native';
import { Path as SvgPath, Svg } from 'react-native-svg';
import { Path } from '../../../../types';
import defaultColors from '../../../../styles/colors';

interface PoseFilterProps {
  paths: Path[];
}
export const PoseFilter = ({ paths }: PoseFilterProps) => {
  return (
    <Svg>
      {paths.map((p, index) => {
        return (
          <SvgPath
            key={`path-${index}`}
            d={p?.d?.join('') ?? ''}
            stroke={defaultColors.primary}
            fill={'transparent'}
            strokeWidth={p.penThickness}
            strokeLinejoin={'round'}
            strokeLinecap="round"
          />
        );
      })}
    </Svg>
  );
};
