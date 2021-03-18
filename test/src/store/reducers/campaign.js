import * as actionType from "../actions/types";

const initialState = {
  campaignDetails:{},
  loading: false,
  error: null
};

function campaign(state = initialState, action) {
  switch (action.type) {
    case actionType.CAMPAIGN_DETAILS_START:
      return { ...state, loading: true, error: null };

    case actionType.CAMPAIGN_DETAILS_SUCCESS:
      return { ...state, loading: false, error: null, campaignDetails: action.value };

    case actionType.CAMPAIGN_DETAILS_FAILURE:
      return { ...state, loading: false, error: action.value };

    default:
      return state;
  }
}

export default campaign;
