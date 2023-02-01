import React, { useState } from "react";
import { useEffect } from "react";
import { FcPlus } from "react-icons/fc";
import { getAllUser, getUserPaginate } from "../../../services/apiServices";
import "./ManageUser.scss";
import ModalCreateUser from "./ModalCreateUser";
import ModalDeleteUser from "./ModalDeleteUser";
import ModalUpdateUser from "./ModalUpdateUser";
import TableUser from "./TableUser";

const ManageUser = () => {
  // LIMIT_USERS
  const LIMIT_USERS = 3;
  // show create
  const [showCreateUser, setShowCreateUser] = useState(false);
  // show update user
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  // show delete user
  const [showDeleteUser, setShowDeleteUser] = useState(false);

  // list user
  const [listUsers, setListUsers] = useState([]);

  // data user update
  const [dataUpdate, setDataUpdate] = useState({});

  // data delete update
  const [dataDelete, setDataDelete] = useState({});

  // page count
  const [pageCount, setPageCount] = useState(0);

  // current page
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // fetchDataUser();
    fetchDataUserPaginate(1);
  }, []);

  // fetchDataUser
  const fetchDataUser = async () => {
    const data = await getAllUser();
    if (data?.EC === 0) {
      setListUsers(data?.DT);
    }
  };

  // fetchDataUsers Paginate
  const fetchDataUserPaginate = async (page) => {
    const data = await getUserPaginate(page, LIMIT_USERS);
    if (data?.EC === 0) {
      setListUsers(data?.DT?.users);
      setPageCount(data?.DT?.totalPages);
    }
  };

  // handle Click Update Users
  const handleClickBtnUpdate = (user) => {
    setShowUpdateUser(true);
    setDataUpdate(user);
  };

  //
  const handleClickBtnDelete = (user) => {
    setShowDeleteUser(true);
    setDataDelete(user);
  };

  // handleReset Update data
  const handleResetUpdateData = () => {
    setDataUpdate({});
  };

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div
          className="user-content--button"
          onClick={() => setShowCreateUser(true)}
        >
          <FcPlus />
          <button>Add new users</button>
        </div>
        <div className="user-content--table">
          <TableUser
            listUsers={listUsers}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnDelete={handleClickBtnDelete}
            fetchDataUserPaginate={fetchDataUserPaginate}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModalCreateUser
          fetchDataUser={fetchDataUser}
          show={showCreateUser}
          setShow={setShowCreateUser}
          fetchDataUserPaginate={fetchDataUserPaginate}
          pageCount={pageCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          show={showUpdateUser}
          setShow={setShowUpdateUser}
          dataUpdate={dataUpdate}
          fetchDataUser={fetchDataUser}
          handleResetUpdateData={handleResetUpdateData}
          fetchDataUserPaginate={fetchDataUserPaginate}
          pageCount={pageCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalDeleteUser
          show={showDeleteUser}
          setShow={setShowDeleteUser}
          fetchDataUser={fetchDataUser}
          dataDelete={dataDelete}
          fetchDataUserPaginate={fetchDataUserPaginate}
          pageCount={pageCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ManageUser;
