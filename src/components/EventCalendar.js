import { useState, useEffect } from "react"
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Divider } from "@mui/material"
import { useParams } from "react-router-dom";
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import enUS from "date-fns/locale/en-US"

import "react-big-calendar/lib/css/react-big-calendar.css"

import EventInfo from "./EventInfo"
import AddEventModal from "./AddEventModal"
import EventInfoModal from "./EventInfoModal"
import { FindSlotModal } from "./FindSlotModal"
import { AddTodoModal } from "./AddTodoModal"
import {AddDatePickerEventModal} from "./AddDatePickerEventModal"

import calendars from "../data/calendars"
import eventsData from '../data/events'

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

  const testData = [
    {
        description: "Test1",
        todoId: generateID(),
        allDay: false,
        start: new Date("November 25, 2023 08:00:00"),
        end: new Date("November 25, 2023 11:00:00")
    },
    {
        description: "Test2",
        todoId: generateID(),
        allDay: false,
        start: new Date("November 25, 2023 12:00:00"),
        end: new Date("November 25, 2023 13:00:00")
    },
    {
        description: "Test3",
        todoId: generateID(),
        allDay: false,
        start: new Date("November 25, 2023 13:00:00"),
        end: new Date("November 25, 2023 15:00:00")
    },
    {
        description: "Test4",
        todoId: generateID(),
        allDay: false,
        start: new Date("November 25, 2023 18:00:00"),
        end: new Date("November 25, 2023 21:00:00")
    }
  ]


export const EventCalendar = () => {
    const  {calendarID} = useParams();

    const [openSlot, setOpenSlot] = useState(false)
    const [openDatepickerModal, setOpenDatepickerModal] = useState(false)
    const [openTodoModal, setOpenTodoModal] = useState(false)
    const [openFindSlot, setOpenFindSlot] = useState(false)
    const [amountOfHours, setAmountOfHours] = useState(1)
    const [hoursToCompare, setHoursToCompare] = useState("")
    const [calendar, setCalendar] = useState(null)
    const [eventInfoModal, setEventInfoModal] = useState(false)
    const [events, setEvents] = useState(testData)
    const [todos, setTodos] = useState([])
    const [eventFormData, setEventFormData] = useState(initialEventFormState)
    const [datePickerEventFormData, setDatePickerEventFormData] = useState(initialDatePickerEventFormData)

    async function fetchData () {
        const res =  calendars.filter(calendar => {
            return calendarID === calendar.calendarID;
          });
        setCalendar(res)
    }

    async function fetchEvents () {
         const res = eventsData.filter(({todoId}) => calendar[0].eventIDs.includes(todoId))
        console.log(res)
        setEvents(res)
    }

    useEffect(() => {
        // Perform data fetching based on productId
        //may need to remove this to add as a depedency
        fetchData()
      }, []);

    useEffect(() => {
        //may need to remove this to add as a depedency
        if(calendar) {
            fetchEvents()
        }
    }, [calendar])

    const [currentEvent, setCurrentEvent] = useState({
        _id: null,
        description: "",
        todoId: undefined
    })

    const onDeleteEvent = () => {
        setEvents(() => [...events].filter((e) => e._id !== currentEvent._id))
        setEventInfoModal(false)
    }

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

        const onAddEvent = (e) => {
            e.preventDefault()

            const data = {
                ...eventFormData,
                _id: generateID(),
                start: currentEvent?.start,
                end: currentEvent?.end
            }

            const newEvents = [...events, data]

            setEvents(newEvents)
            handleClose()
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
                            <Button onClick={() => setOpenTodoModal(true)} size="small" variant="contained">
                                Create todo
                            </Button>
                            <Button onClick={() => setOpenFindSlot(true)} size="small" variant="contained">
                                Find Open Slot
                            </Button>
                        </ButtonGroup>
                    </Box>
                    <AddEventModal
                        open={openSlot}
                        handleClose={handleClose}
                        eventFormData={eventFormData}
                        setEventFormData={setEventFormData}
                        onAddEvent={onAddEvent}
                        todos={todos}
                    />
                    <AddDatePickerEventModal
                        open={openDatepickerModal}
                        handleClose={handleDatePickerClose}
                        datePickerEventFormData={datePickerEventFormData}
                        setDatePickerEventFormData={setDatePickerEventFormData}
                        onAddEvent={onAddEventFromDatePicker}
                        todos={todos}
                    />
                    <EventInfoModal
                        open={eventInfoModal}
                        handleClose={() => setEventInfoModal(false)}
                        onDeleteEvent={onDeleteEvent}
                        currentEvent={currentEvent}
                    />
                    <AddTodoModal 
                        open={openTodoModal}
                        handleClose={() => setOpenTodoModal(false)}
                        todos={todos}
                        setTodos={setTodos}
                    />
                    <FindSlotModal 
                    amountOfHours={amountOfHours}
                    setAmountOfHours={setAmountOfHours}
                    open={openFindSlot}
                    hoursToCompare={hoursToCompare}
                    setHoursToCompare={setHoursToCompare}
                    handleClose={() => setOpenFindSlot(false)}
                    />
                    <Divider style={{margin: 10}} />
                    {
                        events ?
                        <Calendar 
                        localizer={localizer}
                        events={events}
                        onSelectEvent={handleSelectEvent}
                        onSelectSlot={handleSelectSlot}
                        selectable
                        startAccessor="start"
                        components={{EventInfo}}
                        endAccessor="end"
                        defaultView="week"
                        min={new Date(2023, 10, 0, 8, 0, 0)}
                        max={new Date(2023, 10, 0, 20, 0, 0)}
                        eventPropGetter={(event) => {
                        const hasTodo = todos.find((todo) => todo._id === event.todoId)
                            return {
                                style: {
                                backgroundColor: hasTodo ? hasTodo.color : "#b64fc8",
                                borderColor: hasTodo ? hasTodo.color : "#b64fc8"
                            }
                        }
                        }}
                        style={{
                        height: 900,
                    }}
                    /> :
                    <h1>...loading</h1>
                    }


                </CardContent>
            </Card>
        </Container>
      </Box>
  )}