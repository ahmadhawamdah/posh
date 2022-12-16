import React, { useState } from "react";
import styles from "./Events.module.scss";
import Confetti from "react-confetti";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

interface Props {
  events: any;
  locations: string;
}

const EventsList = ({ events, locations }: Props) => {
  const [month, setMonth] = useState<string>("oct");
  const [color, setColor] = React.useState("lightgrey");
  const navigate = useNavigate();
  const handleClick = () => {navigate(`/`);};
  const filteredEventsByCity = events?.filter(function (e: any) {
    if (locations)
      return (
        e.location === locations &&
        e.startUtc.toLocaleLowerCase().includes(month.toLocaleLowerCase())
      );
    return [];
  });

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `url("https://posh-b2.s3.us-east-2.amazonaws.com/meta+(1).mp4")`,
      }}
    >
      <div>
        <Icon
          icon="ion:arrow-back-circle"
          onMouseEnter={() => setColor("white")}
          onMouseLeave={() => setColor("lightgrey")}
          onClick={handleClick}
          style={{ color }}
          width={60}
          cursor={"pointer"}
        />
      </div>

      <Confetti
        numberOfPieces={50}
        recycle={false}
        colors={["#fc0", "#fb0", "#8B8000"]}
      />
      <video
        autoPlay
        muted
        loop
        playsInline
        className={styles.backgroundVideo}
        src="https://posh-b2.s3.us-east-2.amazonaws.com/meta+(1).mp4"
        style={{
          width: "100%",
          height: "100%",
        }}
      />

      <div className={styles.navBar}>
        <div
          className={month === "oct" ? styles.active : ""}
          onClick={() => setMonth("oct")}
        >
          Oct
        </div>
        <div
          className={month === "nov" ? styles.active : ""}
          onClick={() => setMonth("nov")}
        >
          Nov
        </div>
      </div>
      <div className={styles.cardsGrid}>
        {filteredEventsByCity?.map((e: any) => (
          <div
            className={styles.cardTicket}
            style={{ backgroundImage: `url(${e.flyer})` }}
          >
            <div className={styles.eventInfo}>
              <h3>{e.startUtc.substring(0, 3)}</h3>
              <div className={styles.eventDetails}>
                <div className={styles.eventName}>{e.name}</div>
                <div className={styles.eventLocation}>{e.groupName}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
