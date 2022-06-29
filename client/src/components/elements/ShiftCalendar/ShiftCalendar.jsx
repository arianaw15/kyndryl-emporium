import React, { useCallback, useState, useMemo } from 'react'
import axios from 'axios'
import { Box } from '../Box'
import {Calendar, momentLocalizer, Views} from 'react-big-calendar'
import moment from 'moment'
const dayjs = require('dayjs')

const localizer = momentLocalizer(moment)


const ShiftCalendar = () => {
    const [myEvents, setEvents] = useState()
    const handleSelectSlot = useCallback(
        ({ start, end }) => {
          const title = window.prompt('New Event Name')
          if (title) {
            setEvents((prev) => [...prev, { start, end, title }])
          }
        },
        [setEvents]
      )
    
      const handleSelectEvent = useCallback(
        (event) => window.alert(event.title),
        []
      )
    
      const { defaultDate, scrollToTime } = useMemo(
        () => ({
          defaultDate: Date.now(),
          scrollToTime: new Date(1970, 1, 1, 6),
        }),
        []
      )
    return (
        <Box>
            {dayjs(Date.now()).format('hh:mm A')}
        <Calendar 
        localizer={localizer} 
        defaultView={Views.WEEK} 
        defaultDate={defaultDate}
        events={myEvents}
         onSelectEvent={handleSelectEvent}
         onSelectSlot={handleSelectSlot}
         selectable
         scrollToTime={scrollToTime}/>
        </Box>
    )
}

export {ShiftCalendar}