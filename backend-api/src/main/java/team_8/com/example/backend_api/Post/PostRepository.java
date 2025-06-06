package team_8.com.example.backend_api.Post;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByContributorId(Long contributorId);
    List<Post> findByStatus(PostStatus status);
    List<Post> findByTitleContainingIgnoreCase(String title);
} 