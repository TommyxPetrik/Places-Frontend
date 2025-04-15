import React from "react";

const Questiontitle = ({value, onChange}) => {
    return(<>
    <div>
          <label htmlFor="questiontitle" className="form-label text-white">
            Question Title
          </label>
          <input
            className="form-control form-control-lg"
            type="text"
            id="questiontitle"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Question Title"
            aria-label=".form-control-lg example"
          ></input>
        </div>
    </>);
}

export default Questiontitle;
