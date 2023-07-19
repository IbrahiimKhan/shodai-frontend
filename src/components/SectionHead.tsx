import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import "./style.css"
const SectionHead = ({ title, btnText }: { title: string, btnText: string }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',

                marginTop: 2,
                marginBottom: 2,
                bgcolor: 'transparent',
                borderRadius: 1,
            }}
        >
            <Typography variant="h6" component="h6" style={{ color: "black" }}>
                {title}
            </Typography>;
            <Button sx={{ textTransform: "capitalize", backgroundColor: "black" }} variant="contained">{btnText}</Button>

        </Box>
    )
}

export default SectionHead