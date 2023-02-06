import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuizzByUser } from "../../services/apiServices";
import "./ListQuizz.scss";
const ListQuizz = () => {
  const navigate = useNavigate();
  const [arrQuizz, setArrQuizz] = useState([]);
  useEffect(() => {
    // setArrQuizz()
    getQuizzData();
  }, []);
  const getQuizzData = async () => {
    const data = await getQuizzByUser();
    if (data && data?.EC === 0) {
      setArrQuizz(data?.DT);
    }
  };
  return (
    <div className="container list-quizz">
      {arrQuizz && arrQuizz.length === 0 && (
        <span>You don't have any quiz now...</span>
      )}
      {arrQuizz &&
        arrQuizz.length > 0 &&
        arrQuizz.map((item, index) => (
          <div className="card" style={{ width: "18rem" }} key={item?.id}>
            <div className="card-img">
              <img
                className="card-img-top"
                src={`data:image/jpeg;base64,${item?.image}`}
                alt=""
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">Quizz {index + 1}</h5>
              <p className="card-text">{item?.description}</p>
              <button
                className="btn btn-primary"
                onClick={() =>
                  navigate(`/quizz/${item?.id}`, {
                    state: { quizzTitle: item?.description },
                  })
                }
              >
                Start Now
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListQuizz;
