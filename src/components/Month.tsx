import * as React from "react";
import { Paper, Grid, Typography, Box, styled } from "@mui/material";
import { getDate, isSameMonth, isToday, format, isWithinInterval, isBefore } from "date-fns";
import { chunks, getDaysInMonth, isStartOfRange, isEndOfRange, inDateRange, isRangeSameDay } from "../utils";
import Header from "./Header";
import Day from "./Day";
import { NavigationAction, DateRange } from "../types";

const WEEK_DAYS = ["S", "M", "T", "W", "T", "F", "S"];

const Root = styled(Paper)(({ theme }) => ({
  width: 290,
}));

const WeekDaysContainer = styled(Grid)(({ theme }) => ({
  marginTop: 10,
  paddingLeft: 30,
  paddingRight: 30,
}));

const DaysContainer = styled(Grid)(({ theme }) => ({
  paddingLeft: 15,
  paddingRight: 15,
  marginTop: 15,
  marginBottom: 20,
}));

interface MonthProps {
  value: Date;
  marker: symbol;
  dateRange: DateRange;
  minDate: Date;
  maxDate: Date;
  navState: [boolean, boolean];
  setValue: (date: Date) => void;
  helpers: {
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    onDayClick: (day: Date) => void;
    onDayHover: (day: Date) => void;
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
}

const Month: React.FunctionComponent<MonthProps> = ({
  value: date,
  dateRange,
  marker,
  setValue: setDate,
  minDate,
  maxDate,
  navState,
  helpers,
  handlers,
}) => {
  const [back, forward] = navState;
  
  const today = new Date();

  return (
    <Root square elevation={0}>
      <Grid container>
        <Header
          date={date}
          setDate={setDate}
          nextDisabled={!forward}
          prevDisabled={!back}
          onClickPrevious={() =>
            handlers.onMonthNavigate(marker, NavigationAction.Previous)
          }
          onClickNext={() => handlers.onMonthNavigate(marker, NavigationAction.Next)}
        />

        <WeekDaysContainer container direction="row" justifyContent="space-between">
          {WEEK_DAYS.map(day => (
            <Typography style={{ fontSize: '12px', color: '#637381', fontWeight: '400' }} key={day} variant="caption">
              {day}
            </Typography>
          ))}
        </WeekDaysContainer>

        <DaysContainer item container direction="column" justifyContent="space-between">
          {chunks(getDaysInMonth(date), 7).map((week, idx) => (
            <Grid key={idx} container direction="row" justifyContent="center">
              {week.map(day => {
                const isStart = isStartOfRange(dateRange, day);
                const isEnd = isEndOfRange(dateRange, day);
                const isRangeOneDay = isRangeSameDay(dateRange);
                const highlighted =
                  inDateRange(dateRange, day) || helpers.inHoverRange(day);

                // 新的禁用条件：如果日期小于今天，则禁用
                const isDisabled =
                  !isSameMonth(date, day) ||
                  !isWithinInterval(day, { start: minDate, end: maxDate }) ||
                  (isBefore(day, today) && !isToday(day));  // 今天之前的日期禁用

                return (
                  <Day
                    key={format(day, "mm-dd-yyyy")}
                    filled={isStart || isEnd}
                    outlined={isToday(day)}
                    highlighted={highlighted && !isRangeOneDay}
                    disabled={isDisabled} // 更新的禁用条件
                    startOfRange={isStart && !isRangeOneDay}
                    endOfRange={isEnd && !isRangeOneDay}
                    onClick={() => handlers.onDayClick(day)}
                    onHover={() => handlers.onDayHover(day)}
                    value={getDate(day)}
                  />
                );
              })}
            </Grid>
          ))}
        </DaysContainer>
      </Grid>
    </Root>
  );
};

export default Month;
