import { isFunction } from 'lodash';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';

import { validateUser } from 'shared/api/auth';
import { socketAuthOpen } from 'shared/websocket';
import {
  failSignIn,
  successSignIn
} from 'shared/store/user/actions';

const useValidateUser = (oMutationOpts = {}) => {
  const dispatch = useDispatch();

  return useMutation(() => validateUser(), {
    ...oMutationOpts,
    onSuccess: (oResponse, ...restParams) => {
      const { user, token } = oResponse;

      dispatch(successSignIn(user, token));
      socketAuthOpen(token);

      if (isFunction(oMutationOpts.onSuccess)) {
        oMutationOpts.onSuccess(oResponse, ...restParams);
      }
    },
    onError: e => {
      dispatch(failSignIn());

      if (isFunction(oMutationOpts.onError)) {
        oMutationOpts.onError(e);
      }
    }
  });
};

export { useValidateUser };
