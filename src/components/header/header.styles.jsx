import styled from 'styled-components';
import {Link} from 'react-router-dom';



export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;

`;

export const LogoContainer = styled (Link)`
height: 100%;
width: 70px;
padding: 25px;
&:hover{ padding: 30px; }
`;

 export const OptionsContainer = styled.div`
 width: 50%;
 height: 100%;
 display: flex;
 align-items: center;
 justify-content: flex-end;
 `;

 export const OptionLink = styled(Link)`
 padding: 10px 15px;
 text-decoration: none;
 color: black;
 font-size: large;
 font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif ;
 cursor : pointer;
 &:hover{
  color: rgb(144, 47, 255);
  font-size: larger;
 `;