import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { appColors } from '../../css/theme';
import Container from '@mui/material/Container';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import NewEventModal from './NewEventModal';
import { addClass, getClassesByUser, confirmEvent, removeEvent } from '../../services/classService';
import AlertComponent from '../../helpers/AlertComponent';
import { CLASS_TYPES } from '../../helpers/classTypeEnum';
import { getUser } from '../../services/userService';
import EventDetailsModal from './EventDetailsModal';

export default function MyCalendar() {
  const localizer = momentLocalizer(moment)
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedSlot, setSelectedSlot] = React.useState(null);
  const [isEventUpdated, setIsEventUpdated] = React.useState(false);
  const [events, setEvents] = React.useState([]);
  const [alert, setAlert] = React.useState({ open: false, message: '', severity: '' });
  const [user, setUser] = React.useState(null);
  const [selectedEvent, setSelectedEvent] = React.useState(null);

  const eventStyleGetter = (event) => {
    const colorCode = event.studentId.toString() === localStorage.getItem('id') ? "#4A503D" : "#E28F83";

    const style = {
      backgroundColor: colorCode,
      borderRadius: "5px",
      opacity: event.isConfirmed ? 0.8 : 0.2,
      color: "#FFF",
      border: "none",
    };

    return {
      style,
    };
  };

  React.useEffect(() => {

    async function fetchData() {
      try {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const currentUser = await getUser(localStorage.getItem('id'));
          if (currentUser.data) {
            setUser(currentUser.data);

            const response = await getClassesByUser(currentUser.data.instructorId ?? currentUser.data.id);

            const newEvents = response.data.map((drivingClass) => {
              const { id, classType, startTime, endTime, studentId, studentName, instructorName, isConfirmed } = drivingClass;
              const start = new Date(startTime);
              const end = new Date(endTime);
              const eventName = localStorage.getItem('role') === 'Student' ? instructorName : studentName;
              return {
                id: id,
                title: eventName,
                start: new Date(start),
                end: new Date(end),
                studentId: studentId,
                classType: CLASS_TYPES.find(c => c.value === classType)?.label,
                studentName: studentName,
                instructorName: instructorName,
                isConfirmed: isConfirmed
              };
            });

            setEvents(newEvents);
            console.log(newEvents)
          }
        }

      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [isEventUpdated]);


  const openModal = (slot) => {
    if (localStorage.getItem('role') === 'Student') {
      setSelectedSlot(slot);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleEventClick = (event) => {
    console.log(event)
    setSelectedEvent(event);
  };

  const handleSubmit = (eventData) => {
    setAlert({
      open: false,
      message: '',
      severity: '',
    });

    addClass(eventData)
      .then(response => {
        setEvents((prevData) => ([...prevData, response.data]));
        setIsEventUpdated(!isEventUpdated);
        setAlert({
          open: true,
          message: 'Made a class appointment successfully!',
          severity: 'success',
        });
        onSubmit(eventData);
      })
      .catch(error => {
        const errorData = error.response.data && error.response.data.length < 100 ?
          error.response.data : 'Making a class appointment is unsuccessful'
        setAlert({
          open: true,
          message: errorData,
          severity: 'error',
        });
      });

    closeModal();
  };

  const confirm = () => {
    setAlert({
      open: false,
      message: '',
      severity: '',
    });

    confirmEvent(selectedEvent.id)
      .then(response => {
        setEvents((prevData) => ([...prevData, response.data]));
        setIsEventUpdated(!isEventUpdated);
        setAlert({
          open: true,
          message: 'Appointment confirmed successfully!',
          severity: 'success',
        });
        onSubmit(eventData);
      })
      .catch(error => {
        const errorData = error.response.data && error.response.data.length < 100 ?
          error.response.data : 'Appointment confirmation is unsuccessful'
        setAlert({
          open: true,
          message: errorData,
          severity: 'error',
        });
        setIsEventUpdated(!isEventUpdated);
      });

    closeModal();
  };

  const refuse = () => {
    setAlert({
      open: false,
      message: '',
      severity: '',
    });

    removeEvent(selectedEvent.id)
      .then(() => {
        setEvents((prevData) => ([...prevData]));
        setIsEventUpdated(!isEventUpdated);
        setAlert({
          open: true,
          message: 'Appointment refused successfully! It is removed from calendar.',
          severity: 'success',
        });
        onSubmit(eventData);
      })
      .catch(error => {
        const errorData = error.response.data && error.response.data.length < 100 ?
          error.response.data : 'Appointment removal is unsuccessful'
        setAlert({
          open: true,
          message: errorData,
          severity: 'error',
        });
      });

    closeModal();
  };

  return (
    <ThemeProvider theme={appColors}>
      <Container component="main" style={{ marginTop: "1rem" }}>
        <Calendar
          defaultView='week'
          selectable
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          min={new Date(0, 0, 0, 8, 0, 0)}
          max={new Date(0, 0, 0, 20, 0, 0)}
          style={{ height: 600, width: 1100 }}
          eventPropGetter={eventStyleGetter}
          onSelectSlot={openModal}
          onSelectEvent={handleEventClick}
        />
        {isModalOpen && (
          <NewEventModal selectedSlot={selectedSlot} open={openModal} onClose={closeModal} onSubmit={handleSubmit} />
        )}
        {selectedEvent && (
          <EventDetailsModal
            selectedEvent={selectedEvent}
            open={openModal}
            onClose={closeModal}
            confirm={confirm}
            refuse={refuse}
          />
        )}
      </Container>
      {alert.open ? (
        <AlertComponent
          open={alert.open}
          message={alert.message}
          severity={alert.severity}
        />
      ) : <></>}
    </ThemeProvider>
  );
};