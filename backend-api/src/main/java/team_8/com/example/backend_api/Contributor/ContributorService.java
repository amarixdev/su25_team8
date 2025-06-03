package team_8.com.example.backend_api.Contributor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.HashSet;

/**
 * Service class for handling Contributor business logic and their blog services.
 * Acts as an intermediary between the Controller and Repository layers.
 * Handles data validation, business rules, and complex operations.
 */
@Service
public class ContributorService {
    
    private final ContributorRepository contributorRepository;
    private final BlogServiceRepository blogServiceRepository;
    
    @Autowired
    public ContributorService(ContributorRepository contributorRepository, 
                            BlogServiceRepository blogServiceRepository) {
        this.contributorRepository = contributorRepository;
        this.blogServiceRepository = blogServiceRepository;
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
    
    // Blog Service operations
    public List<BlogService> getAllServices() {
        return blogServiceRepository.findAll();
    }
    
    public Optional<BlogService> getServiceById(Long id) {
        return blogServiceRepository.findById(id);
    }
    
    public List<BlogService> getServicesByContributor(Long contributorId) {
        Contributor contributor = getContributorById(contributorId)
            .orElseThrow(() -> new IllegalArgumentException("Contributor not found"));
        return blogServiceRepository.findByContributor(contributor);
    }
    
    public List<BlogService> getServicesByStatus(ServiceStatus status) {
        return blogServiceRepository.findByStatus(status);
    }
    
    public List<BlogService> getServicesByCategory(String category) {
        return blogServiceRepository.findByCategory(category);
    }
    
    public List<BlogService> getServicesByTag(String tag) {
        return blogServiceRepository.findByTag(tag);
    }
    
    public List<BlogService> getTopServicesByViews() {
        return blogServiceRepository.findTopByViews();
    }
    
    public List<BlogService> getTopServicesByLikes() {
        return blogServiceRepository.findTopByLikes();
    }
    
    public List<BlogService> getTopServicesBySubscribers() {
        return blogServiceRepository.findTopBySubscribers();
    }
    
    public List<BlogService> searchServices(String query) {
        return blogServiceRepository.searchByTitleOrDescription(query);
    }
    
    @Transactional
    public BlogService createService(BlogService service, Long contributorId) {
        validateService(service);
        Contributor contributor = getContributorById(contributorId)
            .orElseThrow(() -> new IllegalArgumentException("Contributor not found"));
        service.setContributor(contributor);
        return blogServiceRepository.save(service);
    }
    
    @Transactional
    public BlogService updateService(Long id, BlogService updatedService) {
        BlogService existingService = blogServiceRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Service not found"));
        
        // Update fields
        existingService.setTitle(updatedService.getTitle());
        existingService.setDescription(updatedService.getDescription());
        existingService.setContent(updatedService.getContent());
        existingService.setCategories(updatedService.getCategories());
        existingService.setTags(updatedService.getTags());
        existingService.setStatus(updatedService.getStatus());
        
        return blogServiceRepository.save(existingService);
    }
    
    @Transactional
    public void deleteService(Long id) {
        if (!blogServiceRepository.existsById(id)) {
            throw new IllegalArgumentException("Service not found");
        }
        blogServiceRepository.deleteById(id);
    }
    
    @Transactional
    public BlogService addCategory(Long id, String category) {
        BlogService service = blogServiceRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Service not found"));
        service.addCategory(category);
        return blogServiceRepository.save(service);
    }
    
    @Transactional
    public BlogService removeCategory(Long id, String category) {
        BlogService service = blogServiceRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Service not found"));
        service.removeCategory(category);
        return blogServiceRepository.save(service);
    }
    
    @Transactional
    public BlogService addTag(Long id, String tag) {
        BlogService service = blogServiceRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Service not found"));
        service.addTag(tag);
        return blogServiceRepository.save(service);
    }
    
    @Transactional
    public BlogService removeTag(Long id, String tag) {
        BlogService service = blogServiceRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Service not found"));
        service.removeTag(tag);
        return blogServiceRepository.save(service);
    }
    
    @Transactional
    public BlogService updateStatus(Long id, ServiceStatus status) {
        BlogService service = blogServiceRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Service not found"));
        service.setStatus(status);
        return blogServiceRepository.save(service);
    }
    
    @Transactional
    public BlogService incrementServiceViews(Long id) {
        BlogService service = blogServiceRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Service not found"));
        service.incrementViews();
        return blogServiceRepository.save(service);
    }
    
    @Transactional
    public BlogService incrementServiceLikes(Long id) {
        BlogService service = blogServiceRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Service not found"));
        service.incrementLikes();
        return blogServiceRepository.save(service);
    }
    
    @Transactional
    public BlogService incrementServiceSubscribers(Long id) {
        BlogService service = blogServiceRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Service not found"));
        service.incrementSubscribers();
        return blogServiceRepository.save(service);
    }
    
    @Transactional
    public BlogService decrementServiceSubscribers(Long id) {
        BlogService service = blogServiceRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Service not found"));
        service.decrementSubscribers();
        return blogServiceRepository.save(service);
    }
    
    private void validateService(BlogService service) {
        if (service.getTitle() == null || service.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Title is required");
        }
        if (service.getDescription() == null || service.getDescription().trim().isEmpty()) {
            throw new IllegalArgumentException("Description is required");
        }
        if (service.getContent() == null || service.getContent().trim().isEmpty()) {
            throw new IllegalArgumentException("Content is required");
        }
        if (service.getContributor() == null) {
            throw new IllegalArgumentException("Contributor is required");
        }
    }
} 