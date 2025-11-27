import React from 'react';
import Svg, { Rect, Path, G } from 'react-native-svg';
import { COLORS } from '../theme';

interface LogoProps {
  width?: number;
  height?: number;
  color?: string;
  noBackground?: boolean;
}

const Logo: React.FC<LogoProps> = ({ width = 32, height = 32, color, noBackground = false }) => {
  const fillColor = color || (noBackground ? COLORS.primary : "#fff");
  
  return (
    <Svg width={width} height={height} viewBox="0 0 32.17 32.17">
      {!noBackground && <Rect fill={COLORS.primary} x="3" y="3" width="26.16" height="26.16" rx="4.65" ry="4.65"/>}
      <G>
        <Path fill={fillColor} d="M15.57,21.77h0c0,2-1.62,3.61-3.61,3.61h-1.63v-10.85l4.85.41.22,2.66c.12,1.38.17,2.77.17,4.16Z"/>
        <Path fill={fillColor} d="M21.08,8.42l-10.72,4.92v-.03c0-3.6,2.92-6.52,6.52-6.52,1.64,0,3.14.61,4.28,1.6-.02,0-.05.02-.08.03Z"/>
        <Path fill={fillColor} d="M23.39,13.3s0,.1,0,.14c-.04,2.11-1.08,3.96-2.67,5.12-1.11.81-2.48,1.28-3.95,1.25l4.94-10.77s.02-.06.03-.09c1.03,1.16,1.66,2.67,1.66,4.34Z"/>
      </G>
    </Svg>
  );
};

export default Logo;
