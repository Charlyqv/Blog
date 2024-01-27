import { useEffect, useMemo, useState } from "react";
import { addHours, differenceInSeconds } from "date-fns";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import Modal from "react-modal";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from 'date-fns/locale/es';
import { useBlogStore, useUiStore } from "../../hooks";

registerLocale('es', es);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const BlogModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useBlogStore();
  
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    titulo: '',
    autor: '',
    entrada: '',
    start: new Date(),
  });

  const tituloClass = useMemo(() => {
    if ( !formSubmitted ) return '';

    return ( formValues.titulo.length > 0)
      ? ''
      : 'is-invalid';

  }, [ formValues.titulo, formSubmitted ])

  const autorClass = useMemo(() => {
    if ( !formSubmitted ) return '';

    return ( formValues.autor.length > 0)
      ? ''
      : 'is-invalid';

  }, [ formValues.autor, formSubmitted ])

  useEffect(() => {
    if ( activeEvent !== null ) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent])
  

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  }

  const onDateChanged = ( event, changing ) => {
    setFormValues({
      ...formValues,
      [changing] : event
    })
  }

  const onCloseModal = () => {
    closeDateModal();
  }

  const onSubmit = async ( event ) => {
    event.preventDefault();
    console.log('hola');
    // setFormSubmitted(true);    

    // && formValues.fecha && formValues.entrada
    if ( formValues.titulo == '' || formValues.autor == '' || formValues.start == null || formValues.entrada == ''){
      Swal.fire('Entrada incorrecta','Todos los campos son obligatorios', 'error');
      return;
    }

    await startSavingEvent( formValues );
    // closeDateModal();
    // setFormSubmitted(false);    
  }
    console.log("🚀 ~ onSubmit ~ formValues.fecha:", formValues.fecha)

  return (
    <Modal
      isOpen={ isDateModalOpen }
      onRequestClose={ onCloseModal }
      style={ customStyles }
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={ 200 }
    >
    <h1 className="nuevo"> Nuevo entrada </h1>
    <hr />
    <form className="container" onSubmit={ onSubmit }>
      <div className="form-group mb-2">
        <label>Titulo</label>
        <input 
          type="text" 
          className= { `form-control ${ tituloClass }`}
          placeholder="Título de la entrada"
          name="titulo" 
          autoComplete="off"
          value={ formValues.titulo }
          onChange={ onInputChanged }
        />
      </div>

      <div className="form-group mb-3">
        <label>Autor</label>
        <input 
          type="text" 
          className= { `form-control ${ autorClass }`}
          placeholder="Nombre de quien publica la entrada"
          name="autor" 
          autoComplete="off"
          value={ formValues.autor }
          onChange={ onInputChanged }
        />
      </div>
      <div className="form-group mb-2">
        <label>Fecha de publicación &nbsp;</label>
        <DatePicker 
          selected={ formValues.start }
          onChange={ (event) => onDateChanged( event, 'start')} 
          className="form-control"
          dateFormat="Pp"
          showTimeSelect
          locale="es"
          timeCaption="Hora"
        />
      </div>

      <div className="form-group mb-2">
        <label>Contenido</label>
        <textarea 
          type="text" 
          className="form-control"
          placeholder="Escrito breve"
          rows="4"
          name="entrada"
          value={ formValues.entrada }
          onChange={ onInputChanged }
        ></textarea>
      </div>

      <button
        type="submit"
        className="btn btn-outline-primary btn-block"
      >
        <i className="far fa-save"></i>
        <span> Guardar</span>
      </button>

    </form>
    </Modal>
  )
}