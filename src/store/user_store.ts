import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type BackEndSignUpType = {
  email: string;
  password: string;
};

type UserType = {
  username: string | null;
  email: string | null;
  image: string | null;
  role: string | null;
  disabled: boolean;
};
type UserStoreType = {
  user: UserType | null;
  login: boolean;
  logout: boolean;
  signUp: boolean;
  authStart: boolean;
  isUserLoading: boolean;
  setLogin: () => void;
  setLogout: () => void;
  setSignUp: () => void;
  setUser: () => void;
  setAuthStart: () => void;
  logInUser: (loginData: BackEndSignUpType) => Promise<void>;
  logOutUser: () => Promise<void>;
  signUpUser: (signUpdata: BackEndSignUpType) => Promise<void>;
};

export const useUserStore = create(
  devtools<UserStoreType>((set) => ({
    user: null,
    login: false,
    logout: false,
    signUp: false,
    authStart: false,
    isUserLoading: false,
    setUser: async (): Promise<void> => {
      try {
        const resp = await fetch('http://localhost:8000/auth/user', {
          credentials: 'include', // 👈 include the cookie
        });

        if (!resp.ok) {
          throw new Error(
            "Failed to fetch user from 'http://127.0.0.1:8000/auth/user'"
          );
        }

        const user: UserType = await resp.json();

        set({
          user: {
            username: user.username,
            email: user.email,
            image: user.image,
            role: user.role,
            disabled: user.disabled,
          },
        });
      } catch (error) {
        console.log('Error from user_store');
        console.log(JSON.stringify(error, null, 2));
      }
    },
    setLogin: () =>
      set(() => {
        // const prevLogIn = state.login;
        return { signUp: false, login: false };
      }),
    setLogout: () => {
      set({ logout: true });
    },
    setSignUp: async () =>
      set(() => {
        // const prevSignUp = state.signUp;
        return { signUp: true, login: true };
      }),
    setAuthStart: () =>
      set((state) => {
        const prev = state.authStart;
        return { authStart: !prev };
      }),
    logInUser: async (loginData: BackEndSignUpType) => {
      set({ isUserLoading: true });
      try {
        const response = await fetch('http://localhost:8000/auth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(loginData),
        });
        console.log(response);

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Account doesn't exist. Please create an account");
          }
          throw new Error('Please cross-check your credentials, login failed');
        }
        const newUser: UserType = await response.json();

        set((state) => ({
          user: {
            ...state.user,
            username: newUser.username,
            email: newUser.email,
            image: newUser.image,
            role: newUser.role,
            disabled: newUser.disabled,
          },
        }));
      } catch (error) {
        if (error instanceof TypeError) {
          throw new Error(error.message);
        }

        if (error instanceof Error) {
          throw error;
        }

        throw new Error("Couldn't log into the account. Please contact admin");
      } finally {
        set({ isUserLoading: false });
      }

      set({});
    },
    logOutUser: async () => {
      set({ isUserLoading: true });
      try {
        const response = await fetch('http://localhost:8000/auth/logout', {
          method: 'POST',
          credentials: 'include',
        });

        if (!response.ok) throw new Error('Logout action, failed');

        set(() => ({
          user: null,
        }));
      } catch (error) {
        console.log(error, 'Error from user_store hook Line94');
      } finally {
        set({ isUserLoading: false });
      }
    },
    signUpUser: async (signUpdata) => {
      console.log(signUpdata, 'Signup clicked from user_store hook Line80');
      set({ isUserLoading: true });
      try {
        const response = await fetch('http://localhost:8000/auth/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(signUpdata),
        });

        if (!response.ok)
          throw new Error("Couldn't create the user for some strange reason");
        const newUser: UserType = await response.json();

        set((state) => ({
          user: {
            ...state.user,
            username: newUser.username,
            email: newUser.email,
            image: newUser.image,
            role: newUser.role,
            disabled: newUser.disabled,
          },
        }));
      } catch (error) {
        console.log(error, 'Error from user_store hook Line94');
      } finally {
        set({ isUserLoading: false });
      }
    },
  }))
);
