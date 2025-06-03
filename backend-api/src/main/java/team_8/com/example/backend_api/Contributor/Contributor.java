package team_8.com.example.backend_api.Contributor;

import jakarta.persistence.*;
import team_8.com.example.backend_api.User.*;
import java.util.ArrayList;
import java.util.List;
import java.util.HashSet;
import java.util.Set;

/**
 * Entity class representing a Provider/Contributor in the system.
 * This class maps to the 'contributors' table in the database.
 * A Contributor is a user who can create and manage educational content.
 * Uses the inherited bio field to store academic background information.
 * Inherits basic user fields (id, displayName, username, email) from User class.
 */
@Entity
@Table(name = "contributors")
@DiscriminatorValue("PROVIDER")
public class Contributor extends User {
    
    @Column(name = "profile_picture", columnDefinition = "TEXT")
    private String profilePicture;  // Will store Base64 string
    
    // Set of subjects the contributor specializes in
    @ElementCollection
    @CollectionTable(name = "contributor_subjects", joinColumns = @JoinColumn(name = "contributor_id"))
    @Column(name = "subject")
    private Set<String> subjects = new HashSet<>();
    
    // Statistics tracking
    @Column(name = "total_posts")
    private Integer totalPosts = 0;
    
    @Column(name = "total_views")
    private Integer totalViews = 0;
    
    @Column(name = "total_likes")
    private Integer totalLikes = 0;
    
    @Column(name = "total_bookmarks")
    private Integer totalBookmarks = 0;
    
    // Constructors
    public Contributor() {
        super();
    }
    
    public Contributor(String displayName, String username, String email, String academicBackground) {
        super(displayName, username, email);
        setBio(academicBackground); // Use bio field for academic background
    }
    
    // Getters and Setters for academic background (using bio)
    public String getAcademicBackground() {
        return getBio(); // Return bio as academic background
    }
    
    public void setAcademicBackground(String academicBackground) {
        setBio(academicBackground); // Set bio as academic background
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
    
    public Integer getTotalBookmarks() {
        return totalBookmarks;
    }
    
    public void setTotalBookmarks(Integer totalBookmarks) {
        this.totalBookmarks = totalBookmarks;
    }
    
    // Subject management
    public List<String> getSubjects() {
        return new ArrayList<>(subjects);
    }
    
    public void setSubjects(Set<String> subjects) {
        this.subjects.clear();
        this.subjects.addAll(subjects);
    }
    
    public void addSubject(String subject) {
        subjects.add(subject);
    }
    
    public void removeSubject(String subject) {
        subjects.remove(subject);
    }
    
    // Analytics methods
    public void incrementViews() {
        this.totalViews++;
    }
    
    public void incrementLikes() {
        this.totalLikes++;
    }
    
    public void incrementBookmarks() {
        this.totalBookmarks++;
    }
    
    public void incrementPosts() {
        this.totalPosts++;
    }

    public String getProfilePicture() {
        return profilePicture;
    }

    public void setProfilePicture(String profilePicture) {
        this.profilePicture = profilePicture;
    }
}
