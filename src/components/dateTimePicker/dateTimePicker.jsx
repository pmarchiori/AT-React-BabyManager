import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function DateTimePickerComponent({ label, onChange, value }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        label={label}
        onChange={(newValue) => onChange(newValue)}
        value={value ? value : dayjs()}
      />
    </LocalizationProvider>
  );
}
