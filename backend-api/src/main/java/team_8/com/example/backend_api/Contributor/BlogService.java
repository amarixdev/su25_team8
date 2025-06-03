package team_8.com.example.backend_api.Contributor;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * Entity class representing a blog service in the system.
 * This class maps to the 'services' table in the database.
 */
@Entity
@Table(name = "services")
public class BlogService {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    @Column(length = 1000)
    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String content;
    
    @ManyToOne
    @JoinColumn(name = "contributor_id", nullable = false)
    private Contributor contributor;
    
    @ElementCollection
    @CollectionTable(name = "service_categories", joinColumns = @JoinColumn(name = "service_id"))
    @Column(name = "category")
    private Set<String> categories = new HashSet<>();
    
    @ElementCollection
    @CollectionTable(name = "service_tags", joinColumns = @JoinColumn(name = "service_id"))
    @Column(name = "tag")
    private Set<String> tags = new HashSet<>();
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ServiceStatus status = ServiceStatus.DRAFT;
    
    private Integer views = 0;
    private Integer likes = 0;
    private Integer subscribers = 0;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
    
    public Contributor getContributor() {
        return contributor;
    }
    
    public void setContributor(Contributor contributor) {
        this.contributor = contributor;
    }
    
    public Set<String> getCategories() {
        return categories;
    }
    
    public void setCategories(Set<String> categories) {
        this.categories = categories;
    }
    
    public Set<String> getTags() {
        return tags;
    }
    
    public void setTags(Set<String> tags) {
        this.tags = tags;
    }
    
    public ServiceStatus getStatus() {
        return status;
    }
    
    public void setStatus(ServiceStatus status) {
        this.status = status;
    }
    
    public Integer getViews() {
        return views;
    }
    
    public void setViews(Integer views) {
        this.views = views;
    }
    
    public Integer getLikes() {
        return likes;
    }
    
    public void setLikes(Integer likes) {
        this.likes = likes;
    }
    
    public Integer getSubscribers() {
        return subscribers;
    }
    
    public void setSubscribers(Integer subscribers) {
        this.subscribers = subscribers;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    // Helper methods
    public void addCategory(String category) {
        categories.add(category);
    }
    
    public void removeCategory(String category) {
        categories.remove(category);
    }
    
    public void addTag(String tag) {
        tags.add(tag);
    }
    
    public void removeTag(String tag) {
        tags.remove(tag);
    }
    
    public void incrementViews() {
        this.views++;
    }
    
    public void incrementLikes() {
        this.likes++;
    }
    
    public void incrementSubscribers() {
        this.subscribers++;
    }
    
    public void decrementSubscribers() {
        if (this.subscribers > 0) {
            this.subscribers--;
        }
    }
} 