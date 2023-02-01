import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { deleteUser } from "../../../services/apiServices";

const ModalDeleteUser = ({
  show,
  setShow,
  dataDelete,
  fetchDataUser,
  fetchDataUserPaginate,
  setCurrentPage,
}) => {
  const handleClose = () => setShow(false);

  const handleDeleteUser = async () => {
    const data = await deleteUser(dataDelete?.id);

    if (data && data?.EC === 0) {
      toast.success(data?.EM);
      handleClose();
      // await fetchDataUser();
      setCurrentPage(1);
      await fetchDataUserPaginate(1);
    }

    if (data && data?.EC !== 0) {
      toast.error(data?.EM);
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Delete user <b>{dataDelete?.email}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleDeleteUser()}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
