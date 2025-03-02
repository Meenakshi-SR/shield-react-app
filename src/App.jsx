import CalendarWithTimezone from "./components/Calendar/Calendar";
import DataTable from "./components/Table/Table";
import { Grid2, Box } from "@mui/material";

export default function App() {
  return (
    <Box sx={{ mt: 2 }}>
      <Grid2 container spacing={2}>
        <Grid2 item xs={6}>
          <CalendarWithTimezone />
        </Grid2>
        <Grid2 item xs={6}>
          <DataTable />
        </Grid2>
      </Grid2>
    </Box>
  );
}
