import * as React from "react";
import { IconButton, Typography, styled, Theme } from "@mui/material";

interface DayProps {
  filled?: boolean;
  outlined?: boolean;
  highlighted?: boolean;
  disabled?: boolean;
  startOfRange?: boolean;
  endOfRange?: boolean;
  onClick?: () => void;
  onHover?: () => void;
  value: number | string;
}

const Day = (props: DayProps) => {
  const { filled, outlined, highlighted, disabled, startOfRange, endOfRange, onClick, onHover, value } = props;

  const ButtonContainer = styled("div")(({ theme }) => ({
    display: "flex",
    ...(startOfRange && {
      borderRadius: "50% 0 0 50%"
    }),
    ...(endOfRange && {
      borderRadius: "0 50% 50% 0"
    }),
    ...(highlighted && !disabled && {
      backgroundColor: theme.palette.action.hover
    })
  }));

  const Button = styled(IconButton)(({ theme }) => ({
    height: 36,
    width: 36,
    padding: 0,
		fontSize: '12px',
		fontWeight: '400',
    ...(outlined && {
      border: `1px solid #6D5DD2`
    }),
    ...(filled && {
      backgroundColor: '#6D5DD2',
      "&:hover": {
        backgroundColor: 'rgba(109, 93, 210, 0.5)'
      }
    })
  }));

  const ButtonText = styled(Typography)(({ theme }) => ({
    lineHeight: 1.6,
		fontSize: '12px',
		fontWeight: '400',
    ...(filled && {
      color: theme.palette.primary.contrastText
    })
  }));

  return (
    <ButtonContainer>
      <Button disabled={disabled} onClick={onClick} onMouseOver={onHover}>
        <ButtonText variant="body2" color={disabled ? '#919EAB' : '#1C252E'}>
          {value}
        </ButtonText>
      </Button>
    </ButtonContainer>
  );
};

export default Day;
