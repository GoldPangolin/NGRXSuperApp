// import { AuthActions } from '@super-app/auth/store/actions';
// import * as fromAuth from '@super-app/auth/store/reducers';
// import { User } from '@super-app/auth/models';
// import { reducer } from './auth.reducers';

// describe('AuthReducer', () => {
//   describe('undefined action', () => {
//     it('should return the default state', () => {
//       const action = {} as any;

//       const result = reducer(undefined, action);

//       /**
//        * Snapshot tests are a quick way to validate
//        * the state produced by a reducer since
//        * its plain JavaScript object. These snapshots
//        * are used to validate against the current state
//        * if the functionality of the reducer ever changes.
//        */
//       // expect(result).toMatchSnapshot();
//     });
//   });

//   describe('LOGIN_SUCCESS', () => {
//     it('should add a user set loggedIn to true in auth state', () => {
//       const user = { name: 'test' } as User;
//       const createAction = AuthActions.loginSuccess({ user });

//       const result = reducer(fromAuth.initialState, createAction);

//       // expect(result).toMatchSnapshot();
//     });
//   });

//   describe('LOGOUT', () => {
//     it('should logout a user', () => {
//       const initialState = {
//         user: { name: 'test' },
//       } as fromAuth.State;
//       const createAction = AuthActions.logout();

//       const result = reducer(initialState, createAction);

//       // expect(result).toMatchSnapshot();
//     });
//   });
// });
