import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as
  | string
  | undefined;

const missingSupabaseConfig = !supabaseUrl || !supabaseAnonKey;

const makeRejectedPromise = (method: string) => async () => {
  throw new Error(
    `Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file before calling ${method}.`,
  );
};

const emptySupabaseClient = {
  auth: {
    getSession: makeRejectedPromise("auth.getSession"),
    onAuthStateChange: () => ({
      data: {
        subscription: { unsubscribe: () => undefined },
      },
    }),
    signInWithPassword: makeRejectedPromise("auth.signInWithPassword"),
    signUp: makeRejectedPromise("auth.signUp"),
    signOut: makeRejectedPromise("auth.signOut"),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        maybeSingle: makeRejectedPromise("from(...).select().eq().maybeSingle"),
      }),
    }),
    insert: makeRejectedPromise("from(...).insert"),
  }),
  storage: {
    from: () => ({
      upload: makeRejectedPromise("storage.from(...).upload"),
      remove: makeRejectedPromise("storage.from(...).remove"),
    }),
  },
};

if (missingSupabaseConfig) {
  console.warn(
    "Supabase is not configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.",
  );
}

export const supabase = missingSupabaseConfig
  ? (emptySupabaseClient as any)
  : createClient(supabaseUrl, supabaseAnonKey);
