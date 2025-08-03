'use client';
export interface SuccessAlertBody {
  type: 'success';
  title: string;
  message: string;
  icon?: string;
}
export interface ErrorAlertBody {
  type: 'error';
  title: string;
  message: string;
  icon?: string;
}

export type AlertBody = SuccessAlertBody | ErrorAlertBody;

export type AlertsType = AlertBody[];


export interface RootStateType {
  alerts: AlertsType;
}
