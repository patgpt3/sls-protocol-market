"use client";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../store/alertsSlice";
import { AlertsType, RootStateType } from "./store";

export { useAlertsService };

function useAlertsService(): IAlertsService {
  const dispatch = useDispatch();
  const alerts = useSelector((state: RootStateType) => state.alerts);

  return {
    alerts,
    setSuccessAlert: (title: string, message: string, icon?: string) => {
      const type = "success";
      dispatch(
        setAlert({
          message,
          title,
          icon,
          type,
        })
      );
    },
    setErrorAlert: (title: string, message: string, icon?: string) => {
      const type = "error";
      dispatch(
        setAlert({
          title,
          message,
          icon,
          type,
        })
      );
    },
  };
}

interface IAlerts extends AlertsType {}

interface IAlertsStore {
  alerts?: IAlerts;
}

interface IAlertsService extends IAlertsStore {
  setSuccessAlert: (title: string, message: string, icon?: string) => void;
  setErrorAlert: (title: string, message: string, icon?: string) => void;
}
