import React from "react";

function Newsfeed() {
    return (
      <>
        <div className="card card-hover" style={{ 
          maxwidth: "40rem", 
          maxheight: "30rem", 
          marginTop: "2rem", 
          marginLeft: "2rem" , 
          paddingTop: "0rem", 
          paddingLeft: "1rem", 
          paddingRight: "1rem", 
          paddingBottom: "0rem", 
          borderRadius: "1rem", 
          backgroundColor: "#181c1f", 
          color: "white"}}>
          <div className="card-body d-flex flex-column" style={{ height: "100%"}}>

            <div className="d-flex align-items-center mb-1">
              <i className="bi bi-geo-alt-fill" style={{ fontSize: "1rem", color: "cornflowerblue"}}></i>
              <h6 className="mb-0">/Subplace</h6>
              <span className="text-white opacity-50" style={{marginLeft: "0.5rem"}}>Username</span>
              <span className="text-white opacity-50" style={{marginLeft: "0.5rem"}}>2 hours ago</span>
              
            </div>
          
            <h5 className="card-title text-start" style={{marginBottom: "0rem"}}>Question title</h5>
            <p className="card-text" style={{ textAlign: "justify", marginTop: "0rem"}}>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </p>
    
            <div className="card-footer bg-transparent border-0 p-0 mt-auto" >
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="d-flex gap-2">
                  <div className="btn-upvotes" style={{ fontSize: "1rem", color: "cornflowerblue", paddingLeft: "0.5rem", paddingRight: "0.5rem"}}>
                    69
                  </div>
                  <button className="btn btn-outline-secondary">
                  <i className="bi bi-arrow-up" style={{ fontSize: "1rem", color: "cornflowerblue"}}></i>
                  </button>
                  <button className="btn btn-outline-secondary">
                  <i className="bi bi-arrow-down" style={{ fontSize: "1rem", color: "cornflowerblue"}}></i>
                  </button>
                  <button className="btn btn-outline-secondary">
                  <i className="bi bi-chat" style={{ fontSize: "1rem", color: "cornflowerblue"}}></i>
                  </button>
                  <button className="btn btn-outline-secondary">
                  <i className="bi bi-share" style={{ fontSize: "1rem", color: "cornflowerblue"}}></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default Newsfeed;
  