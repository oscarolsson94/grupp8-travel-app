import React, {  useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";
import { formatDate, formatTime } from "../../utils/helpers";
import { Button } from "@material-ui/core";


const ContactForm = () => {

const [status, setStatus] = useState("Boka biljett");
const [orderDetails, setOrderDetails] = useState();

  const { id } = useParams();
  const { user } = useContext(UserContext);
   const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_STARTING_URL}api/bookings/single/${id}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      console.log(data);
      setOrderDetails(data);
    };
        fetchData();
  }, [id, user.token]);

  const handleSubmit = async () => {
    setStatus("Bokning...");
    await axios.post(
      `${process.env.REACT_APP_BACKEND_STARTING_URL}api/contact`,
      {
        firstName: user.firstName,
        lastName: user.lastName,
        toLocation: orderDetails.toLocation,
        fromLocation: orderDetails.fromLocation,
        departureDate: formatDate(orderDetails.departureTimeAndDate),
        departureTime: formatTime(orderDetails.departureTimeAndDate),
        arrivalDate: formatDate(orderDetails.arrivalTimeAndDate),
        arrivalTime: formatTime(orderDetails.arrivalTimeAndDate),
        passengerType: orderDetails.passengerType,
        price: orderDetails.price,
        currentDate: Date()

      },
    );
    history.push("/contact");

    setStatus("Boka biljett");
    
  };
  return (
     <>
      <div>
        <Button
              variant="contained"
              style={{ background: "#FFA5A5" }}
              size="large"
              onClick={handleSubmit} >
          {status}
        </Button>
      </div>
      </>

  );
};

export default ContactForm;