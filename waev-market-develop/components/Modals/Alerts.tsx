"use client";
import { useAlertsService } from "@/components/services/useAlertsService";
import MDSnackbar from "../Elements/MDSnackbar";
import { ErrorAlertBody, SuccessAlertBody } from "../services/store";
import { useEffect, useState } from "react";
import { setAlert } from "../../store/alertsSlice";

export { Alerts };

function Alerts() {
  const [show, setShow] = useState(false);
  const { alerts } = useAlertsService();
  useEffect(() => {
    if (alerts && alerts.length > 0) {
      setAlert(alerts[alerts.length - 1]);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 3000);
    }
  }, [alerts]);
  if (!alerts || alerts.length < 1) return <></>;

  const onClose = () => {
    setShow(false);
  };

  const AlertRenderSuccessAlert = (
    successAlert: SuccessAlertBody,
    index: number
  ) => {
    return show ? (
      <MDSnackbar
        key={index}
        color="success"
        icon="check"
        title={successAlert.title}
        content={successAlert.message}
        dateTime="Now"
        open={!!successAlert}
        onClose={() => onClose()}
        close={() => onClose()}
        bgWhite
      />
    ) : null;
  };

  const AlertRenderErrorAlert = (
    { message, title }: ErrorAlertBody,
    index: number
  ) => {
    const displayErrorMessage = message ? message : "Something went wrong...";

    return show ? (
      <MDSnackbar
        key={index}
        color="error"
        icon="x"
        title={title}
        content={displayErrorMessage}
        dateTime="Now"
        open={!!message}
        onClose={() => onClose()}
        close={() => onClose()}
        bgWhite
      />
    ) : null;
  };

  return (
    <div className="container">
      <div className="m-3">
        {alerts.map((alert, index) => {
          if (alert.type === "success") {
            return AlertRenderSuccessAlert(alert, index);
          } else {
            return AlertRenderErrorAlert(alert, index);
          }
        })}
      </div>
    </div>
  );
}
