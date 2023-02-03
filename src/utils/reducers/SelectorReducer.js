export const initalStateSelector = {
    choice: [],
}

const types = {
    UPDATE: "update"
}

export const actionOnSelector = {
    update: (arr) => ({ type: types.UPDATE, payload: arr }),
}

export function selectorReducer (state, action) {
    switch (action.type) {
        case types.UPDATE:
            state.choice = action.payload;
            return state;
    }
}