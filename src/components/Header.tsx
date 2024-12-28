import React from "react";
import { Grid, IconButton, Select, MenuItem, SelectChangeEvent, styled } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import { setMonth, getMonth, setYear, getYear } from "date-fns";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];

// Helper function to generate years
const generateYears = (relativeTo: Date, count: number) => {
  const half = Math.floor(count / 2);
  return Array(count)
    .fill(0)
    .map((_, i) => relativeTo.getFullYear() - half + i); // generate years around the current year
};

interface HeaderProps {
  date: Date;
  setDate: (date: Date) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onClickNext: () => void;
  onClickPrevious: () => void;
}

const IconButtonContainer = styled(Grid)(({ theme }) => ({
  padding: 5,
}));

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  padding: 10,
  "&:hover": {
    background: "none",
  },
}));

const SelectContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const Header: React.FunctionComponent<HeaderProps> = ({
  date,
  setDate,
  nextDisabled,
  prevDisabled,
  onClickNext,
  onClickPrevious,
}) => {
  // 修改handleMonthChange的签名，接受SelectChangeEvent
  const handleMonthChange = (event: SelectChangeEvent<number>) => {
    setDate(setMonth(date, event.target.value as number)); // event.target.value已经是number类型
  };

  // 修改handleYearChange的签名，接受SelectChangeEvent
  const handleYearChange = (event: SelectChangeEvent<number>) => {
    setDate(setYear(date, event.target.value as number)); // event.target.value已经是number类型
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <IconButtonContainer item>
        <IconButtonStyled
          disabled={prevDisabled}
          onClick={onClickPrevious}
        >
          <ChevronLeft color={prevDisabled ? "disabled" : "action"} />
        </IconButtonStyled>
      </IconButtonContainer>

      <SelectContainer item>
        <Select
					style={{ padding: '0px', maxHeight: '32px', border: 'none' }}
          value={getMonth(date)}
          onChange={handleMonthChange}
          MenuProps={{ disablePortal: true }}
        >
          {MONTHS.map((month, idx) => (
            <MenuItem key={month} value={idx}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </SelectContainer>

      <SelectContainer item>
        <Select
					style={{ padding: '0px', maxHeight: '32px', border: 'none' }}
          value={getYear(date)}
          onChange={handleYearChange}
          MenuProps={{ disablePortal: true }}
        >
          {generateYears(date, 30).map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </SelectContainer>

      <IconButtonContainer item>
        <IconButtonStyled
          disabled={nextDisabled}
          onClick={onClickNext}
        >
          <ChevronRight color={nextDisabled ? "disabled" : "action"} />
        </IconButtonStyled>
      </IconButtonContainer>
    </Grid>
  );
};

export default Header;
