const randomId = () => Math.random(0,100).toString();

const createItem = (name) => ({ id: randomId(), name: name })

const types = {
    ADD: "add",
    RMEOVE: "remove",
}

export const initalState = {
    optionsList: [],
}

export const actionCreattors = {
    add: (title) => ({ type: types.ADD, payload: createItem(title) }),
    remove: (id) => ({ type: types.RMEOVE, payload: id }),
}

export function reducer(state, action) {
    switch (action.type) {
        case types.ADD:
            console.log("stat => ", state);
            let newa = [];
            newa = [...state.optionsList, action.payload]
            return state.optionsList = newa
    }
}
