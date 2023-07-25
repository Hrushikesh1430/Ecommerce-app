import styles from "./customModal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
export const CustomModal = (props) => {
  if (!props.modalOpen) {
    return null;
  }
  return (
    <>
      <div className={styles.modal} onClick={props.onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalClose}>
            <button onClick={props.onClose}>
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
          <div className={styles.modalBody}>{props.children}</div>
        </div>
      </div>
    </>
  );
};
