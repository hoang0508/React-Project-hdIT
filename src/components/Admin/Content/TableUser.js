import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const TableUser = ({
  listUsers,
  handleClickBtnUpdate,
  handleClickBtnDelete,
  fetchDataUserPaginate,
  pageCount,
  setCurrentPage,
  currentPage,
}) => {
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    fetchDataUserPaginate(+event.selected + 1);
    setCurrentPage(+event.selected + 1);
  };
  return (
    <div>
      <h3>Tabel User</h3>
      <table className="table table-striped table-hover  table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers && listUsers === 0 && (
            <tr>
              <td>Not found User</td>
            </tr>
          )}
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => (
              <tr key={item?.id}>
                <td>{item?.id}</td>
                <td>{item?.username}</td>
                <td>{item?.email}</td>
                <td>{item?.role}</td>
                <td>
                  <button className="btn btn-primary mx-2">View</button>
                  <button
                    className="btn btn-warning  mx-2"
                    onClick={() => handleClickBtnUpdate(item)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger  mx-2"
                    onClick={() => handleClickBtnDelete(item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1}
      />
    </div>
  );
};

export default TableUser;
