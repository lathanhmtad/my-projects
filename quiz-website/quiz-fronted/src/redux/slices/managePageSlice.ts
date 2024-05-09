import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import PageConfigs from '../../pages/PageConfigs';
import { Filter } from '../../utils/FilterUtils';

interface ManagePageState {
  activePage: number;
  activePageSize: number;
  activeSort: string;
  selections: Record<number, React.Key[]>;
  activeFilter: Filter | null;
  filter: Filter[];
}

const initialState: ManagePageState = {
  activePage: PageConfigs.initListResponse.pageNumber,
  activePageSize: PageConfigs.initListResponse.pageSize,
  activeSort: '',
  selections: {},
  activeFilter: null,
  filter: []
};

const managePageSlice = createSlice({
  name: 'managePage',
  initialState,
  reducers: {
    setActivePage: (state, action: PayloadAction<number>): void => {
      state.activePage = action.payload;
    },
    setSelections: (state, action: PayloadAction<React.Key[]>): void => {
      state.selections = {
        ...state.selections,
        [state.activePage]: action.payload
      };
    },
    setActiveFilter: (state, action: PayloadAction<Filter | null>) => {
      state.activeFilter = action.payload
    },
    resetManagePageState: (state): void => {
      Object.assign(state, initialState)
    }
  },
});

export const {
  setActiveFilter,
  setActivePage,
  setSelections,
  resetManagePageState
}
  = managePageSlice.actions;

export default managePageSlice.reducer;
