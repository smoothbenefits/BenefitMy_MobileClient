import {helpActionTypes} from './helpActionTypes';

export const locationServiceInstruction = {
    show: () => { return { type: helpActionTypes.locationServiceInstruction.SHOW }; },
    hide: () => { return { type: helpActionTypes.locationServiceInstruction.HIDE }; }
};
