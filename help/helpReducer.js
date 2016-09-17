import { helpActionTypes } from './helpActionTypes';

export default function () {

    const initialState = {
      locationServiceInstructionVisible: false
    };

    return (state = initialState, { type, payload }) => {
        switch (type) {

          // Location Service Instruction
          case helpActionTypes.locationServiceInstruction.SHOW:
            return {
                ...state,
                locationServiceInstructionVisible: true
            };
          case helpActionTypes.locationServiceInstruction.HIDE:
            return {
                ...state,
                locationServiceInstructionVisible: false
            };

          default:
            return state;
        }
    };
}
