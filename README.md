## Spartan Paradigm

> A collaborative blog platform for UNCG students to share ideas and learn from each other.

### Team Members
- Amari DeVaughn  
- Camden Gregory

### Description
Spartan Paradigm is a simple blog-style web application that allows UNCG students to:

- 📚 Post blog entries  
- 🔍 Browse & search other users' posts  
- ❤️ Like or 💬 comment on ideas to promote discussion
- 📊 Earn a position in the community leaderboards
- 💫 & More!

Whether you have hidden talents, ambitious ideas, or niche passions, Spartan Paradigm provides a platform to explore and share your skills with like-minded peers.

### App Functions

1. **Visitor (default role)**
   1. Create / login / modify / remove personal profile.
   2. Browse available blog posts (filter by subject, date, popularity).
   3. React to posts by liking or bookmarking.
   4. Apply for posting privileges once eligible.

2. **Contributor**
   1. Login / modify / remove contributor profile.
   2. Write and manage blog posts (edit or delete).
   3. View post analytics (views, likes, comments).
   4. Opportunity to earn leaderboard positions.

---

## Getting Started

Follow the steps below to run Spartan Paradigm locally.

### Prerequisites

1. **Java 17 or later** – required for the Spring Boot backend.
2. **Maven 3.8+** – used to build and run the backend API.
3. **Node.js 18 LTS** (or later) – required for the Next.js frontend.
4. **npm 9+** (comes with Node) or **yarn** – to install frontend dependencies.


---

### 1 · Clone the Repository

```bash
# SSH
git clone git@github.com:amarixdev/su25_team8.git

# or HTTPS
git clone https://github.com/amarixdev/su25_team8.git

cd spartan-paradigm/su25_team8
```

---

### 2 · Start the Backend API (Spring Boot)

```bash
cd backend-api

# Build and run with Maven
mvn spring-boot:run
```

The backend will start at **http://localhost:8080**. You should see log output similar to:

```
Started BackendApiApplication in 4.123 seconds (JVM running for 4.987)
```

> The CORS configuration already allows requests from `http://localhost:3000` (the frontend).

---

### 3 · Start the Frontend (Next.js)

```bash
# In a new terminal tab/window
cd high-fidelity-prototype

# Install dependencies (first time only)
npm install

# Run the development server
npm run dev
```

The frontend will start at **http://localhost:3000** and automatically reload on file changes.

---

### 4 · Login & Seed Data (Optional)

1. Visit `http://localhost:3000/login`.
2. Use the **DEV** button in the top-left corner to quickly create a demo **contributor** account.
3. This will seed a test user in the backend and log you into the app.

---


### 5 · Environment Variables (Optional)

| Service   | File                      | Key                       | Default              |
|-----------|---------------------------|---------------------------|----------------------|
| Backend   | `src/main/resources/application.properties` | `spring.datasource.url`       | `jdbc:h2:mem:testdb` |
| Frontend  | `.env.local`              | `NEXT_PUBLIC_API_BASE`    | `http://localhost:8080/api` |
| Frontend  | `.env.local`              | `NEXT_PUBLIC_OPENAI_API_KEY` | _(none)_ |

> If you change ports or database settings, make sure to update both backend CORS settings and the frontend environment variables.

#### Enabling AI Features (TL;DR Summaries)

The blog post page can generate AI-powered TL;DR summaries using **OpenAI GPT-4o**. To enable this feature you must supply an **OpenAI API key**:

```bash
# high-fidelity-prototype/.env.local
NEXT_PUBLIC_OPENAI_API_KEY=sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

If the key is missing, the "Summarize" button will show an error. You can obtain an API key from <https://platform.openai.com/>.

---

### 8 · Useful Scripts

| Location | Command              | Description                                |
|----------|----------------------|--------------------------------------------|
| Frontend | `npm run lint`       | Runs ESLint with Next.js rules             |
| Frontend | `npm run format`     | Runs Prettier on all source files          |
| Frontend | `npm run dev`        | Starts the Next.js dev server (port 3000)  |
| Frontend | `npm run build`      | Creates an optimized production build      |
| Frontend | `npm run start`      | Serves the production build on port 3000   |
| Backend  | `mvn spring-boot:run`| Starts the Spring Boot API (port 8080)     |
| Backend  | `mvn test`           | Runs backend unit tests                    |
| Backend  | `mvn package`        | Builds an executable JAR in `target/`      |

---

### 9 · Troubleshooting

| Issue | Possible Fix |
|-------|--------------|
| **Port already in use** | Stop the process using port **3000** or **8080** or edit the port in `application.properties` / `package.json`. |
| **CORS errors** | Confirm the backend is running and `CorsConfig.java` allows your frontend origin. |
| **OpenAI errors** | Ensure `NEXT_PUBLIC_OPENAI_API_KEY` is set and valid; check rate limits. |
| **Database issues** | Using H2? Delete the `testdb` file or switch to a fresh in-memory DB. |

---

Enjoy building with **Spartan Paradigm**! If you encounter any issues, feel free to open an issue or contact the team.