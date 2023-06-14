import React from 'react';
import { Container, Notification, Quantity, Title } from './styles';

type Props = {
  title: string;
  color: string;
  notifications?: string | undefined
}

export function BottomtabsMenu({ color, title, notifications }: Props) {
  const noNotifications = notifications === '0';

  return (
    <Container>
      <Title color={color}>{title}</Title>
      {notifications && (
        <Notification noNotifications={noNotifications}>
          <Quantity noNotifications={noNotifications}>
            {notifications}
          </Quantity>
        </Notification>
      )}
    </Container>
  );
}