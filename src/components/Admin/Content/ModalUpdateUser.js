import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { FcPlus } from "react-icons/fc";
import { putUpdateUser } from "../../../services/apiServices";

const ModalUpdateUser = ({
  show,
  setShow,
  fetchDataUser,
  dataUpdate,
  handleResetUpdateData,
  currentPage,
  fetchDataUserPaginate,
}) => {
  const handleClose = () => {
    setShow(false);
    setEmail("");
    setImage("");
    setPassword("");
    setPreviewImage("");
    setRole("USER");
    setUsername("");
    handleResetUpdateData();
  };

  // state input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  //
  useEffect(() => {
    setEmail(dataUpdate?.email);
    setPassword(dataUpdate?.password);
    if (dataUpdate?.image) {
      setPreviewImage(`data:image/jpeg;base64,${dataUpdate?.image}`);
    }
    setRole(dataUpdate?.role);
    setUsername(dataUpdate?.username);
  }, [dataUpdate]);

  // upload image
  const handleUploadFileImage = (e) => {
    if (e.target && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  // fucn validate email
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // submit form data
  const handleSubmitUpdateUser = async () => {
    // validate;
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }

    const data = await putUpdateUser(dataUpdate?.id, userName, role, image);

    if (data && data?.EC === 0) {
      toast.success(data?.EM);
      handleClose();
      // await fetchDataUser();
      await fetchDataUserPaginate(currentPage);
    }

    if (data && data?.EC !== 0) {
      toast.error(data?.EM);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                <option selected value="USER">
                  USER
                </option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus />
                Upload File Image
              </label>
              <input
                type="file"
                hidden
                id="labelUpload"
                onChange={(e) => handleUploadFileImage(e)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} alt="" />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitUpdateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
