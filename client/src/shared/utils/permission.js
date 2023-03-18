import {
  ACCOUNT,
  EDIT_DEF_POINT,
  BLOCK_DEF_POINT,
  DELETE_DEF_POINT,
  CREATE_DEF_POINT
} from 'shared/store/defs/constants';

import { ADD_IMAGES } from 'shared/ui/UploadImage/const';
import {
  USER,
  ADMIN,
  SIGNUP
} from 'shared/store/user/constants';

const checkUserIsAuth = user => user !== null;
const checkPermissionIsAdmin = user =>
  checkUserIsAuth(user) && user.role === ADMIN;
const checkPermissionIsUser = user =>
  checkUserIsAuth(user) && user.role === USER;
const checkUserIsOwner = (user, defibrillator) =>
  user._id === defibrillator.owner;

const checkPermission = (action, user, defibrillator) => {
  switch (action) {
    case CREATE_DEF_POINT:
    case ACCOUNT:
      return checkUserIsAuth(user);

    case EDIT_DEF_POINT:
    case DELETE_DEF_POINT:
    case ADD_IMAGES:
      return (
        checkPermissionIsAdmin(user) ||
        (checkPermissionIsUser(user) &&
          checkUserIsOwner(user, defibrillator))
      );
    case SIGNUP:
    case BLOCK_DEF_POINT:
      return checkPermissionIsAdmin(user);

    default:
      return false;
  }
};

export default checkPermission;
