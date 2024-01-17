import {createSlice} from '@reduxjs/toolkit'


type User={
    name: string;
  age: number;
  sex: string;
  mobile: number;
  idType: string;
  idNumber: number;
  address: string;
  country: string;
  state: string;
  city: string;
  pincode: number;
}

type InitialState={
    users: User[],

}

const initialState: InitialState={
    users: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload)
        },
    },
})

export default userSlice.reducer
export const {addUser} = userSlice.actions

