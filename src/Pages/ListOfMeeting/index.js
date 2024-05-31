import { useRef, lazy } from 'react';
import { Box, Table, Pagination, TextInput, Button , Grid} from '@mantine/core';
import { useStyles } from './style.js';
import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import filter from "../../assets/images/filterIcon.svg"
import SearchIcon from '../../assets/images/search.svg';
import { data } from './properties.js';
import { baseURL, getHeader } from '../../Utils/const.js';
const LeftPannel = lazy(() => import('../../Components/Header'));
function ListOfMeeting() {
    const { classes, theme } = useStyles(useStyles)
    const [activePage, setActivePage] = useState(1);
    const [entries, setEntries] = useState([]);
    const [pageLoadEntries, setPageLoadEntries] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const cacheListing = useRef({});
    const params = new URLSearchParams();
    params.append('page', activePage)
    params.append('pSize', pageSize)
    const pageChangeHandler = (page) => {
        setActivePage(page)
    }
    const fetchMeetingList = async (isReset) => {
        let schema =
        {
            "operationName": "getPastHealthInfoSearches",
            "variables": {},
            "query": "query getPastHealthInfoSearches {\n  getPastHealthInfoSearches {\n    id\n    startDate\n    startQuery\n    type\n    __typename\n  }\n}"
          };
        const response = await fetch(`${baseURL}/graphql`, {
            method: 'POST',
            headers: getHeader(),
            body:JSON.stringify(schema),

        })
        console.log(response)
        if (response.ok) {
            let UserListing = (await response.json()).data.getPastHealthInfoSearches;

            setEntries(UserListing);
            setPageLoadEntries(UserListing);

            setTotalPage((UserListing.totalCount + pageSize - 1) / pageSize);
            cacheListing[params] = UserListing;
        }
    }

    useEffect(() => {
        fetchMeetingList()
    }, [activePage])

    const rows = entries.map((element, index) => (
        <tr className={index % 2 === 0 ? classes.tableRowWhite : classes.tableRow} key={`${element.Id}`}>
            <td className={classes.tableData}>{new Date(element.startDate).toDateString() + new Date(element.startDate).toLocaleString().split(',')[1]}</td>
            
           
            <td className={classes.tableData}>{element.startQuery ? element.startQuery : ''} </td>
            <td> <Link to={`/chat/${element.id}`}><Button color="primary.0">Continue</Button> </Link></td>
        </tr>
    ));

    const handleSearch = (e) => {
        const value = e.target.value;
        if (value === "") {
            setEntries(pageLoadEntries);
        } else {
            const filteredEntries = pageLoadEntries.filter(item => `${(item.startQuery && item.startQuery.includes(value) )}`
            );
            setEntries(filteredEntries);
        }
    }


    return (
        <Grid className={classes.wrapper}>
        <Grid.Col span={1} sm={2}  p={0}>
            <LeftPannel activePage={'Converstation'}/>
        </Grid.Col>
        <Grid.Col span={12} sm={10} p={0}>
        <Box className={classes.wrapper2}>
            <Box className={classes.headerAndSearch}>
                <p className={classes.title} >{data.titles.pageTitle}</p>
                <Box className={classes.searchAndFilter}>
                    <TextInput icon={<img className={classes.action} src={SearchIcon} alt='view' />} onChange={handleSearch} radius={"xl"} className={classes.searchInput} placeholder={data.titles.search} />
                    <Box className={classes.filterContainer} >
                        <img className={classes.filterIcon} src={filter} alt='search-input' />
                        <p className={classes.filter}>{data.titles.filter}</p>
                    </Box>

                </Box>
            </Box>
            <Box className={classes.tableContainer}>
                <Table className={classes.table}>
                    <thead className={classes.tableHead}>
                        <tr >
                            {data.tableHeading.map(heading => {
                                return <th className={classes.columnHeading}>{heading}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </Table>
            </Box>
            {
                rows.length === 0 ? <p className='no-record-found'>{"No Past Chat found"}</p>
                    :
                    <></>
            }

        </Box>
        </Grid.Col>
       
    </Grid>
       
    );
}

export default ListOfMeeting;