import styled from "styled-components"
export const DivCard = styled.div`
    background-image: url(${props => props.imageSrc});
    width: 250px;
    height: 400px;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    text-align: center;
    color: white;
    border-radius: 5px;
`;
export const SearchCard = styled.div`
    background-image: url(${props => props.imageSrc});
    width: 350px;
    height: 560px;
    overflow: hidden;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    text-align: center;
    color: white;
    position: absolute;
    border-radius: 10px;
`;
