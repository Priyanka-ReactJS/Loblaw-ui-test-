
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { campaign } from "../store/reducers";
let api_url = "http://localhost:4000/campaigns";
function CampaignList() {
    const [data, setData] = useState([])

    useEffect(() => {
        // NOTE: Fetch Campaign List from Api
        const fetchData = async () => {
            const result = await fetch(api_url).then(response => {
                return response.json()
            }) .catch(err => {
                throw new Error(err)
              })
            setData(result)
        }
        fetchData()
    }, [])
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Campaigns Name</th>

                    </tr>
                </thead>
                <tbody>
                    {(data.campaigns || []).map((campaigns) => {
                        return (
                            <tr>
                                <td>
                                    <Link
                                        className=""
                                        to={{
                                            pathname: "/dashboard",
                                            campaigns
                                        }}
                                    >
                                        {campaigns.id}
                                    </Link>
                                </td>
                                <td> <Link
                                        className=""
                                        to={{
                                            pathname: "/dashboard",
                                            campaigns
                                        }}
                                    >
                                        {campaigns.name}
                                    </Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default CampaignList;