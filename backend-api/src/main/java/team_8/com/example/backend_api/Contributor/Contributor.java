package team_8.com.example.backend_api.Contributor;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.HashSet;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import team_8.com.example.backend_api.Post.Post;
// import team_8.com.example.backend_api.Post.Post; // No longer needed here directly if posts list is removed
import team_8.com.example.backend_api.User.*;

/**
 * Entity class representing a Provider/Contributor in the system.
 * This class maps to the 'contributors' table in the database.
 * A Contributor is a user who can create and manage educational content.
 * Uses the inherited bio field to store academic background information.
 * Inherits basic user fields (id, displayName, username, email) from User class.
 */
@Entity
// @Table(name = "contributors") // This can be uncommented if a separate table specifically for Contributor-only fields is desired beyond the app_user table for User.
@DiscriminatorValue("CONTRIBUTOR")
public class Contributor extends User {
    
    // Statistics tracking
    @Column(name = "total_posts") // Assuming this is explicitly managed, not just posts.size()
    private Integer totalPosts = 0;

    @Column(name = "total_views")
    private Integer totalViews = 0;
    
    @Column(name = "total_likes")
    private Integer totalLikes = 0;
    

    
    // Posts list for contributors
    @OneToMany(mappedBy = "contributor", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"contributor", "author"})
    private List<Post> posts = new ArrayList<>();

    // Followers relationship - Contributors can have Users as followers
    @ManyToMany(mappedBy = "following", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<User> followers = new HashSet<>();

    // Constructors
    public Contributor() {
        super();
    }
    
    public Contributor(String profilePicturePath, String displayName, String username, String email, String bio, String location, String website) {
        super(profilePicturePath, displayName, username, email, bio, location, website);
        this.followers = new HashSet<>();
    }

    // Statistics getters and setters
    public Integer getTotalPosts() {
        return totalPosts;
    }

    public void setTotalPosts(Integer totalPosts) {
        this.totalPosts = totalPosts;
    }

    public Integer getTotalViews() {
        return totalViews;
    }
    
    public void setTotalViews(Integer totalViews) {
        this.totalViews = totalViews;
    }
    
    public Integer getTotalLikes() {
        return totalLikes;
    }
    
    public void setTotalLikes(Integer totalLikes) {
        this.totalLikes = totalLikes;
    }
    
    public Set<User> getFollowers() {
        return followers;
    }
    
    public void setFollowers(Set<User> followers) {
        this.followers = followers;
    }

    public int getFollowersCount() {
        return followers.size();
    }

    public List<Post> getPosts() {
        return posts;
    }
    
    public void setPosts(List<Post> posts) {
        this.posts = posts;
    }

    public void addPost(Post post) {
        posts.add(post);
        post.setContributor(this);
    }
    
    // Analytics methods
    public void incrementViews() {
        this.totalViews++;
    }
    
    public void incrementLikes() {
        this.totalLikes++;
    }

    public void addFollower(User user) {
        this.followers.add(user);
    }

    public void removeFollower(User user) {
        this.followers.remove(user);
    }

    public boolean hasFollower(User user) {
        return this.followers.contains(user);
    }

    public void incrementPosts() { // Method to increment the explicit totalPosts counter
        this.totalPosts++;
    }

    public void decrementPosts() { // Method to increment the explicit totalPosts counter
        this.totalPosts--;
    }
}
