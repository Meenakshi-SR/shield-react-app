import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DateTime } from "luxon";
import {
  MenuItem,
  Select,
  Typography,
  Box,
  Tooltip,
  Button,
  Paper,
} from "@mui/material";

const timezones = [
  "UTC",
  "Asia/Kolkata",
  "Asia/Dubai",
  "Europe/Moscow",
  "America/New_York",
  "Australia/Sydney",
];

const MAX_DAYS_ALLOWED = 10;

// Predefined messages for specific dates
const initialSpecialDates = {
  "2025-03-10": { message: "Holiday: Festival Day", disabled: true },
  "2025-04-15": { message: "Project Deadline", disabled: false },
  "2025-05-01": { message: "Labor Day", disabled: true },
};

const CalendarWithTimezone = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [timezone, setTimezone] = useState("UTC");
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [specialDates, setSpecialDates] = useState(initialSpecialDates);

  const startOfYear = DateTime.now().startOf("year").toISODate();
  const endOfYear = DateTime.now().endOf("year").toISODate();

  const handleDateSelect = (selectInfo) => {
    const now = DateTime.now();
    const maxDate = now.plus({ days: 90 });

    const selectedStart = DateTime.fromISO(selectInfo.startStr, {
      zone: "UTC",
    });
    const selectedEnd =
      DateTime.fromISO(selectInfo.endStr, { zone: "UTC" }) || selectedStart;
    const diffDays = selectedEnd.diff(selectedStart, "days").days;

    if (selectedStart < now || selectedEnd > maxDate) {
      alert("Selected date is out of range. Please select a valid date.");
      return;
    }

    if (diffDays > MAX_DAYS_ALLOWED) {
      setTooltipOpen(true);
      setTimeout(() => setTooltipOpen(false), 2000);
      return;
    }

    if (specialDates[selectInfo.startStr]?.disabled) {
      alert(
        "This date is disabled: " + specialDates[selectInfo.startStr].message
      );
      return;
    }

    setSelectedDate(selectedStart);
  };

  const toggleDateStatus = (date) => {
    setSpecialDates((prev) => ({
      ...prev,
      [date]: {
        ...prev[date],
        disabled: !prev[date].disabled,
      },
    }));
  };

  const renderEventContent = (eventInfo) => {
    return (
      <Tooltip title={specialDates[eventInfo.event.startStr]?.message || ""}>
        <span>{eventInfo.event.title}</span>
      </Tooltip>
    );
  };

  const events = Object.keys(specialDates).map((date) => ({
    title: specialDates[date].message,
    start: date,
    display: "background",
    backgroundColor: specialDates[date].disabled ? "#d3d3d3" : "#87CEFA",
    textColor: "#000",
  }));

  return (
    <Paper sx={{ padding: 2, maxWidth: 800, margin: "auto" }}>
      <Typography variant="h6">Select a Date</Typography>
      <Tooltip
        open={tooltipOpen}
        title={`You can select up to ${MAX_DAYS_ALLOWED} days only.`}
      >
        <Box>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            select={handleDateSelect}
            validRange={{ start: startOfYear, end: endOfYear }}
            events={events}
            eventContent={renderEventContent}
          />
        </Box>
      </Tooltip>

      <Box sx={{ marginTop: 2 }}>
        <Typography variant="body1">Select Timezone:</Typography>
        <Select value={timezone} onChange={(e) => setTimezone(e.target.value)}>
          {timezones.map((tz) => (
            <MenuItem key={tz} value={tz}>
              {tz}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {selectedDate && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Selected Date & Time:</Typography>
          <Typography>
            {selectedDate
              .setZone(timezone)
              .toLocaleString(DateTime.DATETIME_FULL)}
          </Typography>
          {specialDates[selectedDate.toISODate()] && (
            <Button
              onClick={() => toggleDateStatus(selectedDate.toISODate())}
              variant="contained"
              color={
                specialDates[selectedDate.toISODate()].disabled
                  ? "primary"
                  : "secondary"
              }
              sx={{ marginTop: 2 }}
            >
              {specialDates[selectedDate.toISODate()].disabled
                ? "Enable Date"
                : "Disable Date"}
            </Button>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default CalendarWithTimezone;
