import { css } from 'lit';

export const sharedStyles = css`
  .column {
    display: flex;
    flex-direction: column;
  }
  .row {
    display: flex;
    flex-direction: row;
  }
  .center-content {
    align-items: center;
    justify-content: center;
  }

  .placeholder {
    color: lightgrey;
  }

  .vertical-divider {
    background-color: grey;
    width: 1px;
    height: 60%;
    opacity: 0.3;
    margin-bottom: 0;
  }
`;
