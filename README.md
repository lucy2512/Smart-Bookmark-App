## 🧠 Challenges Faced

### 1️⃣ Supabase Setup (Biggest Challenge)

This was my first time using Supabase.

Understanding the following concepts was initially confusing:

- Auth flow  
- Session handling  
- Row Level Security (RLS)  
- Realtime subscriptions  

To overcome this, I used:

- Official Supabase documentation  
- ChatGPT explanations  
- Trial and error testing  

This helped me understand how Supabase connects authentication with database-level security policies.

---

### 2️⃣ Google OAuth Configuration

Google OAuth was completely new to me.

The main difficulties were:

- Understanding redirect URLs  
- Differentiating between:
  - Supabase callback URL  
  - Localhost redirect URL  
  - Production redirect URL  
- Fixing redirect mismatch errors  

Through debugging and experimentation, I learned how the OAuth flow works internally:

**User → Google → Supabase → Application redirect**

---

### 3️⃣ Row Level Security (RLS)

Initially, bookmarks were visible across users because proper policies were not configured.

I had to understand:

- Why RLS is disabled by default  
- How policies work  
- How `auth.uid()` connects to `user_id`  

After implementing correct SELECT, INSERT, and DELETE policies using:
`auth.uid() = user_id`


data became fully isolated per user.

---

### 4️⃣ Production Redirect Issue

After deployment, login kept redirecting to `localhost` instead of the production domain.

**Root cause:**  
Supabase Site URL was still set to `localhost`.

**Fix:**  
Updated the Site URL to the production domain and redeployed.

This helped me better understand environment-specific configuration and deployment workflows.

---

### 5️⃣ Realtime Updates

Implementing real-time updates across tabs required:

- Using Supabase realtime subscriptions  
- Refetching bookmarks on change events  

This significantly improved user experience by syncing data instantly across multiple tabs.

---

## 📚 What I Learned

- How OAuth works in real-world applications  
- How backend security rules protect user data  
- How to deploy full-stack applications properly  
- How to debug production authentication issues  
- How environment variables work in Vercel  
- Practical implementation of Row Level Security in PostgreSQL  

This project helped me understand the complete authentication flow from frontend to backend.

---

## 🔮 Future Improvements

- Edit bookmarks feature  
- Search functionality  
- Bookmark categories or tags  
- Shareable bookmark collections  
- Custom domain deployment  
- UI animations and micro-interactions  

---

## 🧑‍💻 Author

Developed by **Parthib Sarkar**

---

## 🏁 Conclusion

This project was a strong learning experience, especially in authentication, database security, and deployment.

The biggest takeaway was understanding how authentication integrates with backend authorization rules.

The application is fully functional, secure, and deployed.

