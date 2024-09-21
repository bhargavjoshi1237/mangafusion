import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '../supabase';

const AuthComponent = () => (
  <Auth
    supabaseClient={createClient}
    providers={['google', 'discord', 'twitter', 'spotify']}
    appearance={{ theme: ThemeSupa }}
  />
);

export default AuthComponent;
