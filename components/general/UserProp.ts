interface Identity {
    created_at: string;
    id: string;
    identity_data: {
      email: string;
      sub: string | null;
    };
    last_sign_in_at: string;
    provider: string;
    updated_at: string;
    user_id: string;
  }
  
  interface UserMetadata {
    avatar: string | null;
    price: number | null;
    stripe_customer_id: string | null;
    subscription_status: string | null;
  }
  
  interface UserProp {
    app_metadata: {
      provider: string | null;
      providers: string[] | null;
    };
    aud: string | null;
    confirmation_sent_at: string;
    confirmed_at: string;
    created_at: string;
    email: string;
    email_confirmed_at: string;
    id: string;
    identities: Identity[] | null;
    last_sign_in_at: string;
    phone: string | null;
    role: string;
    updated_at: string;
    user_metadata: UserMetadata | null;
  }
  
  export default UserProp;