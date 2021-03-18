import * as actionType from "./types";
import axios from "axios";

export const fetchCampaignDetailsState = () => {
  return {
    type: actionType.CAMPAIGN_DETAILS_START
  };
};

export const fetchCampaignDetailsSuccess = (campaignDetails) => {
  return {
    type: actionType.CAMPAIGN_DETAILS_SUCCESS,
    value: campaignDetails
  };
};

export const fetchCampaignDetailsFailure = (error) => {
  return {
    type: actionType.CAMPAIGN_DETAILS_FAILURE,
    value: error
  };
};

const apiUrl = "http://localhost:4000/campaigns";

export const getCampaignDetails = (Campaign,num) => {
  return (dispatch) => {
    dispatch(fetchCampaignDetailsState());
    try {
      const headers = {
        'Content-Type': 'application/json'
      }
      if(Campaign !== '') {
        axios.get(apiUrl+'/'+Campaign.id+'?number='+num, {
          headers: headers })
          .then((response) => {
              if (response) {
                dispatch(fetchCampaignDetailsSuccess(response));
              }
              console.log(response)
            })
            .catch((error) => {
              console.log("error..", error);
              dispatch(fetchCampaignDetailsFailure(error));
            });
      }
    } catch (error) {
      dispatch(fetchCampaignDetailsFailure(error));
    }
  };
};


