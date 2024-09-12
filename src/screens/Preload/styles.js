import styled from 'styled-components/native';
import {COLORS} from '../../assets/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.primary};
`;

export const Image = styled.Image`
  width: 100px;
  height: 100px;
`;