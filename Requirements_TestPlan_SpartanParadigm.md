# Spartan Paradigm Requirements Testing 
## Actors
- Visitor V
- Contributor C

### Use Cases

####  1. Visitor: Create New Profile
1. Visitor V1 creates new account and logs in
    
#### 2. Visitor: User Search and Follow System
1.  V1 searches for account C1 in the database  
2. V1 follows account C1

#### 3. Visitor: Upgrade to Contributor
1.  V1 upgrades their account priveledges to contributor C2

#### 4. Visitor (now C2) : Leaderboard
1. V1/C2 shows there account is now eligble for leaderboards
2. V1/C2 exits the app

-----
#### 5. Contributor: Create/modify provider profile use case:
1. Contributor (C1) logs in for the first time and edits his profile.

#### 6. Contributor: Create/edit a new blog post
1. C1 creates a new blog post (B1) with title = "final_presentation".  
2. C1 edits B1 content.
3. C1 exits the app.

-----
#### 7. Visitor: Browse available blog posts.
1. Visitor V1 searches for available blog B1 (title = "final_presentation").

#### 8. Visitor: React to blog posts.
1. V1 views, likes, & comments to B1.

#### 9. Visitor: Summarizes Blog Post
1. V1 calls 3rd Party API (OpenAI) to summarize B1
2. V1 exits the app 
------
#### 10. Contributor: View post analytics.
1. C1 logs into the app and views their post stats.

#### 11. Contributor: Respond to comments.
2. C1 responds to V1 comment left on B1.
3. C1 exits the app.
