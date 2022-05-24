import iconSam from "../images/sam.png";
import iconRussell from "../images/russell.png";
import logoJoyse from "../images/joyse.png";
import moment from "moment";

const User = (props: any) => {
  return (
    <div className="user">
      {props.userId === "Sam" ? (
        <img src={iconSam} alt={iconSam} />
      ) : props.userId === "Russell" ? (
        <img src={iconRussell} alt={iconRussell} />
      ) : (
        <img src={logoJoyse} alt={logoJoyse} />
      )}
      <div className="name">{props.userId}</div>
    </div>
  );
};

const Design1 = (props: any) => {
  return (
    <div className="card-message">
      <User userId={props.data.userId} />
      <div className="message">
        {props.data.text}
        <div className="time">
          <div className=""></div>
          <span>{moment.utc(props.data.datetime).format("HH:mm")}</span>
        </div>
      </div>
    </div>
  );
};

const Design2 = (props: any) => {
  return (
    <div className="card-message currentUser">
      <div className="message">
        {props.data.text}
        <div className="time">
          <div className=""></div>
          <span>{moment.utc(props.data.datetime).format("HH:mm")}</span>
        </div>
      </div>
      <User userId={props.data.userId} />
    </div>
  );
};

const CardMessage = (props: any) => {
  const isCurrentUser = props.isCurrentUser;
  return isCurrentUser ? (
    <Design2 data={props.data} />
  ) : (
    <Design1 data={props.data} />
  );
};

export default CardMessage;
