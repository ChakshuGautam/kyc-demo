import { CrossIcon } from "assets/icons";
import { useStateContext } from "context";
import Aadhar from "templates/aadhar";

export const Modal: React.FC<any> = (props) => {
  const closeModal = () => {
    setModaleOpen(false);
  };

  const { modaleOpen, setModaleOpen } = useStateContext();

  return modaleOpen ? (
    <div className={`document-preview ${modaleOpen && "open"}`}>
      <div className="modal-content px-5 pb-5">
        <button className="flex justify-end w-[105%] p-0" onClick={closeModal}>
          <CrossIcon />
        </button>
        {props.children ? props.children : <Aadhar />}
      </div>
    </div>
  ) : null;
};
