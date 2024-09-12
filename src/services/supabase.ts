import axios from 'axios';

const supabase = axios.create({
  baseURL: 'https://dqnwahspllvxaxshzjow.supabase.co/rest/v1/',
  headers: {
    apiKey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbndhaHNwbGx2eGF4c2h6am93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYxNDYyMjcsImV4cCI6MjAwMTcyMjIyN30.in8rpzRoXmNB9ElFkGdkWpzjMgBYFqiIe5lgV_D-OO0',
  },
});

export default supabase;
