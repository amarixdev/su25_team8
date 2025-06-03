package team_8.com.example.backend_api.Contributor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.HashSet;

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
     * @param background The academic background to search for
     * @return List of contributors with matching background
     */
    public List<Contributor> getContributorsByAcademicBackground(String background) {
        return contributorRepository.findByBio(background);
    }
    
    /**
     * Finds contributors who specialize in a specific subject
     * @param subject The subject to search for
     * @return List of contributors with the specified subject
     */
    public List<Contributor> getContributorsBySubject(String subject) {
        return contributorRepository.findBySubject(subject);
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
        existingContributor.setSubjects(new HashSet<>(updatedContributor.getSubjects()));
        
        return contributorRepository.save(existingContributor);
    }
    
    /**
     * Deletes a contributor
     * @param id The ID of the contributor to delete
     * @throws IllegalArgumentException if contributor not found
     */
    @Transactional
    public void deleteContributor(Long id) {
        if (!contributorRepository.existsById(id)) {
            throw new IllegalArgumentException("Contributor not found");
        }
        contributorRepository.deleteById(id);
    }
    
    /**
     * Adds a subject to a contributor's list of subjects
     * @param id The contributor's ID
     * @param subject The subject to add
     * @return The updated contributor
     * @throws IllegalArgumentException if contributor not found
     */
    @Transactional
    public Contributor addSubject(Long id, String subject) {
        return contributorRepository.findById(id)
            .map(contributor -> {
                contributor.addSubject(subject);
                return contributorRepository.save(contributor);
            })
            .orElseThrow(() -> new IllegalArgumentException("Contributor not found with id: " + id));
    }
    
    /**
     * Removes a subject from a contributor's list of subjects
     * @param id The contributor's ID
     * @param subject The subject to remove
     * @return The updated contributor
     * @throws IllegalArgumentException if contributor not found
     */
    @Transactional
    public Contributor removeSubject(Long id, String subject) {
        return contributorRepository.findById(id)
            .map(contributor -> {
                contributor.removeSubject(subject);
                return contributorRepository.save(contributor);
            })
            .orElseThrow(() -> new IllegalArgumentException("Contributor not found with id: " + id));
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
     * Increments the bookmark count for a contributor
     * @param id The contributor's ID
     * @return The updated contributor
     * @throws IllegalArgumentException if contributor not found
     */
    @Transactional
    public Contributor incrementBookmarks(Long id) {
        return contributorRepository.findById(id)
            .map(contributor -> {
                contributor.incrementBookmarks();
                return contributorRepository.save(contributor);
            })
            .orElseThrow(() -> new IllegalArgumentException("Contributor not found with id: " + id));
    }
    
    /**
     * Increments the post count for a contributor
     * @param id The contributor's ID
     * @return The updated contributor
     * @throws IllegalArgumentException if contributor not found
     */
    @Transactional
    public Contributor incrementPosts(Long id) {
        return contributorRepository.findById(id)
            .map(contributor -> {
                contributor.incrementPosts();
                return contributorRepository.save(contributor);
            })
            .orElseThrow(() -> new IllegalArgumentException("Contributor not found with id: " + id));
    }
    
    /**
     * Validates a contributor's data
     * @param contributor The contributor to validate
     * @throws IllegalArgumentException if validation fails
     */
    private void validateContributor(Contributor contributor) {
        if (contributor.getUsername() == null || contributor.getEmail() == null) {
            throw new IllegalArgumentException("Username and email are required");
        }
        
        if (contributorRepository.findByUsername(contributor.getUsername()).isPresent()) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (contributorRepository.findByEmail(contributor.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email already exists");
        }
        
        if (contributor.getDisplayName() == null || contributor.getDisplayName().trim().isEmpty()) {
            throw new IllegalArgumentException("Display name is required");
        }
        if (contributor.getBio() == null || contributor.getBio().trim().isEmpty()) {
            throw new IllegalArgumentException("Academic background (bio) is required");
        }
    }

    @Transactional
    public Contributor updateProfilePicture(Long id, String base64Image) {
        if (base64Image == null || !base64Image.startsWith("data:image/")) {
            throw new IllegalArgumentException("Invalid image format. Must be a Base64 encoded image.");
        }

        return contributorRepository.findById(id)
            .map(contributor -> {
                contributor.setProfilePicture(base64Image);
                return contributorRepository.save(contributor);
            })
            .orElseThrow(() -> new IllegalArgumentException("Contributor not found with id: " + id));
    }

    @Transactional
    public void deleteProfilePicture(Long id) {
        contributorRepository.findById(id)
            .ifPresent(contributor -> {
                contributor.setProfilePicture(null);
                contributorRepository.save(contributor);
            });
    }
} 