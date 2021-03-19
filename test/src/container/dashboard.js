import React, { useState, useEffect } from "react";
//Note: Include bootstrap for responsive layout
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from "react-redux";
import { getCampaignDetails } from "../store/actions/campaign";
import { useHistory } from "react-router-dom";
import Cardwrap from '../component/cardwrap';
import Chart from "../component/Chart"
import '../index.css'

var dataImp = [0]
var dataClicks = [0]
var dataUsers = [0]
var dataCtr = [0]
var numInc = 0
//Note:Local storage variables
const locId = localStorage.getItem('id');
const locName = localStorage.getItem('name');

const template = {
  userConfig: {
    tooltip: {
      pointFormat: "<b>{point.y}</b>"
    },
    plotOptions: {
      pie: {
        showInLegend: true,
        innerSize: "60%",
        dataLabels: {
          enabled: true,
          formatter() {
            return this.point.name  + ' : ' + Math.round(this.point.y * 100);
          },
          distance: 5,
          color: "black",
          style: {
            fontweight: "bold",
            fontsize: 50
          }
        }
      }
    }
  }
};

const Dashboard = (props) => {
  const campaignId = props.location.campaigns === undefined ? locId : props.location.campaigns.id;
  const campaignName = props.location.campaigns === undefined ? locName : props.location.campaigns.name;
  let api_url = "http://localhost:4000/campaigns";

  //Note: Using redux-store for state management
  // const campaign = props.location.campaigns;
  // const dispatch = useDispatch();
  // const [campaignDetails, setCampaign] = useState();
  // const campaignData = useSelector((state) => state.campaignState.campaignDetails)
  //   useEffect(() => {
  //     if (campaignId) {
  //         dispatch(getCampaignDetails(campaign, 0))
  //     }
  // }, [campaignId, dispatch])

  const [data, setData] = useState([])
  let history = useHistory();
  useEffect(() => {
    // NOTE: Fetch Campaign Details from Api
    const fetchData = async (num) => {
      let ApiUrlForSearch = '';
      ApiUrlForSearch = api_url + '/' + campaignId + '?number=' + num;
      if (locId !== null && locId !== 'null') {
        ApiUrlForSearch = api_url + '/' + locId + '?number=' + num;
      }  else if (campaignId !== null && campaignId !== 'null') {
        ApiUrlForSearch = api_url + '/' + campaignId + '?number=' + num;
      } else {
        //Note: Redirect on main page when campaignId Or Loalstorage Id is not found
        history.push('/')
      }
      if(ApiUrlForSearch !== ''){
        const result = await fetch(ApiUrlForSearch).then(response => {
          return response.json()
        }).catch(err => {
          throw new Error(err)
        })
        setData(result);
      }
    }
    let num = 0;
    fetchData(num);
    const interval = setInterval(() => {
      num++;
      fetchData(num)
      numInc = num
    }, 5000);
    return () => { clearInterval(interval) }
  }, []);

  useEffect(() => {
    //Note: Store Data in Local storage
    if(props.location.campaigns === undefined) {
      if(locId !== null && locId !== 'null') {
        window.localStorage.setItem("id",locId)
      }
    } else {
      window.localStorage.setItem("id", props.location.campaigns.id)
    }
    //Note: Handle page refresh scenario
    if(props.location.campaigns === undefined) {
      if(locName !== null && locName !== 'null') {
        window.localStorage.setItem("name",locName)
      }
    } else {
      window.localStorage.setItem("name", props.location.campaigns.name)
    }
  }, [locId, locName, props.location.campaigns])

  const calculateCtr = (impressions, clicks) => {
    if (impressions && clicks) {
      return (
        (clicks / impressions) * 100
      )
    } else {
      return 0;
    }
  }
  const totalCalculateCtr = () => {
    if (calculateCtr(data.impressions, data.clicks) > 0) {
      dataCtr.push(calculateCtr(data.impressions, data.clicks))
    };
    var sum = dataCtr.reduce(function (prev, curr) {
      return curr + prev;
    }, 0);
    return sum;
  }
  const totalImp = () => {
    if (data.impressions) { dataImp.push(data.impressions) };
    var sum = dataImp.reduce(function (prev, curr) {
      return curr + prev;
    }, 0);
    return sum;
  }
  const totalClicks = () => {
    if (data.clicks) { dataClicks.push(data.clicks) };
    var sum = dataClicks.reduce(function (prev, curr) {
      return curr + prev;
    }, 0);
    return sum;
  }
  const totalUsers = () => {
    if (data.users) { dataUsers.push(data.users) };
    var sum = dataUsers.reduce(function (prev, curr) {
      return curr + prev;
    }, 0);
    return sum;
  }
  const getChartData = () => {
    let tempData = [];
    if (data) {
       tempData = [
        { name: "Total impressions", y: totalImp() },
        { name: "Total clicks", y: totalClicks() },
        { name: "Total users", y: totalUsers() },
        { name: "Total CTR", y: totalCalculateCtr() },
        { name: "Most impressions", y: data.impressions },
        { name: "Most clicks", y: data.clicks },
        { name: "Most users", y: data.users },
        { name: "CTR", y: calculateCtr(data.impressions,data.clicks) },
      ];
    }
    return tempData;
  }
  return (
    <>
    <Chart
                  data={getChartData()}
                  userConfig={template.userConfig}
                  titleName={campaignName}
                  currentNumber={numInc}
                />
    <div className="container-block">
      <Cardwrap text="Total impressions" value={totalImp()} />
      <Cardwrap text="Total click" value={totalClicks()} />
      <Cardwrap text="Total CTR" value={totalCalculateCtr()} />
      <Cardwrap text="Total users" value={totalUsers()} />
      <Cardwrap text="Most recent impressions" value={data.impressions} />
      <Cardwrap text="Current Number" value={numInc} />
      <Cardwrap text="Most recent clicks" value={data.clicks} />
      <Cardwrap text="Most recent CTR" value={calculateCtr(data.impressions, data.clicks)} />
      <Cardwrap text="Most recent users" value={data.users} /> 
    </div>
    </>
  );
}

export default Dashboard;
