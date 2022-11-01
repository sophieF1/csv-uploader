import ukFlag from "../images/ukFlag.png";
import styled from "styled-components";

const Icon = styled.img`
width: 25px;
height: 25px;
margin: 5px;
background-image: url(${props => props.flag ? ukFlag : null});
`;

const P = styled.p`
    justify-content: center;
`;

const TableBody = ({ tableData, columns }) => {
    return (
        <tbody>
            {tableData.map((data) => {
                return (
                    <tr key={data.id}>
                        {columns.map(({ accessor }) => {
                            if (accessor === 'checkbox') {
                                return (
                                    <td key={accessor}><input type="checkbox" /></td>
                                )
                            }
                            if (accessor === 'currency') {
                                const tData = data[accessor] ? data[accessor] : "——";
                                if (tData === "GBP") {
                                    return (<><td key={accessor}><Icon flag={ukFlag} /><P>{tData} </P>  </td></>);
                                } else {
                                    return (<>
                                        <td key={accessor}>{tData} </td></>);
                                }
                            }
                            if (accessor === 'id') {
                                const tData = data[accessor] ? data[accessor] : "——";
                                return (
                                    <td key={accessor} style={{ color: '#1d8676', fontWeight: 500 }}>{tData}</td>
                                )
                            }
                            else {
                                const tData = data[accessor] ? data[accessor] : "——";
                                return (<>
                                    <td key={accessor}>{tData}   </td></>);
                            }
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
};

export default TableBody;