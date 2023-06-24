import React from "react";
import "../../css/aboutuspage.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AboutUs = () => {
  return (
    <div className="container">
      <h1 className="text-center my-5" >About Us</h1>
      <div className="row">

        <div className="col-md-6" >
          <p className="pagepara">
            An online milk diary management system is a digital platform that allows for the tracking and management of milk production and distribution activities. It is often used by dairy farmers, milk processors, and distribution companies to track the volume and quality of milk being produced, as well as to manage the collection and distribution of milk to customers.
          </p>
          <p className="pagepara">
            The system may include features such as the ability to enter and track milk production data, set production targets, monitor milk quality, and manage customer orders and deliveries. It can also provide reports and analytics on milk production and distribution activities.
          </p>
          <p className="pagepara">
            The use of an online milk diary management system can help to improve the efficiency and accuracy of milk production and distribution operations, and may also provide a record of activities for regulatory or compliance purposes
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
