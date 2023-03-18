import { isFunction } from 'lodash';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { signInUser } from 'shared/api/auth';
import { socketAuthOpen } from 'shared/websocket';
import { clearData } from 'shared/store/defs/actions';
import {
  failSignIn,
  startSignIn,
  successSignIn
} from 'shared/store/user/actions';

const useSignIn = (oMutationOpts = {}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  return useMutation(
    async oCredentials => signInUser(oCredentials),
    {
      ...oMutationOpts,
      onMutate: () => {
        dispatch(startSignIn());

        if (isFunction(oMutationOpts.onMutate)) {
          oMutationOpts.onMutate();
        }
      },
      onSuccess: (oResponse, ...restParams) => {
        const { user, token } = oResponse;

        dispatch(successSignIn(user, token));
        socketAuthOpen(token);
        dispatch(clearData());
        history.push('/');

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
    }
  );
};

export { useSignIn };
