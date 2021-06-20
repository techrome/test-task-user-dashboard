import * as c from 'src/constants';

export const isdev = process.env.NODE_ENV !== 'production';

export const defaultErrorText = 'Unexpected error occured';

export const modalNames = {
  ADD_USER: 'ADD_USER',
  DELETE_USER: 'DELETE_USER',
};

export const iconGlobalClassName = 'icon-global';

export const permissionGroups = [
  {
    title: 'Super Admin',
    // for clarity when only 1 element,
    // we only show the group switch
    perms: [
      {
        value: c.superAdmin,
        title: 'Super Admin',
      },
    ],
  },
  {
    title: 'Permission group 1',
    perms: [
      {
        value: c.permGroup1_perm1,
        title: 'Permission 1',
      },
      {
        value: c.permGroup1_perm2,
        title: 'Permission 2',
      },
      {
        value: c.permGroup1_perm3,
        title: 'Permission 3',
      },
      {
        value: c.permGroup1_perm4,
        title: 'Permission 4',
      },
      {
        value: c.permGroup1_perm5,
        title: 'Permission 5',
      },
    ],
  },
  {
    title: 'Manage users',
    perms: [
      {
        value: c.permGroup2_perm1,
        title: 'Create user',
      },
      {
        value: c.permGroup2_perm2,
        title: 'Edit user',
      },
      {
        value: c.permGroup2_perm3,
        title: 'Delete user',
      },
      {
        value: c.permGroup2_perm4,
        title: 'Read user',
      },
      {
        value: c.permGroup2_perm5,
        title: 'Permission 10',
      },
      {
        value: c.permGroup2_perm6,
        title: 'Permission 11',
      },
      {
        value: c.permGroup2_perm7,
        title: 'Permission 12',
      },
    ],
  },
  {
    title: 'Manage profile',
    perms: [
      {
        value: c.permGroup3_perm1,
        title: 'Update profile',
      },
      {
        value: c.permGroup3_perm2,
        title: 'Permission 14',
      },
      {
        value: c.permGroup3_perm3,
        title: 'Permission 15',
      },
      {
        value: c.permGroup3_perm4,
        title: 'Permission 16',
      },
    ],
  },
];

export const roles = [
  {
    title: 'User',
    value: c.user,
  },
  {
    title: 'Admin',
    value: c.admin,
  },
];
