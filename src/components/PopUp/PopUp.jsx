import {createPortal} from "react-dom";

export const PopUp = ({children, isOpen, onClose}) => {

    if (!isOpen) return null;
    return createPortal(
        <div className="modal">
            <button onClick={onClose}>Close</button>
            <div>
                {children}
            </div>
        </div>
        ,document.body);
}