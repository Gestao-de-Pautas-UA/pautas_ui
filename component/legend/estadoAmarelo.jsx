import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import CircleIcon from '@mui/icons-material/Circle';
import Typography from '@mui/material/Typography';

const StyledRating = styled(Rating)(({ theme }) => ({
  '& .MuiRating-iconEmpty .MuiSvgIcon-root': {
    color: theme.palette.action.disabled,
  },
}));

const customIcons = {
  1: {
    icon: <CircleIcon color="error" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <CircleIcon color="warning" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <CircleIcon color="success" />,
    label: 'Neutral',
  }
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

export default function EstadoAmarelo() {
  return (
    <>
    <StyledRating
      name="highlight-selected-only"
      defaultValue={2}
      IconContainerComponent={IconContainer}
      getLabelText={(value) => customIcons[value].label}
      highlightSelectedOnly
      readOnly
      max={3}
        size='small'
    />
    <Typography component="legend" fontSize='12px'>Preenchia</Typography>
    </>
  );
}