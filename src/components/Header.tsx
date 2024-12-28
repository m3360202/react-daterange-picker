import {
	Grid,
	createStyles,
	IconButton,
	Select,
	MenuItem,
	SelectChangeEvent
} from "@mui/material";
import { withStyles } from '@mui/styles';
import { WithStyles } from '@material-ui/core';

import React, { useEffect, useState } from "react";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
interface HeaderProps extends WithStyles<typeof styles> {
	date: Date;
	setDate: (date: Date) => void;
	nextDisabled: boolean;
	prevDisabled: boolean;
	onClickNext: () => void;
	onClickPrevious: () => void;
}

const styles = createStyles({
	iconContainer: {
		padding: 5
	},
	icon: {
		padding: 10,
		"&:hover": {
			background: "none"
		}
	}
});

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

const generateYears = (relativeTo: Date, count: number) => {
	const half = Math.floor(count / 2);
	return Array(count)
		.fill(0)
		.map((y, i) => relativeTo.getFullYear() - half + i); // TODO: make part of the state
};

const Header: React.FunctionComponent<HeaderProps> = ({
	date,
	classes,
	setDate,
	nextDisabled,
	prevDisabled,
	onClickNext,
	onClickPrevious
}) => {

	useEffect(() => {
    async function loadDateFns() {
      const dateFns = await import('date-fns');
      const { getMonth, getYear } = dateFns;
			const [month, setMonth] = useState(null);
  		const [year, setYear] = useState(null);
      
      const date = new Date();
			//@ts-ignore
      setMonth(getMonth(date));
			//@ts-ignore
      setYear(getYear(date));
    }

    loadDateFns();
  }, []);

	const handleMonthChange = (event: SelectChangeEvent<{ value: number }>) => {
		//@ts-ignore
		setDate(setMonth(date, parseInt(event.target.value as string)));
	};

	const handleYearChange = (event: SelectChangeEvent<{ value: number }>) => {
		//@ts-ignore
		setDate(setYear(date, parseInt(event.target.value as string)));
	};
	

	return (
		<Grid container sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
			<Grid item >
				<IconButton
					disabled={prevDisabled}
					onClick={onClickPrevious}>
					<ChevronLeft color={prevDisabled ? "disabled" : "action"} />
				</IconButton>
			</Grid>
			<Grid item>
				<Select
					//@ts-ignore
					value={getMonth(date) as number}
					onChange={handleMonthChange}
					MenuProps={{ disablePortal: true }}>
					{MONTHS.map((month, idx) => (
						<MenuItem key={month} value={idx}>
							{month}
						</MenuItem>
					))}
				</Select>
			</Grid>

			<Grid item>
				<Select
					//@ts-ignore
					value={getYear(date)}
					onChange={handleYearChange}
					MenuProps={{ disablePortal: true }}>
					{generateYears(date, 30).map(year => (
						<MenuItem key={year} value={year}>
							{year}
						</MenuItem>
					))}
				</Select>

				{/* <Typography>{format(date, "MMMM YYYY")}</Typography> */}
			</Grid>
			<Grid item >
				<IconButton disabled={nextDisabled} onClick={onClickNext}>
					<ChevronRight color={nextDisabled ? "disabled" : "action"} />
				</IconButton>
			</Grid>
		</Grid>
	);
};

export default withStyles(styles)(Header);
