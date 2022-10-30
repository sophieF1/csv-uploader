import React from "react";
import styled from "styled-components";

// External
import toast from "react-hot-toast";

// Components
import CustomIcon from "./CustomIcon";

// Styles
export const NotificationCard = styled.div`
  background: ${props => props.bgColor};
  border-radius: 22px;
  height: 100px;
  width: 508px;
  position: relative;
  overflow: hidden;
`;
export const NotificationImageWrapper = styled.div`
  margin-top: -32px;
  margin-left: 24px;
  position: absolute;
  z-index: 2;
`;

export const NotificationContent = styled.div`
  color: white;
  position: left;
  right: 40px;
  width: 100%;
`;
export const NotificationTitle = styled.h3`
  color: white;
  text-align: left;
  margin-left: 40px;
  font-family: Calibri
`;
export const NotificationDescription = styled.p`
  color: white;
  font-family: Calibri
`;
export const NotificationIconButton = styled.button`
  background: transparent;
  border: none;
  top: 16px;
  cursor: pointer;
`;
export const NotificationImage = styled.img`
    width: 20px;
    height: 20px;
`;

const ToastNotification = ({
  bgColor,
  title,
  message,
  icon
}) => {

  return (
    <>
      <NotificationCard bgColor={bgColor}>
        <NotificationContent>
          <NotificationTitle>{title}</NotificationTitle>
          <NotificationDescription>{message}</NotificationDescription>
        </NotificationContent>
      </NotificationCard>
    </>
  );
};

export default ToastNotification;