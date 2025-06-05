package team_8.com.example.backend_api.User;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import team_8.com.example.backend_api.Comment.Comment;
import team_8.com.example.backend_api.Post.Post;



@Entity
@Table(name = "app_users")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
//Role Column is auto-generated
@DiscriminatorColumn(name = "role", discriminatorType = DiscriminatorType.STRING)
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public abstract class User {

    @Id
    @GeneratedValue
    private Long id;
    @Column(unique = true, nullable = false)    
    private String displayName;
    @Column(unique = true, nullable = false)
    private String username;
    @Column(unique = true, nullable = false)

    private String email;
    private String profilePicturePath;
    private String bio;
    private String location;
    private String website;
    private int following;
    

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Comment> comments = new ArrayList<>();

    

    // Constructors
    public User() {}
  
    public User(String profilePicturePath, String displayName, String username, String email, 
            String bio, String location, String website, int following) {

        this.profilePicturePath = profilePicturePath;
        this.displayName = displayName;
        this.username = username;
        this.email = email;
        this.bio = bio;
        this.location = location;
        this.website = website;
        this.following = following;
        this.comments = new ArrayList<>();
    }
    
    // Common getters/setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProfilePicturePath() {
        return profilePicturePath;
    }

    public void setProfilePicturePath(String profilePicturePath) {
        this.profilePicturePath = profilePicturePath;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public int getFollowing() {
        return following;
    }

    public void setFollowing(int following) {
        this.following = following;
    }

    // Dynamic role getter based on entity type
    public String getRole() {
        if (this.getClass().getSimpleName().equals("Visitor")) {
            return "VISITOR";
        } else if (this.getClass().getSimpleName().equals("Contributor")) {
            return "CONTRIBUTOR";
        }
        return null;
    }
}