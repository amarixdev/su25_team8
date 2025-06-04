package team_8.com.example.backend_api.Comment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByUserId(Long userId);

    List<Comment> findByPostId(Long postId);

    List<Comment> findByUserIdAndPostId(Long userId, Long postId);

    List<Comment> findByContentContainingIgnoreCase(String content);
} 