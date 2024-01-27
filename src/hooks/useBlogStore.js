import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent } from "../store";
// import calendarApi from "../api/calendarApi";
// import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
// import Swal from "sweetalert2";


export const useBlogStore = () => {

  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector( state => state.blog );  

  // const { user } = useSelector( state => state.auth );

  const setActiveEvent = ( calendarEvent ) => {
    dispatch( onSetActiveEvent (calendarEvent) );
  }

  const startSavingEvent = async( calendarEvent ) => {

    try {

      if( calendarEvent.id ) {
        // Actualizando
        await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );
        dispatch( onUpdateEvent({ ...calendarEvent, user}) );
        return;
      }
  
      // Creando
      const { data } = await calendarApi.post('/events', calendarEvent );
      dispatch( onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }) );
      
    } catch (error) {
      console.log("🚀 ~ file: useCalendarStore.js:33 ~ startSavingEvent ~ error:", error)
      Swal.fire('Error al guardar', error.response.data.msg, 'error');
    }
  
  }

  const startDeletingEvent = async() => {

    try {
      await calendarApi.delete(`/events/${ activeEvent.id }` );
      dispatch( onDeleteEvent() );
    } catch (error) {
      console.log("🚀 ~ file: useCalendarStore.js:33 ~ startSavingEvent ~ error:", error)
      Swal.fire('Error al eliminar', error.response.data.msg, 'error');
    }

  }

  const startLoadingEvents = async() => {
    try {

      const { data } = await calendarApi.get('/events');
      const events = convertEventsToDateEvents( data.eventos );
      dispatch( onLoadEvents( events ) );
      
    } catch (error) {
      console.log('Error cargando eventos')
      console.log("🚀 ~ file: useCalendarStore.js:35 ~ startLoadingEvents ~ error:", error)
      
    }
  }

  return {
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  }
}
