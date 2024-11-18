import supabase from "../../../utils/supabaseclient";

export default function SignOut() {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-500 text-white px-4 py-2 rounded-md"
    >
      Sign Out
    </button>
  );
}