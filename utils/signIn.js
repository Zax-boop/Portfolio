import supabase from "./supabaseclient";  

export default async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error signing in:', error.message);
    return null;
  }

  return data; // Contains user session info
}
