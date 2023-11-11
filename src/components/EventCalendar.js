import { useState, MouseEvent } from "react"
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Divider } from "@mui/material"

import { Calendar, dateFnsLocalizer,momentLocalizer } from "react-big-calendar"
import moment from 'moment'

import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import enUS from "date-fns/locale/en-US"

import "react-big-calendar/lib/css/react-big-calendar.css"

// import EventInfo from "./EventInfo"
// import AddEventModal from "./AddEventModal"
// import EventInfoModal from "./EventInfoModal"
// import { AddTodoModal } from "./AddTodoModal"
import {AddDatePickerEventModal} from "./AddDatePickerEventModal"

const locales = {
    "en-US": enUS
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    locales,
    getDay,
})

  
export const generateID = () => (Math.floor(Math.random() * 1000) + 1).toString()

const initialEventFormState = {
    description: "",
    todoId: undefined,
  }

const initialDatePickerEventFormData = {
    description: "",
    todoId: undefined,
    allDay: false,
    start: undefined,
    end: undefined,
  }




// const handleSelectSlot = (event) => {
//     setOpenSlot(true)
//     setCurrentEvent(event)
// }








//   const onAddEvent = (e) => {
//     e.preventDefault()

//     const data = {
//       ...eventFormData,
//       _id: generateId(),
//       start: currentEvent?.start,
//       end: currentEvent?.end,
//     }

//     const newEvents = [...events, data]

//     setEvents(newEvents)
//     handleClose()
//   }



//     const data = {
//       ...datePickerEventFormData,
//       _id: generateId(),
//       start: setMinToZero(datePickerEventFormData.start),
//       end: datePickerEventFormData.allDay
//         ? addHours(datePickerEventFormData.start, 12)
//         : setMinToZero(datePickerEventFormData.end),
//     }

//     const newEvents = [...events, data]

//     setEvents(newEvents)
//     setDatePickerEventFormData(initialDatePickerEventFormData)
//   }

//   const onDeleteEvent = () => {
//     setEvents(() => [...events].filter((e) => e._id !== (currentEvent)._id!))
//     setEventInfoModal(false)
//   }

export const EventCalendar = () => {
    const [openSlot, setOpenSlot] = useState(false)
    const [openDatepickerModal, setOpenDatepickerModal] = useState(false)
    // const [openTodoModal, setOpenTodoModal] = useState(false)
    const [currentEvent, setCurrentEvent] = useState({
        _id: null,
        description: "",
        todoId: undefined
    })
    
    const [eventInfoModal, setEventInfoModal] = useState(false)
    
    const [events, setEvents] = useState([])
    const [todos, setTodos] = useState([])
    
    const [eventFormData, setEventFormData] = useState(initialEventFormState)
    
    const [datePickerEventFormData, setDatePickerEventFormData] = useState(initialDatePickerEventFormData)

    const handleClose = () => {
        setEventFormData(initialEventFormState)
        setOpenSlot(false)
    }

    const handleSelectEvent = (event) => {
        setCurrentEvent(event)
        setEventInfoModal(true)
      }

      const handleSelectSlot = (event) => {
        setOpenSlot(true)
        setCurrentEvent(event)
      }

      const handleDatePickerClose = () => {
        setDatePickerEventFormData(initialDatePickerEventFormData)
        setOpenDatepickerModal(false)
      }

      const onAddEventFromDatePicker = (e) => {
            e.preventDefault()

            const addHours = (date, hours) => {
            return date ? date.setHours(date.getHours() + hours) : undefined
            }

            const setMinToZero = (date) => {
            date.setSeconds(0)

            return date
            }

            const data = {
            ...datePickerEventFormData,
            _id: generateID(),
            start: setMinToZero(datePickerEventFormData.start),
            end: datePickerEventFormData.allDay
                ? addHours(datePickerEventFormData.start, 12)
                : setMinToZero(datePickerEventFormData.end),
            }
        
            const newEvents = [...events, data]
        
            setEvents(newEvents)
            setDatePickerEventFormData(initialDatePickerEventFormData)
        }

    return (
        <Box
        mt={2}
        mb={2}
        component="main"
        sx={{
            flexGrow:1,
            py:8
        }}>
        <Container maxWidth={false}>
            <Card>
                <CardHeader title="Calendar" subheader="Create Events and Todos and manage them easily"/>
                <Divider />
                <CardContent>
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <ButtonGroup size="large" variant="contained" aria-label="outlined primary button group">
                            <Button onClick={() => setOpenDatepickerModal(true)} size="small" variant="contained">
                                Add event
                            </Button>
                            <Button size="small" variant="contained">
                                Create todo
                            </Button>
                        </ButtonGroup>
                    </Box>
                    <AddDatePickerEventModal
                    open={openDatepickerModal}
                    handleClose={handleDatePickerClose}
                    datePickerEventFormData={datePickerEventFormData}
                    setDatePickerEventFormData={setDatePickerEventFormData}
                    //onAddEvent={onAddEventFromDatePicker}
                    // todos={todos}
                    />
                    {/* <EventInfoModal
                    open={eventInfoModal}
                    handleClose={() => setEventInfoModal(false)}
                    //onDeleteEvent={onDeleteEvent}
                    currentEvent={currentEvent}
                    /> */}
                    <Divider style={{margin: 10}} />
                    <Calendar 
                    localizer={localizer}
                    events={events}
                    onSelectEvent={handleSelectEvent}
                    onSelectSlot={handleSelectSlot}
                    selectable
                    startAccessor="start"
                    endAccessor="end"
                    defaultView="week"
                    />
                </CardContent>
            </Card>
        </Container>
      </Box>
  )}