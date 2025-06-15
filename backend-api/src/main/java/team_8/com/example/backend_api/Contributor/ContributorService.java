package team_8.com.example.backend_api.Contributor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team_8.com.example.backend_api.User.User;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

/**
 * Service class for handling Contributor business logic.
 * Acts as an intermediary between the Controller and Repository layers.
 * Handles data validation, business rules, and complex operations.
 */
@Service
public class ContributorService {
    
    private final ContributorRepository contributorRepository;
    
    @Autowired
    public ContributorService(ContributorRepository contributorRepository) {
        this.contributorRepository = contributorRepository;
    }
    
    /**
     * Retrieves all contributors from the database
     * @return List of all contributors
     */
    public List<Contributor> getAllContributors() {
        return contributorRepository.findAll();
    }
    
    /**
     * Finds a contributor by their ID
     * @param id The contributor's ID
     * @return Optional containing the contributor if found
     */
    public Optional<Contributor> getContributorById(Long id) {
        return contributorRepository.findById(id);
    }
    
    /**
     * Finds a contributor by their username
     * @param username The contributor's username
     * @return Optional containing the contributor if found
     */
    public Optional<Contributor> getContributorByUsername(String username) {
        return contributorRepository.findByUsername(username);
    }
    
    /**
     * Finds a contributor by their email
     * @param email The contributor's email
     * @return Optional containing the contributor if found
     */
    public Optional<Contributor> getContributorByEmail(String email) {
        return contributorRepository.findByEmail(email);
    }
    
    /**
     * Finds contributors by their academic background
     * @param bio The academic background to search for
     * @return List of contributors with matching background
     */
    public List<Contributor> getContributorsByBio(String bio) {
        return contributorRepository.findByBio(bio);
    }
    
    /**
     * Finds top contributors based on number of posts
     * @param minPosts Minimum number of posts required
     * @return List of contributors with more than minPosts
     */
    public List<Contributor> getTopContributorsByPosts(Integer minPosts) {
        return contributorRepository.findTopByPosts(minPosts);
    }
    
    /**
     * Finds top contributors based on number of views
     * @param minViews Minimum number of views required
     * @return List of contributors with more than minViews
     */
    public List<Contributor> getTopContributorsByViews(Integer minViews) {
        return contributorRepository.findTopByViews(minViews);
    }
    
    /**
     * Finds top contributors based on number of likes
     * @param minLikes Minimum number of likes required
     * @return List of contributors with more than minLikes
     */
    public List<Contributor> getTopContributorsByLikes(Integer minLikes) {
        return contributorRepository.findTopByLikes(minLikes);
    }
    
    /**
     * Creates a new contributor
     * @param contributor The contributor to create
     * @return The created contributor
     * @throws IllegalArgumentException if validation fails
     */
    @Transactional
    public Contributor createContributor(Contributor contributor) {
        validateContributor(contributor);
        return contributorRepository.save(contributor);
    }
    
    /**
     * Updates an existing contributor
     * @param id The ID of the contributor to update
     * @param updatedContributor The updated contributor data
     * @return The updated contributor
     * @throws IllegalArgumentException if contributor not found
     */
    @Transactional
    public Contributor updateContributor(Long id, Contributor updatedContributor) {
        Contributor existingContributor = contributorRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Contributor not found"));
        
        // Update fields
        existingContributor.setDisplayName(updatedContributor.getDisplayName());
        existingContributor.setBio(updatedContributor.getBio());
        
        return contributorRepository.save(existingContributor);
    }
   
    public void deleteContributor(Long id) {
        if (!contributorRepository.existsById(id)) {
            throw new IllegalArgumentException("Contributor not found");
        }
        contributorRepository.deleteById(id);
    }

    /**
     * Increments the view count for a contributor
     * @param id The contributor's ID
     * @return The updated contributor
     * @throws IllegalArgumentException if contributor not found
     */
    @Transactional
    public Contributor incrementViews(Long id) {
        return contributorRepository.findById(id)
            .map(contributor -> {
                contributor.incrementViews();
                return contributorRepository.save(contributor);
            })
            .orElseThrow(() -> new IllegalArgumentException("Contributor not found with id: " + id));
    }
    
    /**
     * Increments the like count for a contributor
     * @param id The contributor's ID
     * @return The updated contributor
     * @throws IllegalArgumentException if contributor not found
     */
    @Transactional
    public Contributor incrementLikes(Long id) {
        return contributorRepository.findById(id)
            .map(contributor -> {
                contributor.incrementLikes();
                return contributorRepository.save(contributor);
            })
            .orElseThrow(() -> new IllegalArgumentException("Contributor not found with id: " + id));
    }

    /**
     * Gets the followers of a contributor
     * @param id The contributor's ID
     * @return List of users following the contributor
     * @throws RuntimeException if contributor not found
     */
    public List<User> getFollowers(Long id) {
        Contributor contributor = contributorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contributor not found with id: " + id));
        return new ArrayList<>(contributor.getFollowers());
    }

    /**
     * Validates a contributor's data
     * @param contributor The contributor to validate
     * @throws IllegalArgumentException if validation fails
     */
    private void validateContributor(Contributor contributor) {
        if (contributor.getUsername() == null || contributor.getUsername().trim().isEmpty()) {
            throw new IllegalArgumentException("Username is required");
        }
        if (contributor.getEmail() == null || contributor.getEmail().trim().isEmpty()) {
            throw new IllegalArgumentException("Email is required");
        }
    }
} 