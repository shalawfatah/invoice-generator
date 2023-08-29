import { supabase } from "../lib/supabase";

export const signOutFunc = async () => {
    const { error } = await supabase.auth.signOut();
    console.log(error);
  };