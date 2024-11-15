import styled from 'styled-components'

export const ContainerTableData = styled.div`
.dataTables_length{
        visibility:${({ howMuchData }) => howMuchData < 10 ? "hidden" : "visible"} ;
        label{
            font-family: "Work Sans";
            .custom-select{
                margin-left:0px !important;
                margin-bottom: 12px;
            }
        }
    }
    .dataTables_info{
        visibility:${({ howMuchData }) => howMuchData < 10 ? "hidden" : "visible"} ;
        display:${({ howMuchData }) => howMuchData < 10 && "none" } ;
    }
    .dataTables_paginate{
        visibility:${({ howMuchData }) => howMuchData < 10 ? "hidden" : "visible"} ;
        display:${({ howMuchData }) => howMuchData < 10 ? "none" : "flex"} ;
        justify-content: end;
        .active{
            background-color: ${props => props.theme.color2};
            .page-link{
                background-color: ${props => props.theme.color2};
                border-color: ${props => props.theme.color2};
            }
        }
    }
`