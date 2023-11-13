import { Typography } from "@mui/material"


const EventInfo = ({ event }) => {
  return (
    <>
      <Typography>{event.description}</Typography>
    </>
  )
}

export default EventInfo