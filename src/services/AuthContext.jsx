import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [session, setSession] = useState(
    localStorage.getItem("auth") === "true"
  );

  const [loading, setLoading] = useState(true);

  const signIn = async (email, password) => {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return user;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const signUp = async (email, password) => {
    try {
      const { user, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      return user;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setSession(false);
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    localStorage.setItem("auth", session);
  }, [session]);

  useEffect(() => {
    const session = supabase.auth.getSession();
    setUser(session?.user ?? null);
    setLoading(false);

    const { data: authStateListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );
    return (_) => {
      if (authStateListener) {
        authStateListener.unsubscribe?.();
      }
    };
  }, []);

  const getHasSession = () => {
    return localStorage.getItem("auth") === "true";
  };

  return (
    <AuthenticationContext.Provider
      value={{
        user,

        signIn,
        signUp,
        signOut,

        setSession,
        getHasSession,
        session,

        loading,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  return useContext(AuthenticationContext);
};
