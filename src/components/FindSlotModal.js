import { TextField, Box, Dialog, DialogTitle, DialogContent, Select, MenuItem, DialogContentText } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export const FindSlotModal =  ({open, onClose, amountOfHours}) => {
    return(
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Find an Open Time</DialogTitle>
            <DialogContent>
                <DialogContentText>Number of hours for the job.</DialogContentText>
                <Box>
                    <Select
                        labelId="select-label"
                        id="simple-select"
                        value={amountOfHours}
                        label="Hours"
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                        <MenuItem value={8}>8</MenuItem>
                        <MenuItem value={9}>9</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={11}>11</MenuItem>
                        <MenuItem value={12}>12</MenuItem>
                    </Select>
                </Box>
                <Box component="form">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                            renderInput={(params) => <TextField {...params} />}
                            label="Controlled picker"
                            />
                    </LocalizationProvider>
                </Box>
            </DialogContent>
        </Dialog>
    )
}