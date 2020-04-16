import { useEffect, FunctionComponent } from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";
import { mutate, cache } from "swr";
import cogoToast from "cogo-toast";
import { CreateEmployeeForm } from "./createEmployeeForm";

const modalCustomStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: "2rem",
    transform: "translate(-50%, -50%)",
  },
};
interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}

export const ModalCreateEmployee: FunctionComponent<Props> = (props) => {
  const { isOpen, onRequestClose } = props;

  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  const router = useRouter();
  const page = +(router.query.page || 1);

  return (
    <Modal
      isOpen={isOpen}
      style={modalCustomStyles}
      onRequestClose={onRequestClose}
      contentLabel="Create employee"
    >
      <CreateEmployeeForm
        onSubmit={(data) =>
          fetch("api/employee", {
            method: "POST",
            body: JSON.stringify(data),
          })
            .then(() => {
              cache.clear();
              return mutate(["/api/employees", page]);
            })
            .then(() => {
              onRequestClose();
            })
            .catch((e) => {
              cogoToast.error(
                `Error occured while creating new employee ${e.name}: ${e.message}`
              );
            })
        }
      />
    </Modal>
  );
};
