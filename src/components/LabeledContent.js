import styled from "styled-components";

const StyledLabeledContent = styled.div`
  width: calc(100% - 16px);
  margin-left: 8px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  > div {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
`;

export const LabeledContent = ({ label, children }) => {
  return (
    <StyledLabeledContent>
      <p>{label}</p>
      <div>{children}</div>
    </StyledLabeledContent>
  );
};
