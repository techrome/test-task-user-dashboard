import cloneDeep from 'lodash/cloneDeep';
import uniqueId from 'lodash/uniqueId';

import * as c from 'src/constants';

const MODULE_PREFIX = 'users/';

export const usersTypes = {
  ADD_USER: MODULE_PREFIX + 'ADD_USER',
  EDIT_USER: MODULE_PREFIX + 'EDIT_USER',
  DELETE_USER: MODULE_PREFIX + 'DELETE_USER',
};

export const usersActions = {
  addUser: (info) => ({
    type: usersTypes.ADD_USER,
    payload: { info },
  }),
  editUser: (id, info) => ({
    type: usersTypes.EDIT_USER,
    payload: { id, info },
  }),
  deleteUser: (id) => ({
    type: usersTypes.DELETE_USER,
    payload: { id },
  }),
};

export const usersSelectors = {
  users: (state) => state.users.users,
};

const initialState = {
  users: [
    {
      id: uniqueId(),
      firstName: 'Danniel',
      lastName: 'Blichman',
      email: 'danniel.blichman@testtask.com',
      role: c.admin,
      isActive: true,
      permissions: [
        c.permGroup1_perm1,
        c.permGroup1_perm2,
        c.permGroup2_perm1,
        c.superAdmin,
      ],
    },
    {
      id: uniqueId(),
      firstName: 'Margarette',
      lastName: 'Jones',
      email: 'margarette.jones@testtask.com',
      role: c.user,
      isActive: true,
      permissions: [c.permGroup1_perm1, c.permGroup1_perm2, c.permGroup2_perm1],
    },
    {
      id: uniqueId(),
      firstName: 'Bethany',
      lastName: 'Doe',
      email: 'bethany.doe@testtask.com',
      role: c.user,
      isActive: true,
      permissions: [c.permGroup1_perm1, c.permGroup1_perm2, c.permGroup2_perm1],
    },
    {
      id: uniqueId(),
      firstName: 'Samuel',
      lastName: 'Jackson',
      email: 'samuel.jackson@testtask.com',
      role: c.user,
      isActive: true,
      permissions: [c.permGroup1_perm1, c.permGroup1_perm2, c.permGroup2_perm1],
    },
    {
      id: uniqueId(),
      firstName: 'Persival',
      lastName: 'Blinn',
      email: 'persival.blinn@testtask.com',
      role: c.admin,
      isActive: false,
      permissions: [
        c.superAdmin,
        c.permGroup1_perm1,
        c.permGroup1_perm5,
        c.permGroup2_perm1,
      ],
    },
    {
      id: uniqueId(),
      firstName: 'Bethany',
      lastName: 'Doe',
      email: 'bethany.doe@testtask.com',
      role: c.user,
      isActive: true,
      permissions: [c.permGroup1_perm1, c.permGroup1_perm2, c.permGroup2_perm1],
    },
    {
      id: uniqueId(),
      firstName: 'Danniel',
      lastName: 'Blichman',
      email: 'danniel.blichman@testtask.com',
      role: c.admin,
      isActive: true,
      permissions: [
        c.permGroup1_perm1,
        c.permGroup1_perm2,
        c.permGroup2_perm1,
        c.superAdmin,
      ],
    },
    {
      id: uniqueId(),
      firstName: 'Margarette',
      lastName: 'Jones',
      email: 'margarette.jones@testtask.com',
      role: c.user,
      isActive: true,
      permissions: [c.permGroup1_perm1, c.permGroup1_perm2, c.permGroup2_perm1],
    },
    {
      id: uniqueId(),
      firstName: 'Bethany',
      lastName: 'Doe',
      email: 'bethany.doe@testtask.com',
      role: c.user,
      isActive: true,
      permissions: [c.permGroup1_perm1, c.permGroup1_perm2, c.permGroup2_perm1],
    },
    {
      id: uniqueId(),
      firstName: 'Samuel',
      lastName: 'Jackson',
      email: 'samuel.jackson@testtask.com',
      role: c.user,
      isActive: true,
      permissions: [c.permGroup1_perm1, c.permGroup1_perm2, c.permGroup2_perm1],
    },
    {
      id: uniqueId(),
      firstName: 'Persival',
      lastName: 'Blinn',
      email: 'persival.blinn@testtask.com',
      role: c.admin,
      isActive: false,
      permissions: [
        c.superAdmin,
        c.permGroup1_perm1,
        c.permGroup1_perm5,
        c.permGroup2_perm1,
      ],
    },
    {
      id: uniqueId(),
      firstName: 'Bethany',
      lastName: 'Doe',
      email: 'bethany.doe@testtask.com',
      role: c.user,
      isActive: true,
      permissions: [c.permGroup1_perm1, c.permGroup1_perm2, c.permGroup2_perm1],
    },
    {
      id: uniqueId(),
      firstName: 'Danniel',
      lastName: 'Blichman',
      email: 'danniel.blichman@testtask.com',
      role: c.admin,
      isActive: true,
      permissions: [
        c.permGroup1_perm1,
        c.permGroup1_perm2,
        c.permGroup2_perm1,
        c.superAdmin,
      ],
    },
    {
      id: uniqueId(),
      firstName: 'Margarette',
      lastName: 'Jones',
      email: 'margarette.jones@testtask.com',
      role: c.user,
      isActive: true,
      permissions: [c.permGroup1_perm1, c.permGroup1_perm2, c.permGroup2_perm1],
    },
    {
      id: uniqueId(),
      firstName: 'Bethany',
      lastName: 'Doe',
      email: 'bethany.doe@testtask.com',
      role: c.user,
      isActive: true,
      permissions: [c.permGroup1_perm1, c.permGroup1_perm2, c.permGroup2_perm1],
    },
    {
      id: uniqueId(),
      firstName: 'Samuel',
      lastName: 'Jackson',
      email: 'samuel.jackson@testtask.com',
      role: c.user,
      isActive: true,
      permissions: [c.permGroup1_perm1, c.permGroup1_perm2, c.permGroup2_perm1],
    },
    {
      id: uniqueId(),
      firstName: 'Persival',
      lastName: 'Blinn',
      email: 'persival.blinn@testtask.com',
      role: c.admin,
      isActive: false,
      permissions: [
        c.superAdmin,
        c.permGroup1_perm1,
        c.permGroup1_perm5,
        c.permGroup2_perm1,
      ],
    },
    {
      id: uniqueId(),
      firstName: 'Bethany',
      lastName: 'Doe',
      email: 'bethany.doe@testtask.com',
      role: c.user,
      isActive: true,
      permissions: [c.permGroup1_perm1, c.permGroup1_perm2, c.permGroup2_perm1],
    },
    {
      id: uniqueId(),
      firstName: 'Danniel',
      lastName: 'Blichman',
      email: 'danniel.blichman@testtask.com',
      role: c.admin,
      isActive: true,
      permissions: [
        c.permGroup1_perm1,
        c.permGroup1_perm2,
        c.permGroup2_perm1,
        c.superAdmin,
      ],
    },
    {
      id: uniqueId(),
      firstName: 'Margarette',
      lastName: 'Jones',
      email: 'margarette.jones@testtask.com',
      role: c.user,
      isActive: true,
      permissions: [c.permGroup1_perm1, c.permGroup1_perm2, c.permGroup2_perm1],
    },
    {
      id: uniqueId(),
      firstName: 'Bethany',
      lastName: 'Doe',
      email: 'bethany.doe@testtask.com',
      role: c.user,
      isActive: true,
      permissions: [c.permGroup1_perm1, c.permGroup1_perm2, c.permGroup2_perm1],
    },
    {
      id: uniqueId(),
      firstName: 'Samuel',
      lastName: 'Jackson',
      email: 'samuel.jackson@testtask.com',
      role: c.user,
      isActive: true,
      permissions: [c.permGroup1_perm1, c.permGroup1_perm2, c.permGroup2_perm1],
    },
    {
      id: uniqueId(),
      firstName: 'Persival',
      lastName: 'Blinn',
      email: 'persival.blinn@testtask.com',
      role: c.admin,
      isActive: false,
      permissions: [
        c.superAdmin,
        c.permGroup1_perm1,
        c.permGroup1_perm5,
        c.permGroup2_perm1,
      ],
    },
    {
      id: uniqueId(),
      firstName: 'Bethany',
      lastName: 'Doe',
      email: 'bethany.doe@testtask.com',
      role: c.user,
      isActive: true,
      permissions: [c.permGroup1_perm1, c.permGroup1_perm2, c.permGroup2_perm1],
    },
  ],
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case usersTypes.ADD_USER: {
      let updatedUsers = cloneDeep(state.users);

      updatedUsers.push(payload.info);

      return {
        ...state,
        users: updatedUsers,
      };
    }
    case usersTypes.EDIT_USER: {
      let updatedUsers = cloneDeep(state.users);

      const foundUserIndex = updatedUsers.findIndex(
        (el) => el.id === payload.id,
      );

      if (~foundUserIndex) {
        updatedUsers[foundUserIndex] = payload.info;
      } else {
        return state;
      }

      return {
        ...state,
        users: updatedUsers,
      };
    }
    case usersTypes.DELETE_USER: {
      let updatedUsers = cloneDeep(state.users);

      const foundUserIndex = updatedUsers.findIndex(
        (el) => el.id === payload.id,
      );

      if (~foundUserIndex) {
        updatedUsers.splice(foundUserIndex, 1);
      } else {
        return state;
      }

      return {
        ...state,
        users: updatedUsers,
      };
    }

    default:
      return state;
  }
};
