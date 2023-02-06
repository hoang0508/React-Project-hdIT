import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getDataDetailQuizz } from "../../services/apiServices";
import _ from "lodash";
import "./DetailQuizz.scss";
import Question from "./Question";

const DetailQuizz = () => {
  const { id } = useParams();

  // location state navigate
  const location = useLocation();
  let { quizzTitle } = location?.state;

  // state
  const [dataQuizz, setDataQuizz] = useState([]);
  const [indexQuizz, setIndexQuizz] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  // fetch data question
  const fetchQuestions = async () => {
    const res = await getDataDetailQuizz(id);
    if (res && res?.EC === 0) {
      const raw = res.DT;
      const data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription, image;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item?.description;
              image = item?.image;
            }
            answers.push(item?.answers);
          });

          return { questionId: key, answers, questionDescription, image };
        })
        .value();
      setDataQuizz(data);
    }
  };

  const handlePrevIndex = () => {
    if (indexQuizz > 0) setIndexQuizz((indexQuizz) => indexQuizz - 1);
  };

  const handleNextIndex = () => {
    if (dataQuizz && dataQuizz.length > indexQuizz + 1)
      setIndexQuizz((indexQuizz) => indexQuizz + 1);
  };

  return (
    <>
      <div className="detail-quizz">
        <div className="detail-quizz--left">
          <h2 className="detail-quizz--heading">
            Quizz {id}: {quizzTitle}
          </h2>
          <Question
            data={
              dataQuizz && dataQuizz.length > 0 ? dataQuizz[indexQuizz] : []
            }
            index={indexQuizz}
          />
          <div className="detail-quizz--btn">
            <button onClick={() => handlePrevIndex()}>Prev</button>
            <button onClick={() => handleNextIndex()}>Next</button>
          </div>
        </div>
        <div className="detail-quizz--right">Count down</div>
      </div>
    </>
  );
};

export default DetailQuizz;
