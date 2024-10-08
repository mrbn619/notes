import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import DehazeOutlinedIcon from '@material-ui/icons/DehazeOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

import { useQuery } from '@apollo/client';
import { GET_USERNAME } from '../gql/query';

const CornerStyle = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.5em;
`;

const StyledButton = styled.button`
  display: block;
  padding: 6px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  background: rgba(0, 119, 204, 0.75);
  color: #fff;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    background-color: #005fa3;
  }

  @media (max-width: 700px) {
    height: 36px;
    width: 36px;
  }

  @media (min-width: 700px) {
    display: none;
  }
`;

const RightCorner = ({ logged, toggleNav, isShown }) => {
  const { data } = useQuery(GET_USERNAME);

  return (
    <CornerStyle>
      {!logged ? (
        <Link
          style={{
            textDecoration: 'none',
            fontSize: '1.1rem',
            marginLeft: 'auto'
          }}
          to="/signup"
        >
          Sign Up
        </Link>
      ) : (
        data && (
          <p
            style={{
              fontSize: '1.2 rem',
              color: 'rgba(0, 119, 204, 0.75)'
            }}
          >
            hello, <em style={{ fontWeight: 'bold' }}>{data.userName}</em>
          </p>
        )
      )}
      <StyledButton onClick={toggleNav} disp={isShown}>
        {isShown === 'none' ? <DehazeOutlinedIcon /> : <CloseOutlinedIcon />}
      </StyledButton>
    </CornerStyle>
  );
};

export default withRouter(RightCorner);
