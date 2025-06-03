package team_8.com.example.backend_api.Comment;

import jakarta.persistence.*;
import team_8.com.example.backend_api.User.User;

@Entity
public class Comment {

    @Id
    @GeneratedValue
    private Long id;

    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id") // foreign key in comment table
    private User user;

    // Constructors
    public Comment() {}

    // Constructor with essential fields
    public Comment(String content, User user) {
        this.content = content;
        this.user = user;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
