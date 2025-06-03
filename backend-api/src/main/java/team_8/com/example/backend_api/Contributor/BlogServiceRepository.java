package team_8.com.example.backend_api.Contributor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repository interface for BlogService entity.
 * Handles database operations for blog services.
 */
@Repository
public interface BlogServiceRepository extends JpaRepository<BlogService, Long> {
    
    /**
     * Find all services by a specific contributor
     */
    List<BlogService> findByContributor(Contributor contributor);
    
    /**
     * Find all services with a specific status
     */
    List<BlogService> findByStatus(ServiceStatus status);
    
    /**
     * Find services by category using a custom query
     */
    @Query("SELECT s FROM BlogService s JOIN s.categories c WHERE c = :category")
    List<BlogService> findByCategory(String category);
    
    /**
     * Find services by tag using a custom query
     */
    @Query("SELECT s FROM BlogService s JOIN s.tags t WHERE t = :tag")
    List<BlogService> findByTag(String tag);
    
    /**
     * Find top services by number of views
     */
    @Query("SELECT s FROM BlogService s ORDER BY s.views DESC")
    List<BlogService> findTopByViews();
    
    /**
     * Find top services by number of likes
     */
    @Query("SELECT s FROM BlogService s ORDER BY s.likes DESC")
    List<BlogService> findTopByLikes();
    
    /**
     * Find top services by number of subscribers
     */
    @Query("SELECT s FROM BlogService s ORDER BY s.subscribers DESC")
    List<BlogService> findTopBySubscribers();
    
    /**
     * Search services by title or description
     */
    @Query("SELECT s FROM BlogService s WHERE LOWER(s.title) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(s.description) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<BlogService> searchByTitleOrDescription(String query);
} 