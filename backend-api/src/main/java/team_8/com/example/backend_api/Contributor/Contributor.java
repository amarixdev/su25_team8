package team_8.com.example.backend_api.Contributor;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    
    @Column(name = "followers")
    private Integer followers = 0;
    
    // Removed posts list as it's inherited from User and mapped by 'contributor'
    @OneToMany(mappedBy = "contributor", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Post> posts = new ArrayList<>();

    // Constructors
    public Contributor() {
        super();
    }
    
    public Contributor(String profilePicturePath, String displayName, String username, String email, String bio, String location, String website, int following) {
        super(profilePicturePath, displayName, username, email, bio, location, website, following);
    }

    // Removed getPosts/setPosts as they are inherited from User

    // Statistics getters and setters
    public Integer getTotalPosts() {
        return totalPosts;
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
    
    public Integer getFollowers() {
        return followers;
    }
    
    public void setFollowers(Integer followers) {
        this.followers = followers;
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

    public void incrementFollowers() {
        this.followers++;
    }
    
    public void decrementFollowers() {
        if (this.followers > 0) {
            this.followers--;
        }
    }

    public void incrementPosts() { // Method to increment the explicit totalPosts counter
        this.totalPosts++;
    }

    public void decrementPosts() { // Method to increment the explicit totalPosts counter
        this.totalPosts--;
    }
}
