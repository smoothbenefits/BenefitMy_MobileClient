import createRequestActionTypes from '../common/createRequestActionTypes';

export const timePunchCardActionTypes = {
    load: createRequestActionTypes('LOAD'),
    punchIn: createRequestActionTypes('PUNCH_IN'),
    punchOut: createRequestActionTypes('PUNCH_OUT')
};
