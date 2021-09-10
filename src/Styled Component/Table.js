/** @format */

import styled from 'styled-components';

const StyledTable = styled.table`
	width: 100%;
	padding: 14px;
	font-size: 16px;
	border: 1px solid #ccc;
	margin-top: 30px;
`;
const TableHeader = styled.thead`
	text-transform: uppercase;
`;
const TableTH = styled.th``;
const TableTR = styled.tr`
	border: 1px solid #ccc;
`;
const TableBody = styled.tbody``;
const TableTD = styled.td`
	text-align: center;
	padding: 12px;
`;

export const Table = ({ children, ...props }) => {
	return <StyledTable {...props}>{children}</StyledTable>;
};
Table.Head = ({ children, ...rest }) => {
	return <TableHeader {...rest}>{children}</TableHeader>;
};

Table.Body = ({ children, ...rest }) => {
	return <TableBody {...rest}>{children}</TableBody>;
};

Table.TH = ({ children, ...rest }) => {
	return <TableTH {...rest}>{children}</TableTH>;
};

Table.TR = ({ children, ...rest }) => {
	return <TableTR {...rest}>{children}</TableTR>;
};

Table.TD = ({ children, ...rest }) => {
	return <TableTD {...rest}>{children}</TableTD>;
};
