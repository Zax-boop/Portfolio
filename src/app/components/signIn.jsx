import { useState } from 'react';
import signIn from "../../../utils/signIn"

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const user = await signIn(email, password);

    if (!user) {
      setError('Invalid credentials, please try again.');
    } else {
      console.log('Signed in:', user);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-md shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-4">Sign In</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form className="space-y-4" onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
