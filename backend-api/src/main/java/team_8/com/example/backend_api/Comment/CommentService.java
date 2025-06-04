package team_8.com.example.backend_api.Comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Comment getCommentById(Long id) {
        return commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + id));
    }

    public Comment createComment(Comment comment) {
        // Add any validation or business logic before saving
        if (comment.getContent() == null || comment.getContent().trim().isEmpty()) {
            throw new RuntimeException("Comment content cannot be empty");
        }
        if (comment.getUser() == null) {
            throw new RuntimeException("Comment must have a user");
        }
        if (comment.getPost() == null) {
            throw new RuntimeException("Comment must be associated with a post");
        }
        
        return commentRepository.save(comment);
    }

    public Comment updateComment(Long id, Comment commentDetails) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + id));

        // Update comment fields
        comment.setContent(commentDetails.getContent());
        // Note: Typically, you might not want to allow changing the user or post of a comment
        // But if needed, you can uncomment these lines:
        // comment.setUser(commentDetails.getUser());
        // comment.setPost(commentDetails.getPost());

        return commentRepository.save(comment);
    }

    public void deleteComment(Long id) {
        if (!commentRepository.existsById(id)) {
            throw new RuntimeException("Comment not found with id: " + id);
        }
        commentRepository.deleteById(id);
    }

    // Additional methods for finding comments by specific criteria
    public List<Comment> getCommentsByUserId(Long userId) {
        return commentRepository.findByUserId(userId);
    }

    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }

    public List<Comment> getCommentsByUserAndPost(Long userId, Long postId) {
        return commentRepository.findByUserIdAndPostId(userId, postId);
    }

    public List<Comment> searchCommentsByContent(String content) {
        return commentRepository.findByContentContainingIgnoreCase(content);
    }
} 