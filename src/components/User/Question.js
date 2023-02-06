import React from "react";

const Question = ({ data, index }) => {
  console.log("🚀 ~ file: Question.js:4 ~ Question ~ data", data);
  return (
    <>
      {data?.image && (
        <div className="detail-quizz--image">
          <img src={`data:image/jpeg;base64,${data?.image}`} alt="" />
        </div>
      )}
      <div className="detail-quizz--content">
        <h3 className="detail-quizz--title">
          Question {index + 1}: {data?.questionDescription}
        </h3>
        {data?.answers &&
          data?.answers.length > 0 &&
          data?.answers.map((item) => (
            <div className="form-check" key={item?.id}>
              <input
                className="form-check-input"
                type="checkbox"
                defaultValue
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                {item?.description}
              </label>
            </div>
          ))}
      </div>
    </>
  );
};

export default Question;
