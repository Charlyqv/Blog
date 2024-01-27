import { addHours } from "date-fns";
import { useBlogStore, useUiStore } from "../../hooks";

export const AddNew = () => {

  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useBlogStore();

  const handleClickNew = () => {    
    setActiveEvent({
      titulo: '',
      autor: '',
      entrada: '',
      start: new Date(),
      bgColor: '#fafafa',
      user: {
        _id: '123',
        name: 'Carlos'
      }

    })     
    openDateModal();
  }

  return (
    <button
      className="btn btn-primary fab"
      onClick={ handleClickNew }
    >
      <i className="fas fa-plus"></i>
    </button>
  )

}
