import styled, { css } from 'styled-components';

export const Status = styled.span`
  ${({ status }) =>
        status === "accepted" &&
        css`
      background: #2cd091;
      color: #fff;
    `};
  ${({ status }) =>
        status === "pending" &&
        css`
      background: rgba(180, 180, 180, 0.4);
      color: #080808;
    `};
  ${({ status }) =>
        status === "refused" &&
        css`
      background: #fc728c;
      color: #fff;
    `};
  ${({ status }) =>
        status === "warning" &&
        css`
      background: #ffc66b;
      color: #fff;
    `};

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 6px 7px;
  border-radius: 50px;
  width: 120px;
`;

