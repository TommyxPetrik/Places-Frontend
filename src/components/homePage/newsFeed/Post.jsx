import React from "react";
import PostBody from "./PostBody";

const Newsfeed = ({
  subplace,
  username,
  time,
  questiontitle,
  questionbody,
}) => {
  // const [showComments, setshowComments] = useState(false);

  return (
    <>
      <div
        className="card card-hover"
        style={{
          width: "46rem",
          minHeight: "11rem",
          maxHeight: "30rem",
          marginTop: "2rem",
          marginLeft: "2rem",
          paddingTop: "0rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          paddingBottom: "0rem",
          borderRadius: "1rem",
          backgroundColor: "#181c1f",
          color: "white",
        }}
      >
        <PostBody
          subplace={subplace}
          username={username}
          time={time}
          questiontitle={questiontitle}
          questionbody={questionbody}
        />
      </div>
    </>
  );
};

export default Newsfeed;
