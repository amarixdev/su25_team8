package team_8.com.example.backend_api.blog;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findByContributorId(Long contributorId);
    List<Blog> findByStatus(BlogStatus status);
    List<Blog> findByTitleContainingIgnoreCase(String title);
} 