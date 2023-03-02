import {Box, Button} from "@mui/material";

export const ActionTab = ({getData, handleOpen}) => {
    return (
        <Box sx={{ width: '90%', m: '10px auto', display: 'flex', justifyContent: 'flex-end' }}>
            <Button sx={{ mx: '5px' }} onClick={() => getData()} variant="contained">Get Data</Button>
            <Button sx={{ mx: '5px' }} onClick={() => handleOpen()} variant="contained">Add data</Button>
        </Box>
    )
}