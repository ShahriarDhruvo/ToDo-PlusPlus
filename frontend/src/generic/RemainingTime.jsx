import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment-duration-format";

const RemainingTime = (props) => {
    const [time, setTime] = useState(null);

    useEffect(() => {
        const currentTime = `${new Date().toLocaleDateString(
            "en-CA"
        )} ${new Date().toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        })}`;

        console.log(currentTime);

        const targetTime = `${props.deadline.split("T")[0]} ${
            props.deadline.split("T")[1]
        }`;

        setTime(
            moment
                .duration(moment(targetTime).diff(moment(currentTime)))
                .format(
                    "Y [year] M [month] w [week] d [days] h [hrs] m [min] s [second]"
                )
        );
    }, [props.deadline]);

    return <>{time}</>;
};

export default RemainingTime;
