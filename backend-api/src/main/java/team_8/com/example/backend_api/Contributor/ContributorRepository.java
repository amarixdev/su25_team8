package team_8.com.example.backend_api.Contributor;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for Contributor entity.
 * Provides database operations and custom queries for Contributor data.
 * Extends JpaRepository to inherit basic CRUD operations.
 */
@Repository
public interface ContributorRepository extends JpaRepository<Contributor, Long> {
    
    // Find a contributor by their unique username
    Optional<Contributor> findByUsername(String username);
    
    // Find a contributor by their unique email
    Optional<Contributor> findByEmail(String email);
    
    // Find contributors by their academic background (stored in bio)
    List<Contributor> findByBio(String bio);
    
    // Find contributors who have a specific subject in their subjects list
    @Query("SELECT c FROM Contributor c WHERE :subject MEMBER OF c.subjects")
    List<Contributor> findBySubject(@Param("subject") String subject);
    
    // Find top contributors who have posted more than the minimum number of posts
    @Query("SELECT c FROM Contributor c WHERE c.totalPosts >= :minPosts ORDER BY c.totalPosts DESC")
    List<Contributor> findTopByPosts(@Param("minPosts") Integer minPosts);
    
    // Find top contributors who have more than the minimum number of views
    @Query("SELECT c FROM Contributor c WHERE c.totalViews >= :minViews ORDER BY c.totalViews DESC")
    List<Contributor> findTopByViews(@Param("minViews") Integer minViews);
    
    // Find top contributors who have more than the minimum number of likes
    @Query("SELECT c FROM Contributor c WHERE c.totalLikes >= :minLikes ORDER BY c.totalLikes DESC")
    List<Contributor> findTopByLikes(@Param("minLikes") Integer minLikes);
} 