const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
console.log(supabaseUrl);
console.log(supabaseAnonKey);
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase