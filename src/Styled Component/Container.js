/** @format */

import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
`;
export const ContainerGrid = styled.div`
	max-width: 1200px;
	margin: 0 auto;
`;
export const FlexBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;
export const Button = styled.button`
	font-size: 15px;
	margin: 0 10px;
	border: 1px solid #ccc;
	background-color: ${(props) => (props.background ? '#FF6B6B' : 'white')};
	padding: 12px;
	border-radius: 5px;
	cursor: pointer;
	color: white;
	&:hover {
		background-color: transparent;
		color: black;
	}
`;
export const ButtonAdd = styled(Button)`
	background-color: #3db2ff;
	color: #fff;
`;

export const ButtonUpdate = styled(Button)`
	background-color: #3db2ff;
`;
export const Input = styled.input`
	padding: 8px 10px;
	border-radius: 20px;
	font-size: 14px;
	border: 1px solid #ccc;

	&:focus {
		outline: none;
	}
`;
